import { gql } from 'apollo-server';

const typeDefs = gql`
  type HomeWorld {
    name: String
    rotation_period: String
    orbital_period: String
    diameter: String
    climate: String
    gravity: String
    terrain: String
    surface_water: String
    population: String
  }

  type Person {
    name: String
    height: String
    mass: String
    gender: String
    homeworld: HomeWorld
  }

  type PeopleResponse {
    data: [Person]
  }

  type Query {
    getPeople: PeopleResponse
    getPerson(name: String): Person
  }
`;

export default typeDefs;
