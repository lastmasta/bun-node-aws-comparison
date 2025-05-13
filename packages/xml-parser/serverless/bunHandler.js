const { XMLParser } = require('fast-xml-parser');

exports.xmlParser = async event => {
  try {
    const { aws } = event;
    const { body } = aws;
    const { xml } = JSON.parse(body);

    const parser = new XMLParser();
    const parsedXml = parser.parse(xml);

    return Response.json({
      parsedXml,
    });
  } catch (error) {
    return Response.json({
      event,
      error: error.message,
    });
  }
};
