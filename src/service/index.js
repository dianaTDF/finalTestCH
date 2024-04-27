//services
import { UserService } from "./user.service.js"
import { ProductService } from "./product.service.js"
import { CartService } from "./cart.service.js"
import { TicketService } from "./ticket.service.js"
import { emailServiceFn } from "./email/email.service.js"
//daos
import { getDao as getUserDao } from "../daos/user/user.dao.js"
import { getDao as getProductDao } from "../daos/product/product.dao.js"
import { getDao as getCartDao } from "../daos/cart/cart.dao.js"
import { getDao as getTicketDao } from "../daos/ticket/ticket.dao.js"

const emailService = emailServiceFn()


//daos
const userDao= getUserDao()
const  cartDao= getCartDao()
const  productDao= getProductDao()
const ticketDao = getTicketDao()

//serices
export const userService= new UserService(userDao, emailService, cartDao)
export const productService= new ProductService(productDao, userDao, emailService)
export const cartService= new CartService(cartDao, userDao,productDao,ticketDao)
export const ticketService= new TicketService(ticketDao, userDao, emailService)

