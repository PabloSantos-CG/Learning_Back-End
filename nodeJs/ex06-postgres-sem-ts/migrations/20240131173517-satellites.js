'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  up: async (queryInterface, Sequelize)  => {
    await queryInterface.createTable('satellites', { 
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
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      planetId: { // <- Chave estrangeira
        type: Sequelize.INTEGER,
        allowNull: false,
        references: { model: "planets", key: "id" },
        onUpdate: "CASCADE",
        onDelete: "CASCADE",
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

  down: async (queryInterface, Sequelize)  => {
    await queryInterface.dropTable('satellites');
  }
};
