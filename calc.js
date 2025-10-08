const btns = document.querySelectorAll('button');
const resultDiv = document.getElementById("calcResult");
const outputResult = resultDiv.querySelector("#result");
let completeResult = false;
let num2Input = false;
btns.forEach(button=> {
    button.addEventListener('click', () => {
        handlePress(button.innerText)
    })
})

document.addEventListener('keydown', (event) =>{
    mapInput(event);
})

function formatDisplay(numStr) {
    // Remove leading zeros but keep "0" if that's all there is
    let cleaned = numStr.replace(/^0+/, '') || '0';
    
    // Count significant digits (excluding decimal point)
    let digits = cleaned.replace('.', '').length;
    
    if (digits > 16) {
        // Convert to number and use scientific notation
        let num = Number(cleaned);
        return num.toExponential(2); // Shows as "4.21e+33"
    }
    
    return cleaned;
}

function mapInput(eventKey){
    const keyMap = {
        "+":"+",
        "-":"-",
        "*":"x",
        "/":"÷",
        "=":"=",
        "Enter":"=",
        "Backspace":"del",
        "Escape":"clr",
        ".":"."
    };
    let key = eventKey.key;
    let buttonPressed;

    if(!isNaN(key)){
        buttonPressed = key;
    }
    else{
        buttonPressed = keyMap[key];
    }
    if (buttonPressed){
        handlePress(buttonPressed);
    }
}

//Add negative number functionality

function add(x,y){
    return x+y;
}
function subtract(x,y){
    return x-y;
}
function multiply(x,y){
    return x*y;
}
function divide(x,y){
    return x/y;
}

let num1Str = "";
let num2Str = "";
let operator = "";
let decimalPressed = false;
let wholeNumMult = 10;
let decimalNumMult = 1;

function operate(x, y, sign){
    switch(sign){
        case "+":
            return add(x,y);
            break;
        case "-":
            return subtract(x,y);
            break;
        case "x":
            return multiply(x,y);
            break;
        case "÷":
            if(y == 0){
                alert("For that one, I'm deleting your entire harddrive.")
                return 0;
            }
            return divide(x,y);
            break;
        default:
            console.log("Error, unknown button pressed");
            console.log("Num1: " + num1 + " Num2: " + num2 + " Operator: " + operator)
    }
}
function cleanFloat(value) {
    return Number(value.toFixed(10)).toString();
}

function highlightOperator(op) {
    // Remove active class from all operands
    document.querySelectorAll('.operand').forEach(el => el.classList.remove('active'));
    
    // Add active class to the matching operand
    const opMap = {'+': 0, '-': 1, 'x': 2, '÷': 3};
    if (opMap[op] !== undefined) {
        document.querySelectorAll('.operand')[opMap[op]].classList.add('active');
    }
}


function handlePress(buttonPressed){
    if(!isNaN(buttonPressed) || buttonPressed == '.'){
        if (completeResult){
            num1Str = "";
            num2Str = "";
            operator = "";
            completeResult = false;
        }
        if (operator == ""){
            if (buttonPressed =='.' && num1Str.includes(".")){
                return;
            }
            num1Str += buttonPressed;
            outputResult.innerText = formatDisplay(num1Str) || "0"; //To ensure something is always being displayed
        }
        else{
            if (buttonPressed == '.' && num2Str.includes(".")){
                return;
            }
            num2Str += buttonPressed;
            outputResult.innerText = formatDisplay(num2Str) || "0";
            num2Input = true;
        }
    }

    else if (buttonPressed == '(-)'){
        if(num2Input){
            num2Str = String(Number(num2Str)*-1);
            outputResult.innerText = formatDisplay(num2Str);

        }
        else{
            num1Str = String(Number(num1Str)*-1);
            outputResult.innerText = formatDisplay(num1Str);
        }

    }

    else if (/^[+\-x÷]$/.test(buttonPressed)){
        if(!num2Input){
            operator = buttonPressed;
            highlightOperator(buttonPressed);
        }
        else{
            num1Str = cleanFloat(operate(Number(num1Str), Number(num2Str), operator));
            outputResult.innerText = formatDisplay(num1Str);
            num2Str = "";
            num2Input = false;
            operator = buttonPressed;
            highlightOperator(buttonPressed);
        }
    }
    else if (buttonPressed == "=" && num2Input){
        num1Str = cleanFloat(operate(Number(num1Str), Number(num2Str), operator));
        outputResult.innerText = formatDisplay(num1Str);
        operator = "";
        completeResult = true;
        num2Input = false;
        num2Str = "";
        document.querySelectorAll('.operand').forEach(el => el.classList.remove('active'));


    }
    else if (buttonPressed =="clr"){
        num1Str = "";
        num2Str = "";
        operator = "";
        num2Input = false;
        completeResult = false;
        outputResult.innerText = "0";
    }

    else if (buttonPressed == "del"){
        if(num2Input && num2Str.length > 0 ){
            num2Str = num2Str.slice(0, -1);
            outputResult.innerText = num2Str || "0";
            if(num2str === ""){
                num2Input = false;
            }
        }
        else if (num1Str.length > 0){
            num1Str = num1Str.slice(0, -1);
            outputResult.innerText = num1Str || "0";
        }
    }

    else{
        console.log("Doing nothing");
    }

}
