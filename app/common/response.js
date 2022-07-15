const successResponse = (data) => {
  return {
    'code': 1,
    'message': 'Operation performed successfully',
    'data': data
  };
}

const errorResponse = (message, type) => {
  return {
    'code': 0,
    'message': 'Operation failed to perform',
    'data': {
      message
    },
    'type': type
  };

}

module.exports = {
  successResponse,
  errorResponse
}