const ENUM = require("../constants/enum");

module.exports = {
  checkMatchEnum: (key, value) => {
    return ENUM[key].hasOwnProperty(value);
  },
  getKeyByValue: (object, value) => {
    return Object.keys(object).find((key) => object[key] === value);
  },
  urlify: (text) => {
    const urlRegex =
      /(https\:\/\/line\.me\/ti\/g2\/)([A-Za-z0-9_?=&]+)[^\s]+)/g;
    const _url = text.match(urlRegex);
    if (_url != null) {
      return _url;
    } else {
      return "";
    }
  },
};
