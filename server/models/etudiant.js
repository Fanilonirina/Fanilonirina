'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class etudiant extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      models.etudiant.hasMany(models.inscription, {
        foreignKey: 'idEtudiant',
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE'
      });
    }
  };
  etudiant.init({
    num_inscription_etudiant: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      allowNull: false
    },
    login_etudiant: DataTypes.STRING,
    mot_de_passe_etudiant: DataTypes.STRING,
    statut_etudiant: DataTypes.BOOLEAN,
    statut_etudiant_re: DataTypes.BOOLEAN,
    num_matricule: DataTypes.STRING,
    num_etudiant: DataTypes.INTEGER,
    nom_etudiant: DataTypes.STRING,
    prenom_etudiant: DataTypes.STRING,
    date_naissance_etudiant: DataTypes.STRING,
    lieu_naissance_etudiant: DataTypes.STRING,
    sexe_etudiant: DataTypes.BOOLEAN,
    situation_matrimoniale_etudiant: DataTypes.STRING,
    nationalite_etudiant: DataTypes.STRING,
    adresse_etudiant: DataTypes.STRING,
    telephone_etudiant: DataTypes.STRING,
    email_etudiant: DataTypes.STRING,
    parcours: DataTypes.STRING,
    niveau: DataTypes.STRING,
    info_cin_etudiant: DataTypes.JSON,
    upload_cin_etudiant: DataTypes.STRING,
    info_bacc_etudiant: DataTypes.JSON,
    upload_bacc_etudiant: DataTypes.STRING,
    info_logement_etudiant: DataTypes.JSON,
    info_parents_etudiant: DataTypes.JSON,
    info_enseignement_sup: DataTypes.JSON,
    info_enseignement_sec: DataTypes.JSON,
    photo_etudiant: DataTypes.STRING
  }, {
    timestamps: false,
    sequelize,
    modelName: 'etudiant',
  });
  return etudiant;
};