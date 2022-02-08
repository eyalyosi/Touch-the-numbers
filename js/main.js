'use strict';

var gBoardSize = 16
var gNums = []
var gCounter
var gTimerId = null

function init() {
    clearInterval(gTimerId)
    gTimerId = null
    var elDiv = document.querySelector('.timer')
    elDiv.innerText = '0.000'
    gNums = shuffle(createNums())
    gCounter = 1
    renderBoard()
}

function startGame(size) {
    gBoardSize = size
    init()
}

function createNums() {
    var nums = []
    for (var i = 1; i <= gBoardSize; i++) {
        nums.push(i)
    }
    return nums
}

function drawNum() {
    return gNums.pop()
}

function renderBoard() {
    var length = Math.sqrt(gBoardSize)
    var strHTML = '';
    for (var i = 0; i < length; i++) {
        strHTML += '<tr>';
        for (var j = 0; j < length; j++) {
            var num = drawNum()
            strHTML += `<td onclick="numClicked(this)">${num}</td>`
        }
        strHTML += '</tr>'
    }
    var elBoard = document.querySelector('.board');
    elBoard.innerHTML = strHTML;
}

function numClicked(elCell) {
    if (!gTimerId) startTimer()
    if (elCell.innerText === gCounter + '') {
        elCell.style.backgroundColor = '#4FBDBA'
        if (gCounter === gBoardSize) {
            clearInterval(gTimerId)
        }
        gCounter++
    }
    console.log(gCounter);
}

function shuffle(items) {
    var randIdx, keep, i;
    for (i = items.length - 1; i > 0; i--) {
        randIdx = getRandomInt(0, items.length - 1);
        keep = items[i];
        items[i] = items[randIdx];
        items[randIdx] = keep;
    }
    return items;
}

function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min; //The maximum is inclusive and the minimum is inclusive 
}

function startTimer() {
    var startTime = Date.now()

    gTimerId = setInterval(function () {
        var elDiv = document.querySelector('.timer')
        var currTime = Date.now()
        var printTime = (currTime - startTime) / 1000
        elDiv.innerText = printTime
    }, 23)
}