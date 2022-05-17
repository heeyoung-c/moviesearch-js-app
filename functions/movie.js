const axios = require('axios')
const { OMDB_API_KEY } = process.env

exports.handler = async function (event, context) {
  return {
    statusCode: 200,
    body: JSON.stringify({
      name: Hee,
      age: 99
    })
  }
}