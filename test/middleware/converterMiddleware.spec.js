const converterMiddleware = require('../../middleware/converterMiddleware')

test('False if command has less than two words', () => {
  const command = {
    text: 'convert'
  }
  expect(converterMiddleware(null, command)).toBe(false)
})

test('False if command has more than two words', () => {
  const command = {
    text: 'convert 2 USD'
  }
  expect(converterMiddleware(null, command)).toBe(false)
})

test('True if command has two words but the second one is not a number', () => {
  const command = {
    text: 'convert USD'
  }
  expect(converterMiddleware(null, command)).toBe(false)
})

test('True if command has two words and the second word is a number', () => {
  const command = {
    text: 'convert 1000'
  }
  expect(converterMiddleware(null, command)).toBe(true)
})
