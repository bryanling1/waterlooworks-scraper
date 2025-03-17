import { Page } from "puppeteer-core"
import { IJobTableResponse } from "src/scraping/scrapeJobs/src/scrapeTable/types/Response"
import { getWebpageAsString } from "src/utils/scraping/parsing/evaluateWithRequestDomParser/evaluateWithRequestDomParser"

export const fetchTableJobs = async (page: Page, action: string, pageNumber: number): Promise<IJobTableResponse> => {
    const query = {
        page: pageNumber,
        sort: [{"key":"Id","direction":"desc"}],
        itemsPerPage: 100,
        filters: null,
        columns: [{"title":"ID","key":"Id","isId":true,"sortable":true,"visible":true,"headerColWidth":255,"defaultColWidth":255},{"title":"Job+Title","key":"JobTitle","isId":false,"sortable":true,"visible":true,"tableColWidth":325,"dataVisualizer":{"template":"#jobTitleDataVisualizer","mixins":[{"props":{}}],"computed":{}},"headerColWidth":325,"defaultColWidth":325},{"title":"Organization","key":"Organization","isId":false,"sortable":true,"visible":true,"tableColWidth":225,"headerColWidth":225,"defaultColWidth":225},{"title":"Division","key":"Division","isId":false,"sortable":true,"visible":true,"tableColWidth":225,"headerColWidth":225,"defaultColWidth":225},{"title":"Position+Type","key":"PositionType","isId":false,"sortable":true,"visible":true,"headerColWidth":182,"defaultColWidth":182},{"title":"Location","key":"Location","isId":false,"sortable":true,"visible":true,"headerColWidth":303,"defaultColWidth":303},{"title":"City","key":"City","isId":false,"sortable":true,"visible":true,"headerColWidth":161,"defaultColWidth":161},{"title":"App+Deadline","key":"Deadline","isId":false,"sortable":true,"visible":true,"headerColWidth":200,"defaultColWidth":200}],
        keyword: null,
        action,
        isDataViewer: true
    }

    const result = await getWebpageAsString(page, JSON.stringify(query))
    return JSON.parse(result)
}