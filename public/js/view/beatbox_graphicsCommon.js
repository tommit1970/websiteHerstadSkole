// Graphical main functions

function drawPartCircle(x,y, rad, startAng, stopAng, strokeColor){
    player.canCtx.beginPath();
    player.canCtx.arc(x, y, rad, startAng, stopAng, true);
    player.canCtx.strokeStyle = strokeColor;
    player.canCtx.lineWidth = 5;
    player.canCtx.stroke();
}

function drawCircle (x,y, rad, strokeColor){
    player.canCtx.beginPath();
    player.canCtx.arc(x,y, rad, 0, FULLCIRCLE, false);
    player.canCtx.strokeStyle = strokeColor;
    player.canCtx.lineWidth = 1;
    player.canCtx.stroke();
}

function fillCircle (x,y, rad, fillColor){
    player.canCtx.beginPath();
    player.canCtx.arc(x,y, rad, 0, Math.PI*2, false);
    player.canCtx.fillStyle = fillColor;
//    player.canCtx.lineWidth = 10;
    player.canCtx.fill();
}

function drawLine(x,y, x2, y2, strokeColor, width){
    player.canCtx.beginPath();
    player.canCtx.moveTo(x,y);
    player.canCtx.lineTo(x2,y2);
    player.canCtx.strokeStyle = strokeColor;
    player.canCtx.lineWidth = width;
    player.canCtx.stroke();
}

// rectangle
function drawFilledRectangle (x,y, width, height, fillColor){
    player.canCtx.fillStyle = fillColor;
    player.canCtx.fillRect(x,y, width, height);
    
}

function drawText (str, x, y, f, fillColor){
    player.canCtx.font = f;
    player.canCtx.fillStyle = fillColor;
    player.canCtx.fillText(str, x, y);
    
}

   

