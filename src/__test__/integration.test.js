/* eslint-disable no-undef */
import app from '../app';

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
  it("should return an object with 'data' containing all people and 'page' containing page info", async () => {
    const NUMBER_OF_ITEMS_PER_PAGE = 6;
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
