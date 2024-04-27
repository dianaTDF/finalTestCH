import { Router } from "express"
import { authenticateWithJwt } from "../../middlewares/authentication.js"
import {rolExluded } from "../../middlewares/authorization.js"
import { getController,postController,putController,putProductController,cleanController,cleanProductController, getUserCartController, putUserCartController, putUserCartSingleProductController, purchaseController} from "../../controller/cart.controller.js"

export const router= Router()

router.get('/current',authenticateWithJwt,rolExluded(['USER-FREE']),getUserCartController)
router.put('/current',authenticateWithJwt,rolExluded(['USER-FREE']),putUserCartController)
router.put('/purchase',authenticateWithJwt,rolExluded(['USER-FREE']),purchaseController)
router.put('/current/products/_pid',authenticateWithJwt,rolExluded(['USER-FREE']),putUserCartSingleProductController)


router.get('/_id',authenticateWithJwt,rolExluded(['USER-FREE']),getController)
// parece que a este nivel no puedo corroborar 
//si el el creador del producto es tambien  
router.post('/',authenticateWithJwt,rolExluded(['USER-FREE']),postController)
router.put('/_id',authenticateWithJwt,rolExluded(['USER-FREE']),putController)
router.put('/_id/products/_pid',authenticateWithJwt,rolExluded(['USER-FREE']),putProductController)
router.delete('/_id/products/',authenticateWithJwt,rolExluded(['USER-FREE']),cleanController)
router.delete('/_id/products/_pid',authenticateWithJwt,rolExluded(['USER-FREE']),cleanProductController)