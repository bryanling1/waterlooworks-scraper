import { parseJSData } from "src/utils/scraping/parsing/parseJSData/parseJSData";
import { getClosingBracketIndex } from "src/utils/scraping/parsing/parseJSData/src/strings/getClosingBracketIndex ";
import { getFirstMatchIndex } from "src/utils/scraping/parsing/parseJSData/src/strings/getFirstMatchIndex";
import { getStringInBrackets } from "src/utils/scraping/parsing/parseJSData/src/strings/getStringInBrackets";


export const parseArray = (str: string): unknown[] => {
    return getArrayStringStrings(str).map(parseJSData);
}
//"[a, {}, []]" => ["a", "{}", "[]"]
const getArrayStringStrings = (str: string): string[] => {
    const out: string[] = [];
    const target = getStringInBrackets(str, "[");
    let i=0;
    while(i < target.length){
        i = getFirstMatchIndex(target, /\S/, i);
        if(target[i]?.match(/[\{\[]/)){
            const endIndex = getClosingBracketIndex(target, i, target[i] as "[" | "{");
            out.push(target.slice(i, endIndex));
            i = getFirstMatchIndex(target, /,/, endIndex) + 1
            continue;
        }
        const endIndex = getFirstMatchIndex(target, /,/, i);
        out.push(target.slice(i, endIndex));
        i = endIndex + 1;
    }
    return out;
}
