//define global variables
let buttons;
let numString = '';
let calArr = [];
let result = 0;


function buildOperationArr(p1){
    //function builds array in the format of [operand,operator,operand], or [1.11,'+',2.22] for example, to send to calculator function
    let input = p1;

    //get numerical or '.' inputs
    if( (parseInt(input) >= 0) || (input == '.')){   
        if ( (numString.indexOf('.') == -1) || (input !== '.')){    //allow only one period to be added
            numString = numString + input;
        }
    }

    //negate input
    else if(input == '+/-'){
        numString = numString * -1;
    }
    
    //add to array whenever a function button is pressed - whenever at the array has two operands and one operator, send to calculator and return result in array
    else if((input == '%') || (input == '/') || (input == 'x') || (input == '-') || (input == '+') || (input == '=')){
        //prevent '' from being pushed into array
        if(numString){
            calArr.push(Number(numString));
        }
        
        //if last entry in array is a function, pop the last entry off the array
        if((calArr[calArr.length-1] == '%') || (calArr[calArr.length-1] == '/') || (calArr[calArr.length-1] == 'x') || (calArr[calArr.length-1] == '-') || (calArr[calArr.length-1] == '+')){
            calArr.pop();
        }
    
        //if the array is empty, add a zero before the function
        if(calArr.length == 0){
            calArr.push(0);
            calArr.push(input);
        }
        
        else{
            calArr.push(input);
        }

        //reset numString
        numString = '';
    }

    if(calArr.length > 3){
        result = calculator(calArr[0],calArr[1],calArr[2]);
        calArr = [];
        calArr.push(result);
        if(input !== '='){
            calArr.push(input);
        }
        console.log('result is ' + result);
    }
}

//calculator function
function calculator(p1,p2,p3){
    let operand1;
    let operand2;
    let operator;

    operand1 = p1;
    operator = p2;
    operand2 = p3;

    if(operator == '%'){
        return operand1 % operand2;
    }

    else if(operator == '/'){
        return operand1 / operand2;
    }

    else if (operator == 'x'){
        return operand1 * operand2;
    }

    else if (operator == '-'){
        return operand1 - operand2;
    }

    else if (operator == '+'){
        return operand1 + operand2;
    }   
}

//Event Listener Functions
function mouseoverButton(e){
    e.target.className = e.target.className + '-hover';
}

function mouseoutButton(e){
    e.target.className = e.target.className.replace('-hover','');
}

function clickButton(e){
    e.target.className = (e.target.className.replace('-hover','') + '-click'); 
    buildOperationArr(e.target.firstChild.data); 
}

function releaseButton(e){
    e.target.className = e.target.className = e.target.className.replace('-click','');
}

buttons = document.querySelectorAll('button');
for(x = 0; x < buttons.length; x++){
    buttons[x].addEventListener('mouseover',mouseoverButton);
    buttons[x].addEventListener('mouseout',mouseoutButton);
    buttons[x].addEventListener('mousedown',clickButton);
    buttons[x].addEventListener('mouseup',releaseButton);   
}




