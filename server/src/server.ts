import express from 'express'
import session, { SessionOptions } from 'express-session'
import cors from 'cors'
import helmet from 'helmet'
import bodyParser from 'body-parser'
import chalk from 'chalk'

require('dotenv').config()

express()
  .use(helmet())
  .use(bodyParser.urlencoded({
    extended: true
  }))
  .use(session({
    /**
     * Provide proper session store
     */
    resave: false,
    saveUninitialized: false,
    rolling: true,
    secret: process.env.SESSION_SECRET,
    cookie: {
      maxAge: parseInt(<string>process.env.COOKIE_MAX_AGE)
    }
  } as SessionOptions))
  .use(cors({
    origin: 'http://localhost:8080',
    credentials: true
  }))
  .use(express.json())

  .get('/', (req, res) => res.send('OK'))

  .listen(process.env.PORT, () => chalk.green(`[server] listening on port ${process.env.PORT}`))
