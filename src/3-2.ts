import { data, mappedLetters, testData } from "./data-3";

const parsedData = parseData(data);

function parseData(data: string) {
  const elves = data.split("\n");
  const groupedElves: [string, string, string][] = [];

  while (elves.length > 0) {
    const elfGroup = elves.splice(0, 3) as [string, string, string];

    groupedElves.push(elfGroup);
  }

  return groupedElves;
}

function analyzePacks(elfGroups: [string, string, string][]) {
  let total = 0;

  for (const elfGroup of elfGroups) {
    const duplicate = findDuplicate(elfGroup);

    duplicate && (total += calculateItemValue(duplicate));
  }

  return total;
}

function findDuplicate(elfGroup: [string, string, string]) {
  for (const item of elfGroup[0]) {
    if (elfGroup[1].includes(item) && elfGroup[2].includes(item)) return item;
  }
}

function calculateItemValue(item: string) {
  return mappedLetters.indexOf(item);
}

console.log(analyzePacks(parsedData));
