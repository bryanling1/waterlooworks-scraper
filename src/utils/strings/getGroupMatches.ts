export const getGroupMatches = (regex: RegExp, str: string): string[] => {
    const matches = str.matchAll(regex);
    const out: string[] = []
    for(const match of matches){
        out.push(match[1]);
    }
    return out;
}