import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ParticipateRoom } from 'generated/api';
import { Room } from 'src/app/models/room.model';

@Component({
  selector: 'app-question-welcome',
  templateUrl: './question-welcome.component.html',
  styleUrls: ['./question-welcome.component.scss']
})
export class QuestionWelcomeComponent implements OnInit {
  @Input() room: ParticipateRoom;
  @Output() startQuestionnaire = new EventEmitter();
  constructor() { }

  ngOnInit(): void {
  }

  start() {
    this.startQuestionnaire.next();
  }

  isExpired() {
    return new Date(this.room.expiresAt) < new Date() && new Date(this.room.expiresAt) > new Date("2021-10-01");
  }

  hasNoExpireDate() {
    return new Date(this.room.expiresAt) < new Date("2021-10-01");
  }

}
