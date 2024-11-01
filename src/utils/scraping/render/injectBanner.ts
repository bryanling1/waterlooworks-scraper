import { Page } from "puppeteer-core";

export const injectBanner = async (page: Page, comment: string) => {
    await page.evaluate((comment) => {
        const banner = document.createElement("div");
        banner.style.position = "fixed";
        banner.style.top = "0";
        banner.style.left = "0";
        banner.style.width = "100%";
        banner.style.backgroundColor = "rgb(0, 138, 230)";
        banner.style.color = "white";
        banner.style.zIndex = "1000000";
        banner.style.padding = "8px";
        banner.style.fontSize = "16px";
        banner.style.textAlign = "center";
        banner.style.fontWeight = "bold";
        banner.innerText = comment;
        document.body.appendChild(banner);
    }, comment);
}