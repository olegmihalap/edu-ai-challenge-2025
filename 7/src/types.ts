export type BoardCell = '~' | 'S' | 'X' | 'O';
export type Board = BoardCell[][];
export type Position = { row: number; col: number };
export type Ship = {
  locations: string[];
  hits: string[];
};

export interface IGameBoard {
  board: Board;
  ships: Ship[];
  guesses: string[];
  numShips: number;
}

export interface IGameState {
  playerBoard: IGameBoard;
  cpuBoard: IGameBoard;
  cpuMode: 'hunt' | 'target';
  cpuTargetQueue: string[];
} 