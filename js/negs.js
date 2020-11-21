'use strict'

function renderNegs(rowIdx, colIdx, mat) {
    for (var i = rowIdx - 1; i <= rowIdx + 1; i++) {
        if (i < 0 || i >= mat.length) continue;
        for (var j = colIdx - 1; j <= colIdx + 1; j++) {
            if (j < 0 || j >= mat[i].length) continue;
            if (i === rowIdx && j === colIdx) continue;
            for (var h = 0; h < gMinesCountArr.length; h++) {
                if (gMinesCountArr[h].i === i && gMinesCountArr[h].j === j) {
                    gBoard[i][j] = gMinesCountArr[h].numOfNegs;
                    if (gMinesCountArr[h].numOfNegs === 0) {
                        renderCell({ i, j }, ' ', gColorCell)
                            // gWhiteCells++;
                            // console.log(gWhiteCells);
                        gShownCells++;
                        console.log(gShownCells);

                    } else {
                        renderCell({ i, j }, gBoard[i][j], gColorCell)
                        gShownCells++;
                        console.log(gShownCells);

                    }
                }
            }
        }
    }
    // for (var i = 0; i < mat.length; i++) {
    //     for (var j = 0; j < mat[0].length; j++) {
    //         var elCell = document.querySelector(`[data-i="${i}"][data-j="${j}"]`);
    //         if (elCell.style.backgroundColor === 'white') {
    //             gWhiteCells++;
    //             console.log(gWhiteCells);
    //         }
    //     }
    // }
}

function revealNegsWithMines(rowIdx, colIdx, mat) {
    // gColorCell = ''
    for (var i = rowIdx - 1; i <= rowIdx + 1; i++) {
        if (i < 0 || i >= mat.length) continue;
        for (var j = colIdx - 1; j <= colIdx + 1; j++) {
            if (j < 0 || j >= mat[i].length) continue;
            if (i === rowIdx && j === colIdx) continue;
            for (var h = 0; h < gMinesCountArr.length; h++) {
                if (gMinesCountArr[h].i === i && gMinesCountArr[h].j === j) {
                    gBoard[i][j] = gMinesCountArr[h].numOfNegs;
                    if (gMinesCountArr[h].numOfNegs === 0) {
                        renderCell({ i, j }, ' ', gColorCell)
                            // gBoard[i][j].isShown = true;
                    } else {
                        renderCell({ i, j }, gBoard[i][j], gColorCell)
                            // gShownCells++;
                            // console.log(gShownCells);
                            // gBoard[i][j].isShown = true;
                    }
                } else if (gBoard[i][j] === MINE) {
                    renderCell({ i, j }, gBoard[i][j], gColorCell)
                }
            }
        }
    }

}

function renderNegsBack(rowIdx, colIdx, mat) {
    gColorCell = 'silver'
    for (var i = rowIdx - 1; i <= rowIdx + 1; i++) {
        if (i < 0 || i >= mat.length) continue;
        for (var j = colIdx - 1; j <= colIdx + 1; j++) {
            if (j < 0 || j >= mat[i].length) continue;
            if (i === rowIdx && j === colIdx) continue;
            for (var h = 0; h < gMinesCountArr.length; h++) {
                if (gMinesCountArr[h].i === i && gMinesCountArr[h].j === j) {
                    gBoard[i][j] = gMinesCountArr[h].numOfNegs;
                    if (gMinesCountArr[h].numOfNegs === 0) {
                        renderCell({ i, j }, ' ', gColorCell)
                        gShownCells--;
                        // gBoard[i][j].isShown = true;
                    } else {
                        renderCell({ i, j }, ' ', gColorCell)
                        gShownCells++;
                        // console.log(gShownCells);
                        // gBoard[i][j].isShown = true;
                    }
                } else if (gBoard[i][j] === MINE) {
                    renderCell({ i, j }, ' ', gColorCell)
                }
            }
        }
    }
}