export const findMarker = (data: string): number => {
  const windowLength = 14;
  const slice = data.slice(0, windowLength);
  let hasDupes = hasDuplicates(slice);
  if (!hasDupes) return windowLength;

  for (let i = 1; i < data.length; i++) {
    hasDupes = hasDuplicates(data.slice(i, i + windowLength));
    if (i + windowLength > data.length) return -1;
    if (!hasDupes) return i + windowLength;
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
