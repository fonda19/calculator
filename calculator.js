//Place to store the input
let runningTotal = 0;
//The initial zero that is always on the screen should be a string, not a number
let buffer = '0'; //keeps track of what's on the screen
//This will hold the 'state' of calculation (the + - etc.) keep track of previous action
let previousOperator = null; //if user is in their initial operation, the previous operater will be null

const screen = document.querySelector('.screen'); //to keep writing to screen


//Function for if a user clicks one of the buttons
function buttonClick(value) {
    //direct how to handle number or symbol input
    if (isNaN (value)) { 
        //this is not a number
        handleSymbol(value);
    } else {
        //this is a number
        handleNumber(value);
    }
    screen.innerText = buffer;
}

//Seperate function for handline numbers and seperate function for symbols
function handleSymbol(symbol){
    console.log('handleSymbol', symbol);
    // if (symbol === 'C') {
    //     buffer = '0';
    //     runningTotal = 0;
    // }
    
    //switch statements are an efficient way to add math symbol computation
    switch (symbol) {
        case 'C':
            buffer = '0';
            runningTotal = 0;
            break;
        case '=':
            if (previousOperator === null) {
            // need two numbers to do math
            return;
            }
            flushOperation(parseInt(buffer));
            previousOperator = null;
            buffer = runningTotal;
            runningTotal = 0;
            break;
        case '←':
            if (buffer.length === 1) {
                buffer = '0';
            } else {
                buffer = buffer.substring(0, buffer.length - 1);
            }
            break;
        case '+':
        case '-':
        case '×':
        case '÷':
            handleMath(symbol);
            break;
    }
}

  
  

function handleMath(symbol) {
    if (buffer === '0') {
        //do nothing
        return;
    }

    const intBuffer = parseInt(buffer);

    if (runningTotal === 0) {
        runningTotal = intBuffer;
    } else {
        flushOperation(intBuffer);
    }

    previousOperator = symbol;

    buffer = '0';
}

function flushOperation(intBuffer) {
//can alternatively use switch
    if(previousOperator === '+') {
        runningTotal += intBuffer;
    } else if (previousOperator === '-') {
        runningTotal -= intBuffer;
    } else if (previousOperator === '×') {
        runningTotal *= intBuffer;
    } else {
        runningTotal /= intBuffer;
    }
}

  

//will also keep reassigning the number as zero if no number is added before pressing zero
function handleNumber(numberString){
    if (buffer === '0') {
        buffer = numberString;
    } else {
        buffer += numberString; // buffer = buffer + numberString
    }
}



//Initial function that gets ran once
function init () {
    document.querySelector('.calc-buttons')
    .addEventListener('click', function(event) {
        //console.log(event);to check the event listener is working, can be removed
        buttonClick(event.target.innerText);
    })
}

init();