import FlureeConnectionFactory from './flureeConnectionFactory.js';
import FlureeCrud from './flureeCrud.js';

let flureeConnectionFactory = new FlureeConnectionFactory();
let flureeCrud = new FlureeCrud();

// //for the purpose of demo, a constant value has been used
// //Feel free to update this
 const ledgerName = 'test/cardano-nft';

// //get a connection instance
 const conn = await flureeConnectionFactory.getConnection();

//create a new Ledger
//let ledger = await flureeCrud.create(conn, ledgerName);
// console.log(ledger)

//delete a ledger
//await flureeCrud.delete(conn, ledgerName);



//await flureeCrud.insertCollection(conn, ledgerName, artistDetails);

// let imageDetails = [
//     {
//       _id: '_artifact',
//       name: 'Fire',
//       artist: 'Manik Jain',
//       materials: 'some random',
//       dimensions: 'somehting1',
//       weight: '80 lb',
//       story: 'story',
//       significance: 'history',
//       availability: 'availability',
//       date: '11 Jan, 2020'
//     }
//   ];

  let artist = [{
    _id: '_artist',
    name: 'Manik Jain',
    field: 'Iroquois Antler & Stone Carve',
    description : 'I belong to the Seneca Deer Clan and live on the Cattaraugus Reservation in Perrysburg, NY'
  }]
let cid = await flureeCrud.insert(conn, ledgerName, artist);
console.log(cid);

// //Read inserted values
//const ledgerName = 'test/cardano-nft';
//let data = await flureeCrud.read(conn, ledgerName, '_artifact', '13ccd1acb6b3fb47927cdff496d45aec309ead10dcb031beb3fe1692cce9fb5b');
//console.log(data)
// //close the connection instance
 flureeConnectionFactory.close(conn);
 process.exit(1);