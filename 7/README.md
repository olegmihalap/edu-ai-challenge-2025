# Sea Battle Game

A modern implementation of the classic Sea Battle (Battleship) game using TypeScript.

## Features

- 10x10 game board
- Random ship placement
- Turn-based gameplay
- Smart CPU opponent with 'hunt' and 'target' modes
- Command-line interface
- Comprehensive unit tests

## Prerequisites

- Node.js (v14 or higher)
- npm (v6 or higher)

## Installation

1. Clone the repository
2. Navigate to the project directory
3. Install dependencies:
```bash
npm install
```

## Running the Game

To start the game:
```bash
npm run build
npm start
```

## Running Tests

To run the tests:
```bash
npm test
```

To run tests with coverage report:
```bash
npm run test:coverage
```

## Game Rules

1. The game is played on a 10x10 grid
2. Each player has 3 ships of length 3
3. Ships are placed randomly on the board
4. Players take turns guessing coordinates (e.g., "00", "34")
5. A hit is marked with 'X', a miss with 'O'
6. The first player to sink all opponent's ships wins

## Project Structure

- `src/` - Source code
  - `Game.ts` - Main game logic
  - `GameBoard.ts` - Board management
  - `CPUPlayer.ts` - CPU opponent logic
  - `types.ts` - TypeScript type definitions
- `src/__tests__/` - Unit tests
- `dist/` - Compiled JavaScript (generated)

## Development

The project uses:
- TypeScript for type safety
- Jest for testing
- ESLint for code quality
- Prettier for code formatting 