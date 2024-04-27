import {Router,json,urlencoded} from 'express'
import { router as productRouter } from './product.router.js'
import { router as cartRouter } from './cart.router.js'
import { router as userRouter } from './user.router.js'
import { router as sessionRouter } from './session.router.js'
import { router as ticketRouter } from './ticket.router.js'
import { responseHandler } from '../../middlewares/responseHandler.js'
import { errorHandler } from '../../middlewares/errorHandler.js'

export const  router = Router()

router.use(responseHandler)

router.use(json())
router.use(urlencoded({extended:true}))

router.use('/users',userRouter)
router.use('/products',productRouter)
router.use('/carts',cartRouter)
router.use('/sessions',sessionRouter)
router.use('/tickets',ticketRouter)
// router.use(nombre de ruta, router)

router.use(errorHandler)
