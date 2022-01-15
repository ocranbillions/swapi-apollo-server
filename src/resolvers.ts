const resolvers = {
  Query: {
    getPeople: async (_: undefined, { page }: any, { dataSources }: any) => {
      try {
        return await dataSources.api.fetchAllPeople(page);
      } catch (error) {
        return error;
      }
    },
    getPerson: async (_: undefined, { name }: any, { dataSources }: any) => {
      try {
        return await dataSources.api.fetchPerson(name);
      } catch (error) {
        return error;
      }
    },
  },
  Person: {
    homeworld: async ({ homeworld }: any, _: undefined, { dataSources }: any) => {
      try {
        return await dataSources.api.fetchHomeworld(homeworld);
      } catch (error) {
        return error;
      }
    },
  },
};

export default resolvers;
