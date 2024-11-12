// Initial grid state
let grid = [
    [0, 1, 0, 0, 1],
    [0, 1, 0, 0, 1],
    [0, 1, 0, 0, 1],
    [0, 0, 0, 0, 0],
    [1, 1, 1, 0, 0]
  ];
  
  // Determine the number of rows and columns dynamically based on the grid.
  // This makes the code adaptable to grids of different sizes without hardcoding dimensions.
  const numRows = grid.length;
  const numCols = grid[0].length;
  
  // Variables to control the simulation state.
  // 'isRunning' tracks whether the simulation is active.
  // 'intervalId' stores the ID of the interval timer, allowing us to pause or stop the simulation when needed.
  let isRunning = false;
  let intervalId;
  
  // Retrieve references to DOM elements for manipulating the UI.
  // By caching these elements, we avoid repeatedly querying the DOM, improving performance.
  const gridContainer = document.getElementById('gridContainer');
  const nextButton = document.getElementById('nextButton');
  const startButton = document.getElementById('startButton');
  const pauseButton = document.getElementById('pauseButton');
  const resetButton = document.getElementById('resetButton');
  
  // Function to create the visual representation of the grid.
  // This function re-renders the grid display, reflecting any updates to the grid state.
  // Re-rendering is necessary because we need to update the UI whenever the grid changes.
  function createGridDisplay() {
    gridContainer.innerHTML = ''; // Clear previous grid to prevent stacking old cells.
  
    for (let row = 0; row < numRows; row++) {
      const rowDiv = document.createElement('div');
      rowDiv.classList.add('grid-row');
  
      for (let col = 0; col < numCols; col++) {
        const cellDiv = document.createElement('div');
        cellDiv.classList.add('cell');
        // Assign class based on the cell's state to apply appropriate styling.
        cellDiv.classList.add(grid[row][col] === 1 ? 'alive' : 'dead');
  
        // Enable users to interactively toggle cell states by clicking.
        // This enhances user engagement and allows for custom initial configurations.
        cellDiv.addEventListener('click', () => {
          // Toggle the cell state between alive (1) and dead (0).
          grid[row][col] = grid[row][col] === 1 ? 0 : 1;
          // Re-render the grid to reflect the updated cell state.
          createGridDisplay();
        });
  
        rowDiv.appendChild(cellDiv);
      }
  
      gridContainer.appendChild(rowDiv);
    }
  }
  
  // Function to compute the next generation of the grid based on the Game of Life rules.
  // Separating this logic into its own function improves code readability and maintainability.
  function computeNextGeneration() {
    // Create a deep copy of the grid to avoid modifying the original grid while computing updates.
    // This prevents interference in neighbor calculations, as changes in one cell could affect another if not isolated.
    const nextGrid = grid.map(row => [...row]);
  
    for (let row = 0; row < numRows; row++) {
      for (let col = 0; col < numCols; col++) {
        const liveNeighbors = countLiveNeighbors(row, col);
  
        // Apply the Game of Life rules:
        if (grid[row][col] === 1) {
          // Rule 1 & 3: Any live cell with fewer than two or more than three live neighbors dies.
          if (liveNeighbors < 2 || liveNeighbors > 3) {
            nextGrid[row][col] = 0; // Cell dies due to underpopulation or overpopulation.
          }
          // Rule 2: Live cells with two or three live neighbors survive.
          // No action needed; the cell remains alive in 'nextGrid'.
        } else {
          // Rule 4: Any dead cell with exactly three live neighbors becomes a live cell.
          if (liveNeighbors === 3) {
            nextGrid[row][col] = 1; // Cell becomes alive due to reproduction.
          }
          // Dead cells with fewer or more than three live neighbors remain dead.
        }
      }
    }
  
    // Update the main grid to the next generation.
    grid = nextGrid;
    // Re-render the grid to display the new state to the user.
    createGridDisplay();
  }
  
  // Function to count the number of live neighbors around a given cell.
  // This function is essential for determining the next state of each cell.
  function countLiveNeighbors(row, col) {
    let liveNeighbors = 0;
    // Define the relative positions of all eight neighboring cells.
    // Using an array of offsets simplifies the neighbor traversal logic.
    const directions = [
      [-1, -1], // Top-left
      [-1, 0],  // Top
      [-1, 1],  // Top-right
      [0, -1],  // Left
      [0, 1],   // Right
      [1, -1],  // Bottom-left
      [1, 0],   // Bottom
      [1, 1]    // Bottom-right
    ];
  
    directions.forEach(([dx, dy]) => {
      const newRow = row + dx;
      const newCol = col + dy;
  
      // Check if the neighboring cell is within the grid bounds.
      // This boundary check prevents accessing undefined indices, which could cause errors.
      if (
        newRow >= 0 && newRow < numRows &&
        newCol >= 0 && newCol < numCols &&
        grid[newRow][newCol] === 1 // Only count live neighbors.
      ) {
        liveNeighbors += 1;
      }
    });
  
    return liveNeighbors;
  }
  
  // Event listeners for the control buttons to manage the simulation.
  
  // Advance the simulation by one generation when the 'Next Generation' button is clicked.
  // This allows users to manually step through generations.
  nextButton.addEventListener('click', computeNextGeneration);
  
  // Start the simulation, causing it to advance automatically at set intervals.
  startButton.addEventListener('click', () => {
    if (!isRunning) {
      isRunning = true;
      // Use 'setInterval' to repeatedly call 'computeNextGeneration' every 500 milliseconds.
      // Storing the interval ID allows us to pause or stop the simulation later.
      intervalId = setInterval(computeNextGeneration, 500);
    }
  });
  
  // Pause the simulation, stopping the automatic advancement of generations.
  // Clearing the interval prevents unnecessary processing and conserves resources.
  pauseButton.addEventListener('click', () => {
    isRunning = false;
    clearInterval(intervalId);
  });
  
  // Reset the simulation to its initial state when the 'Reset' button is clicked.
  // This provides a quick way for users to restart and experiment with different configurations.
  resetButton.addEventListener('click', () => {
    isRunning = false;
    clearInterval(intervalId);
    // Reset the grid to the original predefined state.
    grid = [
      [0, 1, 0, 0, 1],
      [0, 1, 0, 0, 1],
      [0, 1, 0, 0, 1],
      [0, 0, 0, 0, 0],
      [1, 1, 1, 0, 0]
    ];
    // Re-render the grid to show the reset state to the user.
    createGridDisplay();
  });
  
  // Initial call to display the grid when the page loads.
  // This ensures the user sees the grid without needing to interact first.
  createGridDisplay();
  