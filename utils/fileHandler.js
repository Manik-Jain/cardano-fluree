import fs from 'fs'
import path from 'path'

/**
 * async write to the file if the file exits, else create the file and then write to it
 * utilises promises from fs module
 * 
 * @param {*} fileName : fileName
 * @param {*} data : data to save
 */

export default class FileUtil {

    async write(fileName, data) {
        try {
            fs.writeFile(path.resolve(fileName), JSON.stringify(data), (res) => {
                console.log('File uploaded successfully...')
            })
        } catch (error) {
            throw new Error(error.toString())
        }
    }

    async read(fileName) {
        try {
            console.log(fileName)
            let data = fs.readFileSync(path.resolve(fileName), {encoding : 'utf-8'})
            // let data = await fs.promises.readFile(path.resolve(fileName), {
            //     encoding: 'utf-8'
            // });
            return JSON.parse(data)
        } catch (error) {
            console.log(error)
            return {
                error : 'Service Failure',
                message : 'File Upload failed'
            };
        }
    }
}