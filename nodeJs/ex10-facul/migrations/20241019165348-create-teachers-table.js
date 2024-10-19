'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.createTable('teachers', { 
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      name: {
        type: Sequelize.STRING(100),
        allowNull: false,
      },
      cpf: {
        type: Sequelize.STRING(18),
        allowNull: false,
      },
      dateOfBirth: {
        type: Sequelize.DATE,
        allowNull: false,
      },
      street: {
        type: Sequelize.STRING(100),
        allowNull: false,
      },
      district: {
        type: Sequelize.STRING(45),
        allowNull: false,
      },
      city: {
        type: Sequelize.STRING(45),
        allowNull: false,
      },
      state: {
        type: Sequelize.STRING(45),
        allowNull: false,
      },
      cep: {
        type: Sequelize.STRING(45),
        allowNull: false,
      },
      email: {
        type: Sequelize.STRING(250),
        allowNull: false,
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
     });
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.dropTable('teachers');
  }
};
