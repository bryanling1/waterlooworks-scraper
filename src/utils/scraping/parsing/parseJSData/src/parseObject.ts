import { parseJSData } from "src/utils/scraping/parsing/parseJSData/parseJSData";
import { getClosingBracketIndex } from "src/utils/scraping/parsing/parseJSData/src/strings/getClosingBracketIndex ";
import { getFirstMatchIndex } from "src/utils/scraping/parsing/parseJSData/src/strings/getFirstMatchIndex";
import { getStringInBrackets } from "src/utils/scraping/parsing/parseJSData/src/strings/getStringInBrackets";


export const parseObject = (jsObectString: string) => {
    const out: { [key: string]: unknown} = {};
    const str = getStringInBrackets(jsObectString, "{")
    let i=0;
    
    while(i < str.length){
        const keyEndIndex = getFirstMatchIndex(str, /:/, i);
        const key = str.slice(i, keyEndIndex)?.match(/(\w+)/)?.[1]
        if(!key){
            return out;
        }
        i = getFirstMatchIndex(str, /\S/, keyEndIndex + 1);
        const valueEndIndex = str[i]?.match(/[\{\[]/) ? 
            getClosingBracketIndex(str, i, str[i] as "[" | "{") : 
            getFirstMatchIndex(str, /,/, i);
        const currentValue = str.slice(i, valueEndIndex).trim()
        i = valueEndIndex;
        out[key] = parseJSData(currentValue)
    }
    
    return out;
}
