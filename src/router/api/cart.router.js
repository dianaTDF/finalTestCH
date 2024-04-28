import { Router } from "express"
import { authenticateWithJwt } from "../../middlewares/authentication.js"
import {rolExluded } from "../../middlewares/authorization.js"
import { getController,postController,putController,putProductController,cleanController,cleanProductController, getUserCartController, putUserCartController, putUserCartSingleProductController, purchaseController} from "../../controller/cart.controller.js"

export const router= Router()

router.get('/current',authenticateWithJwt,getUserCartController)
router.put('/current/products/:_pid',authenticateWithJwt,putUserCartSingleProductController)
router.put('/current',authenticateWithJwt,putUserCartController)
router.put('/purchase',authenticateWithJwt,purchaseController)


router.get('/:_id',authenticateWithJwt,getController)
// parece que a este nivel no puedo corroborar 
//si el el creador del producto es tambien  
router.post('/',authenticateWithJwt,postController)
router.put('/:_id',authenticateWithJwt,putController)
router.put('/:_id/products/:_pid',authenticateWithJwt,putProductController)
router.delete('/:_id/products/',authenticateWithJwt,cleanController)
router.delete('/:_id/products/:_pid',authenticateWithJwt,cleanProductController)