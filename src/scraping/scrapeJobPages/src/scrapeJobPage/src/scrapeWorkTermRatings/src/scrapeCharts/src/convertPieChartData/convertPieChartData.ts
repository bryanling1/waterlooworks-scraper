import { ChartType, IChartData } from "@internwave/scrapers-api";
import { IWorkTermRatingPieChartSection } from "src/scraping/scrapeJobPages/src/scrapeJobPage/src/scrapeWorkTermRatings/src/scrapeCharts/src/types/WorkTermRatingResponse";

export const convertPieChartData = (
  chart: IWorkTermRatingPieChartSection,
  totalHires: number,
): IChartData | undefined => {
  const data: {
    [key: string]: number;
  } = {};
  for (const point of chart.data) {
    const value: number = parseFloat(point.y);
    if (isNaN(value)) {
      continue;
    }
    data[point.name] = Math.max(1, Math.floor((value / 100) * totalHires));
  }
  if (Object.keys(data).length === 0) {
    return;
  }
  return {
    title: chart.title,
    data,
    type: ChartType.PIE,
  };
};
