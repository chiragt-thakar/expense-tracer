const response = {};
response.success = function (message, message_code, result = {}) {
  return { success: true, message, message_code, result };
};
response.error = function (message, message_code = 500, result = {}) {
  return { success: false, message, message_code, result };
};

module.exports = response;
// 
// const Util = function () {};
// 
// Util.prototype.success = function (payload, message, message_code) {
//   return { success: true, message, message_code, result: payload };
// };
// Util.prototype.error = function (payload, message, message_code) {
//   return { success: false, message, message_code, result: payload };
// };
// module.exports = new Util();
