'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class utilisateur extends Model {
    static associate(models) {
      // define association here
    }
  };
  utilisateur.init({
    id_utilisateur: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
      allowNull: false
    },
    login: DataTypes.STRING,
    mot_de_passe: DataTypes.STRING,
    droit: DataTypes.BOOLEAN
  }, {
    timestamps: false,
    sequelize,
    modelName: 'utilisateur',
  });
  return utilisateur;
};