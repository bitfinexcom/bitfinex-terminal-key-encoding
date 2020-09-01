'use strict'

const times = {
  '1m': 60 * 1000,
  '5m': 5 * 60 * 1000,
  '15m': 15 * 60 * 1000,
  '30m': 30 * 60 * 1000,
  '1h': 60 * 60 * 1000,
  '3h': 3 * 60 * 60 * 1000,
  '6h': 6 * 60 * 60 * 1000,
  '12h': 12 * 60 * 60 * 1000,
  '1D': 24 * 60 * 60 * 1000,
  '7D': 7 * 24 * 60 * 60 * 1000,
  '14D': 14 * 24 * 60 * 60 * 1000,
  '1M': 30 * 24 * 60 * 60 * 1000
}

const timesReverse = {
  [60 * 1000]: '1m',
  [5 * 60 * 1000]: '5m',
  [15 * 60 * 1000]: '15m',
  [30 * 60 * 1000]: '30m',
  [60 * 60 * 1000]: '1h',
  [3 * 60 * 60 * 1000]: '3h',
  [6 * 60 * 60 * 1000]: '6h',
  [12 * 60 * 60 * 1000]: '12h',
  [24 * 60 * 60 * 1000]: '1D',
  [7 * 24 * 60 * 60 * 1000]: '7D',
  [14 * 24 * 60 * 60 * 1000]: '14D',
  [30 * 24 * 60 * 60 * 1000]: '1M'
}

const keyEncoding = {
  encode (range) {
    if (typeof range === 'number' || range.getTime) {
      range = { timestamp: range }
    }

    return Buffer.from(range.candle
      ? 'c!' + (times[range.candle] || range.candle) + '!' + toMS(range.timestamp || 0)
      : 't!' + toMS(range.timestamp || 0))
  },
  decode (bytes) {
    const key = bytes.toString()

    if (key[0] === 't') {
      return {
        candle: null,
        timestamp: new Date(Number(key.slice(2)))
      }
    }

    const [candle, timeStr] = key.slice(2).split('!')
    return {
      candle: timesReverse[candle],
      timestamp: new Date(Number(timeStr))
    }
  }
}

function toMS (s) {
  return typeof s === 'number'
    ? s
    : s.getTime()
}

module.exports = keyEncoding
