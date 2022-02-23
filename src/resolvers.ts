import DataSource from './datasources/db';

interface DataSourcesI {
  dataSources: {
    db: DataSource
  }
}

const resolvers = {
  Query: {
    getPeople: async (_: undefined, { page }: { page: string }, { dataSources }: DataSourcesI) => {
      try {
        return await dataSources.db.fetchAllPeople(page);
      } catch (error) {
        return error;
      }
    },
    getPerson: async (_: undefined, { name }: { name: string }, { dataSources }: DataSourcesI) => {
      try {
        return await dataSources.db.fetchPerson(name);
      } catch (error) {
        return error;
      }
    },
  },
};

export default resolvers;
