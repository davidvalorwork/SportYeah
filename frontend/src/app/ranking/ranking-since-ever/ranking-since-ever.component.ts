import { Component, OnInit, Input, OnChanges} from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from 'src/app/service/user.service';
import { NewsService } from 'src/app/service/news.service';
import { ViewsProfileService } from "src/app/service/views-profile.service";
import * as moment from 'moment';
import { IRanking, IRankingRank, RankingService } from 'src/app/service/ranking.service';
import { take } from 'rxjs/operators';
import { IPost } from 'src/app/models/iPost';



@Component({
  selector: 'ranking-since-ever',
  templateUrl: './ranking-since-ever.component.html',
  styleUrls: ['./ranking-since-ever.component.scss'],
})
export class RankingSinceEverComponent implements OnInit,OnChanges {

  constructor(
    public userService:UserService,
    private router:Router,
    public newsService:NewsService,
    private viewsProfileService: ViewsProfileService,
    private rankingService:RankingService
  ) { }
  @Input() AllPost:any
  @Input() country:boolean 
  @Input() segment:any 
  ngOnInit() {
    
  }

 
  ngOnChanges(){

    this.getData()
  }


  ranking:IRankingRank[] = [];
  myPosition = 0;
  total = 0;

  load = false
  getData(){
    let country = 'null'
    if(this.country){
      country = this.userService.User?.geo.country
    }
    
    switch (this.segment.toString()) {
      case '0':
        this.getLikesData(country)
        break;
      case '1':
        this.getCommentData(country)
        break;
      case '2':
        this.getSharedsData(country)
        break;
    
      case '3':
        this.getViewsData(country)
        break;

      case '4':
        this.getFollowerData(country)
        break;

      case '5':
        this.getSearchData(country)
        break;

      default:
        break;
    }

  }

  getLikesData(country){

    this.rankingService.getRankingReactionsAllTime(this.userService.User._id,country).pipe(take(1))
    .subscribe((resp)=>{
      
      this.ranking = resp.ranking
      this.myPosition = resp.myPosition
      this.total = resp.total
      this.load = true
      
    })
  }

  getCommentData(country){
    
    this.rankingService.getRankingCommentsAllTime(this.userService.User._id,country).pipe(take(1))
    .subscribe((resp)=>{
      console.log(resp);

      this.ranking = resp.ranking
      this.myPosition = resp.myPosition
      this.total = resp.total
      this.load = true
      
    },(e)=>{
      
    })
  }

  getSharedsData(country){
    
    this.rankingService.getRankingSharedsAllTime(this.userService.User._id,country).pipe(take(1))
    .subscribe((resp)=>{
      this.ranking = resp.ranking
      this.myPosition = resp.myPosition
      this.total = resp.total
      this.load = true
      
    },(e)=>{
      
    })
  }

  getViewsData(country){
    
    this.rankingService.getRankingViewsAllTime(this.userService.User._id,country).pipe(take(1))
    .subscribe((resp)=>{
      this.ranking = resp.ranking
      this.myPosition = resp.myPosition
      this.total = resp.total
      this.load = true
      
    },(e)=>{
      console.error(e);
      
    })
  }

  getFollowerData(country){
    this.rankingService.getRankingFollowersAllTime(this.userService.User._id,country).pipe(take(1))
    .subscribe((resp)=>{
      this.ranking = resp.ranking
      this.myPosition = resp.myPosition
      this.total = resp.total
      this.load = true
    },(e)=>{
      console.error(e);
      
    })
  }

  getSearchData(country){
        
    this.rankingService.getViewsProfileSearchAllTime(this.userService.User._id,country).subscribe((resp)=>{
      console.log(resp);
      
      this.ranking = resp.ranking
      this.myPosition = resp.myPosition
      this.total = resp.total
      this.load = true
    },(e)=>{
      console.error(e);
      
    })
  }

  goToProfile(id,username){
    if(id == this.userService.User._id){
      this.router.navigate(["/profile"])
    }else{
      //this.router.navigate([`/user/${username}`])
      this.userService.getUserByUsername(username)
      .subscribe(
        (resp:any)=>{
          this.viewsProfileService
          .createProfileView(
            { user:resp.user._id,
             visitor:this.userService.User._id,
             from:"ranking",
             link: null
           }
           )
            .subscribe((response) => {
              this.router.navigate([`/user/${username}`])
            });
        }
      )
    }
  }
}
