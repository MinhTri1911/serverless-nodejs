// console.log(this);
export default {
  // messages: '123',
  getMessage(field, args) {
    // will be added to default locale messages.
    // Returns a message.
    return '123';
  },
  validate(value, args) {
    // console.log(value.search(/([\u3000-\u303f\u3040-\u309f\u30a0-\u30ff\uff00-\uff9f\u4e00-\u9faf\u3400-\u4dbf])+(　)([\u3000-\u303f\u3040-\u309f\u30a0-\u30ff\uff00-\uff9f\u4e00-\u9faf\u3400-\u4dbf])+/g));
    console.log( value.search(/(　)+/g) > 0)

    return  value.search(/(　)+/g) > 0;
    // return str.search(/([\u3000-\u303f\u3040-\u309f\u30a0-\u30ff\uff00-\uff9f\u4e00-\u9faf\u3400-\u4dbf])+(　)([\u3000-\u303f\u3040-\u309f\u30a0-\u30ff\uff00-\uff9f\u4e00-\u9faf\u3400-\u4dbf])+/g);
  }
}
