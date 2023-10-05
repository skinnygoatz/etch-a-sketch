// Input, Color, Rainbow, Eraser, Clear Buttons
const btnColor = document.querySelector('.btnColor');
const btnRainbow = document.querySelector('.btnRainbow');
const btnEraser = document.querySelector('.btnEraser');
const btnClear = document.querySelector('.btnClear');
const btnPickColor = document.querySelector('#btnPickColor');

// On click called styleButton, to change the button style
btnColor.addEventListener('click', e => {styleButton("color")});
btnRainbow.addEventListener('click', e => {styleButton("rainbow")});
btnEraser.addEventListener('click', e => {styleButton("eraser")});

// On click remake the board to clear
btnClear.addEventListener('click', e => {makeBoard(sliderScale.value)});

// Width, Height, and Range slider
const sliderScale = document.querySelector('#sliderScale');
const width = document.querySelector('.width');
const height = document.querySelector('.height');

// Current color and current mode variables
let current_color = btnPickColor.value;
let current_mode = "color";

// Update range sliders value if changed
sliderScale.oninput = function()
{
    width.innerHTML = sliderScale.value;
    height.innerHTML = sliderScale.value;
}
// Update current color if changed
btnPickColor.oninput = function()
{
    current_color = btnPickColor.value;
}

// Sets up mouse functionalities on drawing board
const board = document.querySelector('.board');
let mouseDown = false;

board.addEventListener('mousedown', e => {e.preventDefault(), mouseDown = true, changeColor(e)});
board.addEventListener('mouseup', e => {mouseDown = false});
board.addEventListener('mousemove', e => {e.preventDefault(), changeColor(e)});

// On start up
// Present a 16x16 grid
makeBoard(16);
// Set the default mode to color
btnColor.click();

// ----------------------------
//          FUNCTIONS
// ----------------------------

// Creates a drawing board of the given size
function makeBoard(size)
{
    let board = document.querySelector('.board');
    let boxes = board.querySelectorAll('div');
    boxes.forEach((div) => div.remove());
    board.style.gridTemplateColumns = `repeat(${size}, 1fr)`;
    board.style.gridTemplateRows = `repeat(${size}, 1fr)`;

    let amount = size * size;
    for (let i = 0; i < amount; i++)
    {
        const box = document.createElement('div');
        box.style.backgroundColor = '#eae7dc';
        board.insertAdjacentElement("beforeend", box);
    }
}

// Called when mousedown and mousemove events are active
// Changed the color of a box accordingly
function changeColor(e)
{
    // Only changes color if mouse is down 
    if (!mouseDown)
    {
        return;
    }
    if (current_mode == 'rainbow') 
    {
        const randomR = Math.floor(Math.random() * 256);
        const randomG = Math.floor(Math.random() * 256);
        const randomB = Math.floor(Math.random() * 256);
        e.target.style.backgroundColor = `rgb(${randomR}, ${randomG}, ${randomB})`;
    }
    else if (current_mode == 'color') 
    {
        e.target.style.backgroundColor = current_color;
    } 
    else if (current_mode == 'eraser') 
    {
        e.target.style.backgroundColor = '#eae7dc';
    }
}

// Called when range slider is changed
// Updates the board to the new size given
function boardSize(input)
{
    makeBoard(input);
    width.innerHTML = input;
    height.innerHTML = input;
}

// Called when either Color, Rainbow, or Eraser buttons are pressed
// All this function does is css style 
// The pressed button will have a black background with white text
function styleButton(mode) 
{
    current_mode = mode;
    resetButtonStyles();

    if (mode == "color")
    {
        setButtonStyles(btnColor, '#272727', '#eae7dc');
    }
    else if (mode == "rainbow")
    {
        setButtonStyles(btnRainbow, '#272727', '#eae7dc');
    }
    else
    {
        setButtonStyles(btnEraser, '#272727', '#eae7dc');
    }
    
}

// Default button style
function resetButtonStyles() 
{
    setButtonStyles(btnColor, '#eae7dc', '#272727');
    setButtonStyles(btnRainbow, '#eae7dc', '#272727');
    setButtonStyles(btnEraser, '#eae7dc', '#272727');
}

function setButtonStyles(button, backgroundColor, textColor) 
{
    button.style.background = backgroundColor;
    button.style.color = textColor;
}

















