import { Router } from "express"
import { authenticateWithJwt } from "../../middlewares/authentication.js"
import { rolExluded } from "../../middlewares/authorization.js"
import { deleteController, getAllController, getController, postController, putController } from "../../controller/product.controller.js"

export const router= Router()

router.get('/',authenticateWithJwt,getAllController)
router.get('/_id',authenticateWithJwt,getController)
// parece que a este nivel no puedo corroborar 
//si el el creador del producto es tambien  
router.post('/',authenticateWithJwt,rolExluded(['USER-FREE']),postController)
router.put('/_id',authenticateWithJwt,rolExluded(['USER-FREE']),putController)
router.delete('/_id',authenticateWithJwt,rolExluded(['USER-FREE']),deleteController)