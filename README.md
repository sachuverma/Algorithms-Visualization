# Algorithms Visualization using HTML, CSS and JavaScript

[Try Yourself Here](https://sachuverma.github.io/Algorithms-Visualization/index.html)

## GRAPH ALGORITHMS

### 1. All Paths, Source to Destination

<!-- ## A simple visualization of **backtracking** code [Check Here](https://sachuverma.github.io/Mazepath-Algo-Visualization/)

#### I tried making a visualization for a data structures problem where _we need to find all possible paths from top left cell to bottom right cell in a maze_.

#### I saw this [problem](https://lnkd.in/g4kYp8y) on Pepcoding resourses page. -->

The algorithm used here is `Backtracking`.  
We recursively call for next step in top, left, down, right of current cell and visit it if it's inside maze and is not an obstacle.  
This will follow a path and check if the path reaches the destination or not. If the path does not reach the destination then backtrack and try other paths.

![1-Maze Path Animation](demo/all_path.gif)

### 2. Shortest Path, Source to Destination

THe algorithm used here is `Breadth First Search`
To find the shortest path, all you have to do is start from the source and perform a breadth first search and stop when you find your destination Node.

However, if the graph is more complex, containing weighted edges and loops, then we need a more sophisticated version of BFS, i.e. Dijkstra's algorithm.

![2-Maze Shortest Path Animation](demo/shortest_path.gif)

<br />
<br />

## SORTING ALGORITHMS

### 1. Bubble Sort

Bubble Sort is the simplest sorting algorithm that works by repeatedly swapping the adjacent elements if they are in wrong order.

![1-Bubble Sort Animation](demo/bubble_sort.gif)

### 2. Insertion Sort

Insertion sort is a simple sorting algorithm that works similar to the way you sort playing cards in your hands. The array is virtually split into a sorted and an unsorted part. Values from the unsorted part are picked and placed at the correct position in the sorted part.

![2-Insertion Sort Animation](demo/insertion_sort.gif)

### 3. Merge Sort

Merge Sort is a Divide and Conquer algorithm. It divides the input array into two halves, calls itself for the two halves, and then merges the two sorted halves. The merge function is used for merging two halves.

![3-Merge Sort Animation](demo/merge_sort.gif)

### 4. Radix Sort

The idea of Radix Sort is to do digit by digit sort starting from least significant digit to most significant digit. Radix sort uses counting sort as a subroutine to sort.

![4-Radix Sort Animation](demo/radix_sort.gif)
