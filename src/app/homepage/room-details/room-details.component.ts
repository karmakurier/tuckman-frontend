import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Question, QuestionnaireResult, QuestionnaireresultService, QuestionResult, QuestionsService, Room, RoomsService } from 'generated/api';
import { SpiderchartData } from 'src/app/models/spiderchartdata.model';
import { SpiderchartUserData } from 'src/app/models/spiderchartuserdata';

@Component({
  selector: 'app-room-details',
  templateUrl: './room-details.component.html',
  styleUrls: ['./room-details.component.scss']
})
export class RoomDetailsComponent implements OnInit {

  teamid: string = "AwsomeTeam2";
  accordionExpanded: number = -1;
  room: Room = {} as Room;
  questionnaireResults: QuestionnaireResult[];
  spiderchartdatset: SpiderchartData = {} as SpiderchartData
  questions: Question[] = [];

  userResSum: QuestionResult[];
  userResSingle: QuestionResult[];
  userRes: QuestionResult[];

  highestPhase: string="";

  constructor(
    private activatedRoute: ActivatedRoute,
    private roomService: RoomsService,
    private questionService: QuestionsService,
    private questionnaireResultService: QuestionnaireresultService) { }

  expandAccordion(num: number) {
    if (num === this.accordionExpanded) {
      this.accordionExpanded = -1;
    } else {
      this.accordionExpanded = num;
    }
  }

  oncopy(x: string) {
    console.log("printed")
    console.log(x);
  }

  exportPDF(teamid: string) {
    console.log("pdf export triggered for " + teamid)
  }

  printPDF(teamid: string) {
    console.log("pdf print triggered for " + teamid)
  }

  share(teamid: string) {
    console.log("social media share triggered for " + teamid)
  }

  getQuestionsForCategoryId(id: number) {
    return this.questions.filter(q => q.category.id == id);
  }


  getAllCategories(obj, val) {
    var indexes = [], i;
    for (i = 0; i < obj.length; i++) {
      if (obj[i].category.name === val) {
        indexes.push(i);
      }
    }
    return indexes;
  }

  ngOnInit(): void {
    this.questionService.questionsControllerFindAll().subscribe(singlequestions => {
      this.questions = singlequestions
      this.teamid = this.activatedRoute.snapshot.paramMap.get('id')
      this.roomService.roomsControllerFindAll(this.teamid).subscribe(rooms => {
        this.room = rooms;
        this.questionnaireResultService.questionnaireResultControllerFindAll(this.room.roomUUID).subscribe(results => {
          this.questionnaireResults = results;
          this.spiderchartdatset = { datasets: [] };

          var Forming = this.getAllCategories(this.questions, "Forming");
          var Storming = this.getAllCategories(this.questions, "Storming")
          var Norming = this.getAllCategories(this.questions, "Norming")
          var Performing = this.getAllCategories(this.questions, "Performing")

          for (let i = 0; i < results.length; i++) {
            var tmp_SpiderUserdata = new SpiderchartUserData;
            var userRes = results[i].QuestionResults

            var forming = 0;
            var norming = 0;
            var storming = 0;
            var performing = 0;

            var cntForming = 0;
            var cntNorming = 0;
            var cntStorming = 0;
            var cntPerforming = 0;

            for (let a = 0; a < userRes.length; a++) {

              if (Forming.includes(userRes[a].id)) {
                forming = forming + userRes[a].answer;
                cntForming = ++cntForming
              }

              if (Norming.includes(userRes[a].id)) {
                norming = norming + userRes[a].answer;
                cntNorming = ++cntNorming
              }

              if (Storming.includes(userRes[a].id)) {
                storming = storming + userRes[a].answer;
                cntStorming = ++cntStorming
              }

              if (Performing.includes(userRes[a].id)) {
                performing = performing + userRes[a].answer;
                cntPerforming = ++cntPerforming
              }
            }

            forming = forming / cntForming
            storming = storming / cntStorming
            norming = norming / cntNorming
            performing = performing / cntPerforming

            tmp_SpiderUserdata.label = results[i].uuid
            tmp_SpiderUserdata.data = [forming, storming, norming, performing]
            this.spiderchartdatset.datasets.push(tmp_SpiderUserdata)
          }
        })
      })
    })
  }

  hasExpiry() {
    let datestring = new Date(this.room.expiresAt);
    if (datestring > new Date()) {
      return true;
    }
    return false;
  }


  getLinkForParticipants() {
    return window.location.origin + '/participate/' + this.room.participateUUID;
  }

  getLinkForResults() {
    return window.location;
  }

  generateMailToForParticipants() {
    return "mailto:?subject=Einladung%20zur%20Tuckman-Analyse%20%7C%20karmakurier&body=Du wurdest zu einer Tuckman Analyse eingeladen!%0A%0AFolge diesem Link um teilzunehmen: %0A%0A" + this.getLinkForParticipants()
  }

  getphase($event){
    this.highestPhase=$event
  }

}
