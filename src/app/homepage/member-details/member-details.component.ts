import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { QuestionnaireResult, QuestionnaireresultService, QuestionResult } from 'generated/api';

@Component({
  selector: 'app-member-details',
  templateUrl: './member-details.component.html',
  styleUrls: ['./member-details.component.scss']
})
export class MemberDetailsComponent implements OnInit {

  resultId: string;
  questionnaireResult: QuestionnaireResult;
  @Input() memberid: string = "AwsomeMember";
  constructor(private activatedRoute: ActivatedRoute, private questionnaireResultService: QuestionnaireresultService) { }

  exportPDF(memberid: string) {
    console.log("pdf export triggered for " + memberid)
  }

  printPDF(memberid: string) {
    console.log("pdf print triggered for " + memberid)
  }

  share(memberid: string) {
    console.log("social media share triggered for " + memberid)
  }

  ngOnInit(): void {
    this.resultId = this.activatedRoute.snapshot.paramMap.get('id');
    this.questionnaireResultService.questionnaireResultControllerFindAll(null, this.resultId).subscribe(result => {
      this.questionnaireResult = result[0];
    })
  }

}
