import mongoose from 'mongoose'
import { MONGODB_URI, MONGODB_USERNAME, MONGODB_PASSWORD, MONGODB_DB_NAME } from '../config.js'



export async function connectToDB() {
    try {
        console.log(MONGODB_URI, MONGODB_USERNAME, MONGODB_PASSWORD, MONGODB_DB_NAME)

        const options = {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            dbName: 'microservicio2',
            user: 'admin',
            pass: 'password'
          };
        await mongoose.connect(MONGODB_URI, options)
        console.log('MongoDB connected')
    } catch (error) {
        console.error(error)
    }
}