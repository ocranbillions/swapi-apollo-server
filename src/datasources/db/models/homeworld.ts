const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Homeworld extends Model {
    static associate(models) {
      models.Homeworld.hasMany(models.Person, {
        foreignKey: 'homeworldId',
        as: 'homeworldPeople',
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE',
      });
    }
  }
  Homeworld.init({
    name: DataTypes.STRING,
    rotation_period: DataTypes.INTEGER,
    orbital_period: DataTypes.INTEGER,
    diameter: DataTypes.INTEGER,
    climate: DataTypes.STRING,
    gravity: DataTypes.STRING,
    terrain: DataTypes.STRING,
    surface_water: DataTypes.INTEGER,
    population: DataTypes.INTEGER,
  }, {
    sequelize,
    modelName: 'Homeworld',
  });
  return Homeworld;
};
