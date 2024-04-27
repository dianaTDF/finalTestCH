import { logger } from "../utils/logger.js"

export function errorHandler(error,req,res,next){
    let statusCode
    switch(error.type){
        case 'INVALID_ARGUMENT':
            statusCode= 400
            break
        case 'FAILED_AUTHENTICATION':
            statusCode= 401
            break
        case 'FAILED_AUTHORIZATION':
            statusCode= 403
            break
        default:
            statusCode= 500
            break
    }

    logger.error(`HTTP error - status: ${statusCode} - message: ${error.message}`)

    res.status(statusCode).json({
        status:'error',
        message: error.message
    })
}