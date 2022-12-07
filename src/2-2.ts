import { data } from "./data-2";

type TheirSelection = "A" | "B" | "C";
type GameOutcome = "X" | "Y" | "Z";
type Selections = "A" | "B" | "C" | "X" | "Y" | "Z";
type Round = [TheirSelection, GameOutcome];

const parsedData = data.split("\n").map((round) => {
  return round.split(" ");
}) as Round[];

function runSimulation(rounds: Round[]) {
  let totalScore = 0;

  for (const round of rounds) {
    totalScore += simRound(round);
  }

  return totalScore;
}

function simRound(round: Round): number {
  const [theirSelection, gameOutcome] = round;
  let myScore = 0;

  myScore += calculateWinPoints(gameOutcome);
  myScore += calculateMySelectionsScore(theirSelection, gameOutcome);

  return myScore;
}

/** X === lose
 *  Y === draw
 *  Z === win
 */

function calculateWinPoints(gameResult: GameOutcome): number {
  switch (gameResult) {
    case "X":
      return 0;

    case "Y":
      return 3;

    case "Z":
      return 6;

    default:
      return -1;
  }
}

/**
 * X for Rock, Y for Paper, and Z for Scissors
 * A for Rock, B for Paper, and C for Scissors
 */

function calculateMySelectionsScore(
  theirSelection: TheirSelection,
  gameResult: GameOutcome
): number {
  switch (theirSelection) {
    // rock
    case "A":
      if (gameResult === "X") return 3;
      if (gameResult === "Y") return 1;
      if (gameResult === "Z") return 2;

    //   paper
    case "B":
      if (gameResult === "X") return 1;
      if (gameResult === "Y") return 2;
      if (gameResult === "Z") return 3;

    //   scissors
    case "C":
      if (gameResult === "X") return 2;
      if (gameResult === "Y") return 3;
      if (gameResult === "Z") return 1;

    default:
      return -1;
  }
}

console.log(runSimulation(parsedData));
