import { Component, EventEmitter, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-question-finish',
  templateUrl: './question-finish.component.html',
  styleUrls: ['./question-finish.component.scss']
})
export class QuestionFinishComponent implements OnInit {

  isVerified: boolean = false;
  hcaptchaValue: string;
  @Output() finishWithCaptcha = new EventEmitter<string>();
  constructor() { }

  ngOnInit(): void {
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

  finishAndSend() {

  }

}
