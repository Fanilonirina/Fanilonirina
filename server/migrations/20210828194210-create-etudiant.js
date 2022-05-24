'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('etudiants', {
      num_inscription_etudiant: {
        allowNull: false,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      login_etudiant: {
        allowNull: false,
        type: Sequelize.STRING
      },
      statut_etudiant: {
        allowNull: false,
        type: Sequelize.BOOLEAN
      },

      statut_etudiant_re: {
        allowNull: false,
        type: Sequelize.BOOLEAN
      },
      
      mot_de_passe_etudiant: {
        allowNull: false,
        type: Sequelize.STRING
      },
      num_matricule: {
        allowNull: true,
        type: Sequelize.STRING
      },
      num_etudiant: {
        allowNull: true,
        type: Sequelize.INTEGER
      },
      nom_etudiant: {
        allowNull: true,
        type: Sequelize.STRING
      },
      prenom_etudiant: {
        allowNull: true,
        type: Sequelize.STRING
      },
      date_naissance_etudiant: {
        allowNull: true,
        type: Sequelize.STRING
      },
      lieu_naissance_etudiant: {
        allowNull: true,
        type: Sequelize.STRING
      },
      sexe_etudiant: {
        allowNull: true,
        type: Sequelize.BOOLEAN
      },
      situation_matrimoniale_etudiant: {
        allowNull: true,
        type: Sequelize.STRING
      },
      nationalite_etudiant: {
        allowNull: true,
        type: Sequelize.STRING
      },
      adresse_etudiant: {
        allowNull: true,
        type: Sequelize.STRING
      },
      telephone_etudiant: {
        allowNull: true,
        type: Sequelize.STRING
      },
      email_etudiant: {
        allowNull: true,
        type: Sequelize.STRING
      },
      parcours: {
        allowNull: true,
        type: Sequelize.STRING
      },
      niveau: {
        allowNull: true,
        type: Sequelize.STRING
      },
      info_cin_etudiant: {
        allowNull: true,
        type: Sequelize.STRING
      },
      upload_cin_etudiant: {
        allowNull: true,
        type: Sequelize.STRING
      },
      info_bacc_etudiant: {
        allowNull: true,
        type: Sequelize.STRING
      },
      upload_bacc_etudiant: {
        allowNull: true,
        type: Sequelize.STRING
      },
      info_logement_etudiant: {
        allowNull: true,
        type: Sequelize.JSON
      },
      info_parents_etudiant: {
        allowNull: true,
        type: Sequelize.JSON
      },
      info_enseignement_sup: {
        allowNull: true,
        type: Sequelize.JSON
      },
      info_enseignement_sec: {
        allowNull: true,
        type: Sequelize.JSON
      },
      photo_etudiant: {
        allowNull: true,
        type: Sequelize.STRING
      }
    });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('etudiants');
  }
};