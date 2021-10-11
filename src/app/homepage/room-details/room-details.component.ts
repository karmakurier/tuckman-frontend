import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { QuestionnaireResult, QuestionnaireresultService, Room, RoomsService } from 'generated/api';

@Component({
  selector: 'app-room-details',
  templateUrl: './room-details.component.html',
  styleUrls: ['./room-details.component.scss']
})
export class RoomDetailsComponent implements OnInit {

  @Input() teamid: string = "AwsomeTeam2";
  accordionExpanded: number = -1;
  room: Room = {} as Room;
  questionnaireResults: QuestionnaireResult[] = [];

  constructor(private activatedRoute: ActivatedRoute, private roomService: RoomsService, private questionnaireResultService: QuestionnaireresultService) { }

  expandAccordion(num: number) {
    if (num === this.accordionExpanded) {
      this.accordionExpanded = -1;
    } else {
      this.accordionExpanded = num;
    }
  }

  oncopy(x: string) {
    console.log("printed")
    console.log(x);
  }

  exportPDF(teamid: string) {
    console.log("pdf export triggered for " + teamid)
  }

  printPDF(teamid: string) {
    console.log("pdf print triggered for " + teamid)
  }

  share(teamid: string) {
    console.log("social media share triggered for " + teamid)
  }

  ngOnInit(): void {
    this.roomService.roomsControllerFindAll(this.activatedRoute.snapshot.paramMap.get('id')).subscribe(rooms => {
      this.room = rooms;
      this.questionnaireResultService.questionnaireResultControllerFindAll(this.room.roomUUID).subscribe(results => {
        this.questionnaireResults = results;
      })
    })
  }

  hasExpiry() {
    let datestring = new Date(this.room.expiresAt);
    if (datestring > new Date()) {
      return true;
    }
    return false;
  }


  getLinkForParticipants() {
    return window.location.origin + '/participate/' + this.room.participateUUID;
  }

  getLinkForResults() {
    return window.location;
  }

  generateMailToForParticipants() {
    return "mailto:?subject=Einladung%20zur%20Tuckman-Analyse%20%7C%20karmakurier&body=Du wurdest zu einer Tuckman Analyse eingeladen!%0A%0AFolge diesem Link um teilzunehmen: %0A%0A" + this.getLinkForParticipants()
  }

}
