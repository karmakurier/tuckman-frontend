import { Component, Input, OnInit } from '@angular/core';
import { Question, QuestionsService } from 'generated/api';

@Component({
  selector: 'app-member-questions',
  templateUrl: './member-questions.component.html',
  styleUrls: ['./member-questions.component.scss']
})
export class MemberQuestionsComponent implements OnInit {

  @Input() teamid: string = "Awsometeam3"
  questions: Question[];

  constructor(private questionService: QuestionsService) {
  }

  async ngOnInit() {
    this.questionService.questionsControllerFindAll().subscribe(questions => {
      console.log(questions);
      this.questions = questions;
    });
  }
}