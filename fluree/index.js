import FlureeConnectionFactory from './flureeConnectionFactory.js';
import FlureeCrud from './flureeCrud.js';

// import { generateKeyPair, getSinFromPublicKey, signTransaction } from '@fluree/crypto-utils';
// const { publicKey, privateKey }  = generateKeyPair();
// //const authId = getSinFromPublicKey(publicKey);
// const authId = getSinFromPublicKey('58208bfe6ad77019b1e4b4aef46ef20fc4d30d0fa314c956ee3b06e6918855a98435');
// const db = "test/chat";
// const expire = Date.now() + 1000;
// const fuel = 100000;
// const nonce = 1; 
// // Deps is an optional parameter - it is a array of _tx/ids that must have succeeded
// // for the current transaction to be accepted.
// const deps = null; 

//     let tx = JSON.stringify([{
//         "_id"       : "_user", 
//         "username"  :  "manik1"
//     }, {
//         "_id"       : "_user", 
//         "username"  :  "jain1"
//     }]);

// const tx = JSON.stringify([{
//     "_id": "_user",
//     "id": "tag/test" }])

// const command = signTransaction(authId, db, expire, fuel, nonce, '5820303bc4a096de6d620a4afcf9e71dff70a8a2a5e68031212381def13b22e7d39f', tx, deps)

// console.log(command)

let flureeConnectionFactory = new FlureeConnectionFactory();
let flureeCrud = new FlureeCrud();
// const conn = await flureeConnectionFactory.getConnection();
// await flureeCrud.insert(conn, db, command.cmd);

// //for the purpose of demo, a constant value has been used
// //Feel free to update this
 const ledgerName = 'test/cardano-nft';
//const ledgerName = 'test/chat'

// //get a connection instance
 const conn = await flureeConnectionFactory.getConnection();


// //create a new Ledger
//  //let ledger = await flureeCrud.create(conn, ledgerName);
//  //console.log(ledger)

// //delete a ledger
// //await flureeCrud.delete(conn, ledgerName);

// //insert values to ledger
//     let message = [{
//         "_id"       : "_user", 
//         "username"  :  "manik1"
//     }, {
//         "_id"       : "_user", 
//         "username"  :  "jain1"
//     }]

    

//     await flureeCrud.insert(conn, ledgerName, message);

//     // let message = [{
//     //     "_id" : "_art",
//     //     "category" : "ART",
//     //     "name" : "Fire",
//     //     "artist" : "Manik Jain"
//     // }]

// //     let message = [{
// //         "_id": "_collection",
// //         "name": "_art"
// //     }, 
// //     {  
// //             "_id": "_predicate",  
// //             "name": "_art/category",  
// //             "doc": "Category that work belongs to",  
// //             "type": "string" 
// //     },
// //     {  
// //         "_id": "_predicate",  
// //         "name": "_art/name",  
// //         "doc": "Name of the work",  
// //         "type": "string" 
// // },
// // {  
// //     "_id": "_predicate",  
// //     "name": "_art/artist",  
// //     "doc": "Artist name",  
// //     "type": "string" 
// // }
// // ]

let imageDetails = [
    {
      _id: '_artifact',
      //category: 'ART',
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
await flureeCrud.insert(conn, ledgerName, imageDetails);


// //Read inserted values
// //await flureeCrud.read(conn, ledgerName, '_user');



// //close the connection instance
 flureeConnectionFactory.close(conn);
 process.exit(1);