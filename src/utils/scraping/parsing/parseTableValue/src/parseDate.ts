export const parseDateTime = (value: string) => {
  const parsed = Date.parse(value);
  return isNaN(parsed) ? undefined : parsed;
};
