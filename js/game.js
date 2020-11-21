'use strict'

var MINE = '💣';
var FLAG = '🚩';

var gLevel = {
    SIZE: null,
    MINES: null
}
var minesAroundCount = 0;
var gMinesCountArr = [];

var gIdxArr = [];
var gBoard;
var gColorCell;
var gGame = {
    isOn: false,
    shownCount: 0,
    markedCount: 0,
    secsPassed: 0
}
var gClickOnMineCount = 0;
var gShownCells;
var gIntervalHint;
var gHintsCount;
var gMinesArr = [];
var flagCount = 0;
var gTimerIntervalId;

function setBoardSize(elBtn) {

    gLevel.SIZE = +elBtn.dataset.size;
    gLevel.MINES = +elBtn.dataset.mines;
    initGame();


}

// document.querySelector('.hints span') = LAMP_G;
function initGame() {

    clearInterval(gTimerIntervalId)

    document.querySelector('.smily span').innerText = '😀';
    document.querySelector('.fails span').innerText = '⭕⭕⭕';
    gBoard = createBoard();
    console.log(gBoard);
    printMat(gBoard, '.board');
    // gGame.isOn = true;
    // isVictory(gBoard);
}

function createBoard() {
    gMinesCountArr = [];
    gIntervalHint = 0;
    gShownCells = 0;
    gMinesArr = [];
    var board = [];
    for (var i = 0; i < gLevel.SIZE; i++) {
        board.push([]);
        for (var j = 0; j < gLevel.SIZE; j++) {
            board[i][j] = {
                minesAroundCount: 0,
                isShown: false,
                isMine: false,
                isMarked: true,
            }
        }
    }
    for (var h = 0; h < gLevel.MINES + 2; h++) {
        var randomI = parseInt(getRandomInt(0, gLevel.SIZE));
        var randomJ = parseInt(getRandomInt(0, gLevel.SIZE));
        board[randomI][randomJ] = MINE;
        gMinesArr.push({ randomI, randomJ })
    }
    console.log(gMinesArr);
    setMinesNegsCount(board);

    // isVictory = false;
    return board
}


function getRandomInt(min, max) {
    return Math.random() * (max - min) + min;
}

function printMat(mat, selector) {
    var strHTML = '<table border="0"><tbody>';
    for (var i = 0; i < mat.length; i++) {
        strHTML += '<tr>';
        for (var j = 0; j < mat[0].length; j++) {
            var cell = mat[i][j]
                // if (gGame.isOn) {
            if (cell === MINE) {
                // var className = cell ? 'occupied' : ''
                var className = '';
                strHTML += `<td data-i="${i}" data-j="${j}" onclick="cellClicked(this)" class="${className}" oncontextmenu="setFlag(event,this)">${' '}</td>`
            } else {
                var className = '';
                strHTML += `<td data-i="${i}" data-j="${j}" onclick="cellClicked(this)" class="${className}" oncontextmenu="setFlag(event,this)"> ${' '} </td>`
            }
            // }
        }
        strHTML += '</tr>'
    }
    strHTML += '</tbody></table>';
    var elContainer = document.querySelector(selector);
    elContainer.innerHTML = strHTML;
}
console.log(gBoard);

function setFlag(event, elCell) {
    var i = +elCell.dataset.i;
    var j = +elCell.dataset.j;
    renderCell({ i, j }, FLAG);
    flagCount++;
    if (gBoard[i][j] === MINE)
        flagCount--;
    console.log('flagCells', flagCount);
    event.preventDefault();
}

function cellClicked(elCell) {

    // isVictory = false;
    var i = +elCell.dataset.i;
    var j = +elCell.dataset.j;
    // gBoard[i][j].isShown = true;
    console.log(gBoard[i][j]);

    gColorCell = 'white';
    renderCell({ i, j }, gBoard[i][j], gColorCell)


    //hints:
    if (gIntervalHint) {
        gColorCell = 'grey'
        for (var h = 0; h < gMinesCountArr.length; h++) {
            if (gMinesCountArr[h].i === i && gMinesCountArr[h].j === j) {
                gBoard[i][j] = gMinesCountArr[h].numOfNegs;
                if (gMinesCountArr[h].numOfNegs === 0) {
                    renderCell({ i, j }, ' ', gColorCell)
                } else {
                    renderCell({ i, j }, gBoard[i][j], gColorCell)
                }
            }
        }
        revealNegsWithMines(i, j, gBoard)
        gIntervalHint = setTimeout(function() {
            gColorCell = 'silver';
            for (var h = 0; h < gMinesCountArr.length; h++) {
                if (gMinesCountArr[h].i === i && gMinesCountArr[h].j === j) {
                    gBoard[i][j] = gMinesCountArr[h].numOfNegs;
                    if (gMinesCountArr[h].numOfNegs === 0) {
                        renderCell({ i, j }, ' ', gColorCell)
                    } else {
                        renderCell({ i, j }, ' ', gColorCell)
                    }
                }
            }
            renderNegsBack(i, j, gBoard);
        }, 1000)
        gIntervalHint = 0;
        //end of hints
    } else {
        renderCell({ i, j }, gBoard[i][j], gColorCell)
        for (var h = 0; h < gMinesCountArr.length; h++) {
            if (gMinesCountArr[h].i === i && gMinesCountArr[h].j === j) {

                gBoard[i][j] = gMinesCountArr[h].numOfNegs;
                if (gMinesCountArr[h].numOfNegs === 0) {
                    renderCell({ i, j }, ' ', gColorCell)
                    gShownCells++;
                    console.log(gShownCells);
                    renderNegs(i, j, gBoard);
                } else {
                    renderCell({ i, j }, gBoard[i][j], gColorCell)
                    gShownCells++;
                    console.log(gShownCells);
                }
            }
        }
    }
    if (gBoard[i][j] === MINE) {
        gClickOnMineCount++;
        if (gClickOnMineCount < 3) {
            if (gClickOnMineCount === 1) {
                document.querySelector('.fails span').innerText = '⭕⭕❌';
                document.querySelector('.smily span').innerText = '🤯';
            }
            if (gClickOnMineCount === 2) {
                document.querySelector('.fails span').innerText = '⭕❌❌';
                document.querySelector('.smily span').innerText = '🤯';
            }
        } else {
            revealMines(gBoard)
            gameOver();
        }
    }
    // var whiteCells = 0;
    // for (var i = 0; i < gBoard.length; i++) {
    //     for (var j = 0; j < gBoard[0].length; j++) {
    //         var elCell = document.querySelector(`[data-i="${i}"][data-j="${j}"]`);
    //         if (elCell.style.backgroundColor === 'white')
    //             whiteCells++;
    //         else if (elCell.style.backgroundColor === 'red')
    //             whiteCells--;
    //     }
    // }
    // if (whiteCells === (gBoard.length ** 2) - gMinesArr.length) {
    //     if (isVictory) {
    //         document.querySelector('.smily span').innerText = '😎';
    //         // gGame.isOn = false;
    //         // setBoardSize();
    //     }
    // }
    checkVic();

}

function renderCell(pos, value, color) {
    var elCell = document.querySelector(`[data-i="${pos.i}"][data-j="${pos.j}"]`);
    elCell.style.backgroundColor = color;
    elCell.innerText = value;
    // console.log(elCell.style.backgroundColor);
}


function minesCount(rowIdx, colIdx, mat) { //cols and rows are just for the location check
    var negsCount = 0;
    for (var i = rowIdx - 1; i <= rowIdx + 1; i++) {
        if (i < 0 || i >= mat.length) continue;
        for (var j = colIdx - 1; j <= colIdx + 1; j++) {
            if (j < 0 || j > mat[i].length) continue;
            if (i === rowIdx && j === colIdx) continue;
            if (mat[i][j] === MINE) negsCount++;
        }
    }
    return negsCount;
}

function setMinesNegsCount(board) {
    for (var i = 0; i < board.length; i++) {
        for (var j = 0; j < board[0].length; j++) {
            var numOfNegs = minesCount(i, j, board);
            if (board[i][j] !== MINE) {
                board[i][j].minesAroundCount = numOfNegs;
                gMinesCountArr.push({ i, j, numOfNegs })
            }
        }
    }
}

function revealMines(board) {
    for (var i = 0; i < board.length; i++) {
        for (var j = 0; j < board[0].length; j++) {
            if (board[i][j] === MINE) {
                gColorCell = 'red'
                renderCell({ i, j }, MINE, gColorCell)
            }
        }
    }
}

function gameOver() {
    console.log('game over');
    document.querySelector('.smily span').innerText = '😫';
    document.querySelector('.fails span').innerText = '❌❌❌';
    // setBoardSize();
    // gGame.isOn = false;
}

function checkVic() {
    var whiteCells = 0;
    for (var i = 0; i < gBoard.length; i++) {
        for (var j = 0; j < gBoard[0].length; j++) {
            var elCell = document.querySelector(`[data-i="${i}"][data-j="${j}"]`);
            if (elCell.style.backgroundColor === 'white')
                whiteCells++;
            else if (elCell.style.backgroundColor === 'red')
                whiteCells--;
        }
    }
    if (whiteCells === (gBoard.length ** 2) - gMinesArr.length) {
        if (isVictory) {
            document.querySelector('.smily span').innerText = '😎';
            // gGame.isOn = false;
            // setBoardSize();
        }
    }
}

function isVictory(board) {
    var whiteCellsCount = 0;
    var normalCellsCount = (board.length ** 2) - gMinesArr.length;
    console.log(normalCellsCount);
    var check = 0;
    for (var i = 0; i < board.length; i++) {
        for (var j = 0; j < board[0].length; j++) {
            if (board[i][j].style.backgroundColor === 'white')
                whiteCellsCount++;
        }
    }
    if (gMinesArr.length === flagCount)
        check++;
    if (whiteCellsCount === normalCellsCount && check === 1)
        return true;
}


function useAHint(hintBtn) {
    hintBtn.innerText = '❗';
    gIntervalHint++;
}