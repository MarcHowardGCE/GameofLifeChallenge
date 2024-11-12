// Initial grid state
// The initial state of the grid is defined here with a 2D array.
// 1 represents a live cell, and 0 represents a dead cell.
let grid = [
  [0, 1, 0, 0, 1],
  [0, 1, 0, 0, 1],
  [0, 1, 0, 0, 1],
  [0, 0, 0, 0, 0],
  [1, 1, 1, 0, 0]
];

// Determine the number of rows and columns dynamically based on the grid.
// This ensures that the logic works for any grid size, not just the hardcoded example.
const numRows = grid.length; // Number of rows is determined by the length of the grid array.
const numCols = grid[0].length; // Number of columns is determined by the length of the first row in the grid.

// Variables to control the simulation state.
// 'isRunning' is used to check if the simulation is currently running or paused.
// 'intervalId' stores the ID of the setInterval so we can stop it when needed.
let isRunning = false;
let intervalId;

// Retrieve references to DOM elements for manipulating the UI.
// These elements are the buttons and grid container that we will interact with.
const gridContainer = document.getElementById('gridContainer'); // The container where the grid will be displayed.
const nextButton = document.getElementById('nextButton'); // Button to manually advance to the next generation.
const startButton = document.getElementById('startButton'); // Button to start the automatic simulation.
const pauseButton = document.getElementById('pauseButton'); // Button to pause the automatic simulation.
const resetButton = document.getElementById('resetButton'); // Button to reset the grid to its initial state.

// Function to create the visual representation of the grid.
// This function generates the grid in the HTML based on the current state of the 'grid' variable.
function createGridDisplay() {
  gridContainer.innerHTML = ''; // Clear previous grid to prevent stacking old cells.

  for (let row = 0; row < numRows; row++) {
    const rowDiv = document.createElement('div'); // Create a new div for each row.
    rowDiv.classList.add('grid-row'); // Add a CSS class for row styling.

    for (let col = 0; col < numCols; col++) {
      const cellDiv = document.createElement('div'); // Create a new div for each cell in the row.
      cellDiv.classList.add('cell'); // Add a general CSS class for cell styling.
      // Add a specific class ('alive' or 'dead') depending on the state of the cell (1 or 0).
      cellDiv.classList.add(grid[row][col] === 1 ? 'alive' : 'dead');

      // Enable users to interactively toggle cell states by clicking on cells.
      // This allows users to create custom initial states before starting the simulation.
      cellDiv.addEventListener('click', () => {
        grid[row][col] = grid[row][col] === 1 ? 0 : 1; // Toggle the state of the cell between alive (1) and dead (0).
        createGridDisplay(); // Re-render the grid to reflect the updated state.
      });

      rowDiv.appendChild(cellDiv); // Append the cell div to the current row.
    }

    gridContainer.appendChild(rowDiv); // Append the row div to the grid container.
  }
}

// Function to compute the next generation of the grid based on the Game of Life rules.
// This function calculates the next state for each cell, ensuring that we do not modify the grid
// in-place while calculating, which could affect the outcome for other cells.
function gameOfLife(grid) {
  const nextGrid = grid.map(arr => [...arr]); // Create a deep copy of the grid to store the next state.

  for (let row = 0; row < numRows; row++) {
    for (let col = 0; col < numCols; col++) {
      const liveNeighbors = countLiveNeighbors(grid, row, col); // Count the number of live neighbors for the current cell.

      if (grid[row][col] === 1) { // If the current cell is alive.
        // Rule 1 & 3: Underpopulation or Overpopulation
        // A live cell dies if it has fewer than 2 or more than 3 live neighbors.
        if (liveNeighbors < 2 || liveNeighbors > 3) {
          nextGrid[row][col] = 0; // The cell dies.
        }
        // Rule 2: Survival
        // A live cell with 2 or 3 live neighbors continues to live.
        else if (liveNeighbors === 2 || liveNeighbors === 3) {
          nextGrid[row][col] = 1; // The cell stays alive.
        }
      } else { // If the current cell is dead.
        // Rule 4: Reproduction
        // A dead cell with exactly 3 live neighbors becomes a live cell.
        if (liveNeighbors === 3) {
          nextGrid[row][col] = 1; // The cell becomes alive.
        }
      }
    }
  }

  return nextGrid; // Return the updated grid state.
}

// Function to count the number of live neighbors for a given cell.
// This function checks all eight possible neighboring cells and counts how many are alive.
function countLiveNeighbors(grid, row, col) {
  // Define the relative positions of all eight neighbors.
  const directions = [
    [-1, -1], [-1, 0], [-1, 1], // Top-left, top, top-right
    [0, -1],         [0, 1],    // Left, right
    [1, -1], [1, 0], [1, 1]     // Bottom-left, bottom, bottom-right
  ];

  let liveNeighbors = 0; // Initialize the count of live neighbors to zero.

  // Iterate through each direction to check the neighbors.
  directions.forEach(([dx, dy]) => {
    const newRow = row + dx; // Calculate the row index of the neighbor.
    const newCol = col + dy; // Calculate the column index of the neighbor.

    // Check if the neighbor is within the bounds of the grid.
    if (
      newRow >= 0 && newRow < numRows && // Ensure the row index is valid.
      newCol >= 0 && newCol < numCols && // Ensure the column index is valid.
      grid[newRow][newCol] === 1 // Check if the neighbor is alive.
    ) {
      liveNeighbors += 1; // Increment the live neighbor count.
    }
  });

  return liveNeighbors; // Return the total number of live neighbors.
}

// Function to compute and display the next generation.
// This function updates the grid state to the next generation and re-renders the display.
function computeNextGeneration() {
  grid = gameOfLife(grid); // Update the grid to the next generation using the gameOfLife function.
  createGridDisplay(); // Re-render the grid to show the new state.
}

// Event listeners for the control buttons to manage the simulation.
// These event listeners allow the user to control the simulation interactively.
nextButton.addEventListener('click', computeNextGeneration); // Manually advance the simulation by one generation.

startButton.addEventListener('click', () => {
  if (!isRunning) { // Only start if the simulation is not already running.
    isRunning = true; // Set the running state to true.
    // Automatically advance the simulation every 500 milliseconds.
    intervalId = setInterval(computeNextGeneration, 500); // Store the interval ID so we can clear it later.
  }
});

pauseButton.addEventListener('click', () => {
  // Pause the simulation by clearing the interval timer.
  isRunning = false; // Set the running state to false.
  clearInterval(intervalId); // Stop the automatic generation updates.
});

resetButton.addEventListener('click', () => {
  // Reset the simulation to its initial state.
  isRunning = false; // Set the running state to false.
  clearInterval(intervalId); // Stop any ongoing interval.
  // Reset the grid to the original predefined state.
  grid = [
    [0, 1, 0, 0, 1],
    [0, 1, 0, 0, 1],
    [0, 1, 0, 0, 1],
    [0, 0, 0, 0, 0],
    [1, 1, 1, 0, 0]
  ];
  createGridDisplay(); // Re-render the grid to show the reset state.
});

// Initial call to display the grid when the page loads.
// This ensures that the user sees the initial configuration of the grid without needing any interaction.
createGridDisplay();
