'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('captain_spaceship', { 
      id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true,
      },
      captainId: { // <- Chave estrangeira
        type: Sequelize.INTEGER,
        allowNull: false,
        references: { model: "captain", key: "id" },
        onUpdate: "CASCADE",
        onDelete: "CASCADE",
      },
      spaceshipId: { // <- Chave estrangeira
        type: Sequelize.INTEGER,
        allowNull: false,
        references: { model: "spaceship", key: "id" },
        onUpdate: "CASCADE",
        onDelete: "CASCADE",
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('captain_spaceship');
  }
};
