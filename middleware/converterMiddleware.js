'use strict'

const converterMiddleware = (patterns, message) => {
  const words = message.text.split(' ')
  if (words.length !== 2) return false
  if (words[0] !== 'convert') return false
  if (isNaN(words[1])) return false
  return true
}

module.exports = converterMiddleware
