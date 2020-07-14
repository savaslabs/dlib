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
  events: {
    path: './app/assets',
    file: 'events.json',
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

  // create events destination folder if none exists
  const EVENTS = path.join(dest.events.path);
  if (!fs.existsSync(EVENTS)) fs.mkdirSync(EVENTS);

  // write events JSON
  fs.writeFileSync(
    path.join(dest.events.path, dest.events.file),
    JSON.stringify(events, null, 2)
  );

  // pull images JSON
  let images = await airtableJson({
    auth_key: 'keyIveHQ90JLZtwtw',
    base_name: 'appZUOP30jQk8C3UP',
    primary: 'Images',
    view: 'All',
  });

  // create images destination folder if none exists
  const IMAGES = path.join(dest.images.path);
  if (!fs.existsSync(IMAGES)) fs.mkdirSync(IMAGES);

  // prepare images JSON for downloader
  let imagesNew = images.map((val) => {
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
