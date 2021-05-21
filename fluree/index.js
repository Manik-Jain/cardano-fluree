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
 //console.log(ledger)

//delete a ledger
//await flureeCrud.delete(conn, ledgerName);

let imageDetails = [{
  "_id": "_collection",
  "name": "_artifact"
},
{
  "_id": "_predicate",
  "name": "_artifact/cid",
  "doc": "Unique Id of the artifact",
  "type": "string"
},
{
  "_id": "_predicate",
  "name": "_artifact/name",
  "doc": "Name of the artifact",
  "type": "string"
},
{
  "_id": "_predicate",
  "name": "_artifact/materials",
  "doc": "Material used to create artifact",
  "type": "string"
},
{
  "_id": "_predicate",
  "name": "_artifact/dimensions",
  "doc": "Dimensions of artifact",
  "type": "string"
},
{
  "_id": "_predicate",
  "name": "_artifact/weight",
  "doc": "Weight of artifact",
  "type": "string"
},
{
  "_id": "_predicate",
  "name": "_artifact/story",
  "doc": "Story behind artifact",
  "type": "string"
},

{
  "_id": "_predicate",
  "name": "_artifact/significance",
  "doc": "Cultural significance of artifact",
  "type": "string"
},

{
  "_id": "_predicate",
  "name": "_artifact/availability",
  "doc": "Availability of artifact",
  "type": "string"
},
{
  "_id": "_predicate",
  "name": "_artifact/date",
  "doc": "Created date of artifact",
  "type": "string"
},

{
  "_id": "_predicate",
  "name": "_artifact/artist",
  "doc": "Artist detail",
  "type": "string"
}
]

let artistDetails = [{
  "_id": "_collection",
  "name": "_artist"
},
{
  "_id": "_predicate",
  "name": "_artifact/cid",
  "doc": "Unique Id of the artist",
  "type": "string"
},
{
  "_id": "_predicate",
  "name": "_artist/name",
  "doc": "Artist name",
  "type": "string"
},
{
  "_id": "_predicate",
  "name": "_artist/field",
  "doc": "Artist field",
  "type": "string"
},
{
  "_id": "_predicate",
  "name": "_artist/description",
  "doc": "Artist description",
  "type": "string"
}
]

await flureeCrud.insertCollection(conn, ledgerName, imageDetails);

// let imageDetails = [
//     {
//       _id: '_artifact',
//       name: 'Fire',
//       artist: 'Manik Jain',
//       materials: 'some random',
//       dimensions: 'somehting',
//       weight: '80 lb',
//       story: 'story',
//       significance: 'history',
//       availability: 'availability',
//       date: '11 Jan, 2020'
//     }
//   ];
// await flureeCrud.insert(conn, ledgerName, imageDetails);

// //Read inserted values
//await flureeCrud.read(conn, ledgerName, '_artifact', 369435906932755);

// //close the connection instance
 flureeConnectionFactory.close(conn);
 process.exit(1);