export const Strings = {
  login: {
    navigating: "Heading to login page",
    request: "Please login to Waterlooworks to continue scraping",
  },
  scraping: {
    jobTableRows: "Scraping job table rows",
    jobPages: "Please keep the browser tab open. Scraping job pages",
    jobPage: (current: number, total: number) =>
      `Please keep the browser tab open.\nScraping job page ${current} of ${total}.`,
    banner: (job?: number, totalJobs?: number) => {
      const commonStr = `Scraping started, keep this tab open and don't minimize.`;
      if (!job || !totalJobs) {
        return commonStr;
      }
      const percentage = Math.round((job / totalJobs) * 100);
      return `${commonStr} Scraping job ${job} of ${totalJobs} (${percentage}%).`;
    },
  },
};
