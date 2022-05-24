'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class candidats extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      models.candidats.hasMany(models.inscription, {
        foreignKey: 'idCandidat',
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE'
      });
    }
  };
  candidats.init({
    num_inscription_candidat: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      allowNull: false
    },
    nom_candidat: DataTypes.STRING,
    prenom_candidat: DataTypes.STRING,
    telephone_candidat: DataTypes.STRING,
    email_candidat: DataTypes.STRING,
    status_candidat : DataTypes.BOOLEAN,
    upload_profile_candidat : DataTypes.STRING,
  }, {
    timestamps: false,
    sequelize,
    modelName: 'candidats',
  });
  return candidats;
};