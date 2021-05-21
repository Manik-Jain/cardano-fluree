import flureenjs from '@fluree/flureenjs';
import { sha256 } from 'js-sha256';

export default class FlureeCrud {

    async create(flureedb, ledgerName) {
        console.log('Creating new Ledger...')
        let ledger;
         try {
            ledger = await flureenjs.new_ledger(flureedb, ledgerName);
            console.log(`Ledger Created with id : [${ledger.result}]`)
         } catch(error) {
             console.error(`Ledger already exists`)
         }
        return ledger
    }

    enrich(data) {
       if(data) {
            if(!Array.isArray(data)) {
                data = [data]
            }
            
            data.forEach(entry => {
                let hash = sha256(JSON.stringify(entry))
                entry = Object.assign(entry,{cid : hash})
            })
            return data
       } else {
           return data
       }
    }

    async insert(flureedb, ledgerName, data) {
        data = this.enrich(data)
        console.log(data)
        var result = await flureenjs.transact(flureedb, ledgerName, data)
        if(result.status === 200) {
            return data[0].cid;
        } else {
            console.log(result)
            return null
        }
    }

    async insertCollection(flureedb, ledgerName, data) {
        
        var result = await flureenjs.transact(flureedb, ledgerName, data);
        console.log(result)
        return result.id
    }

    async read(flureedb, ledgerName, from, filter) {
        console.log(`Reading Data from [${ledgerName}...]`)
        var db = await flureenjs.db(flureedb, ledgerName)
        var myQuery  = {
            select  : ["name", 
                        "weight", 
                        "availability", 
                        "artist", 
                        "materials", 
                        "date",
                        "significance",
                        "story",
                        "dimensions",
                    "cid"],
            from    :   from
        };
        var result = await flureenjs.query(db, myQuery)
        let filtered = result.filter((value) => value.cid === filter)

        if(filtered) {
            delete filtered[0]._id
        }

        return filtered[0]
    }

    async delete(flureedb, ledgerName) {
        console.log('Deleting Ledger...')
        await flureenjs.delete_ledger(flureedb, ledgerName);
        console.log(`Ledger [${ledgerName}] deleted successfully!`)
    }
}