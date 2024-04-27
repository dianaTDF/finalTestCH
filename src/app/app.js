import express  from "express"
import  {router as webRouter} from '../router/web/web.router.js'
import  {router as apiRouter} from '../router/api/api.router.js'
import { httpLogger } from '../middlewares/httpLogger.js'
import { cookie } from "../middlewares/cookie.js"
import { authentication } from "../middlewares/authentication.js"
import handlebars from 'express-handlebars'

export const app = express()

app.engine('handlebars', handlebars.engine())
app.set('views', './views')

app.use(express.static('./public'))
app.use('/static', express.static('./static'))


app.use(httpLogger)
app.use(cookie)
app.use(authentication)
app.use('/statics',express.static('./static'))

app.use('/api',apiRouter)
app.use('/',webRouter)