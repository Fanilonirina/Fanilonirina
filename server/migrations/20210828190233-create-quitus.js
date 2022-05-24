'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('quitus', {
      id_quitus: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      idInscription: {
        allowNull: true,
        type: Sequelize.INTEGER
      },
      info_quitus: {
        allowNull: true,
        type: Sequelize.STRING
      },
      upload_quitus: {
        allowNull: true,
        type: Sequelize.STRING
      }
    });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('quitus');
  }
};