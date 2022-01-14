import { ApolloServer } from 'apollo-server';
import typeDefs from './schema';
import resolvers from './resolvers';

import SwapiAPI from './datasources/swapi-api';

const server = new ApolloServer({
  typeDefs,
  resolvers,
  dataSources: () => {
    return {
      api: new SwapiAPI(),
    };
  },
});

const PORT = process.env.PORT || 4000;
server.listen(PORT).then(() => {
  console.log(`
    🚀  Server is running!
    🔉  Listening on port ${PORT}
    📭  Query at https://studio.apollographql.com/dev
  `);
});