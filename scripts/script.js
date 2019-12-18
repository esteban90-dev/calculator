//define global variables
let buttons;
let numString = '';
let calArr = [];
let result = 0;
let histDisp = '';
let currentDisp = '';
let lastInput = '';
let negWrap = 0;
let cFlag = 0;


function buildCalArr(p1){
    //function builds array in the format of [operand,operator,operand], or [1.11,'+',2.22] for example, to send to calculator function. Also builds strings for display.
    let input = p1;

    //------ get numerical or '.' inputs ------------------------------------------------------------------------------------------------
    if( (parseInt(input) >= 0) || (input == '.')){   
        if ( (numString.indexOf('.') == -1) || (input !== '.')){    //allow only one period to be added
            numString = numString + input;
            if(calArr.length == 1){
                calArr = [];        //if a result is in the array, clear it to make way for new operand
            }    
        }

        //clear history if equals sign was just pressed and a number is now being input
        if(lastInput == '='){
            histDisp = '';
        }
    }

    

    //--------get negatation input  -----------------------------------------------------------------------------------------------------
    else if(input == '+/-' && calArr.length == 1){
        if(negWrap == 1){
            histDisp = 'negate(' + histDisp + ')';
            console.log('first part');
        }
        else{
            histDisp = calArr[0].toString();
            histDisp = 'negate(' + histDisp + ')';
            negWrap = 1;
            console.log('second part');
        }

        calArr[0] = calArr[0] * -1;
    }
    else if((input == '+/-') && numString){
        numString = numString * -1;     
    }


    //----------get C and AC inputs-------------------------------------------------------------------------------------------------------
    // 'C' clears the current entry
    else if(input == 'C'){
        numString = '';
        cFlag = 1;
        if(calArr.length == 1){     //if only a result is in the array, and the C button is pressed, clear everything
            currentDisp = '';
            histDisp = '';
            calArr = [];
        }
    }

    // 'AC' clears the current entry, array, and history
    else if(input == 'AC'){
        numString = '';
        currentDisp = '';
        histDisp = '';
        calArr = [];
    }

    //----------get function input--------------------------------------------------------------------------------------------------------
    //add to array whenever a function button is pressed - whenever at the array has two operands and one operator, send to calculator and return result in array
    //never add '=' to the array
    else if((input == '%') || (input == '/') || (input == 'x') || (input == '-') || (input == '+') || (input == '=')){
        //prevent '' from being pushed into array
        if(numString){
            calArr.push(Number(numString));
            histDisp = histDisp + ' ' + numString;
        }
        
        //if last entry in array is a function, pop the last entry off the array
        if((calArr[calArr.length-1] == '%') || (calArr[calArr.length-1] == '/') || (calArr[calArr.length-1] == 'x') || (calArr[calArr.length-1] == '-') || (calArr[calArr.length-1] == '+')){
            calArr.pop();
            histDisp = histDisp.slice(0,histDisp.length - 2);
        }
    
        //if the array is empty, add a zero before the function
        if(calArr.length == 0){
            calArr.push(0);
            histDisp = histDisp + '0';
            if(input !== '='){
                calArr.push(input);
                histDisp = histDisp + ' ' + input;
            }
        }
        
        else if(input !== '='){
            calArr.push(input);
            histDisp = histDisp + ' ' + input;
        }

        numString = '';
               
    }

    //-------------call calculator function------------------------------------------------------------------------------------------------
    if(calArr.length >= 3){
        result = calculator(calArr[0],calArr[1],calArr[2]);
        calArr = [];
        calArr.push(result);
        if(input !== '='){
            calArr.push(input);
        }
    }

    //--------------call display function--------------------------------------------------------------------------------------------
    if(!numString && calArr.length > 0){
        currentDisp = calArr[0];
    }
    else{
        currentDisp = numString;
    }
    calcDisplay();

    
    lastInput = input;
    cFlag = 0;
}

//calculator function
function calculator(p1,p2,p3){
    let operand1;
    let operand2;
    let operator;
    let result;

    operand1 = p1;
    operator = p2;
    operand2 = p3;

    negWrap = 0;

    if(operator == '%'){
        result = operand1 % operand2;
    }

    else if(operator == '/'){
        result = operand1 / operand2;
    }

    else if (operator == 'x'){
        result = operand1 * operand2;
    }

    else if (operator == '-'){
        result = operand1 - operand2;
    }

    else if (operator == '+'){
        result = operand1 + operand2;
    }   


    result = result.toString();

    if(result.indexOf('.') !== -1){
        if(result.length - result.indexOf('.') >= 8){
            result = result.slice(0,result.indexOf('.') + 8);
        }
    }
    
    result = parseFloat(result);
    


    return result;
}

//screen display
function calcDisplay(){
    if((!currentDisp && !numString) || cFlag == 1){
        document.querySelector('.screen-text').innerHTML = '0';
    }
    else{
        document.querySelector('.screen-text').innerHTML = currentDisp;
    }
    
    document.querySelector('.screen-history').innerHTML = histDisp;
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
    buildCalArr(e.target.firstChild.data); 
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

