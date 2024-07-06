const { StatusCodes } = require('http-status-codes');

const { ErrorResponse } = require('../utils/common');
const { UserService } = require('../services')
const AppError = require('../utils/errors/app-error');

function validateAuthRequest(req, res, next) {
    if(!req.body.email) {
        ErrorResponse.error = new AppError(['Email not found in the incoming request in the correct form'], StatusCodes.BAD_REQUEST);
        return res
                .status(StatusCodes.BAD_REQUEST)
                .json(ErrorResponse);
    }
    if(!req.body.password) {
        ErrorResponse.error = new AppError(['password not found in the incoming request in the correct form'], StatusCodes.BAD_REQUEST);
        return res
                .status(StatusCodes.BAD_REQUEST)
                .json(ErrorResponse);
    }
    next();
}

async function checkAuth(req, res, next) {
    try {
        const response = await UserService.isAuthenticated(req.headers['x-access-token']);
        console.log(response)
        if(response) {
            req.user = response; // setting the user id in the req object
            next();
        }        
    } catch(error) {
        return res
                .status(error.statusCode)
                .json(error);
    }

}

module.exports = {
    validateAuthRequest,
    checkAuth
} 