# CentralPoint Coding Challenge

Simple CRUD project made with VueJS.

## Configuration

The main configuration of this mini-application resides inside `/src/config`

This serves as a way to pick which data to show in the DataTable, how to Seed the DB by parsing the json data that lives in `/api/products.js` and set the basis of what to show in the Forms as well

**Columns** is what's used in the configuration file to boot-up the app.
Columns is an array of Objects with this shape:

```json
[
  {
    "key": "id",
    "title": "Product ID",
    "type": "text",
    "mapping": "@id"
  }
]
```

### To run both the API and App

This will run both the API and the APP using a package called concurently

```
yarn start
```

To run the Client alone:

```
yarn run:client
```

To run the API alone:

```
yarn run:api
```

### Run your tests

```
yarn test
```

### Lints and fixes files

```
yarn lint
```
