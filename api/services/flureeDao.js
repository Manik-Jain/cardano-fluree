import got from 'got'
import {properties} from '../conf/conf.js'

export default class FlureeDao {
  async fetch(obj) {

    if (obj.fid && obj.fid != '') {
      const { body } = await got.post(
        properties.get('fluree.url'),
        {
          json: {
            select: [
              'name',
              'weight',
              'availability',
              'artist',
              'materials',
              'date',
              'significance',
              'story',
              'dimensions',
              'cid',
            ],
            from: '_artifact',
          },
          responseType: 'json',
        },
      )

      
      let filtered = body.filter(entry => entry.cid === obj.fid)
     
      if(filtered) {
        let final = filtered[0]
        delete final._id
        console.log(final)
        let mock = {
            artist_Description : 'I belong to the Seneca Deer Clan and live on the Cattaraugus Reservation in Perrysburg, NY',
            artist_field : 'Iroquois Antler & Stone Carve',
            imageUrl : obj.cid
        }

        final = Object.assign(final, mock)
        return final
      } else {
        return null
      }
    } else {
        return null
    }
  }
}
