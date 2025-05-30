# Changelog

## v1.1.3
- Added support for labeling jobs as "For My Program"

## v1.1.2
- Added missing job openings, application numbers, duration, to jobs table (co-op jobs)
- Added the JobID to the details section. There is currently no known way of querying the original job page via URL, so the ID is provided for search purposes.

## v1.1.1
- Fixed a bug that caused scraper to fail to scrape job details from the first tab of the modal
- Co-cop scraping needs verification

## v1.1.0
- Updated Graduate jobs scraper for new WaterlooWorks UI update (late winter 2025)
- Co-cop scraping needs verification

## v1.0.6
- Fixed a bug that caused failing to scrape a job table row to throw the entire scrape

## v1.0.5
- Fixed a bug that caused all URLs to go to graduate jobs page

## v1.0.4
- Fixed "Failed to fetch" error when scraping single job page

## v1.0.3
- Fixed a bug that caused entire scrape to throw if one job failed to scrape

## v1.0.0

### Added or Changed
- Added scraper for Graduating and full time jobs
- Co-op needs verification
  