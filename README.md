# swapi-apollo-server

[![CircleCI](https://circleci.com/gh/ocranbillions/swapi-apollo-server/tree/main.svg?style=svg)](https://circleci.com/gh/ocranbillions/swapi-apollo-server/tree/main)

This is the server repository for [Swapi Apollo Client](https://github.com/ocranbillions/swapi-apollo-client).
It wraps the Star Wars API (https://swapi.dev/) and returns data from the `/people` endpoint

### Getting started
- Clone the repo and run `npm install`
- Startup dev server with `npm run dev`
- Run `npm test` to test the app
- Lint with `npm run lint`
- Start production server with `npm run build && npm start`

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
