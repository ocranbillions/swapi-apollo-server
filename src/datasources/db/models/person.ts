const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Person extends Model {
    static associate(models) {
      models.Person.belongsTo(models.Homeworld, {
        foreignKey: 'homeworldId',
        as: 'homeworld',
      });
    }
  }
  Person.init({
    name: DataTypes.STRING,
    height: DataTypes.INTEGER,
    mass: DataTypes.INTEGER,
    gender: DataTypes.STRING,
  }, {
    sequelize,
    modelName: 'Person',
  });
  return Person;
};
