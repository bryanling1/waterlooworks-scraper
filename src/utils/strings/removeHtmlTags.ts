export const removeHtmlTags = (str: string): string => {
  return str.replace(/<[a-zA-Z]+>|<\/[a-zA-Z]+>/g, "");
};
