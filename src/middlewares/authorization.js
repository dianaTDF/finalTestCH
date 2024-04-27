export function rolExluded(rol){
    return async function(req,res,next){
        if(rol.includes(req.user.rol)){
            const typedError= new Error('access denied')
            typedError['type']= "FAILED_AUTHORIZATION"
            next(typedError)
        }
        return next()
    }
}

export function rolExludedWeb(rol){
    return async function(req,res,next){
        if(rol.includes(req.user.rol)){
            res.status(403).redirect("/error/403");
        }
        return next()

    }
}

export function rolChecker(rol){
    return async function(req,res,next){
        if(rol.includes(req.user.rol)){
            return next()
        }
        const typedError= new Error('access denied')
        typedError['type']= "FAILED_AUTHORIZATION"
        next(typedError)
    }
}

export function rolCheckerWeb(rol){
    return async function(req,res,next){
        if(rol.includes(req.user.rol)){
            return next()
        }
        res.status(403).redirect("/error/403");
    }
}

export function sameUser(){
    return async function(req,res,next){
        if(req.user._id==req.params){
            return next()
        }
        const typedError= new Error('access denied, must be same user')
        typedError['type']= "FAILED_AUTHORIZATION"
        next(typedError)
    }
}


//ponele, despues miro bien
export function sameUserOrIncludedRol(rol=null){
    return async function(req,res,next){
        if(rol.includes(req.user.rol) || req.user._id==req.params){
            return next()
        }
        const typedError= new Error('access denied')
        typedError['type']= "FAILED_AUTHORIZATION"
        next(typedError)
    }
}


