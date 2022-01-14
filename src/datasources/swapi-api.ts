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

  async fetchHomeworld(homeworldUrl: string) {
    const endpoint = homeworldUrl.substring(22)
    return await this.get(endpoint);
  }
  
}

export default SwapiAPI;