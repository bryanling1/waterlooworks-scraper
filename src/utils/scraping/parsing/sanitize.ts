const normalizeJobTableKey = (key: string) => {
    const lastIndex = key.lastIndexOf(":");
    return (lastIndex === -1 ? key : key.substring(0, lastIndex)).trim().toLowerCase();
}

const sanitizeJobTableValue = (value: string) => {
    return value.replace(/\n|\t/g, "").trim()
}

export const sanitizeRecord = (record: Record<string, string>):Record<string, string> => {
    const out: Record<string, string> = {}
    for(const key in record){
        if(!record[key]){
            continue;
        }
        out[normalizeJobTableKey(key)] = sanitizeJobTableValue(record[key])
    }
    return out;
}