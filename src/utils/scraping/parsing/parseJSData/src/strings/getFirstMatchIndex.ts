export const getFirstMatchIndex = (
  str: string,
  match: RegExp,
  startingIndex: number = 0,
): number => {
  const index = str.slice(startingIndex).search(match);
  return index === -1 ? str.length : startingIndex + index;
};
