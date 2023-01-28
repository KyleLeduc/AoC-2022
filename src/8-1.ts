import { data, testData } from "./data-8.js";

const parsedData = data.split("\n").map((row) => {
  return row.split("").map((letter) => parseFloat(letter));
});
console.log(parsedData);

function checkVisibility(data: number[][]) {
  const rowLength = data.length;
  const columnLength = data[0].length;
  let visibleTrees = rowLength * 2 + columnLength * 2 - 4;

  // ROWS
  for (let rowIdx = 1; rowIdx < data.length - 1; rowIdx++) {
    const row = data[rowIdx];

    // COLUMNS
    for (let currTreeIdx = 1; currTreeIdx < rowLength - 1; currTreeIdx++) {
      let isVisible = false;

      const currentTree = row[currTreeIdx];

      // check from up
      for (let compareRow = rowIdx - 1; compareRow >= 0; compareRow--) {
        const compareTree = data[compareRow][currTreeIdx];

        // tree has to be visible the whole way
        if (compareTree < currentTree) {
          isVisible = true;
        }
        // if tree is ever blocked, visibility from this side is false so stop checking
        if (compareTree >= currentTree) {
          isVisible = false;

          break;
        }
      }

      if (!isVisible) {
        // check from down
        for (
          let compareRow = rowIdx + 1;
          compareRow < rowLength;
          compareRow++
        ) {
          const compareTree = data[compareRow][currTreeIdx];

          // tree has to be visible the whole way
          if (compareTree < currentTree) {
            isVisible = true;
          }
          // if tree is ever blocked, visibility from this side is false so stop checking
          if (compareTree >= currentTree) {
            isVisible = false;

            break;
          }
        }
      }

      if (!isVisible) {
        // check from left
        for (
          let compareTreeIdx = currTreeIdx - 1;
          compareTreeIdx >= 0;
          compareTreeIdx--
        ) {
          const compareTree = row[compareTreeIdx];

          if (compareTree < currentTree) {
            isVisible = true;
          }
          if (compareTree >= currentTree) {
            isVisible = false;

            break;
          }
        }
      }

      if (!isVisible) {
        // check from right
        for (
          let compareTreeIdx = currTreeIdx + 1;
          compareTreeIdx < rowLength;
          compareTreeIdx++
        ) {
          const compareTree = row[compareTreeIdx];

          // tree has to be visible the whole way
          if (compareTree < currentTree) {
            isVisible = true;
          }
          // if tree is ever blocked, visibility from this side is false so stop checking
          if (compareTree >= currentTree) {
            isVisible = false;

            break;
          }
        }
      }

      if (isVisible) {
        visibleTrees++;
      }
    }
  }

  return visibleTrees;
}

console.log(checkVisibility(parsedData));
