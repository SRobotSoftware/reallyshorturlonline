import dbConnect from '../../../lib/dbConnect'
import Url from '../../../models/url'
import logger from '../../../lib/logger'

export default async function handleUrlCode(req, res) {
  if (req.method !== 'GET') return res.status(405).json('Incorrect Method')

  const { urlCode } = req.query

  logger.debug('Handling')

  await dbConnect()

  const url = await Url.findByUrlCode(urlCode)

  if (!url?.longUrl) return res.redirect('/404')
  url.hits++
  url.save()

  return res.redirect(url.longUrl)
}
