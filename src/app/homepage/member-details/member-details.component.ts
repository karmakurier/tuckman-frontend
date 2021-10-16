import { Component, OnInit, Input, AfterViewInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Question, QuestionnaireResult, QuestionnaireresultService, QuestionnairesService, QuestionResult } from 'generated/api';
import { SpiderchartData } from 'src/app/models/spiderchartdata.model';
import { SpiderchartUserData } from 'src/app/models/spiderchartuserdata';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-member-details',
  templateUrl: './member-details.component.html',
  styleUrls: ['./member-details.component.scss']
})
export class MemberDetailsComponent implements OnInit {

  resultId: string;
  accordionExpanded: number = -1;
  questions: Question[] = [];
  questionnaireResult: QuestionnaireResult[];
  spiderchartdatset: SpiderchartData = {} as SpiderchartData;
  userRes: QuestionResult[];

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

  getLinkForResults() {
    return window.location;
  }

  ngOnInit(): void { 
    this.resultId = this.activatedRoute.snapshot.paramMap.get('id');
    this.questionnaireService.questionnairesControllerFindSingle(environment.tuckmanQuestionairId).subscribe(questionnaire => {
      this.questions = questionnaire.questions;
    });
    
    this.questionnaireResultService.questionnaireResultControllerFindAll(null, this.resultId).subscribe(results => {
      this.spiderchartdatset = { datasets: [] };

      function getAllCategories(obj, val) {
        var indexes = [], i;
        for (i = 0; i < obj.length; i++) {
          if (obj[i].category.name === val) {
            indexes.push(i);
          }
        }
        return indexes;
      }

      var Forming = getAllCategories(this.questions, "Forming");
      var Storming = getAllCategories(this.questions, "Storming")
      var Norming = getAllCategories(this.questions, "Norming")
      var Performing = getAllCategories(this.questions, "Performing")

      var tmp_SpiderUserdata = new SpiderchartUserData;

      this.userRes = results[0].QuestionResults

      var forming = 0;
      var norming = 0;
      var storming = 0;
      var performing = 0;

      var cntForming = 0;
      var cntNorming = 0;
      var cntStorming = 0;
      var cntPerforming = 0;
      for (let a = 0; a < this.userRes.length; a++) {
        if (Forming.includes(this.userRes[a].question.id)) {
          forming = forming + this.userRes[a].answer;
          cntForming = ++cntForming
        }

        if (Norming.includes(this.userRes[a].question.id)) {
          norming = norming + this.userRes[a].answer;
          cntNorming = ++cntNorming
        }

        if (Storming.includes(this.userRes[a].question.id)) {
          storming = storming + this.userRes[a].answer;
          cntStorming = ++cntStorming
        }

        if (Performing.includes(this.userRes[a].question.id)) {
          performing = performing + this.userRes[a].answer;
          cntPerforming = ++cntPerforming
        }
      }

      forming = forming / cntForming
      storming = storming / cntStorming
      norming = norming / cntNorming
      performing = performing / cntPerforming

      tmp_SpiderUserdata.label = this.resultId
      tmp_SpiderUserdata.data = [forming, storming, norming, performing]
      this.spiderchartdatset.datasets.push(tmp_SpiderUserdata)
      this.questionnaireResult = results
    }
    )
    
  }
}


