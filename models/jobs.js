import mongoose from 'mongoose'
const JobsSchema = new mongoose.Schema({
    company: {
        type: String,
        required: [true, 'please provide company'],
        maxLength: 50,
    },
    position: {
        type: String,
        required: [true, 'please provide position'],
        maxLength: 100
    },
    status: {
        type: String,
        enum: ["pending", "interview", "declined"],
        default: "pending"
    },
    jobType: {
        type: String,
        enum: ["part-time", "full-time", "remote", "internship"],
        default: "full-time"
    },
    jobLocation: {
        type: String,
        default: 'my city',
        required: true
    },
    createdBy: {
        type: mongoose.Types.ObjectId,
        ref: 'user',
        required: [true, 'please provide user']
    }
},
    { timestamps: true }
)

export default mongoose.model('Job', JobsSchema)