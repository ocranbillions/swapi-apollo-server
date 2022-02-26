import { gql } from 'apollo-server';

const typeDefs = gql`
  type HomeWorld {
    id: String
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
    height: Int
    mass: String
    gender: String
    homeworld: HomeWorld
  }

  input CreatePersonInput {
    name: String!
    height: Int!
    mass: Int!
    gender: String!
    homeworldId: Int!
  }

  type Page {
    totalPeople: Int
    nextPage: String
    previousPage: String
  }

  type PeopleResponse {
    data: [Person]
    page: Page
  }

  type Query {
    getPeople(page: String): PeopleResponse
    getPerson(name: String): Person
    getAllHomeworlds: [HomeWorld]
    getHomeworld(id: Int): HomeWorld
  }

  type Mutation {
  createPerson(personData: CreatePersonInput!): Person
  updatePerson(name: String, personData: CreatePersonInput!): Person
  deletePerson(name: String): Boolean
}
`;

export default typeDefs;
