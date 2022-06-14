import logger from '../lib/logger'

const debounce = (func, timeout = 500) => {
  let timer
  return (...args) => {
    logger.debug('debouncing')
    clearTimeout(timer)
    timer = setTimeout(() => func.apply(this, args), timeout)
  }
}

export default debounce
