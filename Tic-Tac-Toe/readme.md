# Dynamic Tic-Tac-Toe

A responsive, timed Tic-Tac-Toe game with adjustable board dimensions.

## Features

- Dynamically resizable game board (3x3 to NxN)
- Player timers with configurable duration
- Automatic win detection for any board size
- Turn-based gameplay (X and O)

## Technical Stack

- HTML5
- CSS3 (with CSS Variables)
- Vanilla JavaScript

## Key Functions

- `initializeBoard()`: Sets up the game board and resets game state
- `playMove()`: Handles player moves and turn switching
- `checkForWin()`: Detects win conditions (horizontal, vertical, diagonal)
- `xTimer()` / `oTimer()`: Manages player time limits

## Usage

1. Clone the repository
2. Open `index.html` in a web browser
3. Select board dimension and start playing

## Customization

Modify `MAX_MINUTES` and `MAX_SECONDS` constants to adjust time limits.
