import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Question } from 'generated/api';

@Component({
  selector: 'app-question',
  templateUrl: './question.component.html',
  styleUrls: ['./question.component.scss']
})
export class QuestionComponent implements OnInit {

  @Input() Question: Question;
  @Input() QuestionNumber: number;
  @Input() QuestionsMax: number;
  answer: number;
  @Output() actionTaken = new EventEmitter();
  constructor() { }


  ngOnInit(): void {

  }

}
