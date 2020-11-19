'use strict'
var MINE = '💣';
var FLAG = '🚩';
var gLevel = {
        SIZE: null,
        MINES: null
    }
    // gLevel.SIZE = setBoardSize()
var minesAroundCount = 0;
var gMinesCountArr = [];
console.log(gMinesCountArr);
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
// var gInterval;

function setBoardSize(elBtn) {
    gLevel.SIZE = +elBtn.dataset.size;
    gLevel.MINES = +elBtn.dataset.mines;
    initGame();
}

function initGame() {
    document.querySelector('.smily span').innerText = '😀';
    document.querySelector('.fails span').innerText = '⭕⭕⭕';
    gGame.isOn = true;
    gBoard = createBoard();
    console.log(gBoard);
    printMat(gBoard, '.board');
    // document.querySelector('.board').style.display = 'block';

}

function createBoard() {
    var board = [];
    for (var i = 0; i < gLevel.SIZE; i++) {
        board.push([]);
        for (var j = 0; j < gLevel.SIZE; j++) {
            board[i][j] = {
                minesAroundCount: 0,
                isShown: false,
                isMine: false,
                isMarked: true,
                type: ' '
            }
        }
    }
    for (var h = 0; h < gLevel.MINES; h++) {
        var randomI = parseInt(getRandomInt(0, gLevel.SIZE));
        var randomJ = parseInt(getRandomInt(0, gLevel.SIZE));
        // board[randomI][randomJ].isMine = true;
        board[randomI][randomJ] = MINE;
    }
    setMinesNegsCount(board);
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
            if (gGame.isOn) {
                if (cell === MINE) {
                    // var className = cell ? 'occupied' : ''
                    var className = '';
                    strHTML += `<td data-i="${i}" data-j="${j}" onclick="cellClicked(this)" class="${className}">${' '}</td>`
                } else {
                    var className = '';
                    strHTML += `<td data-i="${i}" data-j="${j}" onclick="cellClicked(this)" class="${className}"> ${' '} </td>`
                }
            }
        }
        strHTML += '</tr>'
    }
    strHTML += '</tbody></table>';
    var elContainer = document.querySelector(selector);
    elContainer.innerHTML = strHTML;
}
console.log(gBoard);

function cellClicked(elCell) {

    var i = +elCell.dataset.i;
    var j = +elCell.dataset.j;
    console.log(gBoard[i][j]);

    gColorCell = 'white';
    renderCell({ i, j }, gBoard[i][j], gColorCell)

    // window.oncontextmenu = function(e) {
    //     e.preventDefault()
    //     renderCell({ i, j }, FLAG, gColorCell)
    // }
    for (var h = 0; h < gMinesCountArr.length; h++) {
        if (gMinesCountArr[h].i === i && gMinesCountArr[h].j === j) {
            gBoard[i][j] = gMinesCountArr[h].numOfNegs;
            if (gMinesCountArr[h].numOfNegs === 0) {
                renderCell({ i, j }, ' ', gColorCell)
                renderNegs(i, j);
            } else
                renderCell({ i, j }, gBoard[i][j], gColorCell)
        }
    }
    window.oncontextmenu = function(e) {
        e.preventDefault()
        renderCell({ i, j }, FLAG, gColorCell)
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
}


function renderCell(pos, value, color) {
    var elCell = document.querySelector(`[data-i="${pos.i}"][data-j="${pos.j}"]`);
    elCell.style.backgroundColor = color;
    elCell.innerText = value
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
    gGame.isOn = false;
}

function restart() {
    document.querySelector('.smily span').innerText = '😀';
    document.querySelector('.fails span').innerText = '⭕⭕⭕';
    // document.querySelector('.board').style.display = 'none';
    initGame();
    // clearInterval(gInterval);

}
// window.oncontextmenu = function() {
//     addFlag();
//     return false; // cancel default menu
// }

// addFlag