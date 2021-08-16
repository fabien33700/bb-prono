const express = require('express')
const morgan = require('morgan')
const { connect, Schema, model } = require('mongoose')

const port = 3000
const connectUrl = 'mongodb://localhost:27017/bbprono'
// const connectUrl = 'mongodb://bb-prono_mongodb_1:27017/bbprono'

const Prognostic = model('Prognostic', new Schema({
  firstNames: { type: Array },
  birthDateTime: { type: Date },
  weight: { type: Array },
  size: { type: Array },
  messageText: { type: String },
  author: { type: String, required: true },
  submitDate: { type: Date, required: true },
}))

function mountRouter(app) {
  const router = express.Router()

  router.get('/', async (_, res) => {
    const prognostics = await Prognostic.find({})
    res.json(prognostics)
  })

  router.post('/', async (req, res) => {
    const prognostic = {
      ...req.body,
      submitDate: new Date(),
    }
    await Prognostic.create(prognostic)
    res.status(201).end()
  })

  app.use('/api/prognostics', router)
}

;(async function run() {
  try {
    await connect(connectUrl, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    })

    const app = express()
    app.use(express.json())
    app.use(express.urlencoded({ extended: true }))
    app.use(morgan(':method :url :status :res[content-length] - :response-time ms'))

    mountRouter(app)

    app.listen(port, () => console.log(`Connected successfully on port ${port}`))
  } catch (error) {
    console.error(`Error occured: ${error.message}`)
  }
})()
