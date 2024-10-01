import { Page, ElementHandle } from "puppeteer";
import { Selectors } from "src/constants/Selectors";

export const scrapeBarChartValues = (page: Page, chart: ElementHandle<Element>) => {
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
        Selectors.JobPosting.WorkTermRating.ChartLabels,
        Selectors.JobPosting.WorkTermRating.Tspan(1), 
    );
}