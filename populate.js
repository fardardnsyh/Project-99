import { readFile } from 'fs/promises'

import connectDB from './db/connect.js'

import Job from './models/jobs.js'

import dotenv from 'dotenv'
dotenv.config()

const start = async () => {
    try {
        await connectDB(process.env.MONGO_URI)
        await Job.deleteMany()
        const jsonProducts = JSON.parse(
            await readFile(new URL('./MOCK_DATA.json', import.meta.url))
        )
        await Job.create(jsonProducts)
        console.log('Success!!!!')
        process.exit(0)

    } catch (error) {
        console.log('Error!')
        process.exit(1)
    }
}

start()