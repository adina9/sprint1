'use strict'
var MINE = '💣';
var FLAG = '🚩';
var minesAroundCount = 0;
var gMinesCountArr = [];
console.log(gMinesCountArr);
var gIdxArr = [];

function createBoard() {
    var board = [];
    for (var i = 0; i < 4; i++) {
        board.push([]);
        for (var j = 0; j < 4; j++) {
            board[i][j] = {
                minesAroundCount: 0,
                isShown: false,
                isMine: false,
                isMarked: true,
                type: ' '
            }
        }
    }
    for (var h = 0; h < 2; h++) {
        var randomI = parseInt(getRandomInt(0, 4));
        var randomJ = parseInt(getRandomInt(0, 4));
        // board[randomI][randomJ].isMine = true;
        board[randomI][randomJ] = MINE;
    }
    setMinesNegsCount(board);
    return board
}
var gBoard = createBoard();
console.log(gBoard);
printMat(gBoard, '.board');

function getRandomInt(min, max) {
    return Math.random() * (max - min) + min;
}

function printMat(mat, selector) {
    var strHTML = '<table border="0"><tbody>';
    for (var i = 0; i < mat.length; i++) {
        strHTML += '<tr>';
        for (var j = 0; j < mat[0].length; j++) {
            var cell = mat[i][j]
            if (cell === MINE) {
                // var className = cell ? 'occupied' : ''
                var className = '';
                strHTML += `<td data-i="${i}" data-j="${j}" onclick="cellClicked(this)" class="${className}">${' '}</td>`
            } else {
                var className = '';
                strHTML += `<td data-i="${i}" data-j="${j}" onclick="cellClicked(this)" class="${className}"> ${' '} </td>`
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
    renderCell({ i, j }, gBoard[i][j])
    for (var h = 0; h < gMinesCountArr.length; h++) {
        if (gMinesCountArr[h].i === i && gMinesCountArr[h].j === j) {
            gBoard[i][j] = gMinesCountArr[h].numOfNegs;
            if (gMinesCountArr[h].numOfNegs === 0) {
                renderCell({ i, j }, ' ')
                renderNegs(i, j);

            } else {
                renderCell({ i, j }, gBoard[i][j])

            }
        }
    }
    window.oncontextmenu = function(e) {
        e.preventDefault()
        renderCell({ i, j }, FLAG)

    }
}


function renderCell(pos, value) {
    var elCell = document.querySelector(`[data-i="${pos.i}"][data-j="${pos.j}"]`);
    // elCell.style.backgroundColor = 'grey';
    elCell.innerText = value
}

function renderNegs(idxI, idxJ) {

    var i = idxI + 1;
    var j = idxJ + 1;
    console.log({ i, j });
    gIdxArr.push({ i, j })
    var i = idxI - 1;
    var j = idxJ - 1;
    console.log({ i, j });
    gIdxArr.push({ i, j })
    var i = idxI + 1;
    var j = idxJ - 1;
    console.log({ i, j });
    gIdxArr.push({ i, j })
    var i = idxI - 1;
    var j = idxJ + 1;
    console.log({ i, j });
    gIdxArr.push({ i, j })
    var i = idxI;
    var j = idxJ + 1;
    console.log({ i, j });
    gIdxArr.push({ i, j })
    var i = idxI;
    var j = idxJ - 1;
    console.log({ i, j });
    gIdxArr.push({ i, j });
    var i = idxI + 1;
    var j = idxJ;
    console.log({ i, j });
    gIdxArr.push({ i, j })
    var i = idxI - 1;
    var j = idxJ;
    console.log({ i, j });
    gIdxArr.push({ i, j })
    console.log(gIdxArr);

    for (var h = 0; h < gMinesCountArr.length; h++) {
        if (gMinesCountArr[h].i === i && gMinesCountArr[h].j === j) {
            gBoard[i][j] = gMinesCountArr[h].numOfNegs;
            renderCell({ i, j }, gBoard[i][j])
        }
    }

    var i = idxI - 1;
    var j = idxJ - 1;
    console.log({ i, j });
    for (var h = 0; h < gMinesCountArr.length; h++) {
        if (gMinesCountArr[h].i === i && gMinesCountArr[h].j === j) {
            gBoard[i][j] = gMinesCountArr[h].numOfNegs;
            renderCell({ i, j }, gBoard[i][j])
        }
    }
    var i = idxI + 1;
    var j = idxJ - 1;
    console.log({ i, j });
    for (var h = 0; h < gMinesCountArr.length; h++) {
        if (gMinesCountArr[h].i === i && gMinesCountArr[h].j === j) {
            gBoard[i][j] = gMinesCountArr[h].numOfNegs;
            renderCell({ i, j }, gBoard[i][j])
        }
    }
    var i = idxI - 1;
    var j = idxJ + 1;
    console.log({ i, j });
    for (var h = 0; h < gMinesCountArr.length; h++) {
        if (gMinesCountArr[h].i === i && gMinesCountArr[h].j === j) {
            gBoard[i][j] = gMinesCountArr[h].numOfNegs;
            renderCell({ i, j }, gBoard[i][j])
        }
    }
    var i = idxI;
    var j = idxJ + 1;
    console.log({ i, j });
    for (var h = 0; h < gMinesCountArr.length; h++) {
        if (gMinesCountArr[h].i === i && gMinesCountArr[h].j === j) {
            gBoard[i][j] = gMinesCountArr[h].numOfNegs;
            renderCell({ i, j }, gBoard[i][j])
        }
    }
    var i = idxI;
    var j = idxJ - 1;
    console.log({ i, j });
    for (var h = 0; h < gMinesCountArr.length; h++) {
        if (gMinesCountArr[h].i === i && gMinesCountArr[h].j === j) {
            gBoard[i][j] = gMinesCountArr[h].numOfNegs;
            renderCell({ i, j }, gBoard[i][j])
        }
    }
    var i = idxI + 1;
    var j = idxJ;
    console.log({ i, j });
    for (var h = 0; h < gMinesCountArr.length; h++) {
        if (gMinesCountArr[h].i === i && gMinesCountArr[h].j === j) {
            gBoard[i][j] = gMinesCountArr[h].numOfNegs;
            renderCell({ i, j }, gBoard[i][j])
        }
    }
    var i = idxI - 1;
    var j = idxJ;
    console.log({ i, j });
    for (var h = 0; h < gMinesCountArr.length; h++) {
        if (gMinesCountArr[h].i === i && gMinesCountArr[h].j === j) {
            gBoard[i][j] = gMinesCountArr[h].numOfNegs;
            renderCell({ i, j }, gBoard[i][j])
        }
    }


    // console.log({ currPosI, currPosJ });
    // renderCell({ currPosI, currPosJ }, gBoard[currPosI][currPosJ])
    // console.log({ currPosI, currPosJ }, gBoard[currPosI][currPosJ])
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

// window.oncontextmenu = function() {
//     addFlag();
//     return false; // cancel default menu
// }

// addFlag