import { NFTStorage, Blob } from 'nft.storage'
import fs from 'fs';
import path from 'path';
import propertiesReader from 'properties-reader';

var properties = propertiesReader('./properties.file'); 
const apiKey = properties.get('API_KEY')
const ipfs = new NFTStorage({ token: apiKey })

/**
 * A general purpose IPFS metadata storage
 * that aims at storing the NFT metadata on IPFS backed NFT.storage 
 *  
 * @url : https://nft.storage/
 * 
 * @author : Manik Jain
 */
export default class NFTDataStore {

    /**
     * uploads the file [image, pdf, or sound] to NFT IPFS Storage
     * 
     * @param {} filePath
     * 
     * @sample : fs.promises.readFile(path.resolve('./Cardano.png'));
     * this was stored at location => ipfs://bafybeidzbb27oxdaht5eoxcghm6ynb2rtwwshvgkqsktw3trnrzrgvpdnq/
     * 
     * @returns : the generated cid
     */
    async upload(filePath) {
        let file;
        try {
            file  = await fs.promises.readFile(path.resolve(filePath))
        } catch(error) {
            console.error('Error in reading the file')
            console.error(error)
        }
        console.log(`Uploading file to NFT IPFS`)
        const cid = await ipfs.storeBlob(file)
        console.log(`File uploaded to NFT IPFS at : ${cid}`)
        return cid;
    }
}