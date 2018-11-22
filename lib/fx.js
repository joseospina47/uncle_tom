
const debug = require('debug')

const axios = require('../util/axios')
const config = require('./config')

const getExchangeRate = async () => {
  try {
    const client = axios.createInstace(config.FX_API)
    const params = {
      q: 'USD_COP',
      compact: 'y'
    }
    const response = await client.get('/convert', { params })
    return response.data
  } catch (err) {
    debug('Could not retrieve Mid-Market rate info', err)
  }
}

// Gets WorldRemit exchange rate
const getWRemitxchangeRate = async amount => {
  try {
    const client = axios.createInstace(config.WREMIT_API)
    const params = {
      amount: 1,
      receiveCountry: 'co'
    }
    const response = await client.get('/BNK', { params })
    return response.data
  } catch (err) {
    debug('Could not retrieve info from WorldRemit', err)
  }
}

module.exports = {
  getExchangeRate,
  getWRemitxchangeRate
}
