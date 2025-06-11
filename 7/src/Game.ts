import * as readline from 'readline';
import { GameBoard } from './GameBoard';
import { CPUPlayer } from './CPUPlayer';

export class Game {
  private readonly boardSize = 10;
  private readonly numShips = 3;
  private readonly shipLength = 3;
  private readonly playerBoard: GameBoard;
  private readonly cpuBoard: GameBoard;
  private readonly cpuPlayer: CPUPlayer;
  private readonly rl: readline.Interface;

  constructor() {
    this.playerBoard = new GameBoard(this.boardSize, this.shipLength);
    this.cpuBoard = new GameBoard(this.boardSize, this.shipLength);
    this.cpuPlayer = new CPUPlayer(this.playerBoard);
    this.rl = readline.createInterface({
      input: process.stdin,
      output: process.stdout
    });
  }

  public start(): void {
    this.initializeBoards();
    console.log("\nLet's play Sea Battle!");
    console.log(`Try to sink the ${this.numShips} enemy ships.`);
    this.gameLoop();
  }

  private initializeBoards(): void {
    this.playerBoard.placeShipsRandomly(this.numShips);
    this.cpuBoard.placeShipsRandomly(this.numShips);
  }

  private printBoards(): void {
    console.log('\n   --- OPPONENT BOARD ---          --- YOUR BOARD ---');
    const header = '  ' + Array(this.boardSize).fill(0).map((_, i) => i).join(' ');
    console.log(header + '     ' + header);

    for (let i = 0; i < this.boardSize; i++) {
      let rowStr = i + ' ';
      for (let j = 0; j < this.boardSize; j++) {
        rowStr += this.cpuBoard.board[i][j] + ' ';
      }
      rowStr += '    ' + i + ' ';
      for (let j = 0; j < this.boardSize; j++) {
        rowStr += this.playerBoard.board[i][j] + ' ';
      }
      console.log(rowStr);
    }
    console.log('\n');
  }

  private async processPlayerTurn(): Promise<boolean> {
    const answer = await this.prompt('Enter your guess (e.g., 00): ');
    
    if (!this.cpuBoard.isValidGuess(answer)) {
      console.log('Invalid guess! Please enter two digits (e.g., 00, 34, 98).');
      return false;
    }

    this.cpuBoard.addGuess(answer);
    const { hit, sunk } = this.cpuBoard.processGuess(answer);

    if (hit) {
      console.log('PLAYER HIT!');
      if (sunk) {
        console.log('You sunk an enemy battleship!');
      }
    } else {
      console.log('PLAYER MISS.');
    }

    return true;
  }

  private processCPUTurn(): void {
    console.log("\n--- CPU's Turn ---");
    const guess = this.cpuPlayer.makeMove();
    console.log(`CPU targets: ${guess}`);

    this.playerBoard.addGuess(guess);
    const { hit, sunk } = this.playerBoard.processGuess(guess);

    if (hit) {
      console.log(`CPU HIT at ${guess}!`);
      this.cpuPlayer.processHit(guess);
      if (sunk) {
        console.log('CPU sunk your battleship!');
        this.cpuPlayer.resetTargetMode();
      }
    } else {
      console.log(`CPU MISS at ${guess}.`);
    }
  }

  private async gameLoop(): Promise<void> {
    if (this.cpuBoard.numShips === 0) {
      console.log('\n*** CONGRATULATIONS! You sunk all enemy battleships! ***');
      this.printBoards();
      this.rl.close();
      return;
    }

    if (this.playerBoard.numShips === 0) {
      console.log('\n*** GAME OVER! The CPU sunk all your battleships! ***');
      this.printBoards();
      this.rl.close();
      return;
    }

    this.printBoards();
    const playerGuessed = await this.processPlayerTurn();

    if (playerGuessed) {
      if (this.cpuBoard.numShips === 0) {
        this.gameLoop();
        return;
      }

      this.processCPUTurn();

      if (this.playerBoard.numShips === 0) {
        this.gameLoop();
        return;
      }
    }

    this.gameLoop();
  }

  private prompt(question: string): Promise<string> {
    return new Promise((resolve) => {
      this.rl.question(question, (answer) => {
        resolve(answer);
      });
    });
  }
} 