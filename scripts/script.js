//define variables
let x;
let operString = '';
let operArr = [];
let operStringHistory = '';
let buttons;
let num1 = '';
let num2 = '';
let operator;
let result;
let calcFlag;


//Regular Functions
function getOperationString(p1){
    let y;
    let regexMul = 'x';
    let regexDiv = '/';
    let regexSpec = '+-/*';

    //Build operation array
    if( (p1 != '=') && (p1 != '+') && (p1 != '-') && (p1 != 'x') && (p1 != '/')){
        operString = operString + p1;
        console.log(operString);
    }

    else if( (p1 == '+') || (p1 == '-') || (p1 == 'x') || (p1 == '/') || (p1 == '=')){
        operArr.push(operString);
        operArr.push(p1);
        operString = '';
    }

    //Perform operations in array according to PEMDAS
    if(p1 == '='){
        //remove the '=' off the end
        operArr.pop();
        while(operArr.length > 1){
            //First do multiplication
            for(y = 0; y < operArr.length; y++){
                if(regexMul.indexOf(operArr[y]) != -1){
                    num1 = operArr[y-1];
                    operator = operArr[y];
                    num2 = operArr[y+1];
                    console.log('num1 is ' + num1);
                    console.log('operator is ' + operator);
                    console.log('num2 is ' + num2);
                    result = calculateResult(num1,operator,num2);
                    result = result.toString();
                    operArr.splice(y-1,y+2,result);
                    console.log('result is ' + result);
                }
            }
            
            //Then do division
            for(y = 0; y < operArr.length; y++){
                if(regexDiv.indexOf(operArr[y]) != -1){
                    num1 = operArr.slice(y - 1,y);
                    operator = operArr.slice(y,y + 1);
                    num2 = operArr.slice(y + 1,y + 2);
                    result = calculateResult(num1,operator,num2);
                    result = result.toString();
                    operArr.splice(y-1,y+2,result);
                    console.log('result is ' + result);
                }
            }
        }
    }

    

    

   
    



    //only display the most recent 10 characters
    //console.log(operString);
    //document.querySelector('.screen-text').innerHTML = operString;
}

function calculateResult(p1,p2,p3){
    let operand1 = p1;
    let operator1 = p2;
    let operand2 = p3;

    operand1 = parseFloat(p1);
    operand2 = parseFloat(p3);

    calcFlag = 0;

    console.log(operand1);
    console.log(operator1);
    console.log(operand2);

    if(operator1 == '%'){
        calcFlag = 1;
        return operand1 % operand2;
    }
    else if(operator1 == '/'){
        calcFlag = 1;
        return operand1 / operand2;
    }
    else if(operator1 == 'x'){
        calcFlag = 1;
        return operand1 * operand2;
    }
    else if(operator1 == '-'){
        calcFlag = 1;
        return operand1 - operand2;
    }
    else{
        calcFlag = 1;
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
    getOperationString(e.target.firstChild.data); 
}

function releaseButton(e){
    e.target.className = e.target.className = e.target.className.replace('-click','');
}

/*function keyPressDown(e){
    let button;
    if(e.keyCode == 49){
        button = document.querySelector(`button[data-key="${1}"]`);
        button.className = (button.className.replace('-hover','') + '-click');
        //console.log(button.className);
    }
    
}

function keyPressDown(e){
    let button;
    if(e.keyCode == 49){
        button = document.querySelector(`button[data-key="${1}"]`);
        button.className = (button.className.replace('-click','');
        //console.log(button.className);
    }
    
}*/





//Event Listeners

/*document.addEventListener('keydown',keyPressDown);
document.addEventListneer('keyup',keyPressUp);*/

buttons = document.querySelectorAll('button');
for(x = 0; x < buttons.length; x++){
    buttons[x].addEventListener('mouseover',mouseoverButton);
    buttons[x].addEventListener('mouseout',mouseoutButton);
    buttons[x].addEventListener('mousedown',clickButton);
    buttons[x].addEventListener('mouseup',releaseButton);   
}




