const ENUM = require('../constants/enum')  ;

module.exports = {
    checkMatchEnum: (key, value) => ENUM[key].hasOwnProperty(value)
}