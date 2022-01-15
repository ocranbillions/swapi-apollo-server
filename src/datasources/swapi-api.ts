import { RESTDataSource } from 'apollo-datasource-rest';

interface Homeworld {
  name: string
  rotation_period: string
  orbital_period: string
  diameter: string
  climate: string
  gravity: string
  terrain: string
  surface_water: string
  population: string
}

interface Person {
  name: string
  height: string
  mass: string
  gender: string
  homeworld: Homeworld
}

interface Page {
  totalPeople: number
  nextPage: string
  previousPage: string
}

interface PeopleResponse {
  data: Person[]
  page: Page
}

class SwapiAPI extends RESTDataSource {
  constructor() {
    super();
    this.baseURL = 'https://swapi.dev/api/';
  }

  async fetchAllPeople(page: string): Promise<PeopleResponse> {
    const path = page ? `people/?page=${page}` : 'people/';
    const data = await this.get(path);
    const {
      results, count, previous, next,
    } = data;

    return {
      data: results,
      page: {
        totalPeople: count,
        nextPage: next,
        previousPage: previous,
      },
    };
  }

  async fetchPerson(name: string): Promise<Person> {
    const data = await this.get(`people/?search=${name}`);
    const person = data.results[0];
    return person;
  }

  async fetchHomeworld(homeworldUrl: string): Promise<Homeworld> {
    const endpoint = homeworldUrl.substring(22);
    return this.get(endpoint);
  }
}

export default SwapiAPI;
