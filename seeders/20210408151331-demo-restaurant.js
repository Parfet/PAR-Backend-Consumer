"use strict";
const moment = require("moment");
const { v4: uuidv4 } = require("uuid");
const user_id_list = require('./20210408103815-demo-user-1').user;
const bcrypt = require("bcrypt");

module.exports = {
  up: async (queryInterface, _Sequelize) => {
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
     */
    await queryInterface.bulkInsert(
      "restaurants",
      [
        {
          restaurant_id: uuidv4(),
          restaurant_gen_code: await bcrypt.hash(user_id_list[3], 1),
          restaurant_name: "ติดมัน",
          email: "jkondratenko0@wikipedia.org",
          password: "12345",
          tel_no: "0855448812",
          verify_status: false,
          status: "OPEN",
          price: 299.0,
          opened_time: "17:00",
          closed_time: "23:30",
          created_at: moment().toDate(),
          lat: 13.651530113658906,
          lon: 100.48592918219947,
        },
        {
          restaurant_id: uuidv4(),
          restaurant_gen_code: await bcrypt.hash(user_id_list[4], 1),
          restaurant_name: "Animal",
          email: "pcattel2@merriam-webster.com",
          password: "password",
          tel_no: "0927888676",
          verify_status: true,
          status: "OPEN",
          price: 199.0,
          opened_time: "18:00",
          closed_time: "22:00",
          created_at: moment().toDate(),
          updated_at: moment(moment().add(1, "days").toDate()).format(),
          lat: 13.650713633036302,
          lon: 100.4887853948179,
        },
        {
          restaurant_id: uuidv4(),
          restaurant_gen_code: await bcrypt.hash(user_id_list[5], 1),
          restaurant_name: "นัดแซ่บ",
          email: "jwinstanley1@virginia.edu",
          password: "admin",
          tel_no: "0967203659",
          verify_status: true,
          status: "CLOSED",
          price: 219.0,
          opened_time: "17:30",
          closed_time: "23:00",
          created_at: moment().toDate(),
          lat: 13.65113348875561,
          lon: 100.49693874739427,
        },
      ],
      {}
    );
  },

  down: async (queryInterface, _Sequelize) => {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
    return queryInterface.bulkDelete("restaurants", null, {});
  },
};
