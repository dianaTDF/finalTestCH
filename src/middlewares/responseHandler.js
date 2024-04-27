export function responseHandler(req,res,next){
    res['created'] = (payload)=>{
        res.status(201).json({status:'success',payload})        
    }
    res['result'] = (payload)=>{
        res.status(200).json({status:'success',payload})        
    }
    res['jsonOk'] = (payload)=>{
        res.json({status:'success',payload})        
    }
    res['ok'] = (payload)=>{
        res.status(204).json({status:'success'})        
    }
    res['deleted'] = (payload)=>{
        res.status(204).json({status:'success'})        
    }
    res['cleaned'] = (payload)=>{
        res.status(204).json({status:'success',payload})        
    }
    res['updated'] = (payload)=>{
        res.status(204).json({status:'success'})        
    }

    next()
}