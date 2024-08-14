import { UnathenticatedError } from "../errors/index.js"
import jwt from 'jsonwebtoken'

const auth = async (req, res, next) => {
    const authHeader = req.headers.authorization
    //check for token
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
        throw new UnathenticatedError('Invalid authentication')
    }
    const token = authHeader.split(' ')[1]
    try {
        const payload = jwt.verify(token, process.env.JWT_SECRET)
        // console.log(payload)
        //checking if token is valid
        // req.user = payload
        //we need to create userId that holds values
        //
        req.user = { userId: payload.userId }
        next()
    } catch (error) {
        throw new UnathenticatedError('Invalid authentication')
    }

}

export default auth