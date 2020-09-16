console.log("generate maze");
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

let mazeBody = document.getElementById("maze-body");
mazeBody.style.width = (maze[0].length + 1) * 50 + 10 + "px";
let br = document.createElement("br");
let startButton = document.getElementById("start-button");
let pathList = document.getElementById("paths-list");

for (let i = 0; i < maze.length; ++i) {
  for (let j = 0; j < maze[0].length; ++j) {
    let newDiv = document.createElement("div");
    newDiv.className = "square";
    newDiv.id = i + "_" + j;
    if (maze[i][j]) newDiv.classList.add("obstacle");
    mazeBody.appendChild(newDiv);
  }
}

let r = maze.length - 1;
let c = maze[0].length - 1;
let pathCount = 0;
document.getElementById(r + "_" + c).classList.add("last-square");

let start = async () => {
  console.log("starting flood fill");
  startButton.innerHTML = "Running";
  startButton.disabled = true;
  resetVisited();
  await getMazePath(maze, 0, 0, "");
  console.log("ended flood fill");
  startButton.innerHTML = "Start Floodfill";
  startButton.disabled = false;
};

let getMazePath = async (maze, r, c, ans) => {
  if (
    r < 0 ||
    c < 0 ||
    r >= maze.length ||
    c >= maze[0].length ||
    maze[r][c] == 1 ||
    visited[r][c] == 1
  )
    return;

  if (r == maze.length - 1 && c == maze[0].length - 1) {
    pathCount++;
    document.getElementById("path-display").innerHTML =
      pathCount + " paths found";

    let li = document.createElement("li");
    li.textContent = ans;
    pathList.appendChild(li);

    console.log("Path is: '" + ans + "'");
    document.getElementById(r + "_" + c).classList.add("found-path");
    await sleep(150);
    document.getElementById(r + "_" + c).classList.remove("found-path");

    return;
  }

  let currSq = document.getElementById(r + "_" + c);
  currSq.classList.add("visited-square");
  await sleep(150);
  visited[r][c] = 1;

  await getMazePath(maze, r - 1, c, ans + "t");
  await getMazePath(maze, r, c - 1, ans + "l");
  await getMazePath(maze, r + 1, c, ans + "d");
  await getMazePath(maze, r, c + 1, ans + "r");

  visited[r][c] = 0;
  currSq.classList.remove("visited-square");
  await sleep(150);
};

function refreshPage() {
  window.location.reload();
}

function resetVisited() {
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

function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}
