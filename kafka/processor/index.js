import FlureeConnectionFactory from '../../fluree/flureeConnectionFactory.js'
import FlureeCrud from '../../fluree/flureeCrud.js'


export default class CardanoProcessor {

    async process(message) {
        let flureeConnectionFactory = new FlureeConnectionFactory();
        const conn = await flureeConnectionFactory.getConnection();
        let flureeCrud = new FlureeCrud();
        let txnHash;

        switch(message.category) {
            
            case 'Art' : 
                delete message.category
                let data = [Object.assign({_id:'_artifact'}, message)]
                txnHash = await flureeCrud.insert(conn, 'test/cardano-nft', data)
                console.log(txnHash)
                break;
            case 'Music' : 
                //placeholder for next feature
                break;
            case 'Identity' : 
                //placeholder for next feature
                break;
            default :
                console.log(`Invalid case`)
                return;
        }
        console.log(txnHash)
        return txnHash;
    }
}