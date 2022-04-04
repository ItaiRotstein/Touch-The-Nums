'use strict'

var gNums = []
var gBoardSize = 4
var gCount = 1
var gSecInterval
var gMilliInterval
var gIsGameOn = false

function initGame() {
    gCount = 1
    createNumbers()
    renderTable()
    clearInterval(gSecInterval)
    clearInterval(gMilliInterval)
    initBoardSize()
    initTimer()
}

function initBoardSize() {
    var elChooseSize = document.querySelector('.chooseSize')
    elChooseSize.style.display = 'inline'
}

function boardSize(clickedSize) {
    gBoardSize = clickedSize.innerText ** 0.5
    initGame()
    gCount = 1
    var elVictory = document.querySelector('.victory')
    elVictory.style.display = 'none'

}

function createNumbers() {
    for (var i = 1; i <= gBoardSize ** 2; i++) {
        gNums.push(i)
    }
}

function renderTable() {
    var elBoard = document.querySelector('.board')
    var strHTML = ''
    for (var i = 0; i < gBoardSize; i++) {
        strHTML += `<tr>\n`
        for (var j = 0; j < gBoardSize; j++) {
            var num = drawNum()
            strHTML += `\t<td onclick = "cellClicked(this)">${num}</td>\n`
        }
        strHTML += `</tr>\n`
    }
    elBoard.innerHTML = strHTML
}

function cellClicked(clickedNum) {
    var elChooseSize = document.querySelector('.chooseSize')
    var elVictory = document.querySelector('.victory')
    var elNewGame = document.querySelector('.newGameBtn')
    if (+clickedNum.innerText === gCount) {
        clickedNum.classList.add('clicked')
        gCount++
        if (!gIsGameOn) {
            getTimer()
            elVictory.style.display = 'none'
            elChooseSize.style.display = 'none'
            elNewGame.style.display = 'none'
            gIsGameOn = true
        }
        if (gCount > gBoardSize ** 2) {
            clearInterval(gSecInterval)
            clearInterval(gMilliInterval)
            gIsGameOn = false
            elVictory.style.display = 'inline'
            elNewGame.style.display = 'inline'
            elChooseSize.style.display = 'inline'
            gCount = 1
        }
    }
}

function drawNum() {
    var idx = getRandomInt(0, gNums.length)
    var num = gNums[idx]
    gNums.splice(idx, 1)
    return num
}

function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min) + min)
}

function initTimer() {
    var elSeconds = document.querySelector('.seconds')
    var elMillisec = document.querySelector('.milliSec')
    elSeconds.innerText = '00:'
    elMillisec.innerText = '00'
}

function getTimer() {
    var elSeconds = document.querySelector('.seconds')
    var seconds = '00'
    elSeconds.innerText = seconds + ':'

    gSecInterval = setInterval(() => {
        seconds++
        elSeconds.innerText = seconds + ':'
        if (seconds < 10) elSeconds.innerText = '0' + seconds + ':'

    }, 1000)

    var elMillisec = document.querySelector('.milliSec')
    var milliSeconds = '0'

    gMilliInterval = setInterval(() => {
        milliSeconds++
        if (milliSeconds > 99) milliSeconds = 0
        elMillisec.innerText = '0' + milliSeconds
        if (milliSeconds < 10) elMillisec.innerText += '0'


    }, 10)
}
