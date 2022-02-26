export default {
  createPerson: async (_: undefined, { personData }: any, { models }: any) => {
    try {
      const { homeworldId } = personData;

      const homeworldResult = await models.Homeworld.findByPk(homeworldId);

      if (!homeworldResult) throw new Error('Homeworld not found');

      const result = await models.Person.findOne({ where: { name: personData.name } });
      if (result) throw new Error(`${personData.name} already exist`);

      const personResult = await models.Person.create(personData);

      const homeworld = homeworldResult.get({ plain: true });
      const person = personResult.get({ plain: true });

      return {
        ...person,
        homeworld: {
          ...homeworld,
        },
      };
    } catch (error) {
      return error;
    }
  },
  updatePerson: async (_: undefined, { name, personData }: any, { models }: any) => {
    try {
      const { homeworldId } = personData;

      const homeworldResult = await models.Homeworld.findByPk(homeworldId);

      if (!homeworldResult) throw new Error('Homeworld not found');

      const result = await models.Person.findOne({ where: { name: personData.name } });
      if (result && result.dataValues.name !== name) throw new Error(`${personData.name} already exist`);

      await models.Person.update(personData, { where: { name } });

      const homeworld = homeworldResult.get({ plain: true });

      return {
        ...personData,
        homeworld: {
          ...homeworld,
        },
      };
    } catch (error) {
      return error;
    }
  },
  deletePerson: async (_: undefined, { name }: { name: string }, { models }: any) => {
    try {
      return models.Person.destroy({ where: { name } });
    } catch (error) {
      return error;
    }
  },
};
