import { IScrapedJob } from "@internwave/scrapers-api";
import { JobDataTableKnownKey, parseJobDataTable } from "src/utils/scraping/parsing/parseTableValue/parseTableValue";

export const mapToScrapedJob = (
    map: Record<string, string>, 
    out: IScrapedJob,
    descriptionType = "Details"
):IScrapedJob => {
    for(const key in map){
        const value = map[key];
        if(!value){
            continue
        }
        switch(key){
            case JobDataTableKnownKey.JobType: {
                out.jobType = [parseJobDataTable(key, value)];
                break;
            }     
            case JobDataTableKnownKey.JobTitle:
                out.jobTitle =  parseJobDataTable(key, value)
                break;
            case JobDataTableKnownKey.Organization:
                out.company.name = parseJobDataTable(key, value)
                break;
            case JobDataTableKnownKey.JobOpenings: {
                out.openings = parseJobDataTable(key, value)
                break;
            }
            case JobDataTableKnownKey.ApplicationDeadline: {
                out.dates = {
                    ...out.dates,
                    deadlineAt: parseJobDataTable(key, value)
                }
                break;
            }
            case JobDataTableKnownKey.ApplicationDocumentsRequired: {
                out.categorizations = {
                    ...out.categorizations,
                    applicationDocuments: parseJobDataTable(key, value)
                }
                break;
            }
            case JobDataTableKnownKey.IfByWebsiteGoTo: {
                if(!out.links){
                    out.links = [];
                }
                out.links?.push({
                    title: "Apply here",
                    url: parseJobDataTable(key, value) 
                })
                break;
            }
            default:
                if(!out.descriptions){
                    out.descriptions = [];
                }
                out.descriptions.push({
                    title: key,
                    content: value,
                    type: descriptionType
                });
        }
    }
    return out;
}