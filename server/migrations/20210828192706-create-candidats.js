'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('candidats', {
      num_inscription_candidat: {
        allowNull: false,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      nom_candidat: {
        allowNull: false,
        type: Sequelize.STRING
      },
      prenom_candidat: {
        allowNull: true,
        type: Sequelize.STRING
      },
      telephone_candidat: {
        allowNull: true,
        type: Sequelize.STRING
      },
      email_candidat: {
        allowNull: true,
        type: Sequelize.STRING
      },
      status_candidat: {
        allowNull: true,
        type: Sequelize.BOOLEAN
      },
      upload_profile_candidat: {
        allowNull: true,
        type: Sequelize.STRING
      }
    });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('candidats');
  }
};