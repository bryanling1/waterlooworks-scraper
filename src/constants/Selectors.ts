export const Selectors = {
  LogoutButton: `a[href="/logout.htm"]`,
  JobsTable: {
    Search: {
      Form: `#widgetSearch`,
    },
    Row: `table#postingsTable tbody tr`,
    TotalResults: `.orbis-posting-actions .badge.badge-info`,
    PaginationNextButton: `div.pagination ul li:nth-last-child(2)`,
  },
  JobPosting: {
    TableRows: (panel: number) =>
      `div#postingDiv .panel:nth-child(${panel}) table tr`,
    Map: {
      Address: `div.tab-content address`,
    },
    WorkTermRating: {
      TabldTDs: `table tbody tr:nth-child(2) td`,
      Alert: `.orbisTabContainer div.alert`,
      Charts: ".orbisTabContainer div[data-highcharts-chart]",
      ChartTitle: "svg text tspan",
      ChartLabels: `svg .highcharts-data-labels text`,
      Tspan: (nth: number) => `tspan:nth-child(${nth})`,
      ChartAxisLabels: `svg .highcharts-xaxis-labels text`,
      scripts: `.orbisTabContainer .tab-content script`,
    },
    TabAnchor: (type: "Map" | "Work Term Ratings") => {
      const nth = (() => {
        switch (type) {
          case "Map":
            return 2;
          case "Work Term Ratings":
            return 3;
        }
      })();
      return `div.tab-content ul.nav-pills li:nth-child(${nth}) a`;
    },
  },
};
