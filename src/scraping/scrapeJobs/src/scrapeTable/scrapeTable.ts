import { ProgressReporter } from "@internwave/scrapers-api";
import { Page } from "puppeteer-core";
import { fetchTableJobs, ITEMS_PER_PAGE } from "src/scraping/scrapeJobs/src/scrapeTable/src/fetchTableJobs";
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
  const totalPages = Math.ceil(firstPage.totalResults / ITEMS_PER_PAGE);
  const out: IJobRowResponse[] = []
  // 2 for my program and all jobs estimate
  // This step is usually fast, so estimate shouldn't be too far off
  progressReporter.nextStep("Scraping job table", totalPages * 2, 1); 
  const myProgramJobs = await getMyProgramJobIds(page, action, progressReporter);
  for (let i = 1; i <= totalPages; i++) {
    const tableData = i === 1 ? firstPage : await fetchTableJobs(page, action, i);
    for(const job of tableData.data) {
      job.data.push({
        key: "ForMyProgram",
        value: myProgramJobs.has(job.id)
      });
      out.push(job)
  }
    progressReporter.reportProgress();
  }
  progressReporter.nextStep(
    "Scraping individual job pages",
    firstPage.totalResults,
  );
  return out;
};

const getMyProgramJobIds = async(
  page: Page,
  action: string, 
  progressReporter: ProgressReporter,
): Promise<Set<string>> => {
  const out = new Set<string>();
  const firstPage = await fetchTableJobs(page, action, 1, true);
  const totalPages = Math.ceil(firstPage.totalResults / ITEMS_PER_PAGE);
  progressReporter.reportProgress();
  for (let i = 1; i <= totalPages; i++) {
    const tableData = i === 1 ? firstPage : await fetchTableJobs(page, action, i, true);
    for (const job of tableData.data) {
        out.add(job.id);
    }
    progressReporter.reportProgress();
  }
  return out;
}
