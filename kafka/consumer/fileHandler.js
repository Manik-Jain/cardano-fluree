import fs from 'fs'
import path from 'path'

/**
 * async write to the file if the file exits, else create the file and then write to it
 * utilises promises from fs module
 * 
 * @param {*} fileName : fileName
 * @param {*} data : data to save
 */

export default class FileHandler {

    async write(fileName, data) {
        try {
            fs.writeFile(path.resolve(fileName), JSON.stringify(data), (res) => {
                console.log('File uploaded successfully...')
            })
        } catch (error) {
            throw new Error(error.toString())
        }
    }
}