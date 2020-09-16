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
document.getElementById(r + "_" + c).classList.add("last-square");
// document.getElementById("0" + "_" + "0").classList.add("last-square");

let start = () => {
  console.log("starting flood fill");
  resetVisited();
  getMazePath(maze, 0, 0, "");
  console.log("ended flood fill");
};

let getMazePath = (maze, r, c, ans) => {
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
    document.getElementById("path-display").innerHTML =
      "Path is: '" + ans + "'";
    console.log("Path is: '" + ans + "'");
    dffdg;
    return;
  }

  let currSq = document.getElementById(r + "_" + c);
  currSq.classList.add("visited-square");
  // sleep(1000);

  visited[r][c] = 1;

  getMazePath(maze, r - 1, c, ans + "t");
  getMazePath(maze, r, c - 1, ans + "l");
  getMazePath(maze, r + 1, c, ans + "d");
  getMazePath(maze, r, c + 1, ans + "r");

  // lol_is_statemet_is_just_to_give_a_pause;

  visited[r][c] = 0;
  // sleep(1000);

  currSq.classList.remove("visited-square");
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
