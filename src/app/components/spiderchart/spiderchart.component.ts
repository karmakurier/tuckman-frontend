import { Component, ViewChild, ElementRef, OnInit, Input, AfterViewChecked, AfterViewInit} from '@angular/core';
import { Router } from '@angular/router';
import {QuestionnaireresultService, QuestionsService, RoomsService } from 'generated/api';
import { SpiderchartData } from 'src/app/models/spiderchartdata.model';


@Component({
  selector: 'app-spiderchart',
  templateUrl: './spiderchart.component.html',
  styleUrls: ['./spiderchart.component.scss']
})
export class SpiderchartComponent implements OnInit, AfterViewInit{
  questions: {};
  headers: any[];

  @ViewChild('canvas', { static: true })
  canvas: ElementRef<HTMLCanvasElement>;  

  @ViewChild('container', { static: true })
  parent: ElementRef<HTMLElement>; 
  
  @Input() dataset:SpiderchartData;

  constructor (private questionService: QuestionsService){}

  private ctx: CanvasRenderingContext2D;

  
  ngOnInit(): void {}

  ngAfterViewInit(): void{

    // to do: get the questions in here dow yield empty object 
    this.questionService.questionsControllerFindAll().subscribe(results => {this.questions=results})

    console.log(this.questions)

    function getUniqueCategories(obj){
      var names = [];
        for(var i = 0; i < obj.length; i++){
          names.push(obj[i].category.name)
          names=[...new Set(names)]}
        return names;
    }

    this.headers = ["Froming", "Storming", "Norming", "Performing"]

    
    let params = {
      height:this.canvas.nativeElement.attributes.getNamedItem("height").value,
      width:this.canvas.nativeElement.attributes.getNamedItem("width").value}


    let parentWidth = Number(params.width)
    let parentHeigth = Number(params.height)
  
    
    this.ctx = this.canvas.nativeElement.getContext('2d');
    this.ctx.canvas.width = parentWidth;
    this.ctx.canvas.height = parentHeigth;

    var size = Math.min(this.canvas.nativeElement.width, this.canvas.nativeElement.height);

    let chartInfo = {
        steps: 5,
        max: 5,
        width: size,
        height: size,
        copyStyle: "#000000",
        radius: (size-size*0.3) / 2,
        radianOffset: 0
      };

    var hSteps = this.headers.length;
    var hStepSize = (Math.PI * 2) / hSteps;
    var radianOffset = chartInfo.radianOffset;
    var radius = chartInfo.radius;
    



    // draw web
    this.ctx.translate(this.canvas.nativeElement.width / 2, this.canvas.nativeElement.height  / 2);

   
    var linend = Math.round(chartInfo.radius*0.1);
   
    let alignment = ["left", "center", "right", "center"]
    let baseline = ["middle", "top", "middle", "bottom"]
   
  
    this.ctx.fillStyle ='#FFF0EB';

    this.ctx.arc(0, 0, radius, 0, 2*Math.PI);
    this.ctx.fill();

    this.ctx.fillStyle = '#000000';
    this.ctx.strokeStyle = "#000000";
    this.ctx.lineCap = "round"
    this.ctx.lineWidth = Math.round(size*0.005)
    this.ctx.textAlign = "center";
    this.ctx.font="600 "+ 36+"px Quicksand";

    this.ctx.beginPath()
    for (var i = 0; i < hSteps; i++) {
        
        this.ctx.moveTo(0, 0);
        // add radars
        this.ctx.lineTo(Math.cos(radianOffset+hStepSize*i) * (radius + linend), Math.sin(radianOffset+hStepSize*i) * (radius + linend));    
        
        // add labels 
        var pos = Math.round((((hStepSize*i)/(2*Math.PI))+0.25)*this.headers.length-1);
        this.ctx.textAlign = alignment[pos] as "center";
        this.ctx.textBaseline = baseline[pos] as "top";
        this.ctx.fillText(this.headers[i], 
            Math.cos(radianOffset+hStepSize*i) * (radius + linend+10), 
            Math.sin(radianOffset+hStepSize*i) * (radius + linend+10));
        }
   

     // add ticks 
     var tickdist=Math.round(radius/chartInfo.steps)
    
     for (var i = 0; i < hSteps; i++) {

        for (var j =1; j <= chartInfo.steps; j++){
            this.ctx.moveTo(tickdist*j,0.04*radius);
            this.ctx.lineTo(tickdist*j,-0.04*radius);
        } 
        this.ctx.rotate(hStepSize);
    }
    this.ctx.stroke();

    // plot this.datasets
    for (i = 0; i < this.dataset.datasets.length; i++) {
        this.ctx.fillStyle = 'rgba(45, 60, 185, 0.25)';
        this.ctx.beginPath();
       
        var cRad = radius * (this.dataset.datasets[i].data[0] / chartInfo.max);
        this.ctx.moveTo(Math.cos(radianOffset) * cRad, Math.sin(radianOffset) * cRad);
        for (var j = 1; j < hSteps; j++) {
          cRad = radius * (this.dataset.datasets[i].data[j] / chartInfo.max);
          this.ctx.lineTo(Math.cos(hStepSize * j + radianOffset) * cRad, Math.sin(hStepSize * j + radianOffset) * cRad);
        }
        this.ctx.closePath();
        this.ctx.fill();
      }

    this.ctx.arc(-this.canvas.nativeElement.width/2+0.2*radius,-radius, 0.04*radius, 0, 360)
    this.ctx.fill()
    this.ctx.textBaseline = "middle"
    this.ctx.textAlign = "left"
    this.ctx.fillStyle = 'black'
    this.ctx.font="400 "+ Math.floor(0.04*size)+"px Quicksand";
    this.ctx.fillText("Einzelscores", -this.canvas.nativeElement.width/2+0.28*radius,-radius)

    // to do: map funktion funkioniert hier nicht warum? 
     
    // plot mean of this.datasets
    let sum = this.dataset.datasets[0].data;
    for (i=1; i<this.dataset.datasets.length; i++){
        sum = sum.map((value:number, idx:number)=>{return(value + this.dataset.datasets[i].data[idx])})
    } 

    var mean = sum.map(i => i/this.dataset.datasets.length);

    this.ctx.beginPath();
    this.ctx.strokeStyle = 'rgba(255, 197, 57, 1)';
    
    var cRad = radius * (mean[0] / chartInfo.max);
    this.ctx.moveTo(Math.cos(radianOffset) * cRad, Math.sin(radianOffset) * cRad);
    for (var j = 1; j < hSteps; j++) {
        cRad = radius * (mean[j] / chartInfo.max);
        this.ctx.lineTo(Math.cos(hStepSize * j + radianOffset) * cRad, Math.sin(hStepSize * j + radianOffset) * cRad);
    }
    this.ctx.closePath();
    this.ctx.stroke();

    this.ctx.beginPath();
    this.ctx.font="400 "+ Math.floor(0.04*size)+"px Quicksand";
    this.ctx.fillStyle = 'rgba(255, 197, 57, 1)'
    this.ctx.arc(-this.canvas.nativeElement.width/2+0.2*radius, - radius + 0.2*radius, 0.04*radius, 0, 360)
    this.ctx.fill()
    this.ctx.textBaseline = "middle"
    this.ctx.textAlign = "left"
    this.ctx.fillStyle = 'black'
    this.ctx.fillText("Teamscore", -this.canvas.nativeElement.width/2+0.28*radius, -radius+0.2*radius)
  }
}



