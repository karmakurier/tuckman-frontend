import { AfterViewChecked, Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
import { SpiderchartData } from 'src/app/models/spiderchartdata.model';


@Component({
  selector: 'app-dotchart',
  templateUrl: './dotchart.component.html',
  styleUrls: ['./dotchart.component.scss']
})
export class DotchartComponent implements OnInit, AfterViewChecked{

  @ViewChild('canvas', { static: true })
  canvas: ElementRef<HTMLCanvasElement>;  

  @Input() dataset:SpiderchartData;

  private ctx: CanvasRenderingContext2D;

  headers = [
    "Forming",
    "Storming",
    "Norming",
    "Performing"];


  constructor() { }

  ngOnInit(): void { };
  ngAfterViewChecked(): void {

    function getSyncScriptParams() {
      var scripts = document.getElementsByTagName('canvas');
      var lastScript = scripts[scripts.length-1];
      var scriptName = lastScript;
      return {
          arraydata : scriptName.getAttribute('array'),
          height : scriptName.getAttribute('height'),
          width : scriptName.getAttribute('width'),
          thiks : scriptName.getAttribute('thiks')
      };
    };
    function roundRect(ctx, x, y, width, height, radius, fill, stroke) {
      if (typeof stroke === 'undefined') {
        stroke = true;
      }
      if (typeof radius === 'undefined') {
        radius = 5;
      }
      if (typeof radius === 'number') {
        radius = {tl: radius, tr: radius, br: radius, bl: radius};
      } else {
        var defaultRadius = {tl: 0, tr: 0, br: 0, bl: 0};
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
    // draw from here 

  this.ctx = this.canvas.nativeElement.getContext('2d');
  let params = getSyncScriptParams()

  let frameheigth = Number(params.height)
  let framewidth = Number(params.width)
  let nthick = Number(params.thiks)
  let dataset=params.arraydata.split(",").map(Number)

  let toplot = dataset

  let linestart = Math.round(framewidth/16);
  let lineend = framewidth-linestart;
  let linecenter = Math.round(frameheigth/2)

  let thickbottom = Math.round(frameheigth/2-0.175*frameheigth);
  let thicktop = Math.round(frameheigth/2+0.175*frameheigth);

  let thickstart = Math.round(framewidth/8)
  let thickstop = framewidth-thickstart
  let thickspace =  Math.round((thickstop-thickstart)/(nthick-1))

  this.ctx.fillStyle = '#FFF0EB';

  roundRect(this.ctx, 1, 1, framewidth, frameheigth, Math.floor(frameheigth/2),true, false);
  
  const sum = toplot.reduce((a, b) => a + b, 0);
  const mean = (sum / toplot.length) || 0;
  
  let posmean=thickstart+Math.round((mean-1)*thickspace);
  this.ctx.fillStyle = 'rgba(255, 197, 57, 1)'

  drawCircle(this.ctx, posmean, linecenter, Math.floor(frameheigth*0.2), true, false, 0)

  this.ctx.fillStyle = "#000000";

  this.ctx.lineCap = "round"
  this.ctx.lineWidth = 2;

  this.ctx.beginPath();
  this.ctx.moveTo(linestart, linecenter);
  this.ctx.lineTo(lineend, linecenter);
  this.ctx.stroke();


  this.ctx.font="600 "+Math.floor(0.4*frameheigth)+"px Quicksand";
  this.ctx.textAlign="center"; 
  this.ctx.textBaseline = "middle";


  for(var i=0; i<nthick; i++){
    let pos=thickstart+i*thickspace;
    this.ctx.beginPath();
    this.ctx.moveTo(pos, thickbottom);
    this.ctx.lineTo(pos, thicktop);
    this.ctx.stroke();   
    this.ctx.fillText((i+1).toString(), pos,frameheigth*1.3);
  }
  
  this.ctx.fillStyle = 'rgba(45, 60, 185, 0.25)';
  

  let toplottmp = toplot.reduce((acc, e) => acc.set(e, (acc.get(e) || 0) + 1), new Map());
  let unique=Array.from(toplottmp.keys());
  let occur=Array.from(toplottmp.values());

  for (var i=0; i<unique.length; i++){
      let score=unique[i];
      let pos=thickstart+(score-1)*thickspace;
      let posy = new Array();

      if(occur[i] === 1){
          posy.push(linecenter);
      } else {
          let lower=linecenter - Math.round(frameheigth*0.15);
          let upper=linecenter + Math.round(frameheigth*0.15);
          let dist = Math.round((upper-lower)/(occur[i]-1));

          for(let step = 0; step<occur[i]; step++){
              posy.push(lower+(dist*step))
          }
      }

      for (let y of posy){
              drawCircle(this.ctx, pos, y, Math.floor(frameheigth*0.2), true, false, 3) 
          }
      }
}
}