interface IScrapedChart {
    chart: {
        type: string
    }
    title: {
        text: string
    }
}

export interface IScrapedPieChart extends IScrapedChart {
    chart: {
        type: "pie"
    }
    series: [{
        name: string
        data: [{
            name: string
            y: number
        }]
    }]
}

export interface IScrapedBarChart extends IScrapedChart {
    chart: {
        type: "bar"
    }
    xAxis: {
        categories: string[]
    }
    series: [{
        name: string
        data: number[]
    }]
}

export type ScrapedChart = IScrapedPieChart | IScrapedBarChart