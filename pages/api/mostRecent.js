import dbConnect from '../../lib/dbConnect'
import { MostRecent } from '../../models/urlViews'
const baseUrl = process.env.BASE_URL

export default async function handleMostPopular(req, res) {
  if (req.method !== 'GET') return res.status(405).json('Incorrect Method')

  try {
    await dbConnect()
    const mostRecent = await MostRecent.findOne({})
    return res.status(200).json({ baseUrl, url: mostRecent })
  } catch (error) {
    console.error(error)
    return res.status(500).json('Something went wrong')
  }
}
