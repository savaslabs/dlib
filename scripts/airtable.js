// modules
const fs = require('fs');
const path = require('path');
const colors = require('colors');
const airtableJson = require('airtable-json').default;
const imageDownloader = require('image-downloader').image;

// destination paths
const dest = {
  images: {
    path: './app/assets/images',
  },
  images_data: {
    path: './app/assets/',
    file: 'images-data.json',
  },
  events: {
    path: './app/assets',
    file: 'events-data.json',
  },
};

// downloader
const downloader = (imagesNew, image = 0, size = 0) => {
  imageDownloader(imagesNew[image][size])
    .then(({ filename }) => {
      if (image === 0 && size === 0) {
        console.time('Download time');
        console.log(
          'Downloading images to ' + colors.magenta(dest.images.path)
        );
      } else {
        process.stdout.write('\r\x1b[K');
      }
      process.stdout.write(
        colors.grey('\u2937 ') +
          colors.black(`${image * 3 + 1 + size} `) +
          colors.grey(`of`) +
          colors.black(` ${imagesNew.length * 3}`) +
          colors.grey(`:`) +
          colors.cyan(` ${filename.split('/').slice(-2).join('/')}`)
      );
      if (size++ > 1) (size = 0), image++;
      if (image !== imagesNew.length) {
        downloader(imagesNew, image, size);
      } else {
        process.stdout.write('\r\x1b[K');
        console.log(colors.green('Images downloaded.'));
        console.timeEnd('Download time');
      }
    })
    .catch((err) => console.error(err));
};

// download events JSON and images from airtable and save locally
const airtable = async () => {
  // pull events JSON
  let events = await airtableJson({
    auth_key: 'keyIveHQ90JLZtwtw',
    base_name: 'appZUOP30jQk8C3UP',
    primary: 'Timeline Events',
    view: 'All Events',
    populate: [
      {
        local: 'External Resource Links',
        other: 'External Resource Links',
      },
      {
        local: 'Images',
        other: 'Images',
      },
    ],
  });

  // Sort chronologically and restructure timeline based on event year.
  events = events
    .sort((a, b) => (a.Year > b.Year ? 1 : -1))
    .reduce((acc, currentValue) => {
      const found = acc.find(a => a.year === currentValue.Year);
      if (!found) {
        // Nest events of the same year.
        acc.push({ year: currentValue.Year, events: [currentValue] });
      } else {
        found.events.push(currentValue);
      }
      return acc;
    }, []);

  // Restructure timeline based on event scope.
  events = events.map((d, i) => {
    const newEvents = d.events.reduce((acc, currentValue) => {
      const found = acc.find(a => a.scope === currentValue.Scope);
      if (!found) {
        // Nest events of the same scope.
        acc.push({ scope: currentValue.Scope, events: [currentValue] });
      } else {
        found.events.push(currentValue);
      }
      return acc;
    }, []);
    return { ...d, events: newEvents };
  });

  // create events destination folder if none exists
  const EVENTS = path.join(dest.events.path);
  if (!fs.existsSync(EVENTS)) fs.mkdirSync(EVENTS);

  // write events JSON
  fs.writeFileSync(path.join(dest.events.path, dest.events.file), JSON.stringify(events, null, 2));

  // pull images JSON
  let images = await airtableJson({
    auth_key: 'keyIveHQ90JLZtwtw',
    base_name: 'appZUOP30jQk8C3UP',
    primary: 'Images',
    view: 'All',
  });

  // write images-data JSON
  fs.writeFileSync(
    path.join(dest.images_data.path, dest.images_data.file),
    JSON.stringify(images, null, 2)
  );

  // create images destination folder if none exists
  const IMAGES = path.join(dest.images.path);
  if (!fs.existsSync(IMAGES)) fs.mkdirSync(IMAGES);

  // prepare images JSON for downloader
  let imagesNew = images.map(val => {
    let folder = path.join(IMAGES, val.ID);
    if (!fs.existsSync(folder)) fs.mkdirSync(folder);
    return [
      {
        url: val.image[0].url,
        dest: path.join(folder, 'full.jpg'),
      },
      {
        url: val.image[0].thumbnails.large.url,
        dest: path.join(folder, 'large.jpg'),
      },
      {
        url: val.image[0].thumbnails.small.url,
        dest: path.join(folder, 'small.jpg'),
      },
    ];
  });

  downloader(imagesNew);
};

airtable();
