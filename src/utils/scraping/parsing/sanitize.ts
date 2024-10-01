export const normalizeJobTableKey = (key: string) => {
    const lastIndex = key.lastIndexOf(":");
    return (lastIndex === -1 ? key : key.substring(0, lastIndex)).trim().toLowerCase();
}

export const sanitizeJobTableValue = (value: string) => {
    return value.replace(/\n|\t/g, "").trim()
}