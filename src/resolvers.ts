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
        return dataSources.db.fetchAllPeople(page);
      } catch (error) {
        return error;
      }
    },
    getPerson: async (_: undefined, { name }: { name: string }, { dataSources }: DataSourcesI) => {
      try {
        return dataSources.db.fetchPerson(name);
      } catch (error) {
        return error;
      }
    },
  },
  Mutation: {
    createPerson: async (_: undefined, { personData }: any, { dataSources }: DataSourcesI) => {
      try {
        return dataSources.db.createPerson(personData);
      } catch (error) {
        return error;
      }
    },
    updatePerson: async (_: undefined, { name, personData }: any, { dataSources }: DataSourcesI) => {
      try {
        return dataSources.db.updatePerson(name, personData);
      } catch (error) {
        return error;
      }
    },
    deletePerson: async (_: undefined, { name }: { name: string }, { dataSources }: DataSourcesI) => {
      try {
        return dataSources.db.deletePerson(name);
      } catch (error) {
        return error;
      }
    },
  },
};

export default resolvers;
