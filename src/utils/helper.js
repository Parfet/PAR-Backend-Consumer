const ENUM = require("../constants/enum");

module.exports = {
  checkMatchEnum: (key, value) => {
    return ENUM[key].hasOwnProperty(value);
  },
  getKeyByValue: (object, value) => {
    return Object.keys(object).find((key) => object[key] === value);
  },
  urlify: (text) => {
    var urlRegex = /(((https?:\/\/)|(www\.))[^\s]+)/g;
    return text.match(urlRegex);
},
};
