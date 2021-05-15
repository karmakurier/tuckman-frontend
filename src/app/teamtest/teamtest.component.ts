import { Component} from '@angular/core';
import { QuestionsService } from '../services/questions.service';

@Component({
  selector: 'app-homepage',
  templateUrl: './teamtest.component.html',
  styleUrls: ['./teamtest.component.scss']
})

export class TeamtestComponent{
  
  Fragen = this.questionsService.getQuestion();

  constructor(
    private questionsService: QuestionsService) {
   }
}
