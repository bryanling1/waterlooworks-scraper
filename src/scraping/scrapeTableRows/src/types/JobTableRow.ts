export interface IGraduateJobTableRow{
    id: string,
    jobTitle: string,
    organization: string,
    positionType?: string,
    city?: string,
    appDeadline?: number
    requestBody: BodyInit
}
