const { XMLParser } = require('fast-xml-parser');

const { extractObjectSchema } = require('./extractObjectSchema');

exports.xmlParser = async event => {
  try {
    const { body } = event;
    const { xmlUrl } = JSON.parse(body);

    const response = await fetch(xmlUrl);
    const xml = await response.text();

    const parser = new XMLParser();
    const parsedXml = parser.parse(xml);

    return {
      message: 'XML parsed successfully',
      schema: extractObjectSchema(parsedXml),
    };
  } catch (error) {
    return {
      event,
      error: error.message,
    };
  }
};
