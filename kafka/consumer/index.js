/**
 * 
 * A general purpose Kakfa listener.
 * It listens to the message being produced by the Kafka Producer
 * 
 * @usage  : Kindly keep this node spinning 
 *           in order to listen to the message 
 *           as and when they are pushed
 * 
 * @author : Manik Jain
 */
import KafkaConfig from '../config.js';
import eventType from '../eventType.js';

let kafkaConfig = new KafkaConfig();
const consumer = kafkaConfig.consumer();

consumer.connect();
consumer.on('ready', () => {
    console.log('consumer ready..')
    consumer.subscribe(['test']);
    consumer.consume();
  }).on('data', (data) => parseData(data));

  function parseData(data) {
    console.log(`received message: ${eventType.fromBuffer(data.value)}`);
  }