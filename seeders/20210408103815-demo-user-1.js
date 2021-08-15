"use strict";
const moment = require("moment");
const { v4: uuidv4 } = require("uuid");

const user_id_list = [ uuidv4(),uuidv4(),uuidv4(),uuidv4(),uuidv4(),uuidv4(),];
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
    return queryInterface.bulkInsert("users", [
      {
        user_id: user_id_list[0],
        username: "User1",
        email: "akosel0@merriam-webster.com",
        password: "hola",
        first_name_th: "เอเดรียนา",
        last_name_th: "โคเซล",
        first_name_en: "Adriana",
        last_name_en: "Kosel",
        tel_no: "0842722633",
        verify_status: true,
        account_type: 'CONSUMER',
        created_at: moment().toDate(),
        updated_at: moment(moment().add(1, "days").toDate()).format(),
        archived_at: moment(moment().add(3, "days").toDate()).format(),
      },
      {
        user_id: user_id_list[1],
        username: "User2",
        email: "cgrahamslaw1@mashable.com",
        password: "qwerty123",
        first_name_th: "โคดี้",
        last_name_th: "กราแฮมสลอร์",
        first_name_en: "Cody",
        last_name_en: "Grahamslaw",
        tel_no: "0922099528",
        verify_status: true,
        account_type: 'CONSUMER',
        created_at: moment(moment().subtract(5, "days").toDate()).format(),
        updated_at: moment(moment().add(3, "months").toDate()).format(),
        archived_at: moment(moment().add(4, "months").toDate()).format(),
      },
      {
        user_id: user_id_list[2],
        username: "User3",
        email: "ddooman2@wufoo.com",
        password: "pasword",
        first_name_th: "โดเดเรีย",
        last_name_th: "ดูแมน",
        first_name_en: "Dorelia",
        last_name_en: "Dooman",
        tel_no: "0682169465",
        verify_status: true,
        account_type: 'CONSUMER',
        created_at: moment(moment().subtract(7, "months").toDate()).format(),
        updated_at: moment(moment().toDate()).format(),
      },
      {
        user_id: user_id_list[3],
        username: "Restaurant1",
        email: "rettery4@yelp.com",
        password: "helloworld",
        first_name_th: "รุย",
        last_name_th: "เอ็ทเทอรี่",
        first_name_en: "Ruy",
        last_name_en: "Ettery",
        tel_no: "0955180193",
        verify_status: true,
        account_type: 'RESTAURANT',
        created_at: moment(moment().toDate()).format(),
      },
      {
        user_id: user_id_list[4],
        username: "Restaurant2",
        email: "ebernardino3@homestead.com",
        password: "holaworld",
        first_name_th: "เอ็ทต้า",
        last_name_th: "เบอร์นาดิโอ",
        first_name_en: "Etta",
        last_name_en: "Bernardino",
        tel_no: "0859405727",
        verify_status: false,
        account_type: 'RESTAURANT',
        created_at: moment(moment().add(1, "months").toDate()).format(),
        updated_at: moment(moment().add(2, "months").toDate()).format(),
      },
      {
        user_id: user_id_list[5],
        username: "Restaurant3",
        email: "seriouderon@homestead.com",
        password: "holaworld",
        first_name_th: "เบลเวิร์น",
        last_name_th: "ลานีซาร์ด",
        first_name_en: "Belwern",
        last_name_en: "Lanizard",
        tel_no: "0859067843",
        verify_status: false,
        account_type: 'RESTAURANT',
        created_at: moment(moment().add(1, "months").toDate()).format(),
        updated_at: moment(moment().add(2, "months").toDate()).format(),
      },
    ]);
  },

  down: async (queryInterface, _Sequelize) => queryInterface.bulkDelete("users", null, {}),
  /**
   * Add commands to revert seed here.
   *
   * Example:
   * await queryInterface.bulkDelete('People', null, {});
   */
  user: user_id_list,
};
