const AWS = require('aws-sdk');
const { Jimp } = require('jimp');
const { v4: uuidv4 } = require('uuid');
AWS.config.update({
  accessKeyId: process.env.ACCESS_KEY_ID,
  secretAccessKey: process.env.SECRET_ACCESS_KEY,
});

const S3_BUCKET_NAME = process.env.S3_BUCKET_NAME;
const s3 = new AWS.S3();

const handleResize = async (imageUrl, width, height) => {
  const image = await Jimp.read(imageUrl);
  const resizedImage = await image.resize({
    w: width ? width : undefined,
    h: height ? height : undefined,
  });
  const resizedImageBuffer = await resizedImage.getBuffer('image/png');
  const fileName = `${uuidv4()}.png`;

  const params = {
    Bucket: S3_BUCKET_NAME,
    Key: fileName,
    Body: resizedImageBuffer,
    ContentType: 'image/png',
  };

  const uploadResult = await s3.upload(params).promise();

  return uploadResult.Location;
};

module.exports = { handleResize };
