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
import FileHandler from './fileHandler.js'
import KafkaConfig from '../config.js'
import eventType from '../eventType.js'
import CardanoProcessor from '../processor/index.js'
import NFTDataStore from '../../ipfs/NFTDataStore.js'
import _ from 'lodash';
import SignAndVerify from '../../fluree/signAndVerify.js'
import propertiesReader from 'properties-reader';

var properties = propertiesReader('./properties.file');
let kafkaConfig = new KafkaConfig();
let cardanoProcessor = new CardanoProcessor();
let nftDataStore = new NFTDataStore();
let fileHandler = new FileHandler();
let cryptoUtil = new SignAndVerify();

const consumer = kafkaConfig.consumer();

( 
  async function consume() {
  consumer.connect();
  consumer.on('ready', () => {
    console.log('consumer ready..')
    consumer.subscribe(['test']);
    consumer.consume();
  }).on('data', async (data) => 
      await publish(data)
  )
})();

async function publish(data) {
  let parsedData = eventType.fromBuffer(data.value)
  console.log(`received message: ${parsedData}`)

  let image = {path : parsedData.imageUrl}
  console.log(image)
  delete parsedData.imageUrl

  let selected = _.pick(parsedData, ['name', 
                                    'materials', 
                                    'dimensions', 
                                    'weight', 
                                    'story', 
                                    'significance', 
                                    'availability', 
                                    'date',
                                    'artist']);
  
  let keys = cryptoUtil.getKeys(properties.get('sKey'))
  let signature = cryptoUtil.sign(selected, keys.private)

  console.log('Saving to fluree :', parsedData)
  let flureeHash = await cardanoProcessor.process(parsedData)
  let ipfsCid = await nftDataStore.upload(image.path)
  
  let txnDetail = {
    signature : signature,
    flureeHash : flureeHash,
    ipfsCid : ipfsCid
  }

  let fileName = `../cardano-tx-files/${parsedData.name}.json`
  await fileHandler.write(fileName, txnDetail)
}