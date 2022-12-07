import {
  crateData,
  craneData,
  testCraneData,
  testCrateData,
} from "./data-5.js";

const useTestData = true;

// parse move data to object
interface MoveInstructions {
  amount: number;
  origin: number;
  destination: number;
}
const crateRegex = new RegExp(/\w/);
const craneRegex = new RegExp(/^[a-zA-Z]* {1}(\d*) {1}[a-zA-Z]* {1}(\d*) {1}[a-zA-Z]* {1}(\d*)/gm);

const parseCrateData = (data: string) => {
  const rows = data.split("\n");
  const parsedData: string[][] = [];
  const columns = rows[0].length / 4;
  for (let column = 0; column < columns; column++) {
    parsedData.push([]);
  }
  let buffer: (string | undefined)[] = [];

  rows.forEach((row) => {
    for (let i = 0; i < row.length; i += 4) {
      const cell = row.slice(i, i + 4).match(crateRegex);
      cell ? buffer.push(cell[0]) : buffer.push(undefined);
    }

    buffer.forEach((cell, i) => {
      if (cell) parsedData[i].push(cell);
    });
    buffer = [];
  });

  return parsedData;
};

const parseCraneData = (data: string) => {
  const parsedMoveData: MoveInstructions[] = [];
  const extractedData = [...data.matchAll(craneRegex)];
  for (const instruction of extractedData) {
    parsedMoveData.push({
      amount: parseInt(instruction[1]),
      origin: parseInt(instruction[2]),
      destination: parseInt(instruction[3]),
    });
  }

  return parsedMoveData;
};

let parsedCrateData: string[][];
let parsedCraneData: MoveInstructions[];
useTestData
  ? (parsedCrateData = parseCrateData(testCrateData))
  : (parsedCrateData = parseCrateData(crateData));
useTestData
  ? (parsedCraneData = parseCraneData(testCraneData))
  : (parsedCraneData = parseCraneData(craneData));

const simulateCraneMoves = () => {
  parsedCraneData.forEach((instruction) => {
    const { amount, origin, destination } = instruction;
    for (let i = 0; i < amount; i++) {
      const from = parsedCrateData[origin - 1];
      const to = parsedCrateData[destination - 1];
      const box = from.shift();

      if (box) to.unshift(box);
    }
  });

  getTopBoxes();
};

const getTopBoxes = () => {
  let result: string[] = [];
  parsedCrateData.forEach((column) => {
    const box = column[0];
    box && result.push(box);
});
console.log(result.join(''));
};

simulateCraneMoves();
