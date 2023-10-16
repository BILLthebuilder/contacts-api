'use strict';
const _ = require('lodash');
const { faker } = require('@faker-js/faker');
module.exports = {
  async up (queryInterface, Sequelize) {
    const tasksBulk = _.times(1000, () => ({ 
      customer_first_name: faker.name.firstName(),
      personnel_first_name: faker.name.firstName(),
      personnel_other_name: faker.name.findName(),
      customer_last_name: faker.name.lastName(),
      customer_phone: faker.phone.phoneNumber('+2547########'),
      agentId: faker.random.alphaNumeric(4),
      assigned: new Date(),
      in_progress: new Date(),
      completed: faker.random.alpha(4),
      deferred: new Date(),
      status: faker.random.alpha(4),
      location: faker.random.alpha(4),
      gender: faker.random.alpha(4),
      age: faker.datatype.number(100),
      access_code: faker.datatype.number(),
      splash_page: faker.random.alphaNumeric(4),
      mpesa: faker.random.alphaNumeric(4),
      autoplay: faker.random.alphaNumeric(4),
      comments: faker.random.alphaNumeric(10),
      registration: faker.random.alpha(4),
      createdAt: new Date(),
      updatedAt: new Date(),
    }));
    await queryInterface.bulkInsert('Tasks', tasksBulk, {});
  },

  async down (queryInterface, Sequelize) {
     await queryInterface.bulkDelete('Tasks', null, {});
  }
};
