import { GameBoard } from '../GameBoard';

describe('GameBoard', () => {
  let gameBoard: GameBoard;

  beforeEach(() => {
    gameBoard = new GameBoard(10, 3);
  });

  test('should create empty board', () => {
    expect(gameBoard.board.length).toBe(10);
    expect(gameBoard.board[0].length).toBe(10);
    expect(gameBoard.board.every(row => row.every(cell => cell === '~'))).toBe(true);
  });

  test('should place ships randomly', () => {
    gameBoard.placeShipsRandomly(3);
    expect(gameBoard.ships.length).toBe(3);
    expect(gameBoard.numShips).toBe(3);
  });

  test('should validate guesses correctly', () => {
    expect(gameBoard.isValidGuess('00')).toBe(true);
    expect(gameBoard.isValidGuess('99')).toBe(true);
    expect(gameBoard.isValidGuess('100')).toBe(false);
    expect(gameBoard.isValidGuess('0')).toBe(false);
    expect(gameBoard.isValidGuess('aa')).toBe(false);
  });

  test('should process hits and misses correctly', () => {
    gameBoard.placeShipsRandomly(1);
    const shipLocation = gameBoard.ships[0].locations[0];
    
    const { hit, sunk } = gameBoard.processGuess(shipLocation);
    expect(hit).toBe(true);
    expect(sunk).toBe(false);
    
    const { hit: missHit, sunk: missSunk } = gameBoard.processGuess('00');
    expect(missHit).toBe(false);
    expect(missSunk).toBe(false);
  });

  test('should track guesses', () => {
    gameBoard.addGuess('00');
    expect(gameBoard.guesses).toContain('00');
    expect(gameBoard.isValidGuess('00')).toBe(false);
  });
}); 