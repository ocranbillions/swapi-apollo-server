module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Homeworlds', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      name: {
        type: Sequelize.STRING,
        unique: true,
      },
      rotation_period: {
        type: Sequelize.INTEGER,
      },
      orbital_period: {
        type: Sequelize.INTEGER,
      },
      diameter: {
        type: Sequelize.INTEGER,
      },
      climate: {
        type: Sequelize.STRING,
      },
      gravity: {
        type: Sequelize.STRING,
      },
      terrain: {
        type: Sequelize.STRING,
      },
      surface_water: {
        type: Sequelize.INTEGER,
      },
      population: {
        type: Sequelize.INTEGER,
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
      },
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('Homeworlds');
  },
};
