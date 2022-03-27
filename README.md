# swapi-apollo-server

Live @ https://swapi-apollo-server.herokuapp.com/graphql

[![CircleCI](https://circleci.com/gh/ocranbillions/swapi-apollo-server/tree/main.svg?style=svg)](https://circleci.com/gh/ocranbillions/swapi-apollo-server/tree/main)

This is the server repository for [Swapi Apollo Client](https://github.com/ocranbillions/swapi-apollo-client).

### Getting started
These instructions will get you a copy of the project up and running on your local machine for development and testing purposes.

Prerequisites
Before we get started, we're going to need to make sure we have a few things installed and available on our machine.

- Node >= 12
- Sequelize cli `npm i -g sequelize-cli`
- Postgresql database (Grab a copy of Postgres as a service if you don't have postgres installed https://www.elephantsql.com/)


## Environment Variables

These are the environment variables required to successfully run the application.

| key                   | description                                       |
| --------------------- | ------------------------------------------------- |
| DB_NAME               | Postgresql database name                                  |
| DB_HOST               | Database host       |
| DB_USER               | Database user |
| DB_PASS               | Database password                                |
| TESTDB_USER           | Test database user                                |
| TESTDB_NAME           | Test database name                                |
| TESTDB_PASSWORD       | Test database password                                   |
| TESTDB_HOST           | Test database host                                  |


### Clone the repository
> git clone https://github.com/ocranbillions/swapi-apollo-server.git

> cd swapi-apollo-server

### Install dependencies
> `npm install`

### Create your local development and test databases

> createdb DB_NAME

> createdb TESTDB_NAME

> update environment variables to point at the databases


### Run migrations and seed

> npm run migate (Creates Person and Homeworld tables in your development database)

> npm run seed (seeds data from the database/seeds folder into the Person and Homeworld tables)


### Running the app

> Startup dev server with `npm run dev`

> Run `npm test` to test the app (the `test` script uses the `pretest` script to run migrations and seeds the testdb before starting the test)

> Lint with `npm run lint`


## API 
Live @ https://swapi-apollo-server.herokuapp.com/graphql


| Name                   | Type     | Description                                                  |
| ---------------------- | -------- | ------------------------------------------------------------ |
| GetPeopleQuery         | Query    | Returns a list of all StarWars characters in the db          |
| GetPerson              | Query    | Given a character's name, it returns the character if found  |
| getAllHomeworlds       | Query    | Returns all homeworlds (planets) from the db                 |
| getHomeworld           | Query    | Given an ID, it returns a homeworld if found                 |
| createPerson           | Mutation | Adds a new character to the People table                     |
| updatePerson           | Mutation | Updates information for a given character                    |
| deletePerson           | Mutation | Deletes a given character                                    |


### Queries
`Returns list of people and their homeworld`
```
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
```

`Returns a single person`
```
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
```

### Mutations
``Creates a new character``
```
mutation createPerson($personData: CreatePersonInput!) {
  createPerson(personData: $personData) {
    name
    height
    mass
    gender
    homeworld {
      id
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
```

`Deletes a character`

```  
mutation Mutation($name: String) {
  deletePerson(name: $name)
}
```

### Adding new models/tabales to the db
Incase you want to extend the application or generate new models, run 

> sequelize model:create --name User --attributes "fistName:string, lastName:string, email:string, phoneNumber:string" (then npm run migrate)

To generate new seed files for the model run

> sequelize seed:generate --name User

`Make sure .sequelizerc file exist in the root directory of your project before running the above commands`
