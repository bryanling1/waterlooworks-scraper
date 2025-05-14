interface IJobTableJobTitleResponse {
  new: boolean;
  features: boolean;
  applied: boolean;
  viewed: boolean;
  postingTitle: string;
}

export interface IJobRowResponse {
  id: string;
  data: {
    key: string;
    value: number | string | IJobTableJobTitleResponse | boolean;
  }[];
}

export interface IJobTableResponse {
  totalResults: number;
  page: number;
  data: IJobRowResponse[];
}
