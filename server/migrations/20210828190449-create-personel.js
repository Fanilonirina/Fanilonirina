'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('personels', {
      id_personel: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      nom_personel: {
        allowNull: false,
        type: Sequelize.STRING
      },
      email_personel: {
        allowNull: true,
        type: Sequelize.STRING
      },
      departement: {
        allowNull: true,
        type: Sequelize.STRING
      }
    });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('personels');
  }
};