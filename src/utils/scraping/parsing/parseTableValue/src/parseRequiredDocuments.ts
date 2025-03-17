import { parseStringArr } from "src/utils/scraping/parsing/parseTableValue/src/parseStringArr";

export const parseDocuments = (value: string): string[] | undefined => {
    return parseStringArr(value)?.map(replaceAccentedEs);
}

//For Resume
const replaceAccentedEs = (input: string): string => {
    return input.replace(/r.+sum.+/ig, 'Resume')
}