import { data, mappedLetters, testData } from "./data-3";

const parsedData = data.split("\n").map((pack): [string, string] => {
  const midway = pack.length / 2;
  const compartmentOne: string = pack.substring(0, midway);
  const compartmentTwo: string = pack.substring(midway, pack.length);
  return [compartmentOne, compartmentTwo];
});

function findDuplicates(pack: [string, string]) {
  const [compartmentOne, compartmentTwo] = pack;
  const duplicates: string[] = [];

  for (const letter of compartmentOne) {
    const isDuplicate = compartmentTwo.includes(letter);

    isDuplicate && !duplicates.includes(letter)
      ? duplicates.push(letter)
      : undefined;
  }

  return duplicates;
}

function analyzePacks(packsList: [string, string][]) {
  let total = 0;
  for (const pack of packsList) {
    const duplicates = findDuplicates(pack);

    for (const item of duplicates) {
      total += calculateItemValue(item);
    }
  }
  return total
}

function calculateItemValue(item: string) {
  return mappedLetters.indexOf(item);
}

console.log(analyzePacks(parsedData));
