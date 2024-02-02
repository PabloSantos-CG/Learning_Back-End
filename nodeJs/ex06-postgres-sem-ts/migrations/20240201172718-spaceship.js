'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('spaceships', { 
      id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true,
      },
      name: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      serialNumber: { 
        type: Sequelize.STRING,
        allowNull: false
      },
      createdAt: { // <- isso é a coluna createdAt que o sequelize adicionou
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: { // <- isso é a coluna updatedAt que o sequelize adicionou
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('spaceships');
  }
};
