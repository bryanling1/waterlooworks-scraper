export const Strings = {
    login: {
        navigating: "Heading to login page",
        request: "Please login to Waterlooworks to continue scraping",
    },
    scraping: {
        jobTableRows: "Scraping job table rows",
        jobPages: "Please keep the browser tab open. Scraping job pages",
        jobPage: (current: number, total: number) => `Please keep the browser tab open.\nScraping job page ${current} of ${total}.`,
        banner: "Scraping started! Please keep this tab open and head back to the desktop app to view progress."
    }
}