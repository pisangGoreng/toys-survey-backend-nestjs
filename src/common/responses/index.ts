const success = (message, data, statusCode) => {
  return {
    statusCode: statusCode,
    message,
    error: false,
    data,
  };
};

const error = (message, statusCode) => {
  const codes = [200, 201, 400, 401, 404, 403, 422, 500];

  const findCode = codes.find((code) => code == statusCode);

  if (!findCode) statusCode = 500;
  else statusCode = findCode;

  return {
    statusCode: statusCode,
    message,
    error: true,
  };
};

const validation = (errors) => {
  return {
    statusCode: true,
    message: 'Validation errors',
    errors,
    code: 422,
  };
};

export { success, error, validation };
