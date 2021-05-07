import { ShowAwardsComponent } from "./../show-awards/show-awards.component";
import { PickerModule } from "@ctrl/ngx-emoji-mart";
import { TranslateService } from "@ngx-translate/core";
import {
  ChallengeService,
  IChallenge,
  IReference,
  IAward,
  IUserc,
} from "../../../service/challenge.service";
import { AlertController } from "@ionic/angular";
import { UserService } from "src/app/service/user.service";
import { LoadingController } from "@ionic/angular";
import { take } from "rxjs/operators";
import { ImgVideoUpload } from "src/app/service/reusable-img-video-logic.service";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { Component, OnInit, ViewChild, ElementRef, Input } from "@angular/core";
import { ToastController, ModalController } from "@ionic/angular";
import { ReusableComponentsIonic } from "src/app/service/ionicHelpers.service";

@Component({
  selector: "app-create",
  templateUrl: "./create.component.html",
  styleUrls: ["./create.component.scss"],
})
export class CreateChallengeComponent implements OnInit {
  @Input() challenged: IReference | null;
  @Input() Challenge: any;
  public public: boolean = true;
  public media: string = null;
  public awards: IAward[] = [];
  public retoExistente: boolean = false;
  public instructions: string = null;
  timeLimit: number = null

  // FORM
  form: any = null;
  formbool:boolean = false;
  // STEPPERS

  // description
  step0: boolean = false;
  // video
  step1: boolean = true;
  // form
  step2: boolean = false;
  // awards list
  step3: boolean = false;
  createAward: boolean = false;
  // public or not
  step4: boolean = false;
  constructor(
    public toast: ToastController,
    public fb: FormBuilder,
    public trans: TranslateService,
    public img: ImgVideoUpload,
    public mc: ModalController,
    public alert: AlertController,
    public loadingController: LoadingController,
    public userService: UserService,
    public challengeService: ChallengeService,
    public reusableCI: ReusableComponentsIonic
  ) {}

  ngOnInit() {
    if (this.challenged !== null) {
      this.retoExistente = true;
      this.form = {
        title: this.Challenge.title,
        description: this.Challenge.description,
      };
      this.awards = this.Challenge.awards;
      this.step0 = true;
      this.step1 = false;
      this.verifyTimeLimit()
    }else{
      this.timeLimit = 60
    }
  }
  
  verifyTimeLimit(){
    setTimeout(()=>{
      const video: HTMLVideoElement = <HTMLVideoElement>(
        document.getElementById("anteriorVideo")
      );
      if (video && !isNaN(video.duration) && video.duration !== Infinity ) {
        this.timeLimit = Math.floor(video.duration)
        video.currentTime = 0;
        video.load()
      }
      else{
        video.currentTime = 1e101;
        this.verifyTimeLimit()
      }
    },500)
  }

  ready() {
    this.step0 = false;
    this.step2 = true;
  }
  finishform(){
    this.step1 = false;
    this.step2 = true;
  }
  intentos: any[] = [];
  guardarMedia(res: any) {
    if(!res.no){
      this.media = res.media;
      this.intentos = res.intentos;
      this.saveChallenge();
    }else{
      this.media = res.media;
      this.intentos = res.intentos;
      this.step2 = false;
      this.step1 = true;
    }
  }

  guardaForm(form: any) {
    this.form = form;
    if(form.title !== '' && form.description !== '') this.formbool = true
    else this.formbool = false
  }

  async showAwards() {
    const modal = await this.mc.create({
      component: ShowAwardsComponent,
      cssClass: "a",
      componentProps: { awards: this.Challenge.awards },
    });
    await modal.present();
  }

  nextAward(awards) {
    if (awards) {
      this.step1 = false;
      this.step4 = true;
    } else {
      this.step1 = false;
      this.createAward = true;
    }
  }

  saveAward($event) {
    if ($event) this.awards.push($event.event);
    this.createAward = false;
    this.step1 = true;
  }

  async saveChallenge() {
    const loading = await this.loadingI();
    const userReference: IUserc = {
      appName: "SportYeah",
      referenceId: this.userService.User._id,
    };

    const challenged: IReference = {
      userId: userReference,
      media: this.media,
      reactions: [],
      comments: [],
      display: 0,
    };
    var newChallenge: IChallenge = null;
    if (this.challenged === null) {
      newChallenge = {
        challenging: challenged,
        challenged: challenged,
        solidary:this.solidary,
        intentos: this.intentos,
        views: [],
        public: this.public,
        awards: this.awards,
        title: this.form.title,
        description: this.form.description,
        challenges: [],
      };
    } else {
      newChallenge = {
        challenging: this.challenged._id,
        challenged: challenged,
        intentos: this.intentos,
        solidary:this.solidary,
        views: [],
        public: this.public,
        awards: this.awards,
        title: this.form.title,
        description: this.form.description,
        challenges: [],
      };
    }
    this.challengeService
      .create(newChallenge)
      .pipe(take(1))
      .subscribe(
        async (r: IChallenge) => {
          loading.dismiss();
          const toast = await this.toast.create({
            message: `Desafío creado.`,
            duration: 1000,
          });
          await toast.present();
          this.mc.dismiss(r);
        },
        (err) => {}
      );
  }
  async loadingI() {
    const loading = await this.loadingController.create({
      message: `Cargando...`,
    });
    await loading.present();
    return loading;
  }

  // SOLIDARY CHALLENGE
  public solidary: boolean = false;
  public cause: any = { src: null, cause: "" };
  solidarySrc() {
    this.img.takeOnlyPhoto();
    this.img.content
      .pipe(take(1))
      .subscribe((r: string) => (this.cause.src = r));
  }
}
