const converterMiddleware = (patterns, message) => {
  const words = message.text.split(' ')
  if (words.length !== 2) return false
  if (!isNaN(words[1])) return false
  return true
}

module.exports = converterMiddleware
