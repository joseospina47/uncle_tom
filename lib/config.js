'use strict'

require('dotenv').config()

const config = {
  SLACK_KEY: process.env.SLACK_KEY,
  SIGN_IN_SECRET: process.env.SIGN_IN_SECRET,
  FX_API: process.env.FX_API,
  WREMIT_API: process.env.WREMIT_API,
  MONGO_URI: process.env.MONGO_URI
}

module.exports = config
