import { IChartData } from "@internwave/scrapers-api";

export const keysAndValuesToChartData = (
    title: string,
    keys: string[],
    values: string[]
) => {
    const out: IChartData = {
        title: title,
        data: {},
        type: 0
    }
    for(let i=0; i<keys.length; i++){
        const key = keys[i];
        const value = values[i];
        if(!key || !value){
            continue;
        }
        const formattedKey = key.trim();
        const numberValue = parseInt(value.trim());
        if(isNaN(numberValue)){
            continue;
        }
        out.data[formattedKey] = numberValue;
    }
    return out;
}