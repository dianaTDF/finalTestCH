import { Router } from "express"
import { deleteAllController, deleteController, getAllController, getController, postController, purgeController, putController } from "../../controller/user.controller.js"
import { authenticateWithJwt } from "../../middlewares/authentication.js"
import { rolChecker, sameUserOrIncludedRol } from "../../middlewares/authorization.js"

export const router= Router()

// para indicar rutas que necesitan loggeo -->authenticateWithJwt
// para indicar rutas que necesitan permisos dentro del loggeo -->rolChecker([roles])

router.get('/current',authenticateWithJwt,
    async (req,res,next)=>{res['jsonOk'](req['user'])}
)

router.delete('/clean',authenticateWithJwt,rolChecker(['ADMIN']),purgeController)//no me lo toma si lo dejo mas al fondo

router.get('/',authenticateWithJwt,rolChecker(['ADMIN']),getAllController)
router.get('/:_id',authenticateWithJwt,getController)
router.post('/',postController)
router.put('/:_id',authenticateWithJwt,sameUserOrIncludedRol(['ADMIN']),putController)

router.delete('/:_id',authenticateWithJwt,sameUserOrIncludedRol(['ADMIN']),deleteController)
router.delete('/',authenticateWithJwt,rolChecker(['ADMIN']),deleteAllController)

