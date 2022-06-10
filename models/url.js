import mongoose from 'mongoose'
import { nanoid } from 'nanoid'

const Url = {
    _id: String,
    urlCode: { type: String, default: () => nanoid() },
    longUrl: String,
    hits: { type: Number, default: 0 },
    date: { type: String, default: Date.now() },
}

const urlSchema = new mongoose.Schema(Url)

urlSchema.statics.findByHash = function(hash) {
    return this.findOne({ _id: hash })
}

urlSchema.statics.findByUrlCode = function(urlCode) {
    return this.findOne({ urlCode })
}

export default mongoose.models.Url || mongoose.model('Url', urlSchema)
