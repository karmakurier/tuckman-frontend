import { Component, OnInit } from '@angular/core';
import { Questionnaire } from '../models/questionnaire.model';
import { Room } from '../models/room.model';

@Component({
  selector: 'app-homepage',
  templateUrl: './homepage.component.html',
  styleUrls: ['./homepage.component.scss']
})
export class HomepageComponent implements OnInit {
  results: Questionnaire = new Questionnaire();
  email: string = "test123";
  rooms: Room[] = [];

  constructor() { }

  async ngOnInit() {
  }

  showResults() {
  }

}
