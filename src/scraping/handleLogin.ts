import { Page } from "puppeteer";
import { Links } from "src/constants/Links";
import { Selectors } from "src/constants/Selectors";
import { TIMEOUT } from "src/constants/Timeout";

export const handleLogin = async (page: Page) => {
    await page.goto(Links.LOGIN);
    await page.waitForSelector(Selectors.LOGOUT_BUTTON, {timeout: 0});
    await page.goto(Links.GRADUATE_JOBS);
    await page.waitForSelector(Selectors.SEARCH_FORM,  {timeout: TIMEOUT});
}