# ReallyShortUrl.online

## About

Really Short URLs Online is a small project utilizing Next.js to create a link shortening service.

The service takes a user submitted URL, checks validity, checks for duplicate entries, checks safety, and then returns a
shortened link to the user.

### Stack

* [Next.js](https://nextjs.org/)
  * [Mongoose](https://mongoosejs.com/docs/)
  * [NanoId](https://github.com/ai/nanoid#readme)
  * [ValidURL](https://github.com/ogt/valid-url#readme)
  * [node-fetch-cache](https://github.com/mistval/node-fetch-cache#readme)
* [Bulma CSS Framework](https://bulma.io/)
* [Mongodb](https://www.mongodb.com/)
* [Google Safe Browsing API](https://developers.google.com/safe-browsing)

## Data

### Schema

The standard ObjectId for `_id` has been replaced with an md5 hash of the `longUrl`

```json
{
  "_id": "8ffdefbdec956b595d257f0aaeefd623",
  "urlCode": "B6CWoFetRwDNzsTmMbKbO",
  "longUrl": "https://www.google.com",
  "hits": 4,
  "date": "1654907548360"
}
```

### Indexes

| field   | type                 | reasoning        |
|---------|----------------------|------------------|
| _id     | unique, ascending    | Primary key      |
| urlCode | unique, ascending    | Frequent Lookup  |
