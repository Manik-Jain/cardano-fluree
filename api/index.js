import {
    app,
    properties
} from './conf/conf.js'
import StatusCodes from 'http-status-codes'
import express from 'express'
import got from 'got'
import CardanoMessageProducer from '../kafka/producer/index.js'

let router = express.Router();
let cardanoMessageProducer = new CardanoMessageProducer();

app.use(router);

router.get('/', async (req, res, next) => {
    return res.status(StatusCodes.OK).send({
        'status': 'ok'
    })
})

router.post('/', async(req, res, next) => {
    try {
        await cardanoMessageProducer.queue(req.body)
        return res.sendStatus(StatusCodes.OK).send({
            response : 'ok'
        })
    } catch(error) {
        return res.sendStatus(StatusCodes.INTERNAL_SERVER_ERROR).send({
            error : error
        })
    }
})

router.get('/:hash', async (req, res, next) => {
    let hash = req.params.hash;
    let response = await getMetadata(hash)
    return res.status(StatusCodes.OK).send({
        hash: response.json_metadata
    })
})

function getMetadata(hash) {
    return got.get(properties.get('app.url').replace('hash', hash), {
        headers: {
            project_id: properties.get('app.id')
        }
    }, {
        responseType: 'json'
    }).then(res => {
        return (JSON.parse(res.body)[0])
    }).catch((err) => {
        console.log(err)
    })
}

let PORT = properties.get('app.port')
app.listen(PORT, () => {
    console.log(`App started at port ${PORT}`)
})

export default app