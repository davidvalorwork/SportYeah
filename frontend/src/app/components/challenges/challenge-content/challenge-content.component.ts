import { Router } from "@angular/router";
import { UserService } from "src/app/service/user.service";
import { take } from "rxjs/operators";
import { Subject } from "rxjs";
import {
  ChallengeService,
  IChallenge,
} from "./../../../service/challenge.service";
import { Component, OnInit, Input } from "@angular/core";

@Component({
  selector: "app-challenge-content",
  templateUrl: "./challenge-content.component.html",
  styleUrls: ["./challenge-content.component.scss"],
})
export class ChallengeContentComponent implements OnInit {
  @Input() Challenge: IChallenge;
  @Input() destroy: Subject<void>;
  @Input() pauseS: Subject<void>;
  @Input() scrollEvent: Subject<void>;
  @Input() individual?:boolean;
  @Input() chain:boolean;
  scrollEvent$: any;
  public viewVerified: boolean = false;
  public pauseVideo: boolean = false;
  public n: number = Math.random();
  public video = null;
  public src = null;
  public video2 = null;
  public src2 = null;
  public oneVideo: boolean = null;
  public Mostrar: boolean = false;
  public intervalID: any = null;
  public paused: boolean = false;
  destroyBool: boolean = false;
  random: number = Math.random() * (100 - 1) + 1;

  constructor(
    public userService: UserService,
    public router: Router,
    public cService: ChallengeService
  ) {}

  ngOnInit() {
    // SE SUBSCRIBE PARA DESTRUIR EL VIDEO EN CASO DE SER NECESARIO.
    this.subscribeDestroy();
    // VERIFICA SI LOS VIDEOS ESTAN INICIALIZADOS
    setTimeout(()=>{
      if (
        document.getElementById(
          this.Challenge.challenged.media + this.Challenge._id + this.random
        ) !== null 
      ) {
        // INICIALIZA EL VIDEOS
        this.initOneVideo();
        // PAUSA UN VIDEO
        if(this.pauseS)
        this.pauseS.subscribe(async () => {
          await this.video.pause();
          this.pauseVideo = true;
        });
        // VERIFICA SI HUBO UN SCROLL PARA VER QUE VIDEO QUEDO ACTIVO.
        if(this.scrollEvent)
        this.scrollEvent$ = this.scrollEvent.subscribe(() => {
          this.isScrolledIntoView();
        });
        // SI NO ENCONTRO EL VIDEO INICIALIZADO VUELVE A INTENTAR
      }
      else if (this.destroyBool === false) {

      } 
      else setTimeout(() => this.ngOnInit(), 1500);
    },2000)
  }

  initOneVideo() {
    this.Mostrar = true
    this.video = <HTMLVideoElement>(
      document.getElementById(
        this.Challenge.challenged.media + this.Challenge._id + this.random
      )
    );
    this.src = <HTMLSourceElement>(
      document.getElementById(
        this.Challenge.challenged.media + this.Challenge._id + this.random
      )
    );
    this.video.pause();
    this.paused = true;
    this.oneVideo = true;
    if(this.scrollEvent === undefined){
      this.video.play().then(()=>{
        this.video.muted = true
      })
    }
    this.isScrolledIntoView();
  }
  subscribeDestroy() {
    if(this.destroy)
      this.destroy.pipe(take(1)).subscribe(() => {
        if(this.scrollEvent$ !== undefined) {
          this.scrollEvent$.unsubscribe();
        }
        this.destroyOneVideo();
        this.Mostrar = false;
        this.destroyBool = true;
      });
  }

  destroyOneVideo() {
    if(this.src && this.video){
      this.src.removeAttribute("src");
      this.video.load();
      this.video.pause();
      this.video.remove();
    }else{setTimeout(()=>this.destroyOneVideo(),500)}
  }

  destroyTwoVideos() {
    this.src.removeAttribute("src");
    this.video.load();
    this.video.pause();
    this.video.remove();
  }

  // FUNCION QUE VERIFICA SI ESTA EL VIDEO EN PANTALLA PARA ACTIVARLO.
  async isScrolledIntoView() {
    const rect = this.video.getBoundingClientRect();
    const topShown = rect.top >= 0;
    const bottomShown = rect.bottom <= window.innerHeight;
    if (this.video) {
      if (topShown && bottomShown) {
        if (!this.pauseVideo) {
            if (
              document.getElementById(
                this.Challenge.challenged.media + this.Challenge._id + this.random
              ) !== null 
            ) {
              this.video.play().then(()=>{
                this.paused = false;
                this.viewVerified ? null : this.verifyViews();
              });
            }
           
        }
      } else {
        // console.log("pause")
        if (!this.paused && this.video !== null) {
          await this.video.pause();
          this.paused = true;
        }
      }
    }
  }

  verifyViews() {
    this.Challenge.views.indexOf(this.userService.User._id) !== -1
      ? (this.viewVerified = true)
      : this.createView();
  }

  createView() {
    this.viewVerified = true;
    this.Challenge.views.push(this.userService.User._id);
    this.cService
      .updateViews(this.Challenge._id, this.Challenge.views)
      .subscribe(
        (r) => {},
        (e) => {}
      );
  }
  async pause() {
    if (
      document.getElementById(
        this.Challenge.challenged.media + this.Challenge._id + this.random
      ) !== null 
    ) {

      if (!this.pauseVideo && this.video) {
        await this.video.pause()
        // console.log("paused")
        this.pauseVideo = true;
        this.paused = true;
      } else {
        if(this.video){
          this.video.play().then(()=>{
            // console.log("played")
            this.pauseVideo = false;
            this.paused = false
          });
        }
      }

    }
  }
  goChallenge() {
    this.router.navigate([`/challenge/${this.Challenge._id}`]);
  }
}
