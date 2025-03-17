import { Page } from "puppeteer-core";
import { IWorkTermRatingResponse } from "src/scraping/scrapeJobPages/src/scrapeJobPage/src/scrapeWorkTermRatings/src/scrapeCharts/src/types/WorkTermRatingResponse";

export const scrapeCharts = (
  page: Page,
  divisionId: number,
): Promise<IWorkTermRatingResponse> => {
  return page.evaluate((divId: number) => {
    return new Promise<IWorkTermRatingResponse>((resolve) => {
      //@ts-expect-error method is defined in the page
      window.getWorkTermRatingReportJson(divId, (callbackResult) => {
        resolve(callbackResult);
      });
    });
  }, divisionId);
};
