import { data, testData } from "./data-4.js";

type SectionRange = [number, number];
type ElfGroup = [SectionRange, SectionRange];

const parsedData = parseData(data);

function compareElfAssignments(elfGroupList: ElfGroup[]) {
  let redundantAssignments = 0;

  for (const elfGroup of elfGroupList) {
    const redundant = compareSections(...elfGroup);
    redundant ? redundantAssignments++ : undefined;
  }

  return redundantAssignments;
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
  const overlappedSections = findOverlappingNumbers(smallerRange, biggerRange);

  const fullyOverlapped = overlappedSections.length > 0;

  return fullyOverlapped;
}

function findOverlappingNumbers(smallerRange: number[], biggerRange: number[]) {
  const overlappingSections = smallerRange.filter((number) => {
    return biggerRange.includes(number);
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
  const capturedValues = Array.from(data.matchAll(re))
    
  return capturedValues.map((group => {
    const firstElf: SectionRange = [parseInt(group[2]), parseInt(group[3])]
    const secondElf: SectionRange = [parseInt(group[5]), parseInt(group[6])]

    const elfGroup = [firstElf, secondElf] as ElfGroup

    return elfGroup
  }))
}

console.log(compareElfAssignments(parsedData))
