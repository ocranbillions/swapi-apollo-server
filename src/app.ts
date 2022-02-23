import { ApolloServer } from 'apollo-server';
import typeDefs from './schema';
import resolvers from './resolvers';

import DataSource from './datasources/db';

const server = new ApolloServer({
  typeDefs,
  resolvers,
  dataSources: () => ({
    db: new DataSource(),
  }),
});

const PORT = process.env.PORT || 4000;
server.listen({ port: PORT }).then(() => {
  console.log(`
    🚀  Server is running!
    🔉  Listening on port ${PORT}
    📭  Query at https://studio.apollographql.com/dev
  `);
});

export default server;
