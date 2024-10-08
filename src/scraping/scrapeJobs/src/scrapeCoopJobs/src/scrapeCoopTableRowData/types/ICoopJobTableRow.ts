import { IJobTableRow } from "src/scraping/scrapeTableRows/src/types/JobTableRow";

export interface ICoopJobTableRow extends IJobTableRow{
    positionType?: string,
    city?: string,
    appDeadline?: number
}
