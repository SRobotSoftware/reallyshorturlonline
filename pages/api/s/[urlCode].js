import dbConnect from '../../../lib/dbConnect'
import Url from '../../../models/url'

export default async function handler(req, res) {
    const { method } = req
    const { urlCode } = req.query

    console.log({ urlCode, method })

    await dbConnect()

    const url = await Url.findOne({ urlCode })

    if (!url?.longUrl) return res.redirect('/404')
    url.hits++
    url.save()

    res.redirect(url.longUrl)
}
