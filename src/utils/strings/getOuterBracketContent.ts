export const getOuterBracketContent = (
  text: string,
  brackets: [string, string] = ["{", "}"],
): string => {
  let i = 0;
  let stack = 1;
  const [openingBracket, closingBracket] = brackets;
  while (text[i] !== openingBracket && i < text.length) {
    i++;
  }
  while (stack > 0 && i < text.length) {
    i++;
    if (text[i] === openingBracket) {
      stack++;
    } else if (text[i] === closingBracket) {
      stack--;
    }
  }
  if (stack > 0) {
    return "";
  }
  return text.slice(0, i + 1);
};
