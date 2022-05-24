'use strict';
const {
  Model
} = require('sequelize');

const etudiant = require('./etudiant');
const personnel = require('./personnel');
const quitus = require('./quitus');

module.exports = (sequelize, DataTypes) => {
  class inscription extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      models.inscription.belongsTo(models.quitus, {
        foreignKey: 'idQuitus'
      }),
      models.inscription.belongsTo(models.etudiant, {
        foreignKey:'idEtudiant'
      }),
      models.inscription.belongsTo(models.personnel, {
        foreignKey: 'idPersonnel'
      })
    }
  };
  inscription.init({
    idQuitus: DataTypes.INTEGER,
    idEtudiant: DataTypes.INTEGER,
    idPersonnel: DataTypes.INTEGER,
    info_borderau: DataTypes.JSON,
    upload_borderau: DataTypes.STRING,
    date_inscription: DataTypes.STRING,
    type_inscription: DataTypes.BOOLEAN
  }, {
    timestamps: false,
    sequelize,
    modelName: 'inscription',
  });
  return inscription;
};