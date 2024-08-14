import Job from "../models/jobs.js"
import { StatusCodes } from "http-status-codes"
import { BadRequestError, NotFoundError } from '../errors/index.js';
import checkpermission from '../utils/checkpermission.js';
import mongoose from 'mongoose'
import moment from 'moment'

const createJob = async (req, res) => {
    const { company, position } = req.body
    //check if company and position are present
    if (!company || !position) {
        throw BadRequestError('please enter all the fields')
    }
    //created by,we'll  import userId from auth notFoundMiddleware
    req.body.createdBy = req.user.userId
    const job = await Job.create(req.body)

    res.status(StatusCodes.CREATED).json({ job })
}


const showStats = async (req, res) => {
    // res.send('show stats')
    // aggregate helps find the jobs matched to the user
    let stats = await Job.aggregate([
        { $match: { createdBy: mongoose.Types.ObjectId(req.user.userId) } },
        // group enables us to make different cartegories of the schema type and add them e.g status
        //sum enables us to calculate and return  the total value
        { $group: { _id: '$status', howManyTimes: { $sum: 1 } } }
    ])
    // console.log(stats);

    //converting the data to a sensible object
    stats = stats.reduce((acc, curr) => {
        // acc is total of all calculations
        // current is the array/object we are looking for... i.e what properties
        const { _id: title, howManyTimes } = curr
        //dynamic objects in js
        acc[title] = howManyTimes
        return acc
    }, {})



    const defaultStats = {
        pending: stats.pending || 0,
        interview: stats.interview || 0,
        declined: stats.declined || 0,
    }
    let monthlyApplications = await Job.aggregate([
        { $match: { createdBy: mongoose.Types.ObjectId(req.user.userId) } },
        {
            $group: {
                _id:
                {
                    month: { $month: '$createdAt' },
                    year: { $year: '$createdAt' },
                },
                count: { $sum: 1 }
            }
        },
        { $sort: { '_id.year': -1, '_id.month': -1 } },
        { $limit: 6 }
    ])

    monthlyApplications = monthlyApplications.map((item) => {
        const { _id: { month, year }, count } = item
        const date = moment().month(month).year(year).format('MMM Y')
        return { date, count }
    }).reverse()

    res.status(StatusCodes.OK).json({ defaultStats, monthlyApplications })
}
const getAllJobs = async (req, res) => {
    const { status, jobType, sort, search } = req.query
    const queryObject = {
        createdBy: req.user.userId,
    }

    //add code based on condition if and etc
    if (status && status !== 'all') {
        queryObject.status = status
    }
    if (jobType && jobType !== 'all') {
        queryObject.jobType = jobType
    }
    if (search) {
        queryObject.position = { $regex: search, $options: 'i' }
    }



    //No await
    let result = Job.find(queryObject)
    // console.log(result);

    // chain sort condition

    if (sort === 'latest') {
        result = result.sort('-createdAt')
    }
    if (sort === 'oldest') {
        result = result.sort('createdAt')
    }
    if (sort === 'a-z') {
        result = result.sort('position')
    }
    if (sort === 'z-a') {
        result = result.sort('-position')
    }

    const page = Number(req.query.page) || 1
    const limit = Number(req.query.limit) || 10

    const skip = (page - 1) * limit

    result = result.skip(skip).limit(limit)
    const jobs = await result

    const totalJobs = await Job.countDocuments(queryObject)
    const numOfPages = await Math.ceil(totalJobs / limit)
    // console.log(jobs);

    res.status(StatusCodes.OK).json({ jobs, numOfPages, totalJobs })
}
// const createJob = (req, res) => {
//     const { company, position } = req.body
//     //check if company and position are present
//     if (!company || !position) {
//         throw BadRequestError('please enter all the fields')
//     }
//     //created by,we'll  import userId from auth notFoundMiddleware
//     req.body.createdBy = req.user.userId
//     const job = await Job.create(req.body)
//     // const userAlreadyHasAccount = await User.findOne({ email })

//     res.status(StatusCodes.CREATED).json({ job })
// }
const updateJob = async (req, res) => {
    const { id: jobId } = req.params
    const { company, position } = req.body
    if (!company || !position) {
        throw BadRequestError('please enter all the fields')
    }

    const job = await Job.findOne({ _id: jobId })

    if (!job) {
        throw NotFoundError(`couldn't find job with id ${jobId}`)
    }
    //check permissions
    checkpermission(req.user, job.createdBy)


    const updateJob = await Job.findOneAndUpdate({ _id: jobId }, req.body, { new: true, runValidators: true })
    res.status(StatusCodes.OK).json({ updateJob })
}
const deleteJob = async (req, res) => {
    const { id: jobId } = req.params

    const job = await Job.findOne({ _id: jobId })

    if (!job) {
        throw NotFoundError(`couldn't find job with id ${jobId}`)
    }
    await Job.findOneAndDelete(job)

    res.status(StatusCodes.OK).json({ msg: 'job deleted!' })
}

export { createJob, updateJob, getAllJobs, showStats, deleteJob }