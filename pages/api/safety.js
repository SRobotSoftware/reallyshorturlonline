import checkIfSafe from '../../lib/safeBrowsing'

export default async function handler(req, res) {
  const data = await checkIfSafe(req.body)
  return res.json(data)
}
