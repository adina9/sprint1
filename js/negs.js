'use strict'

function renderNegs(idxI, idxJ) {
    gColorCell = 'white'
    var i = idxI + 1;
    var j = idxJ + 1;
    gIdxArr.push({ i, j })
    var i = idxI - 1;
    var j = idxJ - 1;
    gIdxArr.push({ i, j })
    var i = idxI + 1;
    var j = idxJ - 1;
    gIdxArr.push({ i, j })
    var i = idxI - 1;
    var j = idxJ + 1;
    gIdxArr.push({ i, j })
    var i = idxI;
    var j = idxJ + 1;
    gIdxArr.push({ i, j })
    var i = idxI;
    var j = idxJ - 1;
    gIdxArr.push({ i, j });
    var i = idxI + 1;
    var j = idxJ;
    gIdxArr.push({ i, j })
    var i = idxI - 1;
    var j = idxJ;
    gIdxArr.push({ i, j })
        // console.log(gIdxArr);

    var i = idxI + 1;
    var j = idxJ + 1;
    for (var h = 0; h < gMinesCountArr.length; h++) {
        if (gMinesCountArr[h].i === i && gMinesCountArr[h].j === j) {
            gBoard[i][j] = gMinesCountArr[h].numOfNegs;
            if (gMinesCountArr[h].numOfNegs === 0) {
                renderCell({ i, j }, ' ', gColorCell)
                window.oncontextmenu = function(e) {
                    e.preventDefault()
                    renderCell({ i, j }, FLAG, gColorCell)
                }
            } else
                renderCell({ i, j }, gBoard[i][j], gColorCell)
        }
    }

    var i = idxI - 1;
    var j = idxJ - 1;
    // console.log({ i, j });
    for (var h = 0; h < gMinesCountArr.length; h++) {
        if (gMinesCountArr[h].i === i && gMinesCountArr[h].j === j) {
            gBoard[i][j] = gMinesCountArr[h].numOfNegs;
            if (gMinesCountArr[h].numOfNegs === 0) {
                renderCell({ i, j }, ' ', gColorCell)
                window.oncontextmenu = function(e) {
                    e.preventDefault()
                    renderCell({ i, j }, FLAG, gColorCell)
                }
            } else
                renderCell({ i, j }, gBoard[i][j], gColorCell)
        }
    }
    var i = idxI + 1;
    var j = idxJ - 1;
    // console.log({ i, j });
    for (var h = 0; h < gMinesCountArr.length; h++) {
        if (gMinesCountArr[h].i === i && gMinesCountArr[h].j === j) {
            gBoard[i][j] = gMinesCountArr[h].numOfNegs;
            if (gMinesCountArr[h].numOfNegs === 0) {
                renderCell({ i, j }, ' ', gColorCell)
                window.oncontextmenu = function(e) {
                    e.preventDefault()
                    renderCell({ i, j }, FLAG, gColorCell)
                }
            } else
                renderCell({ i, j }, gBoard[i][j], gColorCell)
        }
    }
    var i = idxI - 1;
    var j = idxJ + 1;
    // console.log({ i, j });
    for (var h = 0; h < gMinesCountArr.length; h++) {
        if (gMinesCountArr[h].i === i && gMinesCountArr[h].j === j) {
            gBoard[i][j] = gMinesCountArr[h].numOfNegs;
            if (gMinesCountArr[h].numOfNegs === 0) {
                renderCell({ i, j }, ' ', gColorCell)
                window.oncontextmenu = function(e) {
                    e.preventDefault()
                    renderCell({ i, j }, FLAG, gColorCell)
                }
            } else
                renderCell({ i, j }, gBoard[i][j], gColorCell)
        }
    }
    var i = idxI;
    var j = idxJ + 1;
    // console.log({ i, j });
    for (var h = 0; h < gMinesCountArr.length; h++) {
        if (gMinesCountArr[h].i === i && gMinesCountArr[h].j === j) {
            gBoard[i][j] = gMinesCountArr[h].numOfNegs;
            if (gMinesCountArr[h].numOfNegs === 0) {
                renderCell({ i, j }, ' ', gColorCell)
                window.oncontextmenu = function(e) {
                    e.preventDefault()
                    renderCell({ i, j }, FLAG, gColorCell)
                }
            } else
                renderCell({ i, j }, gBoard[i][j], gColorCell)
        }
    }
    var i = idxI;
    var j = idxJ - 1;
    // console.log({ i, j });
    for (var h = 0; h < gMinesCountArr.length; h++) {
        if (gMinesCountArr[h].i === i && gMinesCountArr[h].j === j) {
            gBoard[i][j] = gMinesCountArr[h].numOfNegs;
            if (gMinesCountArr[h].numOfNegs === 0) {
                renderCell({ i, j }, ' ', gColorCell)
                window.oncontextmenu = function(e) {
                    e.preventDefault()
                    renderCell({ i, j }, FLAG, gColorCell)
                }
            } else
                renderCell({ i, j }, gBoard[i][j], gColorCell)
        }
    }
    var i = idxI + 1;
    var j = idxJ;
    // console.log({ i, j });
    for (var h = 0; h < gMinesCountArr.length; h++) {
        if (gMinesCountArr[h].i === i && gMinesCountArr[h].j === j) {
            gBoard[i][j] = gMinesCountArr[h].numOfNegs;
            if (gMinesCountArr[h].numOfNegs === 0) {
                renderCell({ i, j }, ' ', gColorCell)
                window.oncontextmenu = function(e) {
                    e.preventDefault()
                    renderCell({ i, j }, FLAG, gColorCell)
                }
            } else
                renderCell({ i, j }, gBoard[i][j], gColorCell)
        }
    }
    var i = idxI - 1;
    var j = idxJ;
    // console.log({ i, j });
    for (var h = 0; h < gMinesCountArr.length; h++) {
        if (gMinesCountArr[h].i === i && gMinesCountArr[h].j === j) {
            gBoard[i][j] = gMinesCountArr[h].numOfNegs;
            if (gMinesCountArr[h].numOfNegs === 0) {
                renderCell({ i, j }, ' ', gColorCell)
                window.oncontextmenu = function(e) {
                    e.preventDefault()
                    renderCell({ i, j }, FLAG, gColorCell)
                }
            } else
                renderCell({ i, j }, gBoard[i][j], gColorCell)
        }
    }


    // console.log({ currPosI, currPosJ });
    // renderCell({ currPosI, currPosJ }, gBoard[currPosI][currPosJ])
    // console.log({ currPosI, currPosJ }, gBoard[currPosI][currPosJ])
}