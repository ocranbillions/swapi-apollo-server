export default {
  getPeople: async (_: undefined, { page }: { page: string }, { models }: any) => {
    try {
      const PAGE_1 = '1';
      const currentPage = page ? parseInt(page, 10) : parseInt(PAGE_1, 10);
      const LIMIT = 6;
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

      const people = result.rows.map((item: any) => item.get({ plain: true }));

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

      const person = result.get({ plain: true });
      return person;
    } catch (error) {
      return error;
    }
  },
  getAllHomeworlds: async (_: undefined, __: undefined, { models }: any) => {
    try {
      const result = await models.Homeworld.findAll();
      const homeworlds = result.map((item: any) => item.get({ plain: true }));

      return homeworlds;
    } catch (error) {
      return error;
    }
  },
  getHomeworld: async (_: undefined, { id }: { id: number }, { models }: any) => {
    try {
      const result = await models.Homeworld.findOne({ where: { id } });

      if (!result) throw new Error('Homeworld not found');

      const homeworld = result.get({ plain: true });
      return homeworld;
    } catch (error) {
      return error;
    }
  },
};

// export default Query;
