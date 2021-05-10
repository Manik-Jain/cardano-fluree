import FlureeConnectionFactory from './flureeConnectionFactory.js';
import FlureeCrud from './flureeCrud.js';

let flureeConnectionFactory = new FlureeConnectionFactory();
let flureeCrud = new FlureeCrud();

//for the purpose of demo, a constant value has been used
//Feel free to update this
const ledgerName = 'test/chat';

//get a connection instance
const conn = await flureeConnectionFactory.getConnection();

//create a new Ledger
await flureeCrud.create(conn, ledgerName);

//delete a ledger
//await flureeCrud.delete(conn, ledgerName);

//insert values to ledger
    let myChats = [{
        "_id"       : "_user", 
        "username"  :  "manik"
    }, {
        "_id"       : "_user", 
        "username"  :  "jain"
    }]
await flureeCrud.insert(conn, ledgerName, myChats);

//Read inserted values
await flureeCrud.read(conn, ledgerName, '_user');

//close the connection instance
flureeConnectionFactory.close(conn);
process.exit(1);