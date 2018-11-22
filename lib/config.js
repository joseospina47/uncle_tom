require('dotenv').config()

const config = {
  SLACK_KEY: process.env.SLACK_KEY,
  SIGN_IN_SECRET: process.env.SIGN_IN_SECRET,
  FX_API: process.env.FX_API,
  WREMIT_API: process.env.WREMIT_API,
  FX_API_KEY: process.env.FX_API_KEY,
  DB_SERVER: process.env.DB_SERVER,
  DB_USER: process.env.DB_USER,
  DB_PASS: process.env.DB_PASS,
  DB_NAME: process.env.DB_NAME
}

module.exports = config
