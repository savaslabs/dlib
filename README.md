# Durham Library Civil Rights Heritage Proejct

## Local Development
1. You'll need node v10.16.0. Use NVM to use this version.
1. Install theme dependencies: `yarn`
1. Run `yarn add airtable-json --dev --ignore-engines`
1. Run `yarn add image-downloader --dev --ignore-engines`
1. Development: `yarn start`
The project will be available at http://localhost:8080/.
1. Generate dist folder: `yarn build`

## Get Most Recent Content from Airtable
1. Run `yarn node ./scripts/airtable.js`
1. Events will be available in `app/assets/events.json` and Images will be available
in `/app/assets/images`

## Content Entry for Google Doc Pages
Pages are located in `/app/assets`. All event pages are in `event-pages.json`, other pages have their own JSON file.
```
  {
    <!-- Page Title -->
    "name": "",
    "body": [
      <!-- Text -->
      {
        "text": ""
      },
      <!-- Unordered List -->
      {
        "ul": ["li goes here", "", ""]
      },
      <!-- Second Level Heading -->
      {
        "h2": ""
      },
      <!-- Inline Image (paired with text) -->
      {
        "inline_image": {
          "image": "image id goes here",
          "text": ""
        }
      },
      <!-- Pullquote with optional attribution -->
      {
        "pullquote":
        {
          "quote": "",
          "attribution": ""
        }
      },
    ]
  }
```
