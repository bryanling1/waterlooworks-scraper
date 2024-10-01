export const parseStringArr = (value: string): string[] | undefined => {
    if(!value){
        return undefined;
    }
    const out = value.split(",")
    .map(x => x.trim())
    .filter(x => x !== "")
    .map(replaceAccentedEs);

    return out.length > 0 ? out : undefined;
}

const replaceAccentedEs = (input: string): string => {
    return input.replace(/[éèêë]/g, 'e');
}