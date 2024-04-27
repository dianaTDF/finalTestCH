import {Router,json,urlencoded} from 'express'
import { authenticateOrLogin } from '../../middlewares/authentication.js'
import { rolCheckerWeb, rolExludedWeb } from '../../middlewares/authorization.js'


//me imaginoque seria mas prolijo hacer separacion de archivos por rutas
// con mas tiempo tal vez
export const  router = Router()

router.use(json())
router.use(urlencoded({extended:true}))


/* -------------------------------------------------------------------------- */
/*                              rutas con loggeo                              */
/* -------------------------------------------------------------------------- */
router.get('/index',authenticateOrLogin, (req, res) => {
    res.render('auth/product/index.handlebars', { pageTitle: 'Productos'})
})
router.get('/products/create',authenticateOrLogin,rolExludedWeb(['USER-FREE']), (req, res) => {
    res.render('auth/product/create.handlebars', { pageTitle: 'Crear producto'})
})
router.get('/products/{_id}/edit',authenticateOrLogin,rolExludedWeb(['USER-FREE']), (req, res) => {
    res.render('auth/product/create.handlebars', { pageTitle: 'Crear producto'})
})
router.get('/products/{_id}',authenticateOrLogin, (req, res) => {
    res.render('auth/product/create.handlebars', { pageTitle: 'Crear producto'})
})

router.get('/cart',authenticateOrLogin, (req, res) => {
    res.render('auth/cart/show.handlebars', { pageTitle: 'Carrito'})
})
/* 
router.get('/purchased',authenticateOrLogin, (req, res) => {
    res.render('auth/ticket/show.handlebars', { pageTitle: 'compra'})
})
  */
router.get('/profile',authenticateOrLogin, (req, res) => {
    res.render('auth/user/show.handlebars', { pageTitle: 'Usuario'})
})
router.get('/users',authenticateOrLogin,rolCheckerWeb(['ADMIN']), (req, res) => {
    res.render('auth/user/index.handlebars', { pageTitle: 'Usuarios'})
})




/* -------------------------------------------------------------------------- */
/*                             rutas sin loggearse                            */
/* -------------------------------------------------------------------------- */

router.get(['/','/login'], (req, res) => {
    res.render('login.handlebars', { pageTitle: 'Login', layout: 'nolog' })
})
router.get('/create', (req, res) => {
    res.render('create.handlebars', { pageTitle: 'Register', layout: 'nolog' })
})


/* -------------------------------------------------------------------------- */
/*                                   errores                                  */
/* -------------------------------------------------------------------------- */


router.get('/error/401', (req, res) => {
    res.render('responses/401.handlebars', { pageTitle: '401', layout: 'nolog' })
})
router.get('/error/403', (req, res) => {
    res.render('responses/403.handlebars', { pageTitle: '401' })
})
