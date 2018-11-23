'use strict'

const axios = require('../util/axios')
const config = require('./config')

// Gets mid-market rate info
const _getExchangeRate = async () => {
  const client = axios.createInstace(config.FX_API)
  const params = {
    q: 'USD_COP',
    compact: 'y'
  }
  const response = await client.get('/convert', { params })
  return response.data
}

// Gets Worldremit rate info
const _getWRExchangeRate = async amount => {
  const client = axios.createInstace(config.WREMIT_API)
  const params = {
    amount,
    receiveCountry: 'co'
  }
  const response = await client.get('/BNK', { params })
  return response.data
}

const convertCurrency = async (bot, message) => {
  try {
    const amount = message.text.split(' ')[1]
    const response = await _getExchangeRate()
    const wrResponse = await _getWRExchangeRate(amount)
    const convertion = amount * response.USD_COP.val
    bot.reply(message,
      `My calculations go as follows:
      - Mid-Market Rate: ${amount} USD equals ${convertion} COP
      - WorldRemit: ${amount} USD equals ${wrResponse.Receive} COP`)
  } catch (err) {
    bot.reply(message, `Sorry!... I coundn't convert the currency`)
  }
}
module.exports = {
  convertCurrency
}
