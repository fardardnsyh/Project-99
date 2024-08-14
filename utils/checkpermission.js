//importance of checking permissions,
//1. allow super users like admin to change values 
//2. forbid user access,another user from changing values in the controller

import { UnathenticatedError } from '../errors/index.js';

//function that takes in 2 parameters,
// the createdBy(object)
// the resourceUserID(string)

const checkpermission = (requestUser, resourceUserID) => {
    if (requestUser.userId, resourceUserID.toString()) {
        return
    }
    throw new UnathenticatedError('Not authorized to access this route')
}

export default checkpermission