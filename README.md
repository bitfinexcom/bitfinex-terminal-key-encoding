# bitfinex-terminal-key-encoding

Hyperbee Key-Encodings for Bitfinex Terminal Data.

## Example

```js
const dazaar = require('dazaar')
const swarm = require('dazaar/swarm')
const Hyperbee = require('hyperbee')

const tke = require('bitfinex-terminal-key-encoding')

const card = require('../cards/bitfinex.terminal.BTCUSD.candles.json')
const buyer = market.buy(card, { sparse: true })


buyer.on('feed', function () {
  const db = new Hyperbee(buyer.feed, {
    keyEncoding: tke,
    valueEncoding: 'json'
  })

  doQuery(db)
})

function doQuery (db) {
  db.createReadStream({
    gte: { candle: '5m', timestamp: new Date('2018-10-10T09:00:00.000Z') },
    lte: { candle: '5m', timestamp: new Date('2019-10-10T09:00:00.000Z') },
    limit: 10,
    reverse: true
  }).on('data', (d) => {
    console.log(d)
  })
}


swarm(buyer)
```

## API

Just pass the module as `keyEncoding` option in the Hyperbee constructor. You will be able to use these range selectors:


**Trade Queries**

```
 - timestamp <Date|Number> The timestamp as Date or Unix timestamp
```

**Candle Queries**

```
 - timestamp <Date|Number> The timestamp as Date or Unix timestamp
 - candle <String> Candletype, i.e. 1m or 5m
```
