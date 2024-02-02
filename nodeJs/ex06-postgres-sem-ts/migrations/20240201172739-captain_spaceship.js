'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('captains_spaceships', { 
      id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true,
      },
      captainId: { // <- Chave estrangeira
        type: Sequelize.INTEGER,
        allowNull: false,
        references: { model: "captains", key: "id" },
        onUpdate: "CASCADE",
        onDelete: "CASCADE",
      },
      spaceshipId: { // <- Chave estrangeira
        type: Sequelize.INTEGER,
        allowNull: false,
        references: { model: "spaceships", key: "id" },
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
    await queryInterface.dropTable('captains_spaceships');
  }
};
