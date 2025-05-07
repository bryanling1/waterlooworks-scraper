import { IScrapedJob, ProgressReporter } from "@internwave/scrapers-api";
import { Page } from "puppeteer-core";
import { Strings } from "src/constants/Strings";
import { scrapeModalPanels } from "src/scraping/scrapeJobPages/src/scrapeJobPage/src/scrapeModelPanel";
import { scrapeCharts } from "src/scraping/scrapeJobPages/src/scrapeJobPage/src/scrapeWorkTermRatings/src/scrapeCharts/scrapeCharts";
import { workTermReponseToCharts } from "src/scraping/scrapeJobPages/src/scrapeJobPage/src/scrapeWorkTermRatings/src/scrapeCharts/workTermResponseToCharts";
import { mapToScrapedJob } from "src/scraping/scrapeJobs/src/mapToScrapedJob";
import { fetchPostingData } from "src/scraping/scrapeJobs/src/scrapeJobModals/src/fetchPostingData";
import { getJobTableResponseValue } from "src/scraping/scrapeJobs/src/scrapeTable/src/getJobTableResponseValue";
import { IJobRowResponse } from "src/scraping/scrapeJobs/src/scrapeTable/types/Response";
import { JobDataTableKnownKey } from "src/utils/scraping/parsing/parseTableValue/parseTableValue";
import { injectBanner } from "src/utils/scraping/render/injectBanner";

export const scrapeJobModals = async (
  page: Page,
  progressReporter: ProgressReporter,
  jobRows: IJobRowResponse[],
  getJobUrl: (id: string) => string
): Promise<IScrapedJob[]> => {
  const out: IScrapedJob[] = [];
  for (const [index, jobRow] of jobRows.entries()) {
    const [postingData, modalStr] = await fetchPostingData(page, jobRow.id);
    const workTermRatingResponse = await scrapeCharts(page, postingData.divId);
    const [jobInfoMap, applicationDeliveryMap, companyInfoMap] =
      await scrapeModalPanels(page, modalStr);
    const org = companyInfoMap[JobDataTableKnownKey.Organization];
    const jobTitle = jobInfoMap[JobDataTableKnownKey.JobTitle];
    if (!org || !jobTitle) {
      continue;
    }
    const id = postingData.id.toString();
    const openings = getJobTableResponseValue(jobRow, "Openings")
    const applicationCount = getJobTableResponseValue(jobRow, "ApplicationCount")

    let scrapedJob: IScrapedJob = {
      id,
      url: getJobUrl(id),
      company: {
        name: org,
      },
      location: {},
      jobTitle: jobTitle,
      charts: workTermReponseToCharts(postingData.org, workTermRatingResponse),
      openings: typeof openings === "number" ? openings : undefined,
      applications: typeof applicationCount === "number" ? applicationCount : undefined,
    };
    scrapedJob = mapToScrapedJob(jobInfoMap, scrapedJob);
    scrapedJob = mapToScrapedJob(
      applicationDeliveryMap,
      scrapedJob,
      "Application",
    );
    scrapedJob = mapToScrapedJob(companyInfoMap, scrapedJob, "Company");
    scrapedJob.location = {
      address:
        typeof postingData.geoData.address === "string"
          ? postingData.geoData.address
          : postingData.geoData.address?.join(", "),
      city: postingData.geoData.city,
      country: postingData.geoData.country,
      postalCode: postingData.geoData.postalCode,
      state: postingData.geoData.province,
    };
    out.push(scrapedJob);
    progressReporter.reportProgress(
      `Scraped job ${index + 1} of ${jobRows.length}`,
    );
    await injectBanner(
      page,
      Strings.scraping.banner(index + 1, jobRows.length),
    );
  }
  return out;
};
