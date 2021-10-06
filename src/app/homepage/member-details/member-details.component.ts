import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Question, QuestionnaireResult, QuestionnaireresultService, QuestionnairesService, QuestionResult } from 'generated/api';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-member-details',
  templateUrl: './member-details.component.html',
  styleUrls: ['./member-details.component.scss']
})
export class MemberDetailsComponent implements OnInit {

  resultId: string;
  accordionExpanded: number = -1;
  questions: Question[];
  questionnaireResult: QuestionnaireResult;
  @Input() memberid: string = "AwsomeMember";
  constructor(
    private activatedRoute: ActivatedRoute,
    private questionnaireService: QuestionnairesService,
    private questionnaireResultService: QuestionnaireresultService
  ) { }

  expandAccordion(num: number) {
    if (num === this.accordionExpanded) {
      this.accordionExpanded = -1;
    } else {
      this.accordionExpanded = num;
    }
  }

  getQuestionsForCategoryId(id: number) {
    return this.questions.filter(q => q.category.id == id);
  }
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

    this.questionnaireService.questionnairesControllerFindSingle(environment.tuckmanQuestionairId).subscribe(questionnaire => {
      this.questions = questionnaire.questions;
    })
  }

  getLinkForResults() {
    return window.location;
  }

}
