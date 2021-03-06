import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CreateRoom, QuestionnaireresultService, QuestionsService, RoomsService } from 'generated/api';
import { environment } from 'src/environments/environment';
import Swal from 'sweetalert2';
import { SpiderchartData } from 'src/app/models/spiderchartdata.model';
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
  questions: {};
  isVerified: boolean = false;
  today: Date = new Date();
  hcaptchaValue: string;
  spiderchartdatset: SpiderchartData = {} as SpiderchartData;

  constructor(private roomService: RoomsService,
    private questionService: QuestionsService,
    private router: Router,
    private quesstionairResultService: QuestionnaireresultService) {
  }

  changeNonProfit(isIt: boolean) {
    this.isNonProfit = isIt;
    if (!this.isNonProfit) {
      Swal.fire({
        title: 'Sorry!',
        text: 'Die Benutzung der kostenfreien Tuckman-Analyse ist nur für gemeinnützige Teams bestimmt. Bitte kontaktiere uns, wenn Du die Analyse für nicht gemeinnützige Teams nutzen möchtest!',
        footer: 'Wir sind für dich da:&nbsp;<a href="mailto:info@karmakurier.de">info@karmakurier.org</a>',
        icon: 'error'
      }
      )
    }
  }

  createRoom() {
    this.room.hcaptchaValue = this.hcaptchaValue;
    this.roomService.roomsControllerCreateSingle(this.room).subscribe(createdR => {
      this.router.navigate(['/room', createdR.roomUUID]);
    });
  }

  expandAccordion(num: number) {
    if (num === this.accordionExpanded) {
      this.accordionExpanded = -1;
    } else {
      this.accordionExpanded = num;
    }
  }

  onVerify(event) {
    this.isVerified = true;
    this.hcaptchaValue = event;
  }

  onExpired(event) {
    this.isVerified = false;
  }

  onError(event) {
    this.isVerified = false;
  }

  ngOnInit(): void {

    this.questionService.questionsControllerFindAll().subscribe(singlequestions => {
      this.questions = singlequestions;

      this.quesstionairResultService.questionnaireResultControllerFindAll(environment.demoroom).subscribe(results => {
        this.spiderchartdatset = { datasets: [] };

        function getAllCategroies(obj, val) {
          var indexes = [], i;
          for (i = 0; i < obj.length; i++) {
            if (obj[i].category.name === val) {
              indexes.push(i);
            }
          }
          return indexes;
        }

        var Forming = getAllCategroies(this.questions, "Forming");
        var Storming = getAllCategroies(this.questions, "Storming")
        var Norming = getAllCategroies(this.questions, "Norming")
        var Performing = getAllCategroies(this.questions, "Performing")

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
  }
}


