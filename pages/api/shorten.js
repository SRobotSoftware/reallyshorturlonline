import validUrl from 'valid-url'
import shortid from 'shortid'

import dbConnect from '../../lib/dbConnect'
import Url from '../../models/url'
import checkIfSafe from '../../lib/safeBrowsing'

const baseUrl = process.env.BASE_URL

export default async function handler(req, res) {
    const { method } = req
    const { longUrl } = req.body

    if (method !== 'POST') return res.status(405).json('Incorrect Method')
    if (!longUrl) return res.status(400).json('No URL given')
    if (!validUrl.isWebUri(longUrl) || !(await checkIfSafe(longUrl))) return res.status(400).json('Invalid url')

    await dbConnect()

    const urlCode = shortid.generate()

    try {
        let url = await Url.findOne({ longUrl })

        if (url) {
            return res.status(200).json(url)
        }

        url = new Url({
            longUrl,
            baseUrl,
            urlCode,
        })

        await url.save()

        return res.status(200).json(url)

    } catch (error) {
        console.error(error)
        return errorHandler(req, res, error)
    }

    res.status(500).json('Something went wrong')
}
