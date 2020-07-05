const get = require('lodash.get')
const db = require('./products.json')
const config = require('../src/config')

/**
 * Here some magic happens, where I parse the data from products.json
 * And only load the data that we use in the app which is defined in the config file
 * Columns is an array of data used for Listing products, creating products..etc, in case we want to add a new filed to the table/forms we only have to add it in the config file
 */
module.exports = () => {
  const products = db.itemListElement.map(({ item }) => {
    return config.data.columns.reduce((acc, column) => {
      acc[column.key] = get(item, column.mapping, '')
      return acc
    }, {})
  })
  return { products }
}
