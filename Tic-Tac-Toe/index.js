const gameBoard = document.getElementById("gameBoard");
const dimensionValue = document.getElementById("dimensionValue")
const rootCSS = document.querySelector(":root");

const MAX_MINUTES = 0, MAX_SECONDS = 30;
let dimension, allSquare, xTimeoutId, oTimeoutId, xSecondes = MAX_SECONDS, oSecondes = MAX_SECONDS, xMinutes = MAX_MINUTES, oMinutes = MAX_MINUTES;
let currentPlayer = "x", xSquare = [], oSquare = [];


dimensionValue.addEventListener("change", initializeBoard);

initializeBoard();


function initializeBoard(){

    while(gameBoard.firstChild) gameBoard.removeChild(gameBoard.firstChild);    

    clearTimeout(xTimeoutId);
    clearTimeout(oTimeoutId);

    currentPlayer = "x", xSquare = [], oSquare = [];
    xSecondes = MAX_SECONDS, oSecondes = MAX_SECONDS, xMinutes = MAX_MINUTES, oMinutes = MAX_MINUTES;

    xSecondes = xSecondes.toString().padStart(2, 0);
    xMinutes = xMinutes.toString().padStart(2, 0);
    document.getElementById("xTimer").innerHTML = `X Timer: ${xMinutes} : ${xSecondes}`;

    oSecondes = oSecondes.toString().padStart(2, 0);
    oMinutes = oMinutes.toString().padStart(2, 0);
    document.getElementById("oTimer").innerHTML = `O Timer: ${oMinutes} : ${oSecondes}`;

    dimension = Number(dimensionValue.value);
    rootCSS.style.setProperty("--dimension", dimension);

    for(i=0; i<(dimension * dimension); i++){
        const square  =  document.createElement("div");
        square.setAttribute("sqaure-id", i);
        square.setAttribute("row", Math.floor(i/dimension) + 1);
        square.setAttribute("column", i % dimension + 1);
        square.classList.add("square");
        
        gameBoard.appendChild(square);
    }

    allSquare = document.querySelectorAll("#gameBoard .square");
    xTimer();

    addSquareEventListener();
}

function addSquareEventListener(){
    allSquare.forEach( square => {
        square.removeEventListener("click", playMove);
        if( !square.getAttribute("holder") ) square.addEventListener("click", playMove);
    } )
}

function playMove(e){
    const square = e.target;

    if(currentPlayer === "x") {
        square.classList.remove("o");
        square.classList.add("x");
        xSquare.push(square);
    }
    else if(currentPlayer === "o") {
        square.classList.remove("x");
        square.classList.add("o");
        oSquare.push(square);
    }

    square.setAttribute("holder", currentPlayer);

    currentPlayer = (currentPlayer === "x")? "o" : "x";

    if(currentPlayer === "o"){
        clearTimeout(xTimeoutId);
        oTimer();
    }
    else if(currentPlayer === "x"){
        clearTimeout(oTimeoutId);
        xTimer();
    }

    const result = checkForWin();

    if(!result){
        let count = 0;

        allSquare.forEach( square => {
            if( square.getAttribute("holder") ) count++;
        } );

        if(count === (dimension * dimension)) gameOver();
    }
    else{
        gameOver(result);
    }

    addSquareEventListener();
}

function checkForWin(){
    if(checkHorizontal(oSquare)) return "O won";
    else if(checkVertical(oSquare)) return "O won";
    else if(checkDiagonal(oSquare)) return "O won";

    if(checkHorizontal(xSquare)) return "X won";
    else if(checkVertical(xSquare)) return "X won";
    else if(checkDiagonal(xSquare)) return "X won";

    return false;
}

function checkHorizontal(squares){
    let count = new Array(dimension).fill(0);

    squares.forEach( square => {
        count[Number(square.getAttribute("row")) - 1]++;
    } );
    
    if( count.indexOf(dimension) != -1 ) return true;

    return false;
}

function checkVertical(squares){
    let count = new Array(dimension).fill(0);

    squares.forEach( square => {
        count[Number(square.getAttribute("column")) - 1]++;
    } );
    
    if( count.indexOf(dimension) != -1 ) return true; //checking if there are 3 in a column

    return false;
}

function checkDiagonal(squares){
    let leftDiagonalCount = 0;
    let rightDiagonalCount = 0;

    squares.forEach( square => {
        const row = Number(square.getAttribute("row"));
        const column = Number(square.getAttribute("column"));
        
        if(dimension % 2 === 0){
            if(row === column) leftDiagonalCount++;
            if(row + column === dimension+1) rightDiagonalCount++;
        }else{
            if(row === column){
                if(row === column === Math.ceil(dimension/2)) {
                    leftDiagonalCount++;
                    rightDiagonalCount++;
                }else{
                    leftDiagonalCount++;
                }
            }

            if(row + column === dimension+1) rightDiagonalCount++;
        }
    } );

    if( leftDiagonalCount === dimension || rightDiagonalCount === dimension ) //checking if there are 3 in a diagonal
        return true;

    return false;
}

function gameOver(result = "Draw"){
    setTimeout( () => { window.alert(result); initializeBoard(); }, 100 );
}

function xTimer(){
    if(xSecondes === 0) {
        if(xMinutes === 0) {
            gameOver("X ran out of time :(");
            return;
        }
        xMinutes--;
        xSecondes = 60;
    }

    xSecondes--;

    xSecondes = xSecondes.toString().padStart(2, 0);
    xMinutes = xMinutes.toString().padStart(2, 0);
    document.getElementById("xTimer").innerHTML = `X Timer: ${xMinutes} : ${xSecondes}`;
    xSecondes = Number(xSecondes);
    xMinutes = Number(xMinutes);

    xTimeoutId = setTimeout(xTimer, 1000);
}


function oTimer(){
    if(oSecondes === 0) {
        if(oMinutes === 0) {
            gameOver("O ran out of time :(");
            return;
        }
        oMinutes--;
        oSecondes = 60;
    }

    oSecondes--;

    oSecondes = oSecondes.toString().padStart(2, 0);
    oMinutes = oMinutes.toString().padStart(2, 0);
    document.getElementById("oTimer").innerHTML = `O Timer: ${oMinutes} : ${oSecondes}`;

    oSecondes = Number(oSecondes);
    oMinutes = Number(oMinutes);

    oTimeoutId = setTimeout(oTimer, 1000);
}