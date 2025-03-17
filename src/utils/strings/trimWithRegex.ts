export const trimWithRegex = (str: string, test: RegExp): string => {
  let i = 0;
  while (!test.test(str[i] ?? "")) {
    i++;
  }
  let j = str.length - 1;
  while (!test.test(str[j] ?? "")) {
    j--;
  }
  return str.slice(i, j + 1);
};
