import mongoose from 'mongoose'
import Url from './url'

const MostPopular = mongoose.models.MostPopular || mongoose.model('MostPopularLink', Url.schema, 'MostPopularLink')

const MostRecent = mongoose.models.MostRecent || mongoose.model('MostRecentLink', Url.schema, 'MostRecentLink')

export {
    MostPopular,
    MostRecent,
}
