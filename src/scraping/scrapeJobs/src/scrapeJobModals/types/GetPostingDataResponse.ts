export interface IGetPostingDataResponse {
    org: string,
    position: string,
    id: number,
    geoData: {
        address?: string | string[],
        city?: string,
        country?: string,
        postalCode?: string,
        province?: string
    },
    div: string,
    divId: number,
}