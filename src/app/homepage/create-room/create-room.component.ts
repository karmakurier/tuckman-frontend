import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CreateRoom, Question, QuestionnaireresultService, QuestionnairesService, RoomsService} from 'generated/api';
import { Questionnaire } from 'src/app/models/questionnaire.model';
import { Room } from 'src/app/models/room.model';
import { environment } from 'src/environments/environment';
import Swal from 'sweetalert2';
import { SpiderchartComponent } from 'src/app/components/spiderchart/spiderchart.component';
import { SpiderchartData } from 'src/app/models/spiderchartdata.model';
import { JsonpClientBackend } from '@angular/common/http';
import { cloneWithOffset } from 'ngx-bootstrap/chronos/units/offset';
import { SpiderchartUserData } from 'src/app/models/spiderchartuserdata';


@Component({
  selector: 'app-create-room',
  templateUrl: './create-room.component.html',
  styleUrls: ['./create-room.component.scss']
})

export class CreateRoomComponent implements OnInit {
  accordionExpanded: number = -1;
  isNonProfit: boolean = true;
  timed: boolean = false;
  room: CreateRoom = {} as CreateRoom;
  questions: Question[];
  spiderchartdatset:SpiderchartData = {} as SpiderchartData;

  
  constructor(private roomService: RoomsService, private questionnaireService: QuestionnairesService, private router: Router,
    private quesstionairResultService: QuestionnaireresultService){}

  changeNonProfit(isIt: boolean) {
    this.isNonProfit = isIt;
    if(!this.isNonProfit) {
      Swal.fire( {
        title: 'Sorry!',
        text: 'Die Benutzung der kostenfreien Tuckman-Analyse ist nur für gemeinnützige Teams bestimmt. Bitte kontaktiere uns wenn du die Analyse für nicht gemeinnützige Teams nutzen möchtest!',
        footer: 'Wir sind für dich da: <a href="mailto:info@karmakurier.de"> info@karmakurier.org</a>',
        icon: 'error'
      }

      )
    }
  }

  createRoom() {
    console.log(this.room);
    this.roomService.roomsControllerCreateSingle(this.room).subscribe(createdR => {
      this.router.navigate(['/room', createdR.roomUUID]);
    });


  }

  expandAccordion(num: number) {
    if(num === this.accordionExpanded) {
      this.accordionExpanded = -1;
    } else {
      this.accordionExpanded = num;
    }
  }

  ngOnInit(): void {
    this.questionnaireService.questionnairesControllerFindSingle(environment.tuckmanQuestionairId).subscribe(questionnaire => {
      this.questions = questionnaire.questions;
      
    })
    this.quesstionairResultService.questionnaireResultControllerFindAll(environment.demoroom).subscribe(results => {
      this.spiderchartdatset = {datasets:[]};

      var tmp_SpiderUserdata = new SpiderchartUserData; 

      const Forming=[0, 4, 9, 14, 17, 20, 26, 28];
      const Storming=[1, 6, 8, 15, 19, 22, 27, 30];
      const Norming=[3, 5, 10, 12, 18, 23, 24, 29];
      const Performing=[2, 7, 11, 13, 16, 21, 25, 31];

      for(let i = 0; i < results.length; i++){  
        var userRes= results[i].QuestionResults
        
        var forming = 0;
        var norming = 0;
        var storming = 0;
        var performing = 0;

        var cntForming = 0;
        var cntNorming = 0;
        var cntStorming = 0;
        var cntPerforming = 0;
        
        for(let a = 0; a < userRes.length; a++){
          
          if (Forming.includes(userRes[a].id)){
            forming = forming + userRes[a].answer;
            cntForming=++cntForming
          }

          if (Norming.includes(userRes[a].id)){
            norming = norming + userRes[a].answer;
            cntNorming=++cntNorming
          }
          
          if (Storming.includes(userRes[a].id)){
            storming = storming + userRes[a].answer;
            cntStorming=++cntStorming
          }
          
          if (Performing.includes(userRes[a].id)){
            performing = performing + userRes[a].answer;
            cntPerforming=++cntPerforming
          }
        }

        forming=forming/cntForming
        storming=storming/cntStorming
        norming=norming/cntNorming
        performing=performing/cntPerforming

        tmp_SpiderUserdata.label = results[i].uuid
        tmp_SpiderUserdata.data = [forming,storming,norming,performing]
        this.spiderchartdatset.datasets.push(tmp_SpiderUserdata)
        console.log(this.spiderchartdatset)
      }
    }
    )
  }
}


