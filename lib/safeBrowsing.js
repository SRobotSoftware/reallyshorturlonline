import fetch from 'node-fetch-cache'

const GOOGLE_API_KEY = process.env.GOOGLE_API_KEY

if (!GOOGLE_API_KEY) throw new Error('Please define the MONGODB_URI env var')

const body = {
  'client': {
    'clientId': 'reallyshorturlonline',
    'clientVersion': '1.0.0'
  },
  'threatInfo': {
    'threatTypes': ['THREAT_TYPE_UNSPECIFIED', 'MALWARE', 'SOCIAL_ENGINEERING', 'UNWANTED_SOFTWARE', 'POTENTIALLY_HARMFUL_APPLICATION'],
    'platformTypes': ['ANY_PLATFORM', 'PLATFORM_TYPE_UNSPECIFIED'],
    'threatEntryTypes': ['URL', 'THREAT_ENTRY_TYPE_UNSPECIFIED', 'EXECUTABLE'],
  }
}

async function checkIfSafe(url) {
  body.threatInfo.threatEntries = [{ url }]
  const response = await fetch(`https://safebrowsing.googleapis.com/v4/threatMatches:find?key=${GOOGLE_API_KEY}`, {
    method: 'POST',
    body: JSON.stringify(body),
    header: { 'Content-Type': 'application/json' },
  })
  const data = await response.json()
  return !data?.matches
}

export default checkIfSafe
