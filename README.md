# Durham Library Civil Rights Heritage Proejct

## Local Development
1. Install theme dependencies: `yarn`
2. Build webpack: `yarn build`
3. Development: `yarn start`

## Get Most Recent Content from Airtable
1. `yarn add airtable-json --dev --ignore-engines`
2. `yarn add image-downloader --dev --ignore-engines`
3. `yarn node ./scripts/airtable.js`
4. Events will be available in `app/assets/events.json` and Images will be available
in `/app/assets/images`

The project will be available at http://localhost:8080/.
