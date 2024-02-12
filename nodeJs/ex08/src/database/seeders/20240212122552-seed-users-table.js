'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.bulkInsert('users', [
    {
      email: 'fulaninho@gmail.com',
      password: 'psw123',
      created_at: new Date(),
      updated_at: new Date()
    },
    {
      email: 'beltrano@gmail.com',
      password: 'psw123',
      created_at: new Date(),
      updated_at: new Date()
    },
    {
      email: 'cicrano@gmail.com',
      password: '123',
      created_at: new Date(),
      updated_at: new Date()
    },
  ], {});
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('users', null, {});
  }
};
