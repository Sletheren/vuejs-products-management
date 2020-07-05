module.exports = {
  API_URL: process.env.VUE_APP_API_URL || 'http://localhost:3030',
  data: {
    columns: [
      {
        key: 'id',
        title: 'Product ID',
        type: 'text',
        mapping: '@id'
      },
      {
        key: 'name',
        title: 'Name',
        type: 'text',
        mapping: 'alternateName'
      },
      {
        key: 'brand',
        title: 'Brand',
        type: 'text',
        mapping: 'brand.name'
      },
      {
        key: 'price',
        title: 'Price',
        type: 'number',
        mapping: 'price'
      }
    ]
  }
}
