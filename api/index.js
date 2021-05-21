import { app, properties } from './conf/conf.js'
import StatusCodes from 'http-status-codes'
import express from 'express'
import got from 'got'
import CardanoMessageProducer from '../kafka/producer/index.js'
import CardanoCliExecutor from '../cmds/CardanoCliExecutor.js'
import FileUtils from '../utils/fileHandler.js'
import FlureeDao from './services/flureeDao.js'

let router = express.Router()
let cardanoMessageProducer = new CardanoMessageProducer()
let cardanoCliExecutor = new CardanoCliExecutor()
let fileUtils = new FileUtils()
let flureeDao = new FlureeDao();

app.use(router)

router.get('/', async (req, res, next) => {
  return res.status(StatusCodes.OK).json({
    status: 'ok',
  })
})

router.post('/', async (req, res, next) => {
  try {
    let file = req.files.image
    let uploadPath = '../upload/' + file.name

    file.mv(uploadPath, (err) => {
      if (err) {
        console.log(err)
      } else {
        console.log('File Uploaded')
      }
    })

    let body = Object.assign({ imageUrl: uploadPath }, req.body)

    await cardanoMessageProducer.queue(body)

    //TODO : perform cleanup from temp folder
    //cardanoCliExecutor.execute('rmdir /s/q ../upload/')

    return res.status(StatusCodes.OK).json({ message: 'ok' })
  } catch (error) {
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      error: error,
    })
  }
})

router.post('/data', async (req, res, next) => {
  try {
      console.log(req.body)
    let data = await fileUtils.read(
      '../cardano-tx-files/' + req.body.name + '.json',
    )
    console.log(data)
    return res.status(StatusCodes.OK).json(data)
  } catch (error) {
    console.log(error)
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      error: error,
    })
  }
})

router.get('/:hash', async (req, res, next) => {
  let hash = req.params.hash
  //let response = await getMetadata(hash)

  let response = {
    "hash": {
        "cid": "bafybeiespvwb2754lzo7xktianrmbu5jcn5xpt56yxb6csf7olo5cxfs5u",
        "fid": "a2ba0262e167a584e2bd7b1699e3432b8bde40efcbdf0bcb3d94bda75dcbc91f"
    }
  }

  let result = await flureeDao.fetch(response.hash)
  console.log(result)

  return res.status(StatusCodes.OK).json({
    result
  })
})

function getMetadata(hash) {
  return got
    .get(
      properties.get('app.url').replace('hash', hash),
      {
        headers: {
          project_id: properties.get('app.id'),
        },
      },
      {
        responseType: 'json',
      },
    )
    .then((res) => {
      return JSON.parse(res.body)[0]
    })
    .catch((err) => {
      console.log(err)
    })
}

let PORT = properties.get('app.port')
app.listen(PORT, () => {
  console.log(`App started at port ${PORT}`)
})

export default app