// open and connect socket
let socket = io();

// listen for confirmation of connection
socket.on('connect', () => {
  console.log("connected");
});

// button event listener
let inputForm = document.getElementById('boardInput');
let sendButton = document.getElementById('boardButton');
let contentAdd = document.getElementById('add-btn');
let testInput = document.getElementById('testInput');
let imageForm = document.getElementById('testInputFile');
let imageSubmit = document.getElementById('picButton');

// show "add content" options (text & image upload)
contentAdd.addEventListener('click', () => {
  testInput.classList.remove("hide");
  testInput.classList.add("show");
})

// send text to the board when submit button is clicked
sendButton.addEventListener('click', ()=> {
  let inputText = inputForm.value; 

  // send text from post-it note to the server
  socket.emit('data', inputText);
  inputValue(inputText);
})

// send image data to the board when submit button is clicked
imageSubmit.addEventListener('click', () => {
  let inputImage = imageForm.value;

  // send image data to the server
  socket.emit('pic-data', inputImage);
})


/*---- p5 ----*/
    
var inp;
var btn;
let note;
let testNote = "Test note";



function setup() {

  const myCanvas = createCanvas(windowWidth *0.9, windowHeight*0.9);
  myCanvas.parent('container');
  background(169, 118, 82);
  rectMode(CENTER);
  fill(197, 145, 108);
  noStroke();
  // rect(winWidth/2, winHeight/2, winWidth-50, winHeight-50)
  

  // listen for messages named 'data' (input text) from the server
  socket.on('data', (_note) => {
    console.log(_note);
    inputValue(_note);
    // Note(_note);
  })

  // listen for messages named 'data' (input text) from the server
  socket.on('pic-data', (_image) => {
    console.log(_image);
    inputPic(_image);

  })
}

// function to post text
function inputValue(_inputText) {
  console.log(_inputText);

  // create post-it note object  
  fill(random(255), random(255), random(255));
  textSize(20);
  text(_inputText, random(400, (windowWidth * 0.9) - 80), random(25, (windowHeight*0.9) - 25));
  
}

// function to post image
function inputPic (_inputImage) {
  console.log(_inputImage);
}


/*-- end p5 --*/ 