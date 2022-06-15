import Url from '../../models/url'
import checkIfSafe from '../../lib/safeBrowsing'
import { createHash } from 'node:crypto'
import dbConnect from '../../lib/dbConnect'
import validUrl from 'valid-url'

const baseUrl = process.env.BASE_URL

export default async function handleShorten(req, res) {
  if (req.method !== 'POST') return res.status(405).json('Incorrect Method')

  const { longUrl } = req.body

  if (!longUrl) return res.status(400).json('No URL given')
  if (!validUrl.isWebUri(longUrl) || !(await checkIfSafe(longUrl))) return res.status(400).json('Invalid url')

  const hash = createHash('md5').update(longUrl).digest('hex')

  await dbConnect()

  try {
    let url = await Url.findByHash(hash)

    if (url) return res.status(200).json({ baseUrl, url })

    url = new Url({
      _id: hash,
      longUrl,
    })

    await url.save()

    return res.status(200).json({ baseUrl, url })
  } catch (error) {
    console.error(error)
    return res.status(500).json('Something went wrong')
  }
}
