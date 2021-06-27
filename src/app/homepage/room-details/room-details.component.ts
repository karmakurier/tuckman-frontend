import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-room-details',
  templateUrl: './room-details.component.html',
  styleUrls: ['./room-details.component.scss']
})
export class RoomDetailsComponent implements OnInit {

  @Input() teamid: string="AwsomeTeam2";

  constructor() { }

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
