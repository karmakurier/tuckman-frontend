import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-room-details',
  templateUrl: './room-details.component.html',
  styleUrls: ['./room-details.component.scss']
})
export class RoomDetailsComponent implements OnInit {

  @Input() teamid: string="AwsomeTeam2";
  accordionExpanded: number = -1;

  constructor() { }

  expandAccordion(num: number) {
    if(num === this.accordionExpanded) {
      this.accordionExpanded = -1;
    } else {
      this.accordionExpanded = num;
    }
  }

  oncopy(x:string){
    console.log("printed")
    console.log(x);
  }

  exportPDF(teamid:string){
    console.log("pdf export triggered for "+teamid)
  }

  printPDF(teamid:string){
    console.log("pdf print triggered for "+teamid)
  }

  share(teamid:string){
    console.log("social media share triggered for "+teamid)
  }

  ngOnInit(): void {
  }


}
