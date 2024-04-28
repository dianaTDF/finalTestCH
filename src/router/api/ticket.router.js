import { Router } from "express"
import { getLastTicketUserController, getTicketsUserController ,postController } from "../../controller/ticket.controller.js"
import { authenticateWithJwt } from "../../middlewares/authentication.js"
import { rolChecker, rolExluded, sameUserOrIncludedRol } from "../../middlewares/authorization.js"

export const router= Router()


router.get('/current-last',authenticateWithJwt,getLastTicketUserController)
router.get('/current/:limit?',authenticateWithJwt,getTicketsUserController)
router.post('/',authenticateWithJwt,postController)


