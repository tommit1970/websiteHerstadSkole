var bassOne = document.createElement("audio");
var bassTwo = document.createElement("audio");

var snareOne = document.createElement("audio");
var snareTwo = document.createElement("audio");

bassOne.setAttribute("src","./audio/bass.mp3");
bassTwo.setAttribute("src","./audio/bass.mp3");

snareOne.setAttribute("src", "./audio/snare.mp3");
snareTwo.setAttribute("src", "./audio/snare.mp3");

var soundArr = [null, null, snareOne, bassOne];

// console.dir(bass);