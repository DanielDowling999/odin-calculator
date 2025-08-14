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

let num1, num2, operation;

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
        case "/":
            return divide(x,y);
            break;
        default:
            console.log("Error, unknown button pressed");
    }
}