import { IJobTableRow } from "src/scraping/scrapeTableRows/src/types/JobTableRow";

export interface ICoopJobTableRow extends IJobTableRow{
    appDeadline?: number,
    openings?: number,
    status?: string,
    applications?: number,  
}
