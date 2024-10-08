export const parseStringArr = (value: string): string[] | undefined => {
    if(!value){
        return undefined;
    }
    const out = value.split(",")
    .map(x => x.trim())
    .filter(x => x !== "")

    return out.length > 0 ? out : undefined;
}
