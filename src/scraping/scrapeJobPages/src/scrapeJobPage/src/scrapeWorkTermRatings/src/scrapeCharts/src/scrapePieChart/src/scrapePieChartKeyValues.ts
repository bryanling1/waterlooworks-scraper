import { Page, ElementHandle } from "puppeteer";
import { Selectors } from "src/constants/Selectors";

export const scrapePieChartKeyValues = ( page: Page, chart: ElementHandle<Element>) => {
    return page.evaluate(
        (chart, labelsSelector, labelSelector, valueSelector) => {
            const out: [string, string][] = [];
            for(const label of chart.querySelectorAll(labelsSelector)){
                const key = label.querySelector(labelSelector)?.textContent
                const value = label.querySelector(valueSelector)?.textContent
                if(!key || !value){
                    continue
                }
                out.push([key, value])
            }
            return out;
            
        }, 
        chart, 
        Selectors.JobPosting.WorkTermRating.ChartLabels,
        Selectors.JobPosting.WorkTermRating.Tspan(1), 
        Selectors.JobPosting.WorkTermRating.Tspan(2)
    );
}