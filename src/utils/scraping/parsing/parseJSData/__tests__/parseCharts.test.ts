import { IScrapedBarChart, IScrapedPieChart } from 'src/scraping/scrapeJobPages/src/scrapeJobPage/src/scrapeWorkTermRatings/src/scrapeCharts/src/types/ScrapedChart';
import { parseJSData } from 'src/utils/scraping/parsing/parseJSData/parseJSData';
import { describe, expect, test } from 'vitest';


describe('parse charts', () => {
    test('Pie chart', () => {
        const out = parseJSData<IScrapedPieChart>(Charts.pie)
        expect(out.chart.type).toBe("pie");
        expect(out.title.text).toBe("Hires by Faculty<br>Amazon.com Inc - Head Office");
        expect(out.series[0].data).toEqual([
            { name: "Engineering", y: 35 },
            { name: "Mathematics", y: 65 }
        ])
  })
  test('Bar graph', async () => {
    const out = parseJSData<IScrapedBarChart>(Charts.bar)
    expect(out.chart.type).toBe("bar");
    expect(out.title.text).toBe("Most Frequently Hired Programs - Amazon.com Inc - Head Office");
    expect(out.series[0].data).toEqual([169, 56, 36, 13, 8, 5, 5, 4, 3, 3]);
  });
});

const Charts = {
    pie: `
             {
                chart: {
                        plotBackgroundColor: null,
                    plotBorderWidth: null,
                    plotShadow: false,
                    type: "pie"
                },
                title: {
                        text: "Hires by Faculty<br>Amazon.com Inc - Head Office"
                },
                tooltip: {
                        pointFormat: "{series.name}: <b>{point.y}%</b>"
                },
                plotOptions: {
                pie: {
                    allowPointSelect: true,
                    cursor: "pointer",
                    dataLabels: {

                        enabled: true,
                        format: "<b>{point.name}</b>: {point.y}%",
                        style: {
                            color: (Highcharts.theme && Highcharts.theme.contrastTextColor) || "black"
                        }
                    }

                }
            },

            credits: {
                enabled: false
                },
            series: [{
                name: "Percentage",
                colorByPoint: true,
                data: [

                                {
                                        name:"Engineering", y:35
                                },

                                {
                                        name:"Mathematics", y:65
                                }

                ]
            }]
        }    
        `,
    bar: `
       {
          chart: {
          type: "bar"
          },
          title: {
          text: "Most Frequently Hired Programs - Amazon.com Inc - Head Office"
          },

          legend: {
                  enabled: false
          },

          xAxis: {
          categories: [
            "Computer Science/BCS",

            "Computer Engineering",

            "Software Engineering",

            "Mechatronics Engineering",

            "Computer Science/BMath",

            "Double Degree (BBA/BCS)",

            "Statistics",

            "Data Science/BCS",

            "Combinatorics & Optimization",

            "Computational Mathematics"

          ],
          title: {
                  text: ""
          }
          },
          yAxis: {
          title: {
                  text: ""
          },
          labels: {
                  overflow: "justify"
          }
          },
          plotOptions: {
          bar: {
                  dataLabels: {
                          enabled: true
                  }
          }
          },
          credits: {
          enabled: false
          },
          series: [
            {
                    name: "Hires",
                    data: [169, 56, 36, 13, 8, 5, 5, 4, 3, 3]
            }
          ]
  }
    `
}