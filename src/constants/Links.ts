export const Links = {
    LOGIN: "https://waterlooworks.uwaterloo.ca/waterloo.htm?action=login",
    GRADUATE_JOBS: "https://waterlooworks.uwaterloo.ca/myAccount/graduating/jobs.htm",
    graduateJob:(id: string) => `https://waterlooworks.uwaterloo.ca/myAccount/graduating/jobs.htm?ck_jobid=${id}`
}