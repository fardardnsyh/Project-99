import express from 'express'
const app = express()
import dotenv from 'dotenv'
dotenv.config()

//after npm run build-client
import { dirname } from 'path'
import { fileURLToPath } from 'url'
import path from 'path'

//handles throws and await
import "express-async-errors"
import morgan from "morgan"
import connectDB from './db/connect.js'


//middleware and authentication
import notFoundMiddleware from './middleware/notFound.js'
import { errorHandler } from './middleware/errorHandlermiddleware.js'
import auth from './middleware/auth.js'

//routers
import authHandler from "./routers/authHandlerRouter.js";
import jobsHandler from "./routers/jobsRouter.js"

//packages for securing Server
import helmet from 'helmet'
import xss from 'xss-clean'
import mongoSanitize from 'express-mongo-sanitize'

if (process.env.NODE_ENV !== 'production') {
    app.use(morgan('tiny'))
}

//dir name since we are using es6 import methods

const __dirname = dirname(fileURLToPath(import.meta.url))
app.use(express.static(path.resolve(__dirname, './client/build')))



app.use(express.json())
app.use(helmet())
app.use(xss())
app.use(mongoSanitize())
//rough work
// app.get('/', (req, res) => {
//     res.send('welcome')
// })

// router use
app.use("/api/v1/auth", authHandler)
app.use("/api/v1/jobs", auth, jobsHandler)

//when deploying, every get route to directed to index.html file and the react router will handle the rest
app.get('*', function (request, response) {
    response.sendFile(path.resolve(__dirname, './client/build', 'index.html'))
})

app.use(notFoundMiddleware)
app.use(errorHandler)

const port = process.env.PORT || 5000

// app.listen(port, () => {
//     console.log(`Server is listening on port ${port}`);
// })


const start = async () => {
    try {
        await connectDB(process.env.MONGO_URI)
        app.listen(port, () => {
            console.log(`Server is listening on port ${port}`);
        })
    } catch (error) {
        console.log(error);
    }
}

start()