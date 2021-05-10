import eventType from '../eventType.js';
import KafkaConfig from '../config.js';

let kafkaConfig = new KafkaConfig();
const stream = kafkaConfig.producer();

/**
 * 
 * CardanoMessageProducer
 * 
 * It accepts the Kafka message being produced by the front-end
 * and pushes it to the Kakfa queue for further processing
 * 
 * @author : Manik Jain
 * 
 */
export default class CardanoMessageProducer {

    constructor() {
        stream.on('error', (err) => {
            console.error('Error in Kafka stream')
            console.error(err)
        })
    }

    queue(message) {
        const success = stream.write(eventType.toBuffer(message));
        success ? console.log(`message queued (${JSON.stringify(message)})`) : 
            console.log('Too many messages in the queue already..');
    }
}