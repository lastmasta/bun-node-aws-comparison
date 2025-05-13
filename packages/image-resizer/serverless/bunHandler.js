const { handleResize } = require('./index');

exports.imageResizer = async event => {
  const { aws } = event;
  const { body } = aws;
  const { url, width, height } = JSON.parse(body);

  try {
    const location = await handleResize(url, width, height);

    return Response.json({
      statusCode: 200,
      message: 'Image resized successfully',
      url: location,
    });
  } catch (error) {
    return Response.json({
      statusCode: 500,
      message: 'Failed to resize image',
      error: error.message,
    });
  }
};
