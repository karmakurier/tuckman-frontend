import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Question, QuestionnaireResultCreate, QuestionnaireresultService, QuestionnairesService, QuestionResultCreate, QuestionsService, RoomsService } from 'generated/api';
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
  currentquestion: 0;

  constructor(
    private router: Router,
    private questionnaireService: QuestionnairesService,
    private activatedRoute: ActivatedRoute,
    private questionnaireResultService: QuestionnaireresultService) {
  }

  async ngOnInit() {

    this.participateId = this.activatedRoute.snapshot.paramMap.get('id');
    this.questionnaireResult.participateId = this.participateId;
    this.questionnaireResult.QuestionResults = [] as QuestionResultCreate[];
    this.questionnaireService.questionnairesControllerFindSingle(environment.tuckmanQuestionairId).subscribe(questionnaire => {
      this.questions = questionnaire.questions;
      for (let i = 0; i < this.questions.length; i++) {
        this.questionnaireResult.QuestionResults.push({ questionId: this.questions[i].id, answer: null })
      }
    });
  }

  public sendQuestionnaire() {
    this.questionnaireResultService.questionnaireResultControllerCreateSingle(this.participateId, this.questionnaireResult).subscribe((createdResult) => {
      this.router.navigate(['results', createdResult.uuid])
    });
  }
}