"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  // Criando
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable("planets", {
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
      position: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      createdAt: { // isso é a coluna createdAt que o sequelize adicionou
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: { // isso é a coluna updatedAt que o sequelize adicionou
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  
  // Deletando
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable("planets");
  },
};
