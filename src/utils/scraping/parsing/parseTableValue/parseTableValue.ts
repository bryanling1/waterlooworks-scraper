import { parseDateTime } from "src/utils/scraping/parsing/parseTableValue/src/parseDate";
import { parseNumber } from "src/utils/scraping/parsing/parseTableValue/src/parseNumber";
import { parseDocuments } from "src/utils/scraping/parsing/parseTableValue/src/parseRequiredDocuments";

//ensure keys are normalized with normalizeJobTableKey
export enum JobDataTableKnownKey {
  JobTitle = "job title",
  JobType = "position type",
  IfByWebsiteGoTo = "if by website, go to",
  ApplicationDeadline = "application deadline",
  ApplicationDocumentsRequired = "application documents required",
  JobOpenings = "job openings",
  Organization = "organization",
}

const KnownKeyToParseFunction = {
  [JobDataTableKnownKey.JobTitle]: (x: string) => x,
  [JobDataTableKnownKey.JobOpenings]: parseNumber,
  [JobDataTableKnownKey.JobType]: (x: string) => x,
  [JobDataTableKnownKey.IfByWebsiteGoTo]: (x: string) => x,
  [JobDataTableKnownKey.ApplicationDeadline]: parseDateTime,
  [JobDataTableKnownKey.ApplicationDocumentsRequired]: parseDocuments,
  [JobDataTableKnownKey.Organization]: (x: string) => x,
};

//add type guard to getDataTableParser
export function parseJobDataTable(
  key: JobDataTableKnownKey.JobType,
  value: string,
): ReturnType<(typeof KnownKeyToParseFunction)[JobDataTableKnownKey.JobType]>;
export function parseJobDataTable(
  key: JobDataTableKnownKey.JobTitle,
  value: string,
): ReturnType<(typeof KnownKeyToParseFunction)[JobDataTableKnownKey.JobTitle]>;
export function parseJobDataTable(
  key: JobDataTableKnownKey.IfByWebsiteGoTo,
  value: string,
): ReturnType<
  (typeof KnownKeyToParseFunction)[JobDataTableKnownKey.IfByWebsiteGoTo]
>;
export function parseJobDataTable(
  key: JobDataTableKnownKey.ApplicationDocumentsRequired,
  value: string,
): ReturnType<
  (typeof KnownKeyToParseFunction)[JobDataTableKnownKey.ApplicationDocumentsRequired]
>;
export function parseJobDataTable(
  key: JobDataTableKnownKey.ApplicationDeadline,
  value: string,
): ReturnType<
  (typeof KnownKeyToParseFunction)[JobDataTableKnownKey.ApplicationDeadline]
>;
export function parseJobDataTable(
  key: JobDataTableKnownKey.JobOpenings,
  value: string,
): ReturnType<
  (typeof KnownKeyToParseFunction)[JobDataTableKnownKey.JobOpenings]
>;
export function parseJobDataTable(
  key: JobDataTableKnownKey.Organization,
  value: string,
): ReturnType<
  (typeof KnownKeyToParseFunction)[JobDataTableKnownKey.Organization]
>;
export function parseJobDataTable(key: JobDataTableKnownKey, value: string) {
  return KnownKeyToParseFunction[key]?.(value);
}
