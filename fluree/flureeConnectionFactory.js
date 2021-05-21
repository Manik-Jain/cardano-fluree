import flureenjs from '@fluree/flureenjs';
import {XMLHttpRequest} from 'xmlhttprequest';
import ws from 'ws';
import propertiesReader from 'properties-reader';
 
var properties = propertiesReader('./properties.file');

global.XMLHttpRequest = XMLHttpRequest;
global.WebSocket = ws;
const url = properties.get('url');

export default class FlureeConnectionFactory {

    /**
     * Return a singleton DB connection object 
     * the connection returned depends on the url 
     * which is defined in the properties file
     * 
     * @usage   : Invoke this method to get 
     *             a Fluree DB instance 
     * 
     * @returns : Fluree DBConnection object
     * @author  : Manik Jain
     */
    async getConnection() {
        let dbConnection = await flureenjs.connect_p(url);
        console.log('Connection id : ', dbConnection.id);
        return dbConnection;
    }

    /**
     * Close an already running FlureeDb instance
     * 
     * @param dbConnection - the FlureeDb connection reference
     * @author  : Manik Jain
     */
    async close(dbConnection) {
        flureenjs.close(dbConnection);
        console.log('Connection closed');
    }
}