interface IJobTableJobTitleResponse {
    new: boolean;
    features: boolean;
    applied: boolean;
    viewed: boolean;
    postingTitle: string;
}

export interface IJobRowResponse{
    id: string,
    data: {
        key: string,
        value: string | IJobTableJobTitleResponse
    }[]
}

export interface IJobTableResponse {
    totalResults: number;
    page: number;
    data: IJobRowResponse[]
}