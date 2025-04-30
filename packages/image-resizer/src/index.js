const path = require('path');

const sharp = require('sharp');

const image = sharp(path.join(__dirname, '../images/image1.jpg'));

image
  .resize(320, 240)
  .toFile(path.join(__dirname, '../processed-images/output.jpg'));
