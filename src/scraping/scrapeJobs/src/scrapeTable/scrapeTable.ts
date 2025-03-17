import { ProgressReporter } from "@internwave/scrapers-api";
import { Page } from "puppeteer-core";
import { fetchTableJobs } from "src/scraping/scrapeJobs/src/scrapeTable/src/fetchTableJobs";
import { getFetchTableActionID } from "src/scraping/scrapeJobs/src/scrapeTable/src/getFetchTableActionID";
import { IJobRowResponse } from "src/scraping/scrapeJobs/src/scrapeTable/types/Response";

export const scrapeTable = async (
  page: Page,
  progressReporter: ProgressReporter,
): Promise<IJobRowResponse[]> => {
  const action = await getFetchTableActionID(page);
  if (!action) {
    throw new Error("Action key not found before scraping jobs table");
  }
  const firstPage = await fetchTableJobs(page, action, 1);
  const totalPages = Math.ceil(firstPage.totalResults / 100);
  const out: IJobRowResponse[] = firstPage.data;
  progressReporter.nextStep("Scraping job table", totalPages, 1);
  for (let i = 2; i <= totalPages; i++) {
    const tableData = await fetchTableJobs(page, action, i);
    out.push(...tableData.data);
    progressReporter.reportProgress();
  }
  progressReporter.nextStep(
    "Scraping individual job pages",
    firstPage.totalResults,
  );
  return out;
};
