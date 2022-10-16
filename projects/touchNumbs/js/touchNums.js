
const beginner = {i:4, j:4, m:16 }
const advanced = { i: 5, j: 5, m: 25 }
const expert = { i: 6, j: 6, m: 36 }
var gInterval
var timeCounter = 0
var timeCounterSec = 0
var timeCounterMin=0
var testArray=[]
var difficulty= beginner
var cellClickedCounter = -1
var gBoard
var mineLevel = document.getElementById("status").addEventListener('change', function () {
    if (document.getElementById("Beginner").checked) {
        difficulty = beginner
    }
    if (document.getElementById("Advanced").checked) {
        difficulty = advanced
    }
    if (document.getElementById("Expert").checked) {
        difficulty = expert
    }
    initGame()
})


initGame()
 

function initGame() {
    testArray = createTestArray(difficulty)
    gBoard = buildBoard(difficulty)
    renderBoard(gBoard)
    clearInterval(gInterval)
    
}
function buildBoard(board) {
        var counter = 0
    var buildArray = []
    var shuffledArray = []
    
        for (var i = 0; i < board.i; i++) {
            buildArray.push([])
            for (var j = 0; j < board.j; j++) {
                counter++
                buildArray[i][j] = {
                    index: counter,
                    isGray: false,
                    isShown: true,
                    isClickable: true
                }
            }
    } shuffledArray = shuffleArray(buildArray)
    return shuffledArray
} 
    function renderBoard(board) {
        var strHTML = ''
        for (var i = 0; i < board.length; i++) {
            strHTML += '<tr>'
            for (var j = 0; j < board[0].length; j++) {
                var mineCountShow = ""
                var currCell = board[i][j]
                var cellClass = 'cell-' + i + '-' + j
                if (currCell.isShown) { cellClass += ' show clearBg', mineCountShow = currCell.index }
                if (currCell.isGray) { cellClass += ' gray' }
                strHTML += `<td class="cell ${cellClass} color${currCell.minesAroundCount}" oncontextmenu="flagCell(${i}, ${j})" onclick="cellClicked(this,${i}, ${j},event)">${mineCountShow}`
                strHTML += '</td>'
            }
            strHTML += '</tr>'
        }
        const elBoard = document.querySelector('.board')
        elBoard.innerHTML = strHTML
} 
function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
         const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
        for (let m = array.length - 1; m > 0; m--) {
            const element = array[i];
          const j = Math.floor(Math.random() * (i + 1));
        [array[i][m], array[j][m]] = [array[j][m], array[i][m]];
        }
       
    }return array
}
function cellClicked(elCell, i, j, event) {
    cellClickedCounter++
    console.log(testArray[cellClickedCounter])
    if(cellClickedCounter===0){counterInterval(gInterval)}
    if (gBoard[i][j].index === testArray[cellClickedCounter]) {gBoard[i][j].isGray=true }
    if (gBoard[i][j].index !== testArray[cellClickedCounter]) { cellClickedCounter-- }
    if(cellClickedCounter===testArray.length-1){console.log('victor'),clearInterval(gInterval)}
    renderBoard(gBoard)
    console.log(testArray.length)
}
function createTestArray() {
     var testArrayCounter=0
    var testArray=[]
    for (let i = 0; i < difficulty.m; i++) {
        testArrayCounter++
        testArray[i] = testArrayCounter
    }console.log(testArray)
    return testArray
}
function counter() {
        timeCounter++
    
    
    var timerDec = document.querySelector(".timerDec")
    var timerSec = document.querySelector(".timerSec")
    var timerMin = document.querySelector(".timerMin")
    if (timeCounter === 60) {
        timeCounterSec++
        timerSec.innerText = timeCounterSec
        timeCounter=0
    }
    if (timeCounterSec === 60) {
        timeCounterSec = 0
        timeCounterMin++
        timerSec.innerText = `:${timeCounterSec}:`
        timerMin.innerText = timeCounterMin
    
    } else {
        timerDec.innerText = `${timeCounter}`
    }
timerSec.innerText = timeCounterSec
}
function counterInterval() {
    timeCounter=0.000
    gInterval = setInterval(counter, 1000/60)
}


