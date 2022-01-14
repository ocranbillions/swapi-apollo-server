import { RESTDataSource } from 'apollo-datasource-rest';

class SwapiAPI extends RESTDataSource {
  constructor() {
    super();
    this.baseURL = 'https://swapi.dev/api/';
  }

  async fetchAllPeople(searchTerm: string) {
    const people = await this.get(`people/?search=${searchTerm}`);
    return {
      data: people.results
    };
  }
  
}

export default SwapiAPI;