import { RESTDataSource } from 'apollo-datasource-rest';

import models from './models';

interface Homeworld {
  id: string
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
  height: number
  mass: number
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
interface CreatePersonInput {
  name: string
  height: number
  mass: number
  gender: string
  homeworldId: number
}

class DataSource extends RESTDataSource {
  constructor() {
    super();
    this.baseURL = 'https://swapi.dev/api/';
  }

  async fetchAllPeople(page: string): Promise<PeopleResponse> {
    let pageRequested: any = parseInt(page || '1', 10); // TODO
    pageRequested = pageRequested > 0 ? pageRequested : 1;
    const LIMIT = 10;
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

    if (!result) throw new Error('Person not found');

    const { dataValues: person } = result;
    const personObject = {
      ...person,
      homeworld: {
        ...person.homeworld.dataValues,
      },
    };

    return personObject;
  }

  async createPerson(personData: CreatePersonInput): Promise<Person> {
    const { homeworldId } = personData;

    const homeworldResult = await models.Homeworld.findByPk(homeworldId);

    if (!homeworldResult) throw new Error('Homeworld not found');

    // Todo check if person with same name exist

    const personResult = await models.Person.create(personData);

    const { dataValues: homeworld } = homeworldResult;
    const { dataValues: person } = personResult;

    const personObject = {
      ...person,
      homeworld: {
        ...homeworld,
      },
    };

    return personObject;
  }

  async updatePerson(name: String, personData: CreatePersonInput): Promise<Person> {
    const { homeworldId } = personData;

    const homeworldResult = await models.Homeworld.findByPk(homeworldId);

    if (!homeworldResult) throw new Error('Homeworld not found');

    // Todo check if person with same name exist

    await models.Person.update(personData, { where: { name } });

    const { dataValues: homeworld } = homeworldResult;

    const personObject = {
      ...personData,
      homeworld: {
        ...homeworld,
      },
    };

    return personObject;
  }

  async deletePerson(name: string): Promise<Boolean> {
    return models.Person.destroy({ where: { name } });
  }

  async getAllHomeworlds(): Promise<[Person]> {
    const result = await models.Homeworld.findAll();
    const homeworlds = result.map((item: { dataValues: any; }) => item.dataValues);

    return homeworlds;
  }

  async fetchHomeworldById(id: number): Promise<Person> {
    const result = await models.Homeworld.findOne({ where: { id } });

    if (!result) throw new Error('Homeworld not found');

    const { dataValues: homeworld } = result;

    return homeworld;
  }
}

export default DataSource;
