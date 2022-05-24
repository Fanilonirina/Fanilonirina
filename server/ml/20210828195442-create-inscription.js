'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('inscriptions', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      idQuitus: {
        allowNull: true,
        type: Sequelize.INTEGER,
        references: {
          model: 'quitus',
          key: 'id_quitus'
        }
      },
      idEtudiant: {
        allowNull: false,
        type: Sequelize.INTEGER,
        references: {
          model: 'etudiants',
          key: 'num_inscription_etudiant'
        }
      },
      idPersonnel: {
          allowNull: true,
          type: Sequelize.INTEGER,
          references: {
            model: 'personnels',
            key: 'id_personnel'
          }
      },
      info_borderau: {
        allowNull: true,
        type: Sequelize.JSON
      },
      upload_borderau: {
        allowNull: false,
        type: Sequelize.STRING
      },
      date_inscription: {
        allowNull: false,
        type: Sequelize.STRING
      },
      type_inscription: {
        allowNull: true,
        type: Sequelize.BOOLEAN
      }
    });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('inscriptions');
  }
};