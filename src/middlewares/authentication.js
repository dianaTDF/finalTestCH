import passport from "passport"
import { Strategy as JwtStrategy } from "passport-jwt"
import { JWT_PRIVATE_KEY } from "../config/config.js"

passport.use('jwt', new JwtStrategy(
    {
        jwtFromRequest: function (req){
            var token= null
            if(req && ['signedCookies'] && req['signedCookies']['auth']){
                token = req['signedCookies']['auth']
            }
            return token
        },
        secretOrKey: JWT_PRIVATE_KEY
    },
    (user,done)=>{
        done(null,user)
    }
))

export async function authenticateWithJwt(req,res,next){
    passport.authenticate('jwt',{failWithError:true,session:false})(req,res,error=>{
        if(error){
            const typedError= new Error('Authentication error')
            typedError['type']= 'FAILED_AUTHENTICATION'
            next(typedError)
        }else{
            next()
        }
    })
}

export async function authenticateOrLogin(req,res,next){
    passport.authenticate('jwt',{failWithError:true,session:false})(req,res,error=>{
        if(error){
            res.status(401).redirect("/error/401");
        }else{
            next()
        }
    })
}


export const authentication = passport.initialize()