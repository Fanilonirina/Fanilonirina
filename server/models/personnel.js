'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class personnel extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {


      // define association here
      models.personnel.belongsTo(models.administrateur, {
        foreignKey: 'idAdmin'
      }),
      models.personnel.hasMany(models.inscription, {
        foreignKey: 'idPersonnel',
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE'
      });
    }
  };
  personnel.init({
    id_personnel:{
      type: DataTypes.INTEGER,
      primaryKey: true,
      allowNull: false
    },
    idAdmin: DataTypes.INTEGER,
    login_personnel: DataTypes.STRING,
    mot_de_passe_personnel: DataTypes.STRING,
    nom_personnel: DataTypes.STRING,
    email_personnel: DataTypes.STRING,
    departement: DataTypes.STRING
  }, {
    timestamps: false,
    sequelize,
    modelName: 'personnel',
  });
  return personnel;
};