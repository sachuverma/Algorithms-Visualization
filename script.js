// Global variables
let mazeBody = document.getElementById("maze-body");
mazeBody.style.width = (maze[0].length + 1) * 50 + 10 + "px";
let br = document.createElement("br");
let startButton = document.getElementById("start-button");
let pathList = document.getElementById("paths-list");

// Array to keep trak of visited cells so that we don't form endless loops with traking
let visited = [
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
];

// A random 10x10 maze where 0 denotes vacent cell and 1 denotes obstacle
let maze = [
  [0, 1, 0, 0, 0, 0, 0, 0, 0, 1],
  [0, 1, 0, 1, 1, 1, 1, 0, 0, 0],
  [0, 1, 0, 1, 0, 0, 0, 0, 0, 0],
  [0, 1, 0, 1, 0, 1, 1, 1, 1, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 1, 0, 1, 1, 1, 1, 0, 0, 0],
  [0, 0, 0, 1, 0, 0, 1, 0, 1, 1],
  [0, 1, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 1, 0, 1, 1, 1, 0, 0, 0, 1],
  [0, 1, 0, 0, 0, 1, 1, 0, 0, 0],
];

let r = maze.length - 1;      // max rows in maze
let c = maze[0].length - 1;   // max columns in maze
let pathCount = 0;            // valid paths counter

// Displaying maze on front-end based on the maze matrix earlier initialized
for (let i = 0; i < maze.length; ++i) {
  for (let j = 0; j < maze[0].length; ++j) {
    let newDiv = document.createElement("div");
    newDiv.className = "square";
    newDiv.id = i + "_" + j;
    if (maze[i][j]) newDiv.classList.add("obstacle");
    mazeBody.appendChild(newDiv);
  }
}
// adding a different color to destination cell
document.getElementById(r + "_" + c).classList.add("last-square");


// start function ran on clicking start button
let start = async () => {
  console.log("starting flood fill");
  startButton.innerHTML = "Running";
  startButton.disabled = true;
  resetVisited();
  
  // calling the funtion having backtracking algorithm
  await getMazePath(maze, 0, 0, ""); 
  
  console.log("ended flood fill");
  startButton.innerHTML = "Start Floodfill";
  startButton.disabled = false;
};


// =============== Backtracking function brgin ================ //
// function having backtracking algorithm to find all valid paths
let getMazePath = async (maze, r, c, ans) => {
  if (  
    r < 0 ||
    c < 0 ||
    r >= maze.length ||
    c >= maze[0].length ||
    maze[r][c] == 1 ||
    visited[r][c] == 1
  )
    return;                                                 // return to try another path if cell is invalid or we can't proceed

  if (r == maze.length - 1 && c == maze[0].length - 1) {    // cell is the destination cell
    pathCount++;
    // updating path count on front-end
    document.getElementById("path-display").innerHTML =
      pathCount + " paths found";
    
    // appending the valid path pattern to the list
    let li = document.createElement("li");
    li.textContent = ans;
    pathList.appendChild(li);

    console.log("Path is: '" + ans + "'");
    document.getElementById(r + "_" + c).classList.add("found-path");
    await sleep(150);
    document.getElementById(r + "_" + c).classList.remove("found-path");

    return;                                                // returning back to try other paths also
  }

  let currSq = document.getElementById(r + "_" + c);
  currSq.classList.add("visited-square");
  await sleep(150);
  visited[r][c] = 1;

  await getMazePath(maze, r - 1, c, ans + "t");           // calling to top cell to current cell
  await getMazePath(maze, r, c - 1, ans + "l");           // calling to left cell to current cell
  await getMazePath(maze, r + 1, c, ans + "d");           // calling to down cell to current cell
  await getMazePath(maze, r, c + 1, ans + "r");           // calling to right cell to current cell

  visited[r][c] = 0;
  currSq.classList.remove("visited-square");
  await sleep(150);
};
// =============== Backtracking function end ================ //


function resetVisited() {                                 // reset the array which tracks visited cells at beginning
  visited = [
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  ];
}

function sleep(ms) {                                     // sleep function to have some delay in algorithm to visualize more effectively
  return new Promise((resolve) => setTimeout(resolve, ms));
}
