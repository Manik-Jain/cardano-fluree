import {ContainerBuilder} from 'node-dependency-injection'
import NFTDataStore from '../ipfs/NFTDataStore.js'
import Try from './index.js'

let container = new ContainerBuilder()

container.register('nftDataStore', NFTDataStore)
container.register('try', Try).addArgument('nftDataStore')

export default {
    container
}