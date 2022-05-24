'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class personel extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      models.personel.hasMany(models.inscription, {
        foreignKey: 'idPersonel',
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE'
      });
    }
  };
  personel.init({
    id_personel:{
      type: DataTypes.INTEGER,
      primaryKey: true,
      allowNull: false
    },
    nom_personel: DataTypes.STRING,
    email_personel: DataTypes.STRING,
    departement: DataTypes.STRING
  }, {
    timestamps: false,
    sequelize,
    modelName: 'personel',
  });
  return personel;
};