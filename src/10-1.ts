import { data, testData } from "./data-10.js";

const parseData = (data: string) => {
  const parsedData = [];
  const splitData = data.split("\n");

  for (const cycle of splitData) {
    const isNoop = cycle.includes("noop");

    if (isNoop) {
      // ints are 1 cycle
      parsedData.push(1);
    } else {
      // strings are 2 cycle
      let splitAddx: (string | number)[] = cycle.split(" ");
      parsedData.push(splitAddx[1]);
    }
  }

  return parsedData;
};

const parsedSignalData = parseData(data);

const calculateSignalStrength = (signalData: (string | number)[]) => {
  //   console.log(signalData);
  let cycleCounter = 0;
  let x = 1;
  let signalStrengthSum = 0;

  const addxTestNums = [20, 60, 100, 140, 180, 220, 21, 61, 101, 141, 181, 221];
  const noopTestNums = [20, 60, 100, 140, 180, 220];

  function isTargetCycle(cycleNumber: number, noop?: boolean) {
    if (noop) return noopTestNums.includes(cycleNumber);
    return addxTestNums.includes(cycleNumber);
  }

  for (const cycle of signalData) {
    // *** PROCESS SIGNAL ***
    if (typeof cycle === "number") {
      // if int increment cycle 1
      cycleCounter++;
      if (isTargetCycle(cycleCounter, true)) {
        const signal = x * cycleCounter;
        signalStrengthSum += signal;
      }
    } else {
      // if string increment cycle 2
      cycleCounter += 2;

      if (isTargetCycle(cycleCounter)) {
        const multiplier = getMultiplier(cycleCounter);

        const signal = x * multiplier;
        signalStrengthSum += signal;
      }

      // add string converted to number to queue
      x += parseFloat(cycle);
    }
  }

  return signalStrengthSum;
};

function getMultiplier(cycleNumber: number) {
  let multiplier: number;

  cycleNumber % 2 !== 0
    ? (multiplier = cycleNumber - 1)
    : (multiplier = cycleNumber);

  return multiplier;
}

console.log(calculateSignalStrength(parsedSignalData));
