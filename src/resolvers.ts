const resolvers = {
  Query: {
    getPeople: async (_: undefined, { searchTerm }: any, { dataSources }: any) => {
      try {
        return await dataSources.api.fetchAllPeople(searchTerm);
      } catch (error) {
        return error;
      }
    }
  },
  Person: {
    homeworld: async ({ homeworld }: any, _: undefined, { dataSources }: any) => {
      try {
        return await dataSources.api.fetchHomeworld(homeworld);
      } catch (error) {
        return error;
      }
    }
  }
};

export default resolvers;