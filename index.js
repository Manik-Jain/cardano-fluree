import FileHandler from './utils/fileHandler.js'
let fileHandler = new FileHandler();

(
    async function tryFile() {
    //let data = await fileHandler.read('./cardano-tx-files/Baleno.json')
    //console.log(data)
    await fileHandler.write('./cardano-tx-files/Baleno.json', {
        sig : 'manik'
    })
    }
)();