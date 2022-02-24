import { RESTDataSource } from 'apollo-datasource-rest';

const models = require('./models');

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
    const PAGE_1 = "1"
    const currentPage = page ? parseInt(page, 10) : parseInt(PAGE_1, 10)
    const LIMIT = 10;
    const offset = (currentPage - 1) * LIMIT;

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

    // Pagination
    const totalNumOfPages = Math.ceil(parseInt(result.count) / LIMIT);
    const nextPage = ((currentPage === totalNumOfPages)) ? null : `${currentPage + 1}`
    const previousPage = currentPage === 1 ? null : `${currentPage - 1}`

    return {
      data: people,
      page: {
        totalPeople: result.count,
        nextPage,
        previousPage,
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
