export const Links = {
    LOGIN: "https://waterlooworks.uwaterloo.ca/waterloo.htm?action=login",
    GRADUATE_JOBS: "https://waterlooworks.uwaterloo.ca/myAccount/graduating/jobs.htm",
    COOP_JOBS: "https://waterlooworks.uwaterloo.ca/myAccount/co-op/full/jobs.htm",
    graduateJob:(id: string) => `https://waterlooworks.uwaterloo.ca/myAccount/graduating/jobs.htm?ck_jobid=${id}`,
    coopJob:(id: string) => `https://waterlooworks.uwaterloo.ca/myAccount/co-op/full/jobs.htm?ck_jobid=${id}`
}