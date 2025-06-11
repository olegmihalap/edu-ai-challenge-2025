EDU AI Challenge
In this task, we’ll practice using Cursor IDE to refactor an outdated code base.
 
Welcome to the Sea Battle Code Challenge! You are provided with a simple, legacy-style command-line interface (CLI) implementation of the classic Sea Battle (Battleship) game (seabattle.js). This version is functional but written using older JavaScript conventions (ES5 var, global variables, etc.).
The existing game features:
A 10x10 grid.
Random ship placement for both player and CPU.
Turn-based gameplay where the player inputs coordinates (e.g., 00, 34).
A basic CPU opponent with 'hunt' and 'target' modes.
Text-based display of the player's board and their view of the opponent's board.
You can find detailed description of how Sea Battle application from seabattle.js file works in README.md
 
 Theory
 
Cursor's AI deeply understands code structure, helping you improve architecture while preserving functionality. It analyzes complex implementations, identifies organization opportunities, and suggests modernizations that maintain core behavior.
 
The tool explains the reasoning behind each refactoring suggestion, whether you're breaking down components or improving encapsulation. Ask questions about separation of concerns or maintainability to get specific, context-aware advice.
 
Cursor ensures safe transformations by maintaining functional integrity throughout changes. It suggests incremental improvements that move code forward without breaking existing behavior. This approach develops your architectural judgment while you work.
 
AI Technique: This Sea Battle challenge is a great way to see how AI can streamline complex coding tasks:
Understanding Legacy Code: Quickly make sense of the existing seabattle.js by asking AI to explain its structure and logic before you refactor.
Code Modernization & Refactoring:
Get AI assistance to upgrade syntax (e.g., ES5 to ES6+).
Collaborate with AI on improving code structure, such as separating concerns or applying design patterns.
Use AI to enhance readability with better naming and formatting.
If rewriting in a new language, leverage AI for translation and idiomatic expressions.
Efficient Test Generation: Direct AI to create unit tests for core game logic, including various game states and CPU behaviors, to help build out your test suite.
Architectural Guidance: Discuss refactoring strategies and design choices with AI to explore different approaches.
Maintaining Core Functionality: Use AI as a cross-reference to ensure game mechanics remain intact during refactoring.
Applying these AI techniques will help you modernize the codebase, improve its quality, and build tests more effectively.
Task
Your challenge is to modernize and refactor this codebase(seabattle.js).
Objectives:
Modernize & Refactor the Codebase:
Update the JavaScript code to modern ECMAScript standards (ES6+), utilizing features such as classes, modules, let/const, arrow functions, and Promises/async-await where appropriate. Alternatively, you may rewrite the entire game logic in a language of your choice (e.g., Python, TypeScript, Java, C#, Go).
Improve code structure and organization. This should include clear separation of concerns (e.g., game logic, display/UI, utilities), reduction or elimination of global variables, and encapsulation of state and behavior, possibly by adopting a suitable architectural pattern (e.g., MVC, or distinct modules/classes for core components).
Enhance readability and maintainability through consistent code style, clear naming conventions for variables and functions, and well-structured code.
Ensure the core game mechanics remain the same, including: a 10x10 grid, turn-based coordinate input (e.g., 00, 34), standard Battleship hit/miss/sunk logic, and the existing CPU opponent's 'hunt' and 'target' modes.
Add Unit Tests:
Implement unit tests to verify the core game logic. Tests should cover critical functionalities.
Choose a testing framework appropriate for your chosen language (e.g., Jest for JavaScript/TypeScript, Pytest for Python). Aim for meaningful test coverage of the core logic modules.
Ensure that test coverage is at least 60% across the core modules.
 
 Verification
You need to provide all of the following::
Refactored Sea Battle application
Unit tests for Sea Battle application
Description of what was done and achieved by your refactoring(refactoring.md)
Tests coverage report(test_report.txt) * - you can use any file extension for test_report
 
Place your solution files in the appropriate folder of the Challenge project repository on your GitHub account
 
Requirements
The refactored game must accurately implement all original core game mechanics and rules.
The refactored code must demonstrate clear organization and employ modern language features (e.g., ES6+ for JavaScript) as stated in task description.
Unit tests should cover all core functionality, and test coverage should be at least 60%.


seabattle.js

var readline = require('readline');

var boardSize = 10;
var numShips = 3;
var shipLength = 3;

var playerShips = [];
var cpuShips = [];
var playerNumShips = numShips;
var cpuNumShips = numShips;

var guesses = [];
var cpuGuesses = [];
var cpuMode = 'hunt';
var cpuTargetQueue = [];

var board = [];
var playerBoard = [];

var rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

function createBoard() {
  for (var i = 0; i < boardSize; i++) {
    board[i] = [];
    playerBoard[i] = [];
    for (var j = 0; j < boardSize; j++) {
      board[i][j] = '~';
      playerBoard[i][j] = '~';
    }
  }
  console.log('Boards created.');
}

function placeShipsRandomly(targetBoard, shipsArray, numberOfShips) {
  var placedShips = 0;
  while (placedShips < numberOfShips) {
    var orientation = Math.random() < 0.5 ? 'horizontal' : 'vertical';
    var startRow, startCol;
    var shipLocations = [];
    var collision = false;

    if (orientation === 'horizontal') {
      startRow = Math.floor(Math.random() * boardSize);
      startCol = Math.floor(Math.random() * (boardSize - shipLength + 1));
    } else {
      startRow = Math.floor(Math.random() * (boardSize - shipLength + 1));
      startCol = Math.floor(Math.random() * boardSize);
    }

    var tempLocations = [];
    for (var i = 0; i < shipLength; i++) {
      var checkRow = startRow;
      var checkCol = startCol;
      if (orientation === 'horizontal') {
        checkCol += i;
      } else {
        checkRow += i;
      }
      var locationStr = String(checkRow) + String(checkCol);
      tempLocations.push(locationStr);

      if (checkRow >= boardSize || checkCol >= boardSize) {
        collision = true;
        break;
      }

      if (targetBoard[checkRow][checkCol] !== '~') {
        collision = true;
        break;
      }
    }

    if (!collision) {
      var newShip = { locations: [], hits: [] };
      for (var i = 0; i < shipLength; i++) {
        var placeRow = startRow;
        var placeCol = startCol;
        if (orientation === 'horizontal') {
          placeCol += i;
        } else {
          placeRow += i;
        }
        var locationStr = String(placeRow) + String(placeCol);
        newShip.locations.push(locationStr);
        newShip.hits.push('');

        if (targetBoard === playerBoard) {
          targetBoard[placeRow][placeCol] = 'S';
        }
      }
      shipsArray.push(newShip);
      placedShips++;
    }
  }
  console.log(
    numberOfShips +
      ' ships placed randomly for ' +
      (targetBoard === playerBoard ? 'Player.' : 'CPU.'),
  );
}

function printBoard() {
  console.log('\n   --- OPPONENT BOARD ---          --- YOUR BOARD ---');
  var header = '  ';
  for (var h = 0; h < boardSize; h++) header += h + ' ';
  console.log(header + '     ' + header);

  for (var i = 0; i < boardSize; i++) {
    var rowStr = i + ' ';

    for (var j = 0; j < boardSize; j++) {
      rowStr += board[i][j] + ' ';
    }
    rowStr += '    ' + i + ' ';

    for (var j = 0; j < boardSize; j++) {
      rowStr += playerBoard[i][j] + ' ';
    }
    console.log(rowStr);
  }
  console.log('\n');
}

function processPlayerGuess(guess) {
  if (guess === null || guess.length !== 2) {
    console.log('Oops, input must be exactly two digits (e.g., 00, 34, 98).');
    return false;
  }

  var row = parseInt(guess[0]);
  var col = parseInt(guess[1]);

  if (
    isNaN(row) ||
    isNaN(col) ||
    row < 0 ||
    row >= boardSize ||
    col < 0 ||
    col >= boardSize
  ) {
    console.log(
      'Oops, please enter valid row and column numbers between 0 and ' +
        (boardSize - 1) +
        '.',
    );
    return false;
  }

  var formattedGuess = guess;

  if (guesses.indexOf(formattedGuess) !== -1) {
    console.log('You already guessed that location!');
    return false;
  }
  guesses.push(formattedGuess);

  var hit = false;

  for (var i = 0; i < cpuShips.length; i++) {
    var ship = cpuShips[i];
    var index = ship.locations.indexOf(formattedGuess);

    if (index >= 0 && ship.hits[index] !== 'hit') {
      ship.hits[index] = 'hit';
      board[row][col] = 'X';
      console.log('PLAYER HIT!');
      hit = true;

      if (isSunk(ship)) {
        console.log('You sunk an enemy battleship!');
        cpuNumShips--;
      }
      break;
    } else if (index >= 0 && ship.hits[index] === 'hit') {
      console.log('You already hit that spot!');
      hit = true;
      break;
    }
  }

  if (!hit) {
    board[row][col] = 'O';
    console.log('PLAYER MISS.');
  }

  return true;
}

function isValidAndNewGuess(row, col, guessList) {
  if (row < 0 || row >= boardSize || col < 0 || col >= boardSize) {
    return false;
  }
  var guessStr = String(row) + String(col);
  return guessList.indexOf(guessStr) === -1;
}

function cpuTurn() {
  console.log("\n--- CPU's Turn ---");
  var guessRow, guessCol, guessStr;
  var madeValidGuess = false;

  while (!madeValidGuess) {
    if (cpuMode === 'target' && cpuTargetQueue.length > 0) {
      guessStr = cpuTargetQueue.shift();
      guessRow = parseInt(guessStr[0]);
      guessCol = parseInt(guessStr[1]);
      console.log('CPU targets: ' + guessStr);

      if (cpuGuesses.indexOf(guessStr) !== -1) {
        if (cpuTargetQueue.length === 0) cpuMode = 'hunt';
        continue;
      }
    } else {
      cpuMode = 'hunt';
      guessRow = Math.floor(Math.random() * boardSize);
      guessCol = Math.floor(Math.random() * boardSize);
      guessStr = String(guessRow) + String(guessCol);

      if (!isValidAndNewGuess(guessRow, guessCol, cpuGuesses)) {
        continue;
      }
    }

    madeValidGuess = true;
    cpuGuesses.push(guessStr);

    var hit = false;
    for (var i = 0; i < playerShips.length; i++) {
      var ship = playerShips[i];
      var index = ship.locations.indexOf(guessStr);

      if (index >= 0) {
        ship.hits[index] = 'hit';
        playerBoard[guessRow][guessCol] = 'X';
        console.log('CPU HIT at ' + guessStr + '!');
        hit = true;

        if (isSunk(ship)) {
          console.log('CPU sunk your battleship!');
          playerNumShips--;

          cpuMode = 'hunt';
          cpuTargetQueue = [];
        } else {
          cpuMode = 'target';
          var adjacent = [
            { r: guessRow - 1, c: guessCol },
            { r: guessRow + 1, c: guessCol },
            { r: guessRow, c: guessCol - 1 },
            { r: guessRow, c: guessCol + 1 },
          ];
          for (var adj of adjacent) {
            if (isValidAndNewGuess(adj.r, adj.c, cpuGuesses)) {
              var adjStr = String(adj.r) + String(adj.c);

              if (cpuTargetQueue.indexOf(adjStr) === -1) {
                cpuTargetQueue.push(adjStr);
              }
            }
          }
        }
        break;
      }
    }

    if (!hit) {
      playerBoard[guessRow][guessCol] = 'O';
      console.log('CPU MISS at ' + guessStr + '.');

      if (cpuMode === 'target' && cpuTargetQueue.length === 0) {
        cpuMode = 'hunt';
      }
    }
  }
}

function isSunk(ship) {
  for (var i = 0; i < shipLength; i++) {
    if (ship.hits[i] !== 'hit') {
      return false;
    }
  }
  return true;
}

function gameLoop() {
  if (cpuNumShips === 0) {
    console.log('\n*** CONGRATULATIONS! You sunk all enemy battleships! ***');
    printBoard();
    rl.close();
    return;
  }
  if (playerNumShips === 0) {
    console.log('\n*** GAME OVER! The CPU sunk all your battleships! ***');
    printBoard();
    rl.close();
    return;
  }

  printBoard();
  rl.question('Enter your guess (e.g., 00): ', function (answer) {
    var playerGuessed = processPlayerGuess(answer);

    if (playerGuessed) {
      if (cpuNumShips === 0) {
        gameLoop();
        return;
      }

      cpuTurn();

      if (playerNumShips === 0) {
        gameLoop();
        return;
      }
    }

    gameLoop();
  });
}

createBoard();

placeShipsRandomly(playerBoard, playerShips, playerNumShips);
placeShipsRandomly(board, cpuShips, cpuNumShips);

console.log("\nLet's play Sea Battle!");
console.log('Try to sink the ' + cpuNumShips + ' enemy ships.');
gameLoop();
