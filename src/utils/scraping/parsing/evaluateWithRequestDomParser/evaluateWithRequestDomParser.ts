import { Page } from "puppeteer";

type EvaluateFn<T, Args extends unknown[]> = (document: Document, ...args: Args) => T;

//supplied function shouldn't have async calls or imported modules
//otherwise it will not be serialized
export const evaluateWithRequestDomParser = <Args extends unknown[]>(page: Page, formData: BodyInit, ...args: Args) => <T>(fn: EvaluateFn<T, Args>): Promise<T> => {
    return new Promise<T>((resolve, reject) => {
        const serializedFn = fn.toString();
        const result = page.evaluate(  
            (link: string, formDataString: string, serializedFn: string, ...args: unknown[]) => {
                const parsedData = JSON.parse(formDataString);
                const formData = new FormData();
                for (const key in parsedData) {
                    formData.append(key, parsedData[key]);
                }
                const fn = new Function('document', '...args', `return (${serializedFn})(document, ...args)`);
                return fetch(link, {
                    method: 'POST',
                    body: formData,
                })
                .then(response => response.text())
                .then(text => {
                    const parser = new DOMParser();
                    return parser.parseFromString(text, 'text/html');
                })
                .then(doc => {
                    return fn(doc, ...args as Args);
                });
            },
            page.url(),
            JSON.stringify(formData),
            serializedFn,
            ...args
        );
        result.then(resolve).catch(reject);
    });
};

export const getWebpageAsString = (page: Page, formData: BodyInit):Promise<string> => {
    return new Promise((resolve, reject) => {
        const test = page.evaluate(  
            (link: string, formDataString: string) => {
                const parsedData = JSON.parse(formDataString);
                const formData = new FormData();
                for (const key in parsedData) {
                    formData.append(key, parsedData[key]);
                }
                return fetch(link, {
                    method: 'POST',
                    body: formData,
                })
                .then(response => response.text())
            },
            page.url(),
            typeof formData === 'string' ? formData : JSON.stringify(formData),
        );
        test.then(resolve).catch(reject);
    });
}; 


/**
 * Supplied function shouldn't have async calls or imported modules
 * otherwise it will not be serialized.
 */
export const evaluateWebpageString = <Args extends unknown[]>(page: Page, webpage:string, ...args: Args) => <T>(fn: EvaluateFn<T, Args>): Promise<T> => {
    return new Promise<T>((resolve, reject) => {
        const serializedFn = fn.toString();
        const result = page.evaluate(  
            (webpage: string, serializedFn: string, ...args: unknown[]) => {
                const fn = new Function('document', '...args', `return (${serializedFn})(document, ...args)`);
                const parser = new DOMParser();
                const document = parser.parseFromString(webpage, 'text/html');
                return fn(document, ...args as Args);
            },
            webpage,
            serializedFn,
            ...args
        );
        result.then(resolve).catch(reject);
    });
};