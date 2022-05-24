'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class quitus extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      models.quitus.hasMany(models.inscription, {
        foreignKey: 'idQuitus',
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE'
      });
    }
  };
  quitus.init({
    id_quitus: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
      allowNull: false
    },
    idInscription: DataTypes.INTEGER,
    info_quitus: DataTypes.STRING,
    upload_quitus: DataTypes.STRING
  }, {
    timestamps: false,
    sequelize,
    modelName: 'quitus',
  });
  return quitus;
};