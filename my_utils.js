
//Random (min, max)
function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min) + min)
}

//random 50-50
Math.random() > 0.5 ? true : false

//draw rand num
function drawNum() {
    var idx = getRandomInt(0, gNums.length)
    var num = gNums[idx]
    gNums.splice(idx, 1)
    return num
}

// copy mat
function copyMat(mat) {
    var newMat = [];
    for (var i = 0; i < mat.length; i++) {
        newMat[i] = [];
        for (var j = 0; j < mat[0].length; j++) {
            newMat[i][j] = mat[i][j];
        }
    }
    return newMat;
}

//count true cells around
function countFoodAround(mat, rowIdx, colIdx) {
    var foodCount = 0
    for (var i = rowIdx - 1; i <= rowIdx + 1; i++) {
        if (i < 0 || i > mat.length - 1) continue

        for (var j = colIdx - 1; j <= colIdx + 1; j++) {
            if (j < 0 || j > mat[0].length - 1) continue
            if (i === rowIdx && j === colIdx) continue
            var cell = mat[i][j]
            if (cell) {
                foodCount++
            }
        }
    }

    return foodCount
}
//matrix count conditionals
function checkVictory(pos, symbol) {

    var count = countInRow(gBoard, pos.i, symbol)
    if (count === gBoard.length) return true

    var count = countInCol(gBoard, pos.j, symbol)
    if (count === gBoard.length) return true

    // Main diagonal
    if (pos.i === pos.j) {
        var count = countInMainDiagonal(gBoard, symbol)
        if (count === gBoard.length) return true

    }

    // Secondary diagonal
    if (pos.i + pos.j === gBoard.length - 1) {
        var count = countInSecondaryDiagonal(gBoard, symbol)
        if (count === gBoard.length) return true

    }
    return false
}

//matrix count
function countInRow(board, rowIdx, symbol) {
    var count = 0
    for (var i = 0; i < board.length; i++) {
        var cell = board[rowIdx][i]
        if (cell === symbol) count++
    }
    return count
}

function countInCol(board, colIdx, symbol) {
    var count = 0
    for (var i = 0; i < board.length; i++) {
        var cell = board[i][colIdx]
        if (cell === symbol) count++
    }
    return count
}

function countInMainDiagonal(board, symbol) {
    var count = 0
    for (var i = 0; i < board.length; i++) {
        var cell = board[i][i]
        if (cell === symbol) count++
    }
    return count
}

function countInSecondaryDiagonal(board, symbol) {
    var count = 0
    for (var i = 0; i < board.length; i++) {
        var cell = board[i][board.length - 1 - i]
        if (cell === symbol) count++
    }
    return count
}