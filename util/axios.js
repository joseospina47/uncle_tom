const axios = require('axios')

const createInstace = baseURL => axios.create({
  baseURL,
  timeout: 60000
})

module.exports = {
  createInstace
}
