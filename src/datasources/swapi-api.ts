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

class SwapiAPI extends RESTDataSource {
  constructor() {
    super();
    this.baseURL = 'https://swapi.dev/api/';
  }

  async fetchAllPeople(searchTerm: string): Promise<{data: Person[]}> {
    const people = await this.get(`people/?search=${searchTerm}`);
    return {
      data: people.results,
    };
  }

  async fetchHomeworld(homeworldUrl: string): Promise<Homeworld> {
    const endpoint = homeworldUrl.substring(22);
    return this.get(endpoint);
  }
}

export default SwapiAPI;
