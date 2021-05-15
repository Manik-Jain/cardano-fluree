import FlureeConnectionFactory from './flureeConnectionFactory.js';
import FlureeCrud from './flureeCrud.js';

let flureeConnectionFactory = new FlureeConnectionFactory();
let flureeCrud = new FlureeCrud();
const conn = await flureeConnectionFactory.getConnection();

// //for the purpose of demo, a constant value has been used
// //Feel free to update this
 const ledgerName = 'test/cardano-nft';

// //get a connection instance
 const conn = await flureeConnectionFactory.getConnection();


//create a new Ledger
 let ledger = await flureeCrud.create(conn, ledgerName);
 console.log(ledger)

//delete a ledger
//await flureeCrud.delete(conn, ledgerName);

let imageDetails = [
    {
      _id: '_artifact',
      name: 'Fire',
      artist: 'Manik Jain',
      materials: 'some random',
      dimensions: 'somehting',
      weight: '80 lb',
      story: 'story',
      significance: 'history',
      availability: 'availability',
      date: '11 Jan, 2020'
    }
  ];
//await flureeCrud.insert(conn, ledgerName, imageDetails);

// //Read inserted values
await flureeCrud.read(conn, ledgerName, '_artifact', 369435906932755);

// //close the connection instance
 flureeConnectionFactory.close(conn);
 process.exit(1);