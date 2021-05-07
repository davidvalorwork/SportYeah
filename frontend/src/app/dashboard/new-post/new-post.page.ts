import { Component, ElementRef, Input, OnInit, ViewChild } from "@angular/core";
import { FormBuilder, Validators } from "@angular/forms";
import { LoadingController, ModalController, Platform } from "@ionic/angular";
import { TranslateService } from "@ngx-translate/core";
import { MentionsDirective } from "src/app/directives/mentions.directive";
import { IPost, INew } from "src/app/models/iPost";
import { JdvimageService } from "src/app/service/jdvimage.service";
import { PostService } from "src/app/service/post.service";
import { UserService } from "src/app/service/user.service";
import { NewQuestionComponent } from "src/app/components/new-question/new-question.component"
import { convertTypeAcquisitionFromJson } from "typescript";
import { QuestionService } from '../../service/question.service';
import { EditQuestionComponent } from 'src/app/components/edit-question/edit-question.component'
import { log } from "console";
@Component({
  selector: "app-new-post",
  templateUrl: "./new-post.page.html",
  styleUrls: ["./new-post.page.scss"],
})
export class NewPostPage implements OnInit {
  @Input() post: IPost;
  @Input() news: INew;
  @Input() img: string;
  @ViewChild(MentionsDirective) mentions;
  @ViewChild("FormElementRef") inputNode: ElementRef;
  @ViewChild("emojisContainer") emojisContainer: ElementRef;
  @ViewChild("emojiButton") emojiButton: ElementRef;
  @ViewChild("editQuestionHash") editQuestionComponent:EditQuestionComponent;
  constructor(
    public modalController: ModalController,
    public translate: TranslateService,
    public userService: UserService,
    private elementRef: ElementRef,
    private fb: FormBuilder,
    public JDVImage: JdvimageService,
    public loadingCtrl: LoadingController,
    private postService: PostService,
    private platform: Platform,    
    public questionService:QuestionService,

  ) {
    this.platform.backButton.subscribeWithPriority(10, () => {
      this.modalController.dismiss();
    });
  }

  setUser(user) {
    this.mentions.setUser(user);
  }

  usersChange($event) {
    this.users = $event;
  }

  users = [];

  ngOnInit() {
    window.onclick = () => {
      this.emoji = false;
    };
    if (this.img) {
      this.form.controls.image.setValue(this.img);
    }
  }

  urlVideo = null;
  videoFile = null;

  form = this.fb.group({
    user: [this.userService.User?._id],
    message: ["", [Validators.required]],
    image: [""],
    video: [null],
    post: [null],
    question:[null]
  });
  formNews = this.fb.group({
    user: [this.userService.User?._id],
    message: ["", [Validators.required]],
    image: [""],
    video: [null],
    news: [null],
  });

  closeVideo() {
    this.urlVideo = null;
    this.videoFile = null;
  }

  async uploadVideo($event) {
    this.urlVideo = URL.createObjectURL($event.target.files[0]);
    this.videoFile = $event.target.files[0];
  }

  async uploadImg($event) {
    let loading = await this.loadingCtrl.create({
      message: this.translate.instant("loading"),
    });
    loading.present();

    let formData: FormData = new FormData();
    formData.append("image", $event.target.files[0]);
    this.JDVImage.uploadImage(formData)
      .toPromise()
      .then((url) => {
        loading.dismiss();
        if (!this.news) {
          this.form.controls.image.setValue(url);
        } else if (this.news) {
          this.formNews.controls.image.setValue(url);
        }
      })
      .catch((err) => {
        loading.dismiss();
      });
  }

  removeImg() {
    if (!this.news) {
      this.form.controls.image.setValue("");
    } else if (this.news) {
      this.formNews.controls.image.setValue("");
    }
  }

  newValue($event) {
    if (!this.news) {
      this.form.controls.message.setValue($event);
    } else if (this.news) {
      this.formNews.controls.message.setValue($event);
    }
  }

  async save() {
    
    if (!this.news) {
      if (this.videoFile == null) {
        let loading = await this.loadingCtrl.create({
          message: this.translate.instant("loading"),
        });
        loading.present();
        let post = this.form.value;
        if (this.post) {
          post.post = this.post._id;
        }

        if(this.question.questionGroup.length > 0){
          this.createPostAndQuestion(post,loading)
        }else{
          this.postService
              .create(post)
              .toPromise()
              .then((post) => {
                loading.dismiss();
                this.modalController.dismiss({
                  dismissed: true,
                  create: true,
                  post,
                });
              })
              .catch((err) => {
                loading.dismiss();
              });
        }
        
      } else {
        let form = new FormData();
        form.append("video", this.videoFile);
        let post = this.form.value;
        if (this.post) {
          post.post = this.post._id;
        }
        this.modalController.dismiss({
          dismissed: true,
          create: false,
          video: form,
          post: post,
        });
      }
    } else if (this.news) {
      if (this.videoFile == null) {
        let loading = await this.loadingCtrl.create({
          message: this.translate.instant("loading"),
        });
        loading.present();
        let news = this.formNews.value; ///AQUI UN IF///AQUI UN IF
        if (this.news) {
          news.news = this.news._id;
        }
        this.postService
          .create(news)
          .toPromise()
          .then((post) => {
            loading.dismiss();
            this.modalController.dismiss({
              dismissed: true,
              create: true,
              post,
            });
          })
          .catch((err) => {
            loading.dismiss();
          });
      } else {
        let form = new FormData();
        form.append("video", this.videoFile);
        let news = this.formNews.value; ///AQUI UN IF///AQUI UN IF
        if (this.news) {
          news.news = this.news._id;
        }
        this.modalController.dismiss({
          dismissed: true,
          create: false,
          video: form,
          news: news,
        });
      }
    }
  }
  //Esto crea un post con cuestionario  
  badDate:boolean=false;
  createdPost(post,loading){
    this.questionService.create(this.question).subscribe((response:any)=>{//Crea el cuestionario y agrega el id al post
      post.question = response._id  
      this.postService
      .create(post)
      .toPromise()
      .then((post) => {
        loading.dismiss();
        this.modalController.dismiss({
          dismissed: true,
          create: true,
          post,
        });
      })
      .catch((err) => {
        loading.dismiss();
      });
    })
  }
  createPostAndQuestion(post: any,loading) {
    if(this.editQuestionComponent.whitTime  &&
       new Date(this.editQuestionComponent.endDate) >= new Date()){
     this.question.finishVotes = new Date(this.editQuestionComponent.endDate)
     this.badDate = false;
      this.createdPost(post,loading)
    }else{
      this.badDate = true;
      loading.dismiss();
    }
    if(!this.editQuestionComponent.whitTime){
      this.badDate = false;
      this.createdPost(post,loading)
    }

  }

  dismiss() {
    this.modalController.dismiss({
      dismissed: true,
    });
  }

  lastCaretPosition = 0;

  addEmoji(ev) {
    this.mentions.usersMetions.forEach((element) => {
      if (!this.news) {
        this.form.controls.message.setValue(
          this.form.controls.message.value.replaceAll(
            element.url,
            element.fullname
          )
        );
      } else if (this.news) {
        this.formNews.controls.message.setValue(
          this.formNews.controls.message.value.replaceAll(
            element.url,
            element.fullname
          )
        );
      }
    });

    this.lastCaretPosition != 0 && this.lastCaretPosition == this.mentions.pos
      ? (this.mentions.pos = this.mentions.pos + 2)
      : null;

    this.lastCaretPosition = this.mentions.pos;
    if (!this.news) {
      const newText =
        this.form.controls.message.value
          .replace(/&nbsp;/g, " ")
          .substring(0, this.mentions.pos) +
        ev.emoji.native +
        this.form.controls.message.value
          .replace(/&nbsp;/g, "")
          .substring(this.mentions.pos);
      this.form.controls.message.setValue(newText);

      this.mentions.usersMetions.forEach((element) => {
        this.form.controls.message.setValue(
          this.form.controls.message.value.replaceAll(
            element.fullname,
            element.url
          )
        );
      });
    } else if (this.news) {
      const newText =
        this.formNews.controls.message.value
          .replace(/&nbsp;/g, " ")
          .substring(0, this.mentions.pos) +
        ev.emoji.native +
        this.formNews.controls.message.value
          .replace(/&nbsp;/g, "")
          .substring(this.mentions.pos);
      this.formNews.controls.message.setValue(newText);

      this.mentions.usersMetions.forEach((element) => {
        this.formNews.controls.message.setValue(
          this.formNews.controls.message.value.replaceAll(
            element.fullname,
            element.url
          )
        );
      });
    }
  }

  emoji = false;

  openEmojis() {
    this.emoji = !this.emoji;

    this.inputNode.nativeElement.onclick = function (e) {
      e.stopPropagation();
    };
    this.emojiButton.nativeElement.onclick = function (e) {
      e.stopPropagation();
    };
    this.emojisContainer.nativeElement.onclick = function (e) {
      e.stopPropagation();
    };
  }

  question = {
    user: this.userService.User._id,
    questionGroup: [],
    finishVotes:undefined
  }

 //Crea una modal donde se pueden crear preguntas 
  async createQuestion(){
    const modal = await this.modalController.create({
      component: NewQuestionComponent,
      cssClass: 'my-custom-class',
      backdropDismiss:false
      ,
      componentProps: {
      
        edit:false
      }
    });
    modal.onDidDismiss().then((data)=>{
      if(data.data.question != undefined){
        this.question.questionGroup.push(data.data.question) //Las preguntas creadas se introducen en el grupo de preguntas
      }
    })
    .catch((err) => {
    });
  
    return await modal.present();
  }
 async editQuestion(i){
    const modalEdit = await this.modalController.create({
      component: NewQuestionComponent,
      cssClass: 'my-custom-class',
      backdropDismiss:false,
      componentProps: {
        question:this.question.questionGroup[i],
        edit:true
      }
    });
    modalEdit.onDidDismiss().then((data)=>{
      if(data.data.question != undefined){
        this.question.questionGroup.splice(i,1,data.data.question);
      }
      
    })
    .catch((err) => {
    });
    return await modalEdit.present();
  }
  deleteQuestion(i){
    this.question.questionGroup.splice(i,1);
  }
}
