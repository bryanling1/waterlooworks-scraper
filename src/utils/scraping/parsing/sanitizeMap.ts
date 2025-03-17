const normalizeJobTableKey = (key: string) => {
    const sanitizedKey = key.trim().toLowerCase();
    const lastIndex = sanitizedKey.lastIndexOf(":");
    return (lastIndex === -1 ? sanitizedKey : sanitizedKey.substring(0, lastIndex))
}

const sanitizeJobTableValue = (value: string) => {
    return value.replace(/[\n\t]+/g, " ").trim()
}

export const sanitizeMap = (record: Record<string, string>):Record<string, string> => {
    const out: Record<string, string> = {}
    for(const key in record){
        if(!record[key]){
            continue;
        }
        out[normalizeJobTableKey(key)] = sanitizeJobTableValue(record[key])
    }
    return out;
}