import { Page, ElementHandle } from "puppeteer";
import { Selectors } from "src/constants/Selectors";

export const scrapeChartTitle = (page: Page, chart: ElementHandle<Element>) => {
    return page.evaluate(
        (chart, selector) => chart.querySelector(selector)?.textContent?.trim(), 
        chart, 
        Selectors.JobPosting.WorkTermRating.ChartTitle
    );
}