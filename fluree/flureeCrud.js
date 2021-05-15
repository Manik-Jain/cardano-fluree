import flureenjs from '@fluree/flureenjs';

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

    async insert(flureedb, ledgerName, data) {
        var result = await flureenjs.transact(flureedb, ledgerName, data);
        console.log(result)
        console.log(`Data inserted with id : [${result.flakes[0][0]}]`);
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
                        "dimensions"],
            from    :   from
        };
        var result = await flureenjs.query(db, myQuery)
        let filtered = result.filter((value) => value._id === filter)

        if(filtered) {
            delete filtered[0]._id
        }

        return filtered
    }

    async delete(flureedb, ledgerName) {
        console.log('Deleting Ledger...')
        await flureenjs.delete_ledger(flureedb, ledgerName);
        console.log(`Ledger [${ledgerName}] deleted successfully!`)
    }
}