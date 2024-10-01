import { IChartData } from "@internwave/scrapers-api";

export const keyValuesToChartData = (
    title: string,
    labelKeyValues: [string, string][],
    totalHires: number
) => {
    const out: IChartData = {
        title: title,
        data: {},
        type: 0
    }
    for(const labelKeyValue of labelKeyValues){
        const [label, value] = labelKeyValue;
        const formattedLabel = label.trim();
        const percentage = parseInt(value.slice(1, -1).trim());
        if(isNaN(percentage)){
            continue;
        }
        const total = Math.floor((percentage / 100) * totalHires);
        out.data[formattedLabel] = total;
    }
    return out;
}