import { Component, Input} from '@angular/core';
import { QuestionsService } from '../../services/questions.service';

@Component({
  selector: 'app-member-questions',
  templateUrl: './member-questions.component.html',
  styleUrls: ['./member-questions.component.scss']
})
export class MemberQuestionsComponent{

  @Input() teamid: string="Awsometeam3"


  Fragen = this.questionsService.getQuestion();

  constructor(
    private questionsService: QuestionsService) {
   }
}