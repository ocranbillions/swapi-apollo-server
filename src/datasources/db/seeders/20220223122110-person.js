module.exports = {
  async up(queryInterface) {
    await queryInterface.bulkInsert('People', [
      {
        name: 'Luke Skywalker',
        height: '172',
        mass: '77',
        gender: 'male',
        homeworldId: 2,
      },
      {
        name: 'C-3PO',
        height: '167',
        mass: '75',
        gender: 'n/a',
        homeworldId: 1,
      },
      {
        name: 'R2-D2',
        height: '96',
        mass: '32',
        gender: 'n/a',
        homeworldId: 2,
      },
      {
        name: 'Darth Vader',
        height: '202',
        mass: '136',
        gender: 'male',
        homeworldId: 1,
      },
      {
        name: 'Leia Organa',
        height: '150',
        mass: '49',
        gender: 'female',
        homeworldId: 2,
      },
      {
        name: 'Owen Lars',
        height: '178',
        mass: '120',
        gender: 'male',
        homeworldId: 2,
      },
      {
        name: 'Beru Whitesun lars',
        height: '165',
        mass: '75',
        gender: 'female',
        homeworldId: 1,
      },
      {
        name: 'R5-D4',
        height: '97',
        mass: '32',
        gender: 'n/a',
        homeworldId: 1,
      },
      {
        name: 'Biggs Darklighter',
        height: '183',
        mass: '84',
        gender: 'male',
        homeworldId: 2,
      },
      {
        name: 'Obi-Wan Kenobi',
        height: '182',
        mass: '77',
        gender: 'male',
        homeworldId: 2,
      },
    ], {});
  },

  async down(queryInterface) {
    await queryInterface.bulkDelete('People', null, {});
  },
};
