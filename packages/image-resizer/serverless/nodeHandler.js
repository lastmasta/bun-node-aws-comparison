const { handleResize } = require('./index');

exports.imageResizer = async event => {
  const { body } = event;
  const { url, width, height } = JSON.parse(body);

  try {
    // 1. fetch the image from the url
    const location = await handleResize(url, width, height);

    // 4. return the image url
    return {
      statusCode: 200,
      body: JSON.stringify({
        message: 'Image resized successfully',
        url: location,
      }),
    };
  } catch (error) {
    return {
      statusCode: 500,
      body: JSON.stringify({
        message: 'Failed to resize image',
        error: error.message,
      }),
    };
  }
};
