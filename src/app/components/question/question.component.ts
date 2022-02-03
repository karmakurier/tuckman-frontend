import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Question } from 'generated/api';
import { ActionTaken } from './actionTaken.model';
import { QuestionActionType } from './questionActionType';

@Component({
  selector: 'app-question',
  templateUrl: './question.component.html',
  styleUrls: ['./question.component.scss']
})
export class QuestionComponent implements OnInit {

  @Input() Question: Question;
  @Input() QuestionNumber: number;
  @Input() QuestionMax: number;
  @Input() answer: number;
  @Output() actionTaken = new EventEmitter<ActionTaken>();
  constructor() { }


  ngOnInit(): void {

  }

  nextQuestion() {
    this.actionTaken.next(({ actionType: QuestionActionType.next } as ActionTaken));
  }

  back() {
    this.actionTaken.next(({ actionType: QuestionActionType.back } as ActionTaken));
  }

  finish() {
    this.actionTaken.next(({ actionType: QuestionActionType.finish } as ActionTaken));
  }

  selectedValue() {
    this.actionTaken.next(({ actionType: QuestionActionType.value, value: this.answer } as ActionTaken));
  }

}
