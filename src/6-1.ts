export const findMarker = (data: string): number => {
  const slice = data.slice(0, 4);
  let hasDupes = hasDuplicates(slice);
  if (!hasDupes) return 4;

  for (let i = 1; i < data.length; i++) {
    hasDupes = hasDuplicates(data.slice(i, i + 4));
    if (i+4 > data.length) return -1
    if (!hasDupes) return i + 4;
  }

  return 0;
};

const hasDuplicates = (slice: string) => {
  for (let i = 0; i < slice.length; i++) {
    const ownIdx = slice.indexOf(slice[i]);
    const comparison = slice.lastIndexOf(slice[i]);
    if (ownIdx !== comparison) return true;
  }
  return false;
};
