import { RESTDataSource } from 'apollo-datasource-rest';

import models from './db/models';

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
  nextPage: string | null
  previousPage: string | null
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
    let pageRequested: any = parseInt(page || '1', 10); // TODO
    pageRequested = pageRequested > 0 ? pageRequested : 1;
    const LIMIT = 3;
    const offset = (pageRequested - 1) * LIMIT;

    const result = await models.Person.findAndCountAll({
      offset,
      limit: LIMIT,
      include: [
        {
          model: models.Homeworld,
          as: 'homeworld',
        },
      ],
    });

    const people = result.rows.map((item: { dataValues: any; }) => ({
      ...item.dataValues,
      homeworld: {
        ...item.dataValues.homeworld.dataValues,
      },
    }));

    return {
      data: people,
      page: {
        totalPeople: result.count,
        nextPage: `${pageRequested + 1}`,
        previousPage: pageRequested === 1 ? null : `${pageRequested - 1}`,
      },
    };
  }

  async fetchPerson(name: string): Promise<Person> {
    const result = await models.Person.findOne({
      where: { name },
      include: [
        {
          model: models.Homeworld,
          as: 'homeworld',
        },
      ],
    });

    const person = {
      ...result.dataValues,
      homeworld: {
        ...result.dataValues.homeworld.dataValues,
      },
    };

    return person;
  }
}

export default SwapiAPI;
