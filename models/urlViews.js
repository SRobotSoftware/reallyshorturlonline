import Url from './url'
import mongoose from 'mongoose'

const MostPopular = mongoose.models.MostPopular || mongoose.model('MostPopularLink', Url.schema, 'MostPopularLink')

const MostRecent = mongoose.models.MostRecent || mongoose.model('MostRecentLink', Url.schema, 'MostRecentLink')

export {
  MostPopular,
  MostRecent,
}
