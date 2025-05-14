import { Page } from "puppeteer-core";
import { IJobTableResponse } from "src/scraping/scrapeJobs/src/scrapeTable/types/Response";
import { getWebpageAsString } from "src/utils/scraping/parsing/evaluateWithRequestDomParser/evaluateWithRequestDomParser";

export const ITEMS_PER_PAGE = 100;
export const fetchTableJobs = async (
  page: Page,
  action: string,
  pageNumber: number,
  isMyProgram = false
): Promise<IJobTableResponse> => {
  const columns = `[
    {
      title: "ID",
      key: "Id",
      isId: true,
      sortable: true,
      visible: true,
      headerColWidth: 255,
      defaultColWidth: 255,
    },
    {
      title: "Job+Title",
      key: "JobTitle",
      isId: false,
      sortable: true,
      visible: true,
      tableColWidth: 325,
      dataVisualizer: {
        template: "#jobTitleDataVisualizer",
        mixins: [{ props: {} }],
        computed: {},
      },
      headerColWidth: 325,
      defaultColWidth: 325,
    },
    {
      title: "Organization",
      key: "Organization",
      isId: false,
      sortable: true,
      visible: true,
      tableColWidth: 225,
      headerColWidth: 225,
      defaultColWidth: 225,
    },
    {
      title: "Division",
      key: "Division",
      isId: false,
      sortable: true,
      visible: true,
      tableColWidth: 225,
      headerColWidth: 225,
      defaultColWidth: 225,
    },
    {
      title: "Position+Type",
      key: "PositionType",
      isId: false,
      sortable: true,
      visible: true,
      headerColWidth: 182,
      defaultColWidth: 182,
    },
    {
      title: "Location",
      key: "Location",
      isId: false,
      sortable: true,
      visible: true,
      headerColWidth: 303,
      defaultColWidth: 303,
    },
    {
      title: "City",
      key: "City",
      isId: false,
      sortable: true,
      visible: true,
      headerColWidth: 161,
      defaultColWidth: 161,
    },
    {
      title: "App+Deadline",
      key: "Deadline",
      isId: false,
      sortable: true,
      visible: true,
      headerColWidth: 200,
      defaultColWidth: 200,
    },
  ]`
  const myProgramColumns = `[{"title":"ID","key":"Id","isId":true,"sortable":true,"visible":true},{"title":"Job Title","key":"JobTitle","isId":false,"sortable":true,"visible":true,"tableColWidth":325,"dataVisualizer":{"template":"#jobTitleDataVisualizer","mixins":[{"props":{}}],"computed":{}}},{"title":"Organization","key":"Organization","isId":false,"sortable":true,"visible":true,"tableColWidth":225},{"title":"Division","key":"Division","isId":false,"sortable":true,"visible":true,"tableColWidth":225},{"title":"Openings","key":"Openings","isId":false,"sortable":true,"visible":true},{"title":"City","key":"City","isId":false,"sortable":true,"visible":true},{"title":"Level","key":"Level","isId":false,"sortable":true,"visible":true},{"title":"Apps","key":"ApplicationCount","isId":false,"sortable":true,"visible":true},{"title":"App Deadline","key":"Deadline","isId":false,"sortable":true,"visible":true}]`
  const query = {
    page: pageNumber,
    sort: `[{ key: "Id", direction: "desc" }]`,
    itemsPerPage: ITEMS_PER_PAGE,
    filters: isMyProgram ? `{"studentPerspective":{"type":"boolean","value":"true"}}`:null,
    columns: isMyProgram ? myProgramColumns : columns,
    keyword: null,
    action,
    isDataViewer: true,
  };

  const result = await getWebpageAsString(page, JSON.stringify(query));
  return JSON.parse(result);
};
