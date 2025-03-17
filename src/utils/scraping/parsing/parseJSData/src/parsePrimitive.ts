export const parsePrimitive = (str: string): unknown => {
  try {
    return JSON.parse(str.trim());
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
  } catch (e) {
    if (
      (str.startsWith("'") && str.endsWith("'")) ||
      (str.startsWith('"') && str.endsWith('"')) ||
      (str.startsWith("`") && str.endsWith("`"))
    ) {
      return str.slice(1, str.length - 1);
    }
    return str.trim();
  }
};
