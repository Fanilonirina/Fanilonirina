'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('personnels', {
      id_personnel: {
        allowNull: false,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      idAdmin: {
        allowNull: true,
        type: Sequelize.INTEGER,
        references: {
          model: 'administrateurs',
          key: 'id_admin'
        }
      },
      login_personnel: {
        allowNull: false,
        type: Sequelize.STRING
      },
      mot_de_passe_personnel: {
        allowNull: false,
        type: Sequelize.STRING
      },
      nom_personnel: {
        allowNull: false,
        type: Sequelize.STRING
      },
      email_personnel: {
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
    await queryInterface.dropTable('personnels');
  }
};