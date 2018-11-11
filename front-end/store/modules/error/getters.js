export default {
  getError: function(state){
    return {
      statusCode: state.statusCode,
      message: state.message
    }
  },
  getStatusError: (state) => state.hasError
}
