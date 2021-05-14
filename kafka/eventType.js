import avro from 'avsc';

/**
 * This is a general purpose event/message serialisation/de-serialisation 
 * procedure that defines the type of messages that are allowed on 
 * a Kafka container.
 * 
 * Currently this caters to the NFT token type and name 
 * which will be provided from the front-end
 * 
 * @author : Manik Jain
 */

export default avro.Type.forSchema({
  type: 'record',
  fields: [
    {
      name: 'category',
      type: { 
          type: 'enum', 
          symbols: ['ART', 'MUSIC', 'IDENTITY'] }
    },
    {
      name: 'name',
      type: 'string',
    },
    {
      name : 'imageUrl',
      type : 'string'
    },
    {
      name : 'artist',
      type : 'string'
    }, 
    {
      name : 'materials',
      type : 'string'
    },
    {
      name : 'dimensions',
      type : 'string'
    },
    {
      name : 'weight',
      type : 'string'
    },
    {
      name : 'story',
      type : 'string'
    },
    {
      name : 'significance',
      type : 'string'
    },
    {
      name : 'availability',
      type : 'string'
    },
    {
      name : 'date',
      type : 'string'
    }
  ]
});