import User from "../models/user.js"
import { StatusCodes } from "http-status-codes"
import { BadRequestError, UnathenticatedError } from '../errors/index.js';

const register = async (req, res) => {
    const { name, email, password } = req.body
    if (!name || !email || !password) {
        throw new BadRequestError('please provide all values')
    }
    const userAlreadyHasAccount = await User.findOne({ email })
    if (userAlreadyHasAccount) {
        throw new BadRequestError('Email already in use')
    }
    const user = await User.create({ name, email, password })
    const token = user.createjwt()
    res.status(StatusCodes.CREATED)
        .json({ user: { name: user.name, email: user.email, location: user.location, lastName: user.lastName }, token, location: user.location })

}
const login = async (req, res) => {
    const { email, password } = req.body
    if (!email || !password) {
        throw new BadRequestError('Please provide all values')
    }
    const user = await User.findOne({ email }).select('+password')
    if (!user) {
        throw new UnathenticatedError('Invalid credentials')
    }
    const isPasswordCorrect = await user.comparePassword(password)
    if (!isPasswordCorrect) {
        throw new UnathenticatedError('password is incorrect')
    }
    const token = user.createjwt()

    user.password = undefined
    // console.log(user);

    res.status(StatusCodes.OK).json({ token, location: user.location, user })
}
const updateUser = async (req, res) => {
    const { email, name, lastName, location } = req.body
    if (!email || !name || !lastName || !location) {
        throw new UnathenticatedError('please provide all values')
    }
    const user = await User.findOne({ _id: req.user.userId })

    user.name = name
    user.email = email
    user.lastName = lastName
    user.location = location

    await user.save()
    const token = user.createjwt()
    res.status(StatusCodes.OK).json({ location: user.location, user })
}

export { register, login, updateUser }