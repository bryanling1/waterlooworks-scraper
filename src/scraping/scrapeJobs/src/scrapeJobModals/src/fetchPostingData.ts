import { Page } from "puppeteer-core";
import { IGetPostingDataResponse } from "src/scraping/scrapeJobs/src/scrapeJobModals/types/GetPostingDataResponse";

export const fetchPostingData = (page: Page, jobID: string) => {
  return page.evaluate((jobID: string) => {
    return Promise.all([
      new Promise<IGetPostingDataResponse>((resolve) => {
        //@ts-expect-error method is defined in the page
        window.getPostingData(jobID, (callbackResult) => {
          resolve(callbackResult);
        });
      }),
      new Promise<string>((resolve) => {
        //@ts-expect-error method is defined in the page
        window.getPostingOverview(jobID, (callbackResult) => {
          resolve(callbackResult);
        });
      }),
    ]);
  }, jobID);
};
