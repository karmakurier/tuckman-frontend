import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ParticipateRoom, Question, QuestionnaireResultCreate, QuestionnaireresultService, QuestionnairesService, QuestionResultCreate, QuestionsService, RoomsService } from 'generated/api';
import { ActionTaken } from 'src/app/components/question/actionTaken.model';
import { QuestionActionType } from 'src/app/components/question/questionActionType';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-member-questions',
  templateUrl: './member-questions.component.html',
  styleUrls: ['./member-questions.component.scss']
})
export class MemberQuestionsComponent implements OnInit {

  questions: Question[];
  questionnaireResult: QuestionnaireResultCreate = {} as QuestionnaireResultCreate;
  participateId: string;
  currentquestion: number = 0;
  started: boolean = false;
  finished: boolean = false;
  room: ParticipateRoom;

  constructor(
    private router: Router,
    private questionnaireService: QuestionnairesService,
    private activatedRoute: ActivatedRoute,
    private questionnaireResultService: QuestionnaireresultService,
    private roomService: RoomsService) {
  }

  async ngOnInit() {
    this.participateId = this.activatedRoute.snapshot.paramMap.get('id');
    this.questionnaireResult.participateId = this.participateId;
    this.roomService.roomsControllerFindForParticipant(this.participateId).subscribe(room => {
      this.room = room;
    })
    this.questionnaireResult.QuestionResults = [] as QuestionResultCreate[];
    this.questionnaireService.questionnairesControllerFindSingle(environment.tuckmanQuestionairId).subscribe(questionnaire => {
      this.questions = questionnaire.questions;
      for (let i = 0; i < this.questions.length; i++) {
        this.questionnaireResult.QuestionResults.push({ questionId: this.questions[i].id, answer: null })
      }
    });
  }

  questionnaireStarted() {
    this.started = true;
  }

  handleAction(event: ActionTaken) {
    if (event.actionType == QuestionActionType.next) {
      this.currentquestion++;
    }

    if (event.actionType == QuestionActionType.back) {
      if (this.currentquestion > 0) {
        this.currentquestion--;
      }
    }

    if (event.actionType == QuestionActionType.value) {
      this.questionnaireResult.QuestionResults[this.currentquestion].answer = event.value;
      setTimeout(() => {
        if (this.currentquestion < this.questions.length) {
          this.currentquestion++;
        }
      }, 500)
    }

    if (event.actionType == QuestionActionType.finish) {
      this.finished = true;
    }
  }

  handleFinish(hcaptchaValue: string) {
    this.questionnaireResult.hcaptchaValue = hcaptchaValue;
    this.sendQuestionnaire();
  }

  public sendQuestionnaire() {
    this.questionnaireResultService.questionnaireResultControllerCreateSingle(this.participateId, this.questionnaireResult).subscribe((createdResult) => {
      this.router.navigate(['results', createdResult.uuid])
    });
  }
}