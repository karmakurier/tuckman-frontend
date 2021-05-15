import { Component, OnInit } from '@angular/core';
import { Questionnaire } from '../models/questionnaire.model';
import { Room } from '../models/room.model';
import { RoomService } from '../services/rooms.service';

@Component({
  selector: 'app-homepage',
  templateUrl: './homepage.component.html',
  styleUrls: ['./homepage.component.scss']
})
export class HomepageComponent implements OnInit {
  results: Questionnaire = new Questionnaire();
  email: string = "test123";
  rooms: Room[] = [];

  constructor(private roomService: RoomService) { }

  async ngOnInit() {
    this.rooms = await this.roomService.getAllRooms();
  }

  showResults() {
  }

}
