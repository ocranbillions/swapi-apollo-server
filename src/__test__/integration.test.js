/* eslint-disable no-undef */
import app from '../app';
import SwapiAPI from '../datasources/swapi-api';

import peopleData from './data/people.json';
import homeWorldData from './data/homeworld.json';

const fetchAllPeopleMockResponse = jest.fn(async () => Promise.resolve({
  data: peopleData.results,
  page: {
    totalPeople: peopleData.count,
    nextPage: peopleData.next,
    previousPage: peopleData.previous,
  },
}));
const fetchPersonMockResponse = jest.fn(async () => Promise.resolve(peopleData.results[0]));
const fetchHomeworldMockResponse = jest.fn(async () => Promise.resolve(homeWorldData));

const GET_PEOPLE_QUERY = `
  query GetPeopleQuery($page: String) {
    getPeople(page: $page) {
      data {
        name
        height
        mass
        gender
        homeworld {
          name
          rotation_period
          orbital_period
          diameter
          climate
          gravity
          terrain
          surface_water
          population
        }
      }
      page {
        totalPeople
        nextPage
        previousPage
      }
    }
  }
`;

const GET_PERSON_QUERY = `
  query GetPerson($name: String) {
    getPerson(name: $name) {
      name
      height
      mass
      gender
      homeworld {
        name
        rotation_period
        orbital_period
        diameter
        climate
        gravity
        terrain
        surface_water
        population
      }
    }
  }
`;

describe('Test People Query', () => {
  beforeAll(async () => {
    jest.spyOn(SwapiAPI.prototype, 'fetchAllPeople').mockImplementation(fetchAllPeopleMockResponse);
    jest.spyOn(SwapiAPI.prototype, 'fetchPerson').mockImplementation(fetchPersonMockResponse);
    jest.spyOn(SwapiAPI.prototype, 'fetchHomeworld').mockImplementation(fetchHomeworldMockResponse);
  });
  afterAll(async () => {
    jest.restoreAllMocks();
  });

  it("should return an object with 'data' containing all people and 'page' containing page info", async () => {
    const NUMBER_OF_ITEMS_PER_PAGE = 10;
    const result = await app.executeOperation({
      query: GET_PEOPLE_QUERY,
      variables: { page: '1' },
    });

    const { getPeople } = result.data;
    expect(getPeople).toHaveProperty('data');
    expect(getPeople).toHaveProperty('page');
    expect(getPeople.data.length).toBe(NUMBER_OF_ITEMS_PER_PAGE);
  });

  it('should return data for single person', async () => {
    const result = await app.executeOperation({
      query: GET_PERSON_QUERY,
      variables: { name: 'Luke Skywalker' },
    });

    const { getPerson } = result.data;

    expect(getPerson).toHaveProperty('name');
    expect(getPerson).toHaveProperty('height');
    expect(getPerson).toHaveProperty('mass');
    expect(getPerson).toHaveProperty('gender');
    expect(getPerson).toHaveProperty('homeworld');
  });
});
