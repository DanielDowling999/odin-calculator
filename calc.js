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

let num1 = 0;
let num2 = 0;
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

function resetDecimalMult(){
    decimalPressed = false;
    wholeNumMult = 10;
    decimalNumMult = 1;

}


function handlePress(buttonPressed){
    if (buttonPressed !== '' && !isNaN(Number(buttonPressed))){
        if (operator === ""){
            if (completeResult){
                completeResult = false;
                num1=0;
                num2=0;
                num2Input = false;
                resetDecimalMult()

            }
            num1 = num1*wholeNumMult + Number(buttonPressed)*decimalNumMult;
            if(decimalPressed){
                decimalNumMult = decimalNumMult/10;
            }
            outputResult.innerText = num1;
        }
        else{
            num2 = num2*wholeNumMult + Number(buttonPressed)*decimalNumMult;
            if(decimalPressed){
                decimalNumMult = decimalNumMult/10;
            }
            outputResult.innerText = num2;
            num2Input = true;
        }

    }
    if(buttonPressed == "." && !(decimalPressed)){
        decimalPressed = true;
        wholeNumMult = 1;
        decimalNumMult = 1/10;
    }
    else if (buttonPressed == "=" && num2Input){
        num1 = operate(num1, num2, operator);
        outputResult.innerText = num1;
        operator = "";
        completeResult = true;
        num2Input = false;
        num2 = 0;
    }
    else if (/^[+\-x÷]$/.test(buttonPressed)){
        if (!num2Input){
            operator = buttonPressed;
        }
        else{
            num1 = operate(num1, num2, operator);
            outputResult.innerText=num1;
            num2 = 0;
            num2Input = false;
            operator = buttonPressed;
        }
        resetDecimalMult();
    }
    else if (buttonPressed == "clr"){
        num1=0;
        num2=0;
        operator = "";
        num2Input = false;
        completeResult = false;
        outputResult.innerText = num1;
        resetDecimalMult()
    }
    else{
        console.log("Doing nothing")       
    }
    
}