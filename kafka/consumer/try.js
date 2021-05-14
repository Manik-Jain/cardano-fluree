import FileHandler from './fileHandler.js'

let fileHandler = new FileHandler();
let fileName = `../../cardano-tx-files/abc.json`
  fileHandler.write(fileName, {cid : 'abc'})