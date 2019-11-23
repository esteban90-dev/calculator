//define variables
let x;
let buttons;



//functions
function mouseoverButton(e){
    e.target.style.border = "solid";
    e.target.style.borderColor = "rgb(54, 54, 54)";
    console.log(e);
}

function mouseoutButton(e){
    e.target.style.border = "solid";
    e.target.style.borderColor = "rgb(170, 170, 170)";
}





//add mousover highlights to buttons
buttons = document.querySelectorAll('button');
for(x = 0; buttons.length; x++){
    buttons[x].addEventListener('mouseover',mouseoverButton);
    buttons[x].addEventListener('mouseout',mouseoutButton);
}

