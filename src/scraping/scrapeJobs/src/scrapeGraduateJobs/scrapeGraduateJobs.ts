import { IScrapedJob, ProgressReporter } from "@internwave/scrapers-api";
import { Page } from "puppeteer-core";
import { Links } from "src/constants/Links";
import { IJobRowResponse } from "src/scraping/scrapeJobs/src/scrapeTable/types/Response";
import { scrapeTable } from "src/scraping/scrapeJobs/src/scrapeTable/scrapeTable";
import { scrapeJobModals } from "src/scraping/scrapeJobs/src/scrapeJobModals/scrapeJobModals";
import { injectBanner } from "src/utils/scraping/render/injectBanner";
import { Strings } from "src/constants/Strings";

export const scrapeGraduateJobs = async (
  page: Page,
  progressReporter: ProgressReporter,
): Promise<IScrapedJob[]> => {
  await page.goto(Links.GRADUATE_JOBS);
  await injectBanner(page, Strings.scraping.banner());
  const jobRows: IJobRowResponse[] = await scrapeTable(page, progressReporter);
  return scrapeJobModals(page, progressReporter, jobRows, Links.graduateJob);
};
