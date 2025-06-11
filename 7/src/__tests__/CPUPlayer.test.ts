import { GameBoard } from '../GameBoard';
import { CPUPlayer } from '../CPUPlayer';

describe('CPUPlayer', () => {
  let gameBoard: GameBoard;
  let cpuPlayer: CPUPlayer;

  beforeEach(() => {
    gameBoard = new GameBoard(10, 3);
    cpuPlayer = new CPUPlayer(gameBoard);
  });

  test('should make valid hunt moves', () => {
    const guess = cpuPlayer.makeMove();
    expect(guess.length).toBe(2);
    const [row, col] = guess.split('').map(Number);
    expect(row).toBeGreaterThanOrEqual(0);
    expect(row).toBeLessThan(10);
    expect(col).toBeGreaterThanOrEqual(0);
    expect(col).toBeLessThan(10);
  });

  test('should switch to target mode after hit', () => {
    gameBoard.placeShipsRandomly(1);
    const shipLocation = gameBoard.ships[0].locations[0];
    gameBoard.processGuess(shipLocation);
    cpuPlayer.processHit(shipLocation);
    
    const guess = cpuPlayer.makeMove();
    expect(guess.length).toBe(2);
    const [row, col] = guess.split('').map(Number);
    const [hitRow, hitCol] = shipLocation.split('').map(Number);
    
    // The guess should be adjacent to the hit location
    expect(
      (Math.abs(row - hitRow) === 1 && col === hitCol) ||
      (Math.abs(col - hitCol) === 1 && row === hitRow)
    ).toBe(true);
  });

  test('should reset target mode', () => {
    gameBoard.placeShipsRandomly(1);
    const shipLocation = gameBoard.ships[0].locations[0];
    gameBoard.processGuess(shipLocation);
    cpuPlayer.processHit(shipLocation);
    cpuPlayer.resetTargetMode();
    
    const guess = cpuPlayer.makeMove();
    expect(guess.length).toBe(2);
    const [row, col] = guess.split('').map(Number);
    expect(row).toBeGreaterThanOrEqual(0);
    expect(row).toBeLessThan(10);
    expect(col).toBeGreaterThanOrEqual(0);
    expect(col).toBeLessThan(10);
  });
}); 