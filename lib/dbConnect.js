import mongoose from 'mongoose'

const MONGODB_URI = process.env.MONGODB_URI

if (!MONGODB_URI) throw new Error('Please define the MONGODB_URI env var')

let cached = global.mongoose

if (!cached) {
    cached = global.mongoose = { conn: null, promise: null }
}

async function dbConnect() {
    try {
        if (cached.conn) return cached.conn

        if (!cached.promise) {
            const opts = {
                useNewUrlParser: true,
                useUnifiedTopology: true,
                bufferCommands: false,
            }

            cached.promise = mongoose.connect(MONGODB_URI, opts)
        }

        cached.conn = await cached.promise
        return cached.conn
    } catch (error) {
        console.error(error)
    }
}

export default dbConnect
