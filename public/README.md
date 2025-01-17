# waterlooworks-scraper
A UWaterloo jobs board scraper built for [InternWave Desktop](https://internwave.com/)

## Overview
See InternWave Desktop's [Scraper API ](https://internwave.com/devs)

## Development

### Requirements
- [Node.js](https://nodejs.org/en/)
- [Yarn](https://yarnpkg.com/)
  
### Setup
1. Clone the repository
2. Run `yarn install` to install dependencies
3. Run `yarn build` to build the extension
4. In the Internwave Desktop app, click on `Scrapers` button on the sidebar
5. Click on the `+` icon and locate the `manifest.json` file in the `build` folder
6. Click `Scrape` on the added scraper card

## Releases
1. Bump the version in `package.json` and `manifest.json` to the new version number, e.g. `1.0.0` to `1.0.1`
2. Edit the `CHANGELOG.md` file to include the new version and changes
3. Run `yarn build`, this will create a `dist` folder
4. Zip the `dist` folder (Make sure to zip the contents of the folder, not the folder itself)
5. Create a new release on GitHub and upload the zip file

## License
This project is licensed under the MIT License. See the LICENSE file for details.
