// Graphical main functions
function drawPartCircle(x,y, rad, startAng, stopAng, strokeColor){
    canvasContext.beginPath();
    canvasContext.arc(x, y, rad, startAng, stopAng, true);
    canvasContext.strokeStyle = strokeColor;
    canvasContext.lineWidth = 5;
    canvasContext.stroke();
}

function drawCircle (x,y, rad, strokeColor){
    canvasContext.beginPath();
    canvasContext.arc(x,y, rad, 0, FULLCIRCLE, false);
    canvasContext.strokeStyle = strokeColor;
    canvasContext.lineWidth = 1;
    canvasContext.stroke();
}

function fillCircle (x,y, rad, fillColor){
    canvasContext.beginPath();
    canvasContext.arc(x,y, rad, 0, FULLCIRCLE, false);
    canvasContext.fillStyle = fillColor;
//    canvasContext.lineWidth = 10;
    canvasContext.fill();
}

function drawLine(x,y, x2, y2, strokeColor, width){
    canvasContext.beginPath();
    canvasContext.moveTo(x,y);
    canvasContext.lineTo(x2,y2);
    canvasContext.strokeStyle = strokeColor;
    canvasContext.lineWidth = width;
    canvasContext.stroke();
}

// rectangle
function drawFilledRectangle (x,y, width, height, fillColor){
    canvasContext.fillStyle = fillColor;
    canvasContext.fillRect(x,y, width, height);
    
}

function drawText (str, x, y, f, fillColor){
    canvasContext.font = f;
    canvasContext.fillStyle = fillColor;
    canvasContext.fillText(str, x, y);
    
}