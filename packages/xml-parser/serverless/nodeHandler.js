const { XMLParser } = require('fast-xml-parser');

exports.xmlParser = async event => {
  try {
    const { body } = event;
    const { xml } = JSON.parse(body);

    const parser = new XMLParser();
    const parsedXml = parser.parse(xml);

    return {
      parsedXml,
    };
  } catch (error) {
    return {
      event,
      error: error.message,
    };
  }
};
