import { Page } from "puppeteer-core";

export const injectBanner = async (page: Page, comment: string) => {
  await page.evaluate((comment) => {
    const bannerId = "internwave-desktop-banner";
    let banner = document.getElementById(bannerId);

    if (!banner) {
      banner = document.createElement("div");
      banner.id = bannerId;
      banner.style.position = "fixed";
      banner.style.top = "0";
      banner.style.left = "0";
      banner.style.width = "100%";
      banner.style.backgroundColor = "rgb(0, 138, 230)";
      banner.style.color = "white";
      banner.style.zIndex = "1000000";
      banner.style.padding = "16px";
      banner.style.fontSize = "24px";
      banner.style.textAlign = "center";
      banner.style.fontWeight = "bold";
      document.body.appendChild(banner);
    }

    banner.innerText = comment;
  }, comment);
};
