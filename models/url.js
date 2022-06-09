import mongoose from 'mongoose'

const Url = {
    urlCode: String,
    longUrl: String,
    baseUrl: String,
    hits: { type: Number, default: 0 },
    date: { type: String, default: Date.now() },
}

const urlSchema = new mongoose.Schema(Url)

export default mongoose.models.Url || mongoose.model('Url', urlSchema)
