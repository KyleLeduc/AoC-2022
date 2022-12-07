import { data, testData } from "./data-4.js";

type SectionRange = [number, number];
type ElfGroup = [SectionRange, SectionRange];

const parsedData = parseData(testData);

function compareElfAssignments(elfGroupList: ElfGroup[]) {
  let duplicatedSections = new Map();

  for (const elfGroup of elfGroupList) {
    const redundantSections = compareSections(...elfGroup);
    if (redundantSections) {
      duplicatedSections = new Map([...duplicatedSections, ...redundantSections])
    }
  }

  const totalDuplicatedSections = duplicatedSections.size

  return totalDuplicatedSections;
}

function compareSections(firstElf: SectionRange, secondElf: SectionRange) {
  // identify smaller range
  let biggerRange: number[];
  let smallerRange: number[];

  if (getRangeSize(...firstElf) > getRangeSize(...secondElf)) {
    biggerRange = generateRangeArray(...firstElf);
    smallerRange = generateRangeArray(...secondElf);
  } else {
    biggerRange = generateRangeArray(...secondElf);
    smallerRange = generateRangeArray(...firstElf);
  }

  // compare smaller to larger range
  const overlappingSections = findOverlappingNumbers(smallerRange, biggerRange);

  return overlappingSections;
}

function findOverlappingNumbers(smallerRange: number[], biggerRange: number[]) {
  const overlappingSections = new Map();
  smallerRange.forEach((number: number) => {
    if (biggerRange.includes(number)) {
      overlappingSections.set(number, true);
    }
  });

  return overlappingSections;
}

function generateRangeArray(start: number, end: number): number[] {
  return [...Array(end - start + 1).keys()].map((num) => num + start);
}

function getRangeSize(start: number, end: number): number {
  return end - start + 1;
}

function parseData(data: string) {
  const re = new RegExp(/^((\d*)-(\d*)),((\d*)-(\d*))/gm);
  const capturedValues = Array.from(data.matchAll(re));

  return capturedValues.map((group) => {
    const firstElf: SectionRange = [parseInt(group[2]), parseInt(group[3])];
    const secondElf: SectionRange = [parseInt(group[5]), parseInt(group[6])];

    const elfGroup = [firstElf, secondElf] as ElfGroup;

    return elfGroup;
  });
}

console.log(compareElfAssignments(parsedData));
