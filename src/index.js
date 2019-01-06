import './index.css';
import nameGenerator from './name-generator';
import isDef from './is-def';

//NOM: KACEL , PRENOM: Tahar;


///////     ///////        //////////                        
///         ////////       /////////////
/////          ////    //////////////
///////      //////////////////                   ///////////                  //////
//////         ///////////                    /////        //                ////
////////    /////////////////////           //////         //               ///              
///////    //////////      //////////        //////        //               ///
///         //////////      ////////         //////        //               ///
///////  /////////        ///////////        ////////////// ///       ////////   
//////  

var x2=0;
var y2=0;
var canvas = document.getElementById('canvas');
var ctx = canvas.getContext('2d');
var width   = window.innerWidth;
var height  = window.innerHeight;
canvas.width = width;
canvas.height = height;
//declaration du boutton
var buttonX = width/2 -30 ;
var buttonY = height-100;
var buttonW = 60;
var buttonH = 30;
ctx.fillStyle = 'white';
//dessin du message
function drawingMESSAge(){
var gradient = ctx.createLinearGradient(0,0,canvas.width,0);
gradient.addColorStop("0","magenta");
gradient.addColorStop("0.5","blue");
gradient.addColorStop("1.0","red");
// Fill with gradient
ctx.fillStyle=gradient;
ctx.font = '40px Arial'
ctx.fillText("to clear type space or click on button below ",50,60);
}
drawingMESSAge();
//function to draw  boutton on the canvas
function drawBtn(){
ctx.fillStyle = 'red';
ctx.fillRect(buttonX, buttonY, buttonW, buttonH);
ctx.font = '20px Arial'
ctx.fillStyle = 'black';
ctx.fillText("clear",(width/2)-20,height-100+17);
}
drawBtn();
//adding a listner the button
canvas.addEventListener('click', function(event) {
// Control that click event occurred within position of button
// NOTE: This assumes canvas is positioned at top left corner 
  if (
    event.x > buttonX && 
    event.x < buttonX + buttonW &&
    event.y > buttonY && 
    event.y < buttonY + buttonH
  ) {
    // Executes if button was clicked!
    alert('Tout va etre effacé!!');
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    drawBtn();
    drawingMESSAge();
  }
});
//functoin to draws lines 
function draw(x1,y1,x2,y2,color){
ctx.beginPath(); 
ctx.lineWidth="5";
ctx.strokeStyle=(color); //  path
ctx.moveTo(x1,y1);
ctx.lineTo(x2,y2);
ctx.stroke(); 
}
//defing the mouse
var mouse = { 
  click: false,
  move: false,
  pos: {x:0, y:0},
  pos_prev: false
};

canvas.onmousedown = function(e){ mouse.click = true; };
canvas.onmouseup = function(e){ mouse.click = false; };

canvas.onmousemove = function(e) {
// normalize mouse position to range 0.0 - 1.0
  mouse.pos.x = e.clientX / width;
  mouse.pos.y = e.clientY / height;
  mouse.move = true;
};

//////////////////////////////////////////////////////////////////
// Store/retrieve the name in/from a cookie.
const cookies = document.cookie.split(';');
console.log(cookies)
let wsname = cookies.find(function(c) {
  if (c.match(/wsname/) !== null) return true;
  return false;
});
if (isDef(wsname)) {
  wsname = wsname.split('=')[1];
} else {
  wsname = nameGenerator();
  document.cookie = "wsname=" + encodeURIComponent(wsname);
}

// Set the name in the header

// Create a WebSocket connection to the server
const ws = new WebSocket("ws://" + window.location.host+ "/socket");

// We get notified once connected to the server
ws.onopen = (event) => {
  console.log("We are connected.");
};

// Listen to messages coming from the server. When it happens, create a new <li> and append it to the DOM.
//const messages = document.querySelector('#messages');

ws.onmessage = (event) => { 
var words = event.data.split(' ');
var a =(words[0].slice(0,-1))
var color=((a.slice(1)));
draw(parseFloat(words[1]),parseFloat(words[2]),parseFloat(words[3]),parseFloat(words[4]),color);
};

// Retrieve the input element. Add listeners in order to send the content of the input when the "return" key is pressed.
function sendMessage(event) {
  event.preventDefault();
  event.stopPropagation();
  if (sendInput.value !== '') {
    // Send data through the WebSocket
    ws.send(sendInput.value);
    sendInput.value = '';
  }
}
//const sendForm = document.querySelector('form');
const sendInput = document.querySelector('form input');
document.addEventListener('keypress', (event) => {
  const nomTouche = event.key;
    if(nomTouche === " "){
  alert("tout va etre effacer !!");
  ctx.clearRect(0, 0, canvas.width, canvas.height);}
  drawingMESSAge();
  drawBtn();
});
document.addEventListener("DOMContentLoaded", function(event) {
 
function mainLoop() {
 
  // check if the user is drawing
  if (mouse.click && mouse.move && mouse.pos_prev) {
     // send line to to the server
     ws.send(mouse.pos.x*width+" "+mouse.pos.y*height +" "+x2*width+" "+y2*height );
     mouse.move = false;
     draw(mouse.pos.x*width,mouse.pos.y*height,x2*width,y2*height);
  }
  
  setPrevieousValuesXY();
  setTimeout(mainLoop, 25);
function setPrevieousValuesXY() 
{
  mouse.pos_prev = true;
  x2= mouse.pos.x; y2= mouse.pos.y;

}}

mainLoop();});


