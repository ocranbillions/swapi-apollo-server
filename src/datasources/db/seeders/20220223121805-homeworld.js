module.exports = {
  async up(queryInterface) {
    await queryInterface.bulkInsert('Homeworlds', [
      {
        name: 'Tatooine',
        terrain: 'desert',
        population: '200000',
        orbital_period: '304',
        rotation_period: '23',
        diameter: '10465',
        climate: 'arid',
        gravity: '1 standard',
        surface_water: '1',
      },
      {
        name: 'Samverse',
        terrain: 'desert',
        population: '3448594',
        orbital_period: '322',
        rotation_period: '33',
        diameter: '29638',
        climate: 'arid',
        gravity: '1 standard',
        surface_water: '1',
      },
    ], {});
  },

  async down(queryInterface) {
    await queryInterface.bulkDelete('Homeworlds', null, {});
  },
};
