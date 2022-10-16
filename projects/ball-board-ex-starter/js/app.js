'use strict'

const WALL = 'WALL'
const FLOOR = 'FLOOR'

const BALL = 'BALL'
const GAMER = 'GAMER'

const GAMER_IMG = '\n\t\t<img src="img/gamer.png">\n'
const BALL_IMG = '\n\t\t<img src="img/ball.png">\n'

// Model:
var gBoard
var gGamerPos
var ballCollectedCounter = 0
var createdBalls = 1
var createBallsInterval
function initGame() {
    gGamerPos = { i: 2, j: 9 }
    gBoard = buildBoard()
    renderBoard(gBoard)
    startInterval(gBoard)
}
function stopInterval() {
  clearInterval(createBallsInterval);
}
function startInterval(gBoard) {
   createBallsInterval = setInterval(() => {
        createBalls(gBoard)
    }, 3000);
}
function buildBoard() {
    var board = []

    // TODO: Create the Matrix 10 * 12 
    board = createMat(10, 12)
    
    // TODO: Put FLOOR everywhere and WALL at edges
    for(var i = 0; i < board.length; i++){
        for(var j = 0; j < board[i].length; j++){
            board[i][j] = { type: FLOOR, gameElement: null }
            if(i === 0 || i === board.length - 1) board[i][j].type = WALL
            else if(j === 0 || j === board[i].length - 1) board[i][j].type = WALL
        }
    }
    
    // TODO: Place the gamer and two balls
    board[gGamerPos.i][gGamerPos.j].gameElement = GAMER
    board[0][5].type = 'FLOOR'
    board[9][5].type = 'FLOOR'
    board[5][0].type = 'FLOOR'
    board[5][11].type = 'FLOOR'
    board[4][7].gameElement = BALL
    board[3][3].gameElement = BALL

    console.log(board);
    return board;
}

function createBalls(board) {
    var winHeadline = document.querySelector('.youWin')
    var resetButton = document.querySelector('.restartButton')
    var ballI = getRandomInt(1, board[0].length - 4)
    var ballJ = getRandomInt(1, board.length - 2 )
    if (board[ballI][ballJ].gameElement === null) {
        board[ballI][ballJ].gameElement = BALL
        var addBallPos = { i:ballI, j:ballJ }
        renderCell(addBallPos, BALL_IMG)
        createdBalls ++
        
        console.log(createdBalls)
        
    }else {
        createBalls(board)
    }

    if (createdBalls === ballCollectedCounter) {
            
            clearInterval(createBallsInterval)
        winHeadline.style.display = "block"
        resetButton.style.display = "block"
        winEffect()
        }
}

// Render the board to an HTML table
function renderBoard(board) {

    var elBoard = document.querySelector('.board')
    var strHTML = ''

    for (var i = 0; i < board.length; i++) {
        strHTML += '<tr>\n'

        for (var j = 0; j < board[0].length; j++) {
            var currCell = board[i][j]

            var cellClass = getClassName({ i, j })

            if (currCell.type === FLOOR) cellClass += ' floor'
            else if (currCell.type === WALL) cellClass += ' wall'

            strHTML += `\t<td class="cell ${cellClass}" onclick="moveTo(${i}, ${j})">`

            if (currCell.gameElement === GAMER) {
                strHTML +=  GAMER_IMG;
            } else if (currCell.gameElement === BALL) {
                strHTML += BALL_IMG;
                
            }

            strHTML += '\t</td>\n'
        }
        strHTML += '</tr>\n'
    }
    console.log('strHTML is:')
    console.log(strHTML)
    elBoard.outerHTML = strHTML
}
// Move the player to a specific location
function moveTo(i, j) {
    
    var targetCell = gBoard[i][j]
    if (targetCell.type === WALL) return

    // Calculate distance to make sure we are moving to a neighbor cell
    var iAbsDiff = Math.abs(i - gGamerPos.i)
    var jAbsDiff = Math.abs(j - gGamerPos.j)
    
    // If the clicked Cell is one of the four allowed
    if ((iAbsDiff === 1 && jAbsDiff === 0) || (jAbsDiff === 1 && iAbsDiff === 0)) {
        // var ballCollectedCounter =0
        if (targetCell.gameElement === BALL) {
            ballCollectedCounter += 1
            var counterText = `Balls Collected :` + ballCollectedCounter
            var counter = document.querySelector('.ballCounter')
            counter.innerText = counterText
            console.log('Collecting!', ballCollectedCounter, counter, createdBalls)
            eatEffect()
        }

        // TODO: Move the gamer
        // Update the Model:
        gBoard[gGamerPos.i][gGamerPos.j].gameElement = null
        
        // DOM:
        renderCell(gGamerPos, '')
        
        // Update the Model:
        targetCell.gameElement = GAMER
        gGamerPos = { i, j }
        
        // DOM:
        renderCell(gGamerPos, GAMER_IMG)
        
    } else console.log('TOO FAR', iAbsDiff, jAbsDiff)

}

// Convert a location object {i, j} to a selector and render a value in that element
function renderCell(location, value) {
    var cellSelector = '.' + getClassName(location)
    var elCell = document.querySelector(cellSelector)
    elCell.innerHTML = value
}

// Move the player by keyboard arrows
function handleKey(event) {

    var i = gGamerPos.i
    var j = gGamerPos.j


    switch (event.key) {
        case 'ArrowLeft':
            moveTo(i, j - 1)
            break;
        case 'ArrowRight':
            moveTo(i, j + 1)
            break;
        case 'ArrowUp':
            moveTo(i - 1, j)
            break;
        case 'ArrowDown':
            moveTo(i + 1, j)
            break;

    }

}

// Returns the class name for a specific cell
function getClassName(location) {
    var cellClass = 'cell-' + location.i + '-' + location.j
    return cellClass
}

function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
}
function eatEffect() {
    var sound  = "../audio/pop.mp3"
    playAudio(sound)
}
function winEffect() {
    var sound  = "../audio/win.mp3"
    playAudio(sound)
}
function playAudio(url) {
  new Audio(url).play();
}