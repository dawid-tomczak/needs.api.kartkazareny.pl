import express from 'express'
import path from 'path'
import cookieParser from 'cookie-parser'
import logger from 'morgan'
import needsRouter from './routes/needs'
import bodyParser from 'body-parser'
import cors from 'cors'

var app = express()

var corsOptions = {
    origin: ['http://localhost:3000', 'https://app.kartkazareny.pl'],
}

app.use(logger('dev'))
app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use(cookieParser())
app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())
app.use(bodyParser.raw())
app.use(cors(corsOptions))
app.use(express.static(path.join(__dirname, '../public')))
app.use('/needs', needsRouter)

export default app
