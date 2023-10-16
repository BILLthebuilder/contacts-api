'use strict';
const bcrypt = require('bcrypt');

module.exports = {
  async up(queryInterface, Sequelize) {
    // This is not a good practice for hashing, since the hashed password will not be unique
    const rawPassword = '123456';
    let hashedPassword;
    const salt = bcrypt.genSaltSync();
    hashedPassword = bcrypt.hashSync(rawPassword, salt);
    await queryInterface.bulkInsert('Users', [{
      phone: '0721123451',
      password: hashedPassword,
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      phone: '0721123452',
      password: hashedPassword,
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      phone: '0721123453',
      password: hashedPassword,
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      phone: '0721123454',
      password: hashedPassword,
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      phone: '0721123455',
      password: hashedPassword,
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      phone: '0721123456',
      password: hashedPassword,
      createdAt: new Date(),
      updatedAt: new Date()
    }
    ], {
      individualHooks: true,
    })
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Users', null, {});
  }
};
