import { data } from "./data-1";
type TopThree = [number, number, number];

function sumCals(input: string) {
  let topThree: TopThree = [0, 0, 0];

  const elves = input.split("\n\n").map((elf) => {
    return elf.split("\n");
  });

  elves.forEach((elf) => {
    let calories = 0;
    
    for (const item of elf) {
      calories += parseInt(item);
    }
    topThree = compareTopThree(calories, topThree);
  });

  return sumArr(topThree);
}

function compareTopThree(num: number, topThree: TopThree) {
  for (let i = 0; i < topThree.length; i++) {
    const val = topThree[i];

    if (num > val) {
      topThree[i] = num;
      topThree.sort((a: number, b: number) => a - b);
      break;
    }
  }

  return topThree;
}

function sumArr(arr: TopThree) {
  const total = arr.reduce((prev, curr) => prev + curr);

  return total;
}

console.log(sumCals(data));
