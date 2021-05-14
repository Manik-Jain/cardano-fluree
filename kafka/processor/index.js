import FlureeConnectionFactory from '../../fluree/flureeConnectionFactory.js'
import FlureeCrud from '../../fluree/flureeCrud.js'

export default class CardanoProcessor {

    async process(message) {
        let flureeConnectionFactory = new FlureeConnectionFactory();
        const conn = await flureeConnectionFactory.getConnection();
        let flureeCrud = new FlureeCrud();
        let txnHash;

        switch(message.category) {
            
            case 'ART' : 
                delete message.category
                let data = [Object.assign({_id:'_artifact'}, message)]
                txnHash = await flureeCrud.insert(conn, 'test/cardano-nft', data)
                //3bdc2ec56a8342a318cc466ece75b184e690413d2c12918cf3cca11677faa30a
                break;
            case 'MUSIC' : 
                //placeholder for next feature
                break;
            case 'IDENTITY' : 
                //placeholder for next feature
                break;
            default :
                console.log(`Invalid case`)
                return;
        }
        return txnHash;
    }
}