import { parseDateTime } from "src/utils/scraping/parsing/parseDate";
import { parseNumber } from "src/utils/scraping/parsing/parseNumber";
import { parseStringArr } from "src/utils/scraping/parsing/parseStringArr";

//ensure keys are normalized with normalizeJobTableKey
export enum JobDataTableKnownKey {
    JobTitle = "job title",
    JobType = "position type",
    IfByWebsiteGoTo = "if by website, go to",
    ApplicationDeadline = "application deadline",
    ApplicationDocumentsRequired = "application documents required",
    JobOpenings = "job openings"
}

const KnownKeyToParseFunction = {
    [JobDataTableKnownKey.JobTitle]: (x: string) => x,
    [JobDataTableKnownKey.JobOpenings]: parseNumber,
    [JobDataTableKnownKey.JobType]:  (x: string) => x,
    [JobDataTableKnownKey.IfByWebsiteGoTo]: (x: string) => x,
    [JobDataTableKnownKey.ApplicationDeadline]: parseDateTime,
    [JobDataTableKnownKey.ApplicationDocumentsRequired]: parseStringArr,
};

//add type guard to getDataTableParser
export function parseJobDataTable(
    key: JobDataTableKnownKey.IfByWebsiteGoTo, 
    value: string
): ReturnType<typeof KnownKeyToParseFunction[JobDataTableKnownKey.IfByWebsiteGoTo]>;
export function parseJobDataTable(
    key: JobDataTableKnownKey.ApplicationDocumentsRequired, 
    value: string
): ReturnType<typeof KnownKeyToParseFunction[JobDataTableKnownKey.ApplicationDocumentsRequired]>;
export function parseJobDataTable(
    key: JobDataTableKnownKey.ApplicationDeadline, 
    value: string
): ReturnType<typeof KnownKeyToParseFunction[JobDataTableKnownKey.ApplicationDeadline]>;
export function parseJobDataTable(
    key: JobDataTableKnownKey.JobOpenings, 
    value: string
): ReturnType<typeof KnownKeyToParseFunction[JobDataTableKnownKey.JobOpenings]>;
export function parseJobDataTable(key: JobDataTableKnownKey, value: string){ 
    return KnownKeyToParseFunction[key]?.(value) 
}