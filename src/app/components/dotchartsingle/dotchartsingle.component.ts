import { Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
import { Question, QuestionnaireResult, QuestionnairesService, QuestionResult, QuestionsService } from 'generated/api';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-dotchartsingle',
  templateUrl: './dotchartsingle.component.html',
  styleUrls: ['./dotchartsingle.component.scss']
})
export class DotchartsingleComponent implements OnInit {
  questionnaire: Question[] = []
  questions: {};
  headers: any[]


  @ViewChild('canvas', { static: true })
  canvas: ElementRef<HTMLCanvasElement>;

  @Input() dataset: QuestionResult[];
  @Input() datasetfull: QuestionnaireResult[] = [];
  @Input() dimension: string;
  @Input() id: number;

  private ctx: CanvasRenderingContext2D;

  constructor(private questionService: QuestionsService,
    private questionnaireService: QuestionnairesService) { }

  getUniqueCategories(obj) {
    var names = [];
    for (var i = 0; i < obj.length; i++) {
      names.push(obj[i].category.name)
      names = [...new Set(names)]
    }
    return names;
  }

  plotdotchartsingle(id = -1, category = "none") {
    function roundRect(ctx, x, y, width, height, radius, fill, stroke) {
      if (typeof stroke === 'undefined') {
        stroke = true;
      }
      if (typeof radius === 'undefined') {
        radius = 5;
      }
      if (typeof radius === 'number') {
        radius = { tl: radius, tr: radius, br: radius, bl: radius };
      } else {
        var defaultRadius = { tl: 0, tr: 0, br: 0, bl: 0 };
        for (var side in defaultRadius) {
          radius[side] = radius[side] || defaultRadius[side];
        }
      }
      ctx.beginPath();
      ctx.moveTo(x + radius.tl, y);
      ctx.lineTo(x + width - radius.tr, y);
      ctx.quadraticCurveTo(x + width, y, x + width, y + radius.tr);
      ctx.lineTo(x + width, y + height - radius.br);
      ctx.quadraticCurveTo(x + width, y + height, x + width - radius.br, y + height);
      ctx.lineTo(x + radius.bl, y + height);
      ctx.quadraticCurveTo(x, y + height, x, y + height - radius.bl);
      ctx.lineTo(x, y + radius.tl);
      ctx.quadraticCurveTo(x, y, x + radius.tl, y);
      ctx.closePath();

      if (fill) {
        ctx.fill();
      }
      if (stroke) {
        ctx.stroke();
      }
    };

    function drawCircle(ctx, x, y, radius, fill, stroke, strokeWidth) {
      ctx.beginPath()
      ctx.arc(x, y, radius, 0, 2 * Math.PI, false)
      if (fill) {
        ctx.fillStyle = fill
        ctx.fill()
      }
      if (stroke) {
        ctx.lineWidth = strokeWidth
        ctx.strokeStyle = stroke
        ctx.stroke()
      }
    };

    if (category != "none") {
      var dimid: Array<number> = []
      for (let a = 0; a < this.questionnaire.length; a++) {
        if (this.questionnaire[a].category.name == category) {
          dimid.push(this.questionnaire[a].id)
        }
      }
      var arraydata: Array<number> = []
      for (let i = 0; i < this.dataset.length; i++) {
        if (dimid.indexOf(this.dataset[i].question.id) >= 0) {
          arraydata.push(this.dataset[i].answer)
        }
      }
    }
    if (id != -1) {
      var arraydata: Array<number> = []
      if (this.datasetfull.length >= 1) {
        for (let i = 0; i < this.datasetfull.length; i++) {
          var foundAnswer = this.datasetfull[i].QuestionResults.find(q => q.id == this.id)
          arraydata.push(foundAnswer.answer)
        }
      }
      else {
        var arraydata: Array<number> = []
        for (let i = 0; i < this.dataset.length; i++) {
          if (this.dataset[i].question.id == id) {
            arraydata.push(this.dataset[i].answer)
          }
        }
      }
    }

    let params = {
      arraydata: arraydata,
      height: this.canvas.nativeElement.attributes.getNamedItem("height").value,
      width: this.canvas.nativeElement.attributes.getNamedItem("width").value,
      thiks: this.canvas.nativeElement.attributes.getNamedItem("thiks").value
    }

    let parentWidth = Number(params.width)
    let parentHeigth = Number(params.height)

    this.ctx = this.canvas.nativeElement.getContext('2d');
    this.ctx.canvas.width = parentWidth;
    this.ctx.canvas.height = parentHeigth;

    let frameheigth = Number(params.height)
    let framewidth = Number(params.width)
    let nthick = Number(params.thiks)
    let dataset = arraydata

    let toplot = dataset

    let linestart = Math.round(framewidth / 16);
    let lineend = framewidth - linestart;
    let linecenter = Math.round(frameheigth / 2)

    let thickbottom = Math.round(frameheigth / 2 - 0.175 * frameheigth);
    let thicktop = Math.round(frameheigth / 2 + 0.175 * frameheigth);

    let thickstart = Math.round(framewidth / 8)
    let thickstop = framewidth - thickstart
    let thickspace = Math.round((thickstop - thickstart) / (nthick - 1))

    this.ctx.canvas.width = framewidth;
    this.ctx.canvas.height = frameheigth * 1.4;

    this.ctx.fillStyle = '#FFF0EB';

    roundRect(this.ctx, 1, 1, framewidth, frameheigth, Math.floor(frameheigth / 2), true, false);

    if (toplot.length > 1) {
      const sum = toplot.reduce((a, b) => a + b, 0);
      const mean = (sum / toplot.length) || 0;

      let posmean = thickstart + Math.round((mean - 1) * thickspace);
      this.ctx.fillStyle = 'rgba(255, 197, 57, 1)'

      drawCircle(this.ctx, posmean, linecenter, Math.floor(frameheigth * 0.2), true, false, 0)
    }
    this.ctx.fillStyle = "#000000";

    this.ctx.lineCap = "round"
    this.ctx.lineWidth = Math.floor(0.04 * frameheigth)
      ;

    this.ctx.beginPath();
    this.ctx.moveTo(linestart, linecenter);
    this.ctx.lineTo(lineend, linecenter);
    this.ctx.stroke();


    this.ctx.font = "600 " + Math.floor(0.2 * frameheigth) + "px Quicksand";
    this.ctx.textAlign = "center";
    this.ctx.textBaseline = "middle";


    for (var i = 0; i < nthick; i++) {
      let pos = thickstart + i * thickspace;
      this.ctx.beginPath();
      this.ctx.moveTo(pos, thickbottom);
      this.ctx.lineTo(pos, thicktop);
      this.ctx.stroke();
      this.ctx.fillText((i + 1).toString(), pos, frameheigth * 1.3);
    }

    this.ctx.fillStyle = 'rgba(45, 60, 185, 0.25)';


    let toplottmp = toplot.reduce((acc, e) => acc.set(e, (acc.get(e) || 0) + 1), new Map());
    let unique = Array.from(toplottmp.keys());
    let occur = Array.from(toplottmp.values());

    for (var i = 0; i < unique.length; i++) {
      let score: number = unique[i];
      let pos = thickstart + (score - 1) * thickspace;
      let posy = new Array();

      if (occur[i] === 1) {
        posy.push(linecenter);
      } else {
        let lower = linecenter - Math.round(frameheigth * 0.15);
        let upper = linecenter + Math.round(frameheigth * 0.15);
        let dist = Math.round((upper - lower) / (occur[i] - 1));

        for (let step = 0; step < occur[i]; step++) {
          posy.push(lower + (dist * step))
        }
      }

      for (let y of posy) {
        drawCircle(this.ctx, pos, y, Math.floor(frameheigth * 0.2), true, false, 3)
      }
    }
  }

  ngOnInit(): void {
    this.questionnaireService.questionnairesControllerFindSingle(environment.tuckmanQuestionairId).subscribe(questionnaire => {
      this.questionnaire = questionnaire.questions;

      this.questionService.questionsControllerFindAll().subscribe(results => {
        this.questions = results
        this.headers = ["Forming", "Storming", "Norming", "Performing"]
        this.plotdotchartsingle(this.id, this.dimension)
      })
    });
  }
}
