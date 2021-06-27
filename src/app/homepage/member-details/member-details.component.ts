import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-member-details',
  templateUrl: './member-details.component.html',
  styleUrls: ['./member-details.component.scss']
})
export class MemberDetailsComponent implements OnInit {

  @Input() memberid: string="AwsomeMember";
  constructor() { }

  exportPDF(memberid:string){
    console.log("pdf export triggered for "+memberid)
  }
  
  printPDF(memberid:string){
    console.log("pdf print triggered for "+memberid)
  }

  share(memberid:string){
    console.log("social media share triggered for "+memberid)
  }

  ngOnInit(): void {
  }

}
