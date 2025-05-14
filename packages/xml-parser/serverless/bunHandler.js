const { XMLParser } = require('fast-xml-parser');

const { extractObjectSchema } = require('./extractObjectSchema');

exports.xmlParser = async event => {
  try {
    const { aws } = event;
    const { body } = aws;
    const { xmlUrl } = JSON.parse(body);

    const response = await fetch(xmlUrl);
    const xml = await response.text();

    const parser = new XMLParser();
    const parsedXml = parser.parse(xml);

    return Response.json({
      message: 'XML parsed successfully',
      schema: extractObjectSchema(parsedXml),
    });
  } catch (error) {
    return Response.json({
      event,
      error: error.message,
    });
  }
};
