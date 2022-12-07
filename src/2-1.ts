import { data } from "./data-2";

type TheirSelection = "A" | "B" | "C";
type MySelection = "X" | "Y" | "Z";
type Selections = "A" | "B" | "C" | "X" | "Y" | "Z";
type Round = [TheirSelection, MySelection];

const parsedData = data.split("\n").map((round) => {
  return round.split(" ");
}) as Round[];

function runSimulation(rounds: Round[]) {
  let totalScore = 0;
  
  for (const round of rounds) {
    totalScore += simRound(round);
  }

  return totalScore
}

function simRound(round: Round): number {
  const [theirSelection, mySelection] = round;
  let myScore = 0;

  myScore += calculateSelectionScore(mySelection);
  myScore += calculateWinPoints(mySelection, theirSelection);

  return myScore;
}

/**
 * X for Rock, Y for Paper, and Z for Scissors
 * A for Rock, B for Paper, and C for Scissors
 */

function calculateWinPoints(me: MySelection, them: TheirSelection): number {
  if (
    (me === "X" && them === "A") ||
    (me === "Y" && them === "B") ||
    (me === "Z" && them === "C")
  ) {
    return 3;
  }

  if (
    (me === "X" && them === "B") ||
    (me === "Y" && them === "C") ||
    (me === "Z" && them === "A")
  ) {
    return 0;
  } else {
    return 6;
  }
}

function calculateSelectionScore(selection: Selections): number {
  switch (selection) {
    case "A":
    case "X":
      return 1;

    case "B":
    case "Y":
      return 2;

    case "C":
    case "Z":
      return 3;

    default:
      return -1;
  }
}

console.log(runSimulation(parsedData));
