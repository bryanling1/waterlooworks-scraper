export interface IWorkTermRatingTableSection {
    type: "table",
    title: string,
    columns: string[],
    rows: string[][]
}

export interface IWorkTermRatingPieChartSection {
    type: "pieChart",
    title: string,
    data: {
        name: string,
        y: string
    }[]
}

export interface IWorkTermRatingBarChartSection {
    type: "barChart",
    title: string,
    categories: string[],
    series: {
        name: string,
        data: number[]
    }[]
}

interface IWorkTermRatingColumnChartSection {
    type: "columnChart",
    title: string,
    categories: string[],
    series: {
        name: string,
        data: number[]
    }[]
}

export interface IWorkTermRatingResponse {
    sections?: (IWorkTermRatingTableSection | IWorkTermRatingPieChartSection | IWorkTermRatingBarChartSection | IWorkTermRatingColumnChartSection)[]
}