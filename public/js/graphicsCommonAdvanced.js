// Graphical main functions

function drawPartCircle2(context, x,y, rad, startAng, stopAng, strokeColor){
    context.beginPath();
    context.arc(x, y, rad, startAng, stopAng, true);
    context.strokeStyle = strokeColor;
    context.lineWidth = 5;
    context.stroke();
}

function drawCircle2(context, x,y, rad, strokeColor){
    context.beginPath();
    context.arc(x,y, rad, 0, FULLCIRCLE, false);
    context.strokeStyle = strokeColor;
    context.lineWidth = 1;
    context.stroke();
}

function fillCircle2(context, x,y, rad, fillColor){
    context.beginPath();
    context.arc(x,y, rad, 0, Math.PI*2, false);
    context.fillStyle = fillColor;
//    context.lineWidth = 10;
    context.fill();
}

function drawLine2(context, x,y, x2, y2, strokeColor, width){
    context.beginPath();
    context.moveTo(x,y);
    context.lineTo(x2,y2);
    context.strokeStyle = strokeColor;
    context.lineWidth = width;
    context.stroke();
}

// rectangle
function drawFilledRectangle2(context, x,y, width, height, fillColor){
    context.fillStyle = fillColor;
    context.fillRect(x,y, width, height);
    
}

function drawText2(context, str, x, y, f, fillColor){
    context.font = f;
    context.fillStyle = fillColor;
    context.fillText(str, x, y);
    
}

   

