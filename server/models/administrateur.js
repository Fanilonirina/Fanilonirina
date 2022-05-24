'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class administrateur extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  };
  administrateur.init({
    id_admin: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      allowNull: false
    },
    login: DataTypes.STRING,
    mot_de_passe: DataTypes.STRING
  }, {
    timestamps: false,
    sequelize,
    modelName: 'administrateur',
    freezeTableName:true
  });
  return administrateur;
};