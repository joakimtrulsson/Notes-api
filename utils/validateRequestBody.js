function validateRequestBody(body) {
  const allowedProperties = ['title', 'text'];
  const hasOnlyAllowedProperties = Object.keys(body).every((key) => allowedProperties.includes(key));

  return hasOnlyAllowedProperties;
}

module.exports = validateRequestBody;
