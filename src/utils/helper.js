const ENUM = require("../constants/enum");

module.exports = {
  checkMatchEnum: (key, value) => {
    return ENUM[key].hasOwnProperty(value);
  },
  getKeyByValue: (object, value) => {
    return Object.keys(object).find((key) => object[key] === value);
  },
  urlify: (text) => {
    const urlRegex = /(((https?:\/\/)|(www\.))[^\s]+)/g;
    const _url = text.match(urlRegex);
    if (_url != null) {
      return _url;
    } else {
      return "";
    }
  },
};
