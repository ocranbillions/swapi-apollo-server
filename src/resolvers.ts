/* eslint-disable max-len */

const resolvers = {
  Query: {
    getPeople: async (_: undefined, { page }: { page: string }, { models }: any) => {
      try {
        const PAGE_1 = '1';
        const currentPage = page ? parseInt(page, 10) : parseInt(PAGE_1, 10);
        const LIMIT = 10;
        const offset = (currentPage - 1) * LIMIT;

        const result = await models.Person.findAndCountAll({
          offset,
          limit: LIMIT,
          order: [['id', 'ASC']],
          include: [
            {
              model: models.Homeworld,
              as: 'homeworld',
            },
          ],
        });

        const people = result.rows.map((item: { dataValues: any; }) => ({
          ...item.dataValues,
          homeworld: {
            ...item.dataValues.homeworld.dataValues,
          },
        }));

        // Pagination
        const totalNumOfPages = Math.ceil(parseInt(result.count, 10) / LIMIT);
        const nextPage = ((currentPage === totalNumOfPages)) ? null : `${currentPage + 1}`;
        const previousPage = currentPage === 1 ? null : `${currentPage - 1}`;

        return {
          data: people,
          page: {
            totalPeople: result.count,
            nextPage,
            previousPage,
          },
        };
      } catch (error) {
        return error;
      }
    },
    getPerson: async (_: undefined, { name }: { name: string }, { models }: any) => {
      try {
        const result = await models.Person.findOne({
          where: { name },
          include: [
            {
              model: models.Homeworld,
              as: 'homeworld',
            },
          ],
        });

        if (!result) throw new Error('Person not found');

        const { dataValues: person } = result;

        return {
          ...person,
          homeworld: {
            ...person.homeworld.dataValues,
          },
        };
      } catch (error) {
        return error;
      }
    },
    getAllHomeworlds: async (_: undefined, __: undefined, { models }: any) => {
      try {
        const result = await models.Homeworld.findAll();
        const homeworlds = result.map((item: { dataValues: any; }) => item.dataValues);

        return homeworlds;
      } catch (error) {
        return error;
      }
    },
    getHomeworld: async (_: undefined, { id }: { id: number }, { models }: any) => {
      try {
        const result = await models.Homeworld.findOne({ where: { id } });

        if (!result) throw new Error('Homeworld not found');

        const { dataValues: homeworld } = result;

        return homeworld;
      } catch (error) {
        return error;
      }
    },
  },
  Mutation: {
    createPerson: async (_: undefined, { personData }: any, { models }: any) => {
      try {
        const { homeworldId } = personData;

        const homeworldResult = await models.Homeworld.findByPk(homeworldId);

        if (!homeworldResult) throw new Error('Homeworld not found');

        // Todo check if person with same name exist

        const personResult = await models.Person.create(personData);

        const { dataValues: homeworld } = homeworldResult;
        const { dataValues: person } = personResult;

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

        // Todo check if person with same name exist

        await models.Person.update(personData, { where: { name } });

        const { dataValues: homeworld } = homeworldResult;

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
  },
};

export default resolvers;
