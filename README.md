# Objective
Implement a simplified version of Conway's Game of Life. Given an initial state of a 2D grid, compute the next state based on specific rules. This exercise will test your ability to understand complex rules, manipulate data structures, and explain your reasoning.

## Background
Conway's Game of Life is a cellular automaton where cells on a grid can live, die, or multiply based on a set of rules. Each cell interacts with its eight neighbors (horizontal, vertical, diagonal).

## Rules
 - Underpopulation: Any live cell with fewer than two live neighbors dies (reproducing the idea of underpopulation).
 - Survival: Any live cell with two or three live neighbors lives on to the next generation.
 - Overpopulation: Any live cell with more than three live neighbors dies (as if by overpopulation).
 - Reproduction: Any dead cell with exactly three live neighbors becomes a live cell (as if by reproduction).

## Requirements:
 - Write a function gameOfLife(grid) that takes a 2D array representing the current state of the grid and returns a new 2D array representing the next state.
 - The grid is a finite grid (e.g., 5x5). You don't need to consider infinite grids.
 - Use 1 to represent live cells and 0 for dead cells.
 - Edge cells have fewer neighbors (no wrapping around).


## Instructions
 - Implement the gameOfLife function using vanilla JavaScript.
 - Focus on correctly applying the rules to compute the next state.
 - Think aloud or explain your thought process as you work through the problem.
 - Optimize for clarity and correctness over performance, but discuss any optimizations you consider.
 - You may write helper functions if needed.

## Example
Given the currentState:
  0 1 0
  0 1 0
  0 1 0

The nextState should be:
  0 0 0
  1 1 1
  0 0 0

## What We're Looking For
 - Abstract Thinking: Ability to understand and implement the rules, and handle edge cases.
 - Problem-Solving Skills: How you break down the problem into manageable parts.
 - Communication: Clarity in explaining your thought process, decisions, and any challenges you encounter.
 - Code Quality: Clean, readable, and well-structured code.

## Additional Notes
 - Testing: Use different initial states to test your function.
 - Assumptions: State any assumptions you make while solving the problem.
 - Edge Cases: Consider how your function handles cells at the edges or corners of the grid.
