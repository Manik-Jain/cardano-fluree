import flureenjs from '@fluree/flureenjs';

export default class FlureeCrud {

    async create(flureedb, ledgerName) {
        console.log('Creating new Ledger...')
        let ledger = await flureenjs.new_ledger(flureedb, ledgerName)
        console.log(`Ledger Created with id : [${ledger.result}]`)
        return ledger
    }

    async insert(flureedb, ledgerName, data) {
        var result = await flureenjs.transact(flureedb, ledgerName, data);
        console.log(`Data inserted with id : [${result.id}]`);
        return result
    }

    async read(flureedb, ledgerName, from) {
        console.log(`Reading Data from [${ledgerName}...]`)
        var db = await flureenjs.db(flureedb, ledgerName)
        var myQuery  = {
            select  : ['*'],
            from    :   from
        };
        var result = await flureenjs.query(db, myQuery)
        console.log(result)
        return result
    }

    async delete(flureedb, ledgerName) {
        console.log('Deleting Ledger...')
        await flureenjs.delete_ledger(flureedb, ledgerName);
        console.log(`Ledger [${ledgerName}] deleted successfully!`)
    }
}