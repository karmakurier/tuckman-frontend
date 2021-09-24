import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Question, QuestionnaireResultCreate, QuestionnaireresultService, QuestionResultCreate, QuestionsService, RoomsService } from 'generated/api';

@Component({
  selector: 'app-member-questions',
  templateUrl: './member-questions.component.html',
  styleUrls: ['./member-questions.component.scss']
})
export class MemberQuestionsComponent implements OnInit {

  @Input() teamid: string = "Awsometeam3"
  questions: Question[];
  questionnaireResult: QuestionnaireResultCreate = {} as QuestionnaireResultCreate;
  participateId: string;

  constructor(private questionService: QuestionsService, private roomService: RoomsService, private activatedRoute: ActivatedRoute, private questionnaireResultService: QuestionnaireresultService) {
  }

  async ngOnInit() {

    this.participateId = this.activatedRoute.snapshot.paramMap.get('id');
    this.questionnaireResult.participateId = this.participateId;
    this.questionnaireResult.QuestionResults = [] as QuestionResultCreate[];
    this.questionService.questionsControllerFindAll().subscribe(questions => {
      this.questions = questions;
      for (let i = 0; i < this.questions.length; i++) {
        this.questionnaireResult.QuestionResults.push({ questionId: this.questions[i].id, answer: 1 })
      }

      console.log(this.questionnaireResult);
    });
  }

  public sendQuestionnaire() {
    console.log(this.questionnaireResult);
    this.questionnaireResultService.questionnaireResultControllerCreateSingle(this.participateId, this.questionnaireResult).subscribe(() => { });
  }
}