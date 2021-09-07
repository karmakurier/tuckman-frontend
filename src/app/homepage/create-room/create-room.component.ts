import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CreateRoom, Question, QuestionnairesService, RoomsService } from 'generated/api';
import { Questionnaire } from 'src/app/models/questionnaire.model';
import { Room } from 'src/app/models/room.model';
import { environment } from 'src/environments/environment';
import Swal from 'sweetalert2';

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

  constructor(private roomService: RoomsService, private questionnaireService: QuestionnairesService, private router: Router) {
  }

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
  }

}
