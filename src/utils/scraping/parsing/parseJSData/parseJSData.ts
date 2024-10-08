

/*
    Used for parsing object string with primitive type values.
    Complex values will be returned as strings.
    See parse.test.ts and parse Charts.test.ts for examples

    Used for scraping work term rating charts
*/

import { parseArray } from "src/utils/scraping/parsing/parseJSData/src/parseArray";
import { parseObject } from "src/utils/scraping/parsing/parseJSData/src/parseObject";
import { parsePrimitive } from "src/utils/scraping/parsing/parseJSData/src/parsePrimitive";
import { getFirstMatchIndex } from "src/utils/scraping/parsing/parseJSData/src/strings/getFirstMatchIndex";

export const parseJSData = <T>(str: string):T => {
    const i = getFirstMatchIndex(str, /\S/);
    if(str[i] === "{"){
        return parseObject(str) as T
    }else if(str[i] === "["){
        return parseArray(str) as T
    }
    return parsePrimitive(str) as T
}
