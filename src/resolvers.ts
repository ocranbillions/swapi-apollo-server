import SwapiAPI from './datasources/swapi-api';

interface DataSourcesI {
  dataSources: {
    api: SwapiAPI
  }
}

const resolvers = {
  Query: {
    getPeople: async (_: undefined, { page }: { page: string }, { dataSources }: DataSourcesI) => {
      try {
        return await dataSources.api.fetchAllPeople(page);
      } catch (error) {
        return error;
      }
    },
    getPerson: async (_: undefined, { name }: { name: string }, { dataSources }: DataSourcesI) => {
      try {
        return await dataSources.api.fetchPerson(name);
      } catch (error) {
        return error;
      }
    },
  },
  Person: {
    // eslint-disable-next-line max-len
    homeworld: async ({ homeworld }: { homeworld: string }, _: undefined, { dataSources }: DataSourcesI) => {
      try {
        return await dataSources.api.fetchHomeworld(homeworld);
      } catch (error) {
        return error;
      }
    },
  },
};

export default resolvers;
