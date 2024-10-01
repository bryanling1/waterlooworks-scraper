import { ElementHandle, Page } from "puppeteer";
import { Selectors } from "src/constants/Selectors";

export const scrapeBarChartKeys = (page: Page, chart: ElementHandle<Element>) => {
    return page.evaluate(
        (chart, labelsSelector, labelSelector) => {
            const out: string[] = [];
            for(const label of chart.querySelectorAll(labelsSelector)){
                const value = label.querySelector(labelSelector)?.textContent
                if(!value){
                    continue
                }
                out.push(value)
            }
            return out;
            
        }, 
        chart, 
        Selectors.JobPosting.WorkTermRating.ChartAxisLabels,
        Selectors.JobPosting.WorkTermRating.Tspan(1), 
    );
}