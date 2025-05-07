import { IJobRowResponse } from "src/scraping/scrapeJobs/src/scrapeTable/types/Response";

export const getJobTableResponseValue = (
    resp: IJobRowResponse,
    key: string
):IJobRowResponse['data'][number]['value'] | undefined => {
    return resp.data.find((item) => item.key === key)?.value;
}