import { Page } from "puppeteer-core";

export const submitPostForm = (page: Page, requestBody: BodyInit | Record<string, string>) => {
    return page.evaluate(
        (url, body) => {
            const form = document.createElement('form');
            form.method = 'POST';
            form.action = url;
            for (const [key, value] of Object.entries(body)) {
                const input = document.createElement('input');
                input.name = key;
                input.value = value;
                form.appendChild(input);
            }
            document.body.appendChild(form);
            form.submit();
    }, 
        page.url(),
        requestBody
    )
}