const extractObjectSchema = obj => {
  const schema = {};

  for (const key in obj) {
    // eslint-disable-next-line no-prototype-builtins
    if (obj.hasOwnProperty(key)) {
      const value = obj[key];
      const type = typeof value;

      if (type === 'object' && value !== null) {
        if (Array.isArray(value)) {
          // For arrays, check if they contain objects and extract their schema
          if (value.length > 0) {
            if (
              typeof value[0] === 'object' &&
              value[0] !== null &&
              !Array.isArray(value[0])
            ) {
              // Extract schema from the first object in the array
              schema[key] = {
                type: 'array',
                items: extractObjectSchema(value[0]),
              };
              continue;
            }
          }
          schema[key] = 'array';
        } else {
          schema[key] = extractObjectSchema(value); // Recursive call for nested objects
        }
      } else {
        schema[key] = type;
      }
    }
  }
  return schema;
};

exports.extractObjectSchema = extractObjectSchema;
