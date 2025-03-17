import { ChartType, IChartData } from "@internwave/scrapers-api";
import { IWorkTermRatingBarChartSection } from "src/scraping/scrapeJobPages/src/scrapeJobPage/src/scrapeWorkTermRatings/src/scrapeCharts/src/types/WorkTermRatingResponse";

export const convertBarChartData = (
  chart: IWorkTermRatingBarChartSection,
): IChartData | undefined => {
  const data: {
    [key: string]: number;
  } = {};
  for (const [index, key] of chart.categories.entries()) {
    const value = chart.series[0]?.data[index];
    if (!value || !key) {
      continue;
    }
    data[key] = value;
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
