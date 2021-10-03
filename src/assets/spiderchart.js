let datasets= [
    {
        label: 'UUIDA',
        data: [3, 4, 3, 2]
    },
    {
        label: 'UUIDB',
        data: [5, 2, 1, 4]
    },
    {
        label: 'MUUIDC',
        data: [5, 1, 3, 1]
    },
    {   
        label: 'UUIDD',
        data: [4, 3, 2, 1]
    },
    {
        label: 'UUIDE',
        data: [3, 2, 3, 3]
    }
]


let headers = [
    "Forming",
    "Storming",
    "Norming",
    "Performing"];
    
function drawSpider(){
    var canvas = document.getElementById('spider');
    var ctx = canvas.getContext('2d');
    

    var size = Math.min(canvas.width, canvas.height);

    let chartInfo = {
        steps: 5,
        max: 5,
        width: size,
        height: size,
        copyStyle: "#000000",
        radius: (size-100) / 2,
        radianOffset: 0
      };

    var stepSize = chartInfo.max / chartInfo.steps;
    var hSteps = headers.length;
    var hStepSize = (Math.PI * 2) / hSteps;
    var radianOffset = chartInfo.radianOffset;
    var radius = chartInfo.radius;
    



    // draw web
    ctx.translate(canvas.width / 2, canvas.height  / 2);
   
    linend = Math.round(chartInfo.radius*0.1);
   
    var alignment= ["left", "center", "right", "center"]
    var baseline = ["middle", "top", "middle", "bottom"]
   
  
    ctx.fillStyle ='#FFF0EB';

    ctx.arc(0, 0, radius, 0, 2*Math.PI);
    ctx.fill();

    ctx.fillStyle = '#000000';
    ctx.strokeStyle = "#000000";
    ctx.lineCap = "round"
    ctx.lineWidth = Math.round(size*0.005)
    ctx.textAlign = "center";
    ctx.font="600 "+ Math.floor(0.04*size)+"px Quicksand";
    
    ctx.beginPath()
    for (var i = 0; i < hSteps; i++) {
        
        ctx.moveTo(0, 0);
        // add radars
        ctx.lineTo(Math.cos(radianOffset+hStepSize*i) * (radius + linend), Math.sin(radianOffset+hStepSize*i) * (radius + linend));    
        
        // add labels 
        var pos = Math.round((((hStepSize*i)/(2*Math.PI))+0.25)*headers.length-1);
        ctx.textAlign = alignment[pos];
        ctx.textBaseline = baseline[pos];
        ctx.fillText(headers[i], 
            Math.cos(radianOffset+hStepSize*i) * (radius + linend+10), 
            Math.sin(radianOffset+hStepSize*i) * (radius + linend+10));
        }
   

     // add ticks 
     tickdist=Math.round(radius/chartInfo.steps)
    
     for (var i = 0; i < hSteps; i++) {

        for (var j =1; j <= chartInfo.steps; j++){
            ctx.moveTo(tickdist*j,0.04*radius);
            ctx.lineTo(tickdist*j,-0.04*radius);
        } 
        ctx.rotate(hStepSize);
    }
    ctx.stroke();



    // plot datasets
    for (i = 0; i < datasets.length; i++) {
        ctx.fillStyle = 'rgba(45, 60, 185, 0.25)';
        ctx.beginPath();
       
        cRad = radius * (datasets[i].data[0] / chartInfo.max);
        ctx.moveTo(Math.cos(radianOffset) * cRad, Math.sin(radianOffset) * cRad);
        for (var j = 1; j < hSteps; j++) {
          cRad = radius * (datasets[i].data[j] / chartInfo.max);
          ctx.lineTo(Math.cos(hStepSize * j + radianOffset) * cRad, Math.sin(hStepSize * j + radianOffset) * cRad);
        }
        ctx.closePath();
        ctx.fill();
      }

    ctx.arc(-canvas.width/2+0.2*radius,-radius, 0.04*radius, 0, 360)
    ctx.fill()
    ctx.textBaseline = "middle"
    ctx.textAlign = "left"
    ctx.fillStyle = 'black'
    ctx.font="400 "+ Math.floor(0.04*size)+"px Quicksand";
    ctx.fillText("Einzelscores", -canvas.width/2+0.28*radius,-radius)


    // plot mean of datasets
    var sum = datasets[0].data
    for (i=1; i<datasets.length; i++){
        sum = sum.map(function(num, idx){return(num + datasets[i].data[idx])})
    } 

    var mean = sum.map(i => i/datasets.length);

    ctx.beginPath();
    ctx.strokeStyle = 'rgba(255, 197, 57, 1)';
    
    cRad = radius * (mean[0] / chartInfo.max);
    ctx.moveTo(Math.cos(radianOffset) * cRad, Math.sin(radianOffset) * cRad);
    for (var j = 1; j < hSteps; j++) {
        cRad = radius * (mean[j] / chartInfo.max);
        ctx.lineTo(Math.cos(hStepSize * j + radianOffset) * cRad, Math.sin(hStepSize * j + radianOffset) * cRad);
    }
    ctx.closePath();
    ctx.stroke();

    ctx.beginPath();
    ctx.font="400 "+ Math.floor(0.04*size)+"px Quicksand";
    ctx.fillStyle = 'rgba(255, 197, 57, 1)'
    ctx.arc(-canvas.width/2+0.2*radius, - radius + 0.2*radius, 0.04*radius, 0, 360)
    ctx.fill()
    ctx.textBaseline = "middle"
    ctx.textAlign = "left"
    ctx.fillStyle = 'black'
    ctx.fillText("Teamscore", -canvas.width/2+0.28*radius, -radius+0.2*radius)


}





