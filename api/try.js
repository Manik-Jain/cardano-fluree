import {
    app,
    properties
} from './conf/conf.js'


let hash = '1234'
//let url = `https://cardano-testnet.blockfrost.io/api/v0/txs/hash/metadata`.replace('hash', hash)

let url = String(properties.get('app.url')).replace('hash', hash)

console.log(url)