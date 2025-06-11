import { Board, BoardCell, IGameBoard, Position, Ship } from './types';

export class GameBoard implements IGameBoard {
  public board: Board;
  public ships: Ship[];
  public guesses: string[];
  public numShips: number;

  constructor(private readonly size: number, private readonly shipLength: number) {
    this.board = this.createEmptyBoard();
    this.ships = [];
    this.guesses = [];
    this.numShips = 0;
  }

  private createEmptyBoard(): Board {
    return Array(this.size)
      .fill(null)
      .map(() => Array(this.size).fill('~'));
  }

  public placeShipsRandomly(numberOfShips: number): void {
    let placedShips = 0;
    while (placedShips < numberOfShips) {
      const orientation = Math.random() < 0.5 ? 'horizontal' : 'vertical';
      const startRow = orientation === 'horizontal'
        ? Math.floor(Math.random() * this.size)
        : Math.floor(Math.random() * (this.size - this.shipLength + 1));
      const startCol = orientation === 'horizontal'
        ? Math.floor(Math.random() * (this.size - this.shipLength + 1))
        : Math.floor(Math.random() * this.size);

      const shipLocations = this.calculateShipLocations(startRow, startCol, orientation);
      
      if (this.isValidPlacement(shipLocations)) {
        this.placeShip(shipLocations);
        placedShips++;
      }
    }
    this.numShips = numberOfShips;
  }

  private calculateShipLocations(startRow: number, startCol: number, orientation: 'horizontal' | 'vertical'): string[] {
    const locations: string[] = [];
    for (let i = 0; i < this.shipLength; i++) {
      const row = orientation === 'horizontal' ? startRow : startRow + i;
      const col = orientation === 'horizontal' ? startCol + i : startCol;
      locations.push(`${row}${col}`);
    }
    return locations;
  }

  private isValidPlacement(locations: string[]): boolean {
    return locations.every(loc => {
      const [row, col] = loc.split('').map(Number);
      return row >= 0 && row < this.size && col >= 0 && col < this.size && this.board[row][col] === '~';
    });
  }

  private placeShip(locations: string[]): void {
    const newShip: Ship = {
      locations,
      hits: Array(this.shipLength).fill('')
    };
    this.ships.push(newShip);
    locations.forEach(loc => {
      const [row, col] = loc.split('').map(Number);
      this.board[row][col] = 'S';
    });
  }

  public processGuess(guess: string): { hit: boolean; sunk: boolean } {
    const [row, col] = guess.split('').map(Number);
    const hit = this.ships.some(ship => {
      const index = ship.locations.indexOf(guess);
      if (index >= 0 && ship.hits[index] !== 'hit') {
        ship.hits[index] = 'hit';
        this.board[row][col] = 'X';
        return true;
      }
      return false;
    });

    if (!hit) {
      this.board[row][col] = 'O';
    }

    const sunk = this.ships.some(ship => this.isShipSunk(ship));
    if (sunk) {
      this.numShips--;
    }

    return { hit, sunk };
  }

  private isShipSunk(ship: Ship): boolean {
    return ship.hits.every(hit => hit === 'hit');
  }

  public isValidGuess(guess: string): boolean {
    if (guess.length !== 2) return false;
    const [row, col] = guess.split('').map(Number);
    return !isNaN(row) && !isNaN(col) &&
           row >= 0 && row < this.size &&
           col >= 0 && col < this.size &&
           !this.guesses.includes(guess);
  }

  public addGuess(guess: string): void {
    this.guesses.push(guess);
  }
} 