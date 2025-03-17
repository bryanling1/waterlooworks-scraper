import { getClosingBracketIndex } from "src/utils/scraping/parsing/parseJSData/src/strings/getClosingBracketIndex ";
import { getFirstMatchIndex } from "src/utils/scraping/parsing/parseJSData/src/strings/getFirstMatchIndex";

export const getStringInBrackets = (
  str: string,
  opening: "[" | "{",
): string => {
  let out = "";
  const i = getFirstMatchIndex(str, /\S/);
  if (str[i] === opening) {
    const endIndex = getClosingBracketIndex(str, i, opening);
    out = str.slice(i + 1, endIndex - 1);
    return out;
  }
  return out.trim();
};
