import { IJobTableRow } from "src/scraping/scrapeTableRows/src/types/JobTableRow";

export interface IGraduateJobTableRow extends IJobTableRow{
    positionType?: string,
    city?: string,
    appDeadline?: number
}
