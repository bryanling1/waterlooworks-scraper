export const parseNumber = (value: string) => {
    const parsed = parseInt(value, 10);
    return isNaN(parsed) ? undefined : parsed
}