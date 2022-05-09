const successResponse = (data) => {
     return {
       'code': 1,
       'message': 'Operation performed successfully',
       'data': data
     };
   }
   
   const errorResponse = (message) => {
     return {
       'code': 0,
       'message': 'Operation failed to perform',
       'data': {
         message
       }
     };
   }
   
   module.exports = {
     successResponse,
     errorResponse
   }