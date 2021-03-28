// Global variables
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

// Array to keep trak of visited cells so that we don't form endless loops with traking
let visited = Array(maze.length)
  .fill()
  .map(() => Array(maze[0].length).fill(0));

// maze styles based on maze matrix
let mazeBody = document.getElementById("maze-body");
mazeBody.style.width = (maze[0].length + 1) * 50 + 10 + "px";
let br = document.createElement("br");
let startButton = document.getElementById("start-button");
let shortButton = document.getElementById("short-button");
let pathList = document.getElementById("paths-list");

let r = maze.length - 1; // max rows in maze
let c = maze[0].length - 1; // max columns in maze
let pathCount = 0; // valid paths counter

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

// start function for all paths
let allPaths = async () => {
  console.log("starting flood fill");
  startButton.innerHTML = "Running";
  startButton.classList.add("running-button");
  startButton.disabled = true;
  startButton.style.opacity = 0.7;
  startButton.style.cursor = "not-allowed";
  shortButton.disabled = true;
  shortButton.style.opacity = 0.7;
  shortButton.style.cursor = "not-allowed";

  resetVisited();

  // calling the funtion having backtracking algorithm
  await getMazePath(maze, 0, 0, "");

  console.log("ended flood fill");
  startButton.innerHTML = "Start Algorithm";
  startButton.classList.remove("running-button");
};

// start function for shortest path
let shortestPath = async () => {
  console.log("starting bfs");
  shortButton.innerHTML = "Running";
  shortButton.classList.add("running-button");
  startButton.disabled = true;
  startButton.style.opacity = 0.7;
  startButton.style.cursor = "not-allowed";
  shortButton.disabled = true;
  shortButton.style.opacity = 0.7;
  shortButton.style.cursor = "not-allowed";

  resetVisited();
  // calling the funtion having bfs algorithm
  let ans = await bfs(maze);
  console.log("ans is", ans);

  if (ans[0] === -1) console.log(ans[3]);
  else {
    for (let i = 0; i < ans[3].length; ++i) {
      let currSq = document.getElementById(ans[3][i]);
      currSq.classList.add("bfs-path-square");
      await sleep(150);
    }
  }

  console.log("ended bfs");
  shortButton.innerHTML = "Start Algorithm";
  shortButton.classList.remove("running-button");
};

// =============== Backtracking function ================ //
let getMazePath = async (maze, r, c, ans) => {
  // checking if current cell is valid
  if (
    r < 0 ||
    c < 0 ||
    r >= maze.length ||
    c >= maze[0].length ||
    maze[r][c] == 1 ||
    visited[r][c] == 1
  )
    return; // return to try another path if cell is invalid or we can't proceed

  // cell is the destination cell
  if (r == maze.length - 1 && c == maze[0].length - 1) {
    pathCount++;
    // updating path count on front-end
    document.getElementById("path-display").innerHTML =
      pathCount + " paths found";

    // appending the valid path pattern to the list
    let li = document.createElement("li");
    li.textContent = ans;
    pathList.appendChild(li);

    document.getElementById(r + "_" + c).classList.add("found-path");
    await sleep(150);
    document.getElementById(r + "_" + c).classList.remove("found-path");

    return; // returning back to try other paths also
  }

  await markCellVisited(r, c);
  visited[r][c] = 1;

  // making calls recursively without checking
  for (let i = 0; i < 4; ++i)
    await getMazePath(maze, r + dirs[i], c + dirs[i + 1], ans + dir[i]);
  // calling to top cell to current cell

  visited[r][c] = 0;
  await markCellUnVisited(r, c);
  await sleep(150);
};
// =============== Backtracking function end ================ //

// =============== BFS Path function ================ //
let bfs = async (maze) => {
  if (maze[0][0] || maze[9][9]) return [-1, -1, -1, "No path found!"];
  resetVisited();

  let pending = new Queue();
  // [x,y,cost,path]
  pending.push([0, 0, 0, ["0_0"]]);
  visited[0][0] = 1;
  await markCellVisited(0, 0);

  while (!pending.isEmpty()) {
    let curr = pending.front();
    pending.pop();
    if (curr[0] == 9 && curr[1] == 9) return curr;

    for (let i = 0; i < 4; i++) {
      let row = curr[0] + dirs[i];
      let col = curr[1] + dirs[i + 1];
      // if adjacent cell is valid, has path and
      // not visited yet, enqueue it.
      if (
        row >= 0 &&
        row < 10 &&
        col >= 0 &&
        col < 10 &&
        maze[row][col] == 0 &&
        !visited[row][col]
      ) {
        // mark cell as visited and enqueue it
        visited[row][col] = 1;
        await markCellVisited(row, col);

        let Adjcell = [row, col, curr[2] + 1, [...curr[3], `${row}_${col}`]];
        pending.push(Adjcell);
      }
    }
  }

  return [-1, -1, -1, "No path found!"];
};

// =============== BFS Path function end ================ //

// =============== Some Helping Functions =================== //

// Implementing queue data structure
function Queue() {
  this.elements = [];
}
Queue.prototype.push = function (e) {
  this.elements.push(e);
};
// remove an element from the front of the queue
Queue.prototype.pop = function () {
  return this.elements.shift();
};
// check if the queue is empty
Queue.prototype.isEmpty = function () {
  return this.elements.length == 0;
};
// get the element at the front of the queue
Queue.prototype.front = function () {
  return !this.isEmpty() ? this.elements[0] : undefined;
};
Queue.prototype.size = function () {
  return this.elements.length;
};

// Up Right Down Left traversals
var dirs = [-1, 0, 1, 0, -1];
var dir = ["u", "r", "d", "l"];

// reset the array which tracks visited cells at beginning
function resetVisited() {
  visited = Array(maze.length)
    .fill()
    .map(() => Array(maze[0].length).fill(0));
}

// color the current cell
async function markCellVisited(row, col) {
  let currSq = document.getElementById(row + "_" + col);
  currSq.classList.add("visited-square");
  await sleep(100);
}

// uncolor the current cell
async function markCellUnVisited(row, col) {
  let currSq = document.getElementById(row + "_" + col);
  currSq.classList.remove("visited-square");
}

// sleep function to have some delay in algorithm to visualize more effectively
function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}
// =============== End ================= //
