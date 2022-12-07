import { data } from "./data-1";

function sumCals(input: string) {
  let mostCals = 0;
  const elves = input.split("\n\n").map((elf) => {
    return elf.split("\n");
  });

  elves.forEach((elf) => {
    let calories = 0;
    for (const item of elf) {
      calories += parseInt(item);
    }
    calories > mostCals ? (mostCals = calories) : undefined;
  });
  
  return mostCals
}

console.log(sumCals(data));
