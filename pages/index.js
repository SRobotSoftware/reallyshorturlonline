import Head from 'next/head'
import validUrl from 'valid-url'
import React from 'react'
import { useForm } from 'react-hook-form'
import Link from 'next/link'
import useSWR from 'swr'
import { formatDistance } from 'date-fns'
import debounce from '../lib/debounce'

const fetcher = (...args) => fetch(...args).then(res => res.json())

function MostPopularLink() {
  const { data, error } = useSWR('/api/mostPopular', fetcher)

  if (!error && !data) return <h1>Fetching most popular link...</h1>

  return <h1>The most popular link <Link href={`/api/s/${data?.url?.urlCode}`}><a className="is-size-4">{data?.url?.urlCode}</a></Link> has {data?.url?.hits} hits!</h1>
}

function MostRecentLink() {
  const { data, error } = useSWR('api/mostRecent', fetcher)

  if (!error && !data) return <h1>Fetching most recent link...</h1>

  return <h1>The most recent link <Link href={`/api/s/${data?.url?.urlCode}`}><a className="is-size-4">{data?.url?.urlCode}</a></Link> was created {formatDistance(new Date(data?.url?.createdAt), new Date(), { addSuffix: true })}</h1>
}

export default function Home() {
  const { register, handleSubmit, formState: { errors } } = useForm()
  const [shortUrl, setShortUrl] = React.useState()
  const [code, setCode] = React.useState()

  const validate = async url => {
    console.log('validating')
    if (!url || !validUrl.isWebUri(url)) return false
    const response = await fetch('/api/safety', { method: 'POST', body: url })
    return await response.json()
  }

  const validateChange = debounce(validate)

  const onSubmit = async data => {
    console.log('submitting')
    const longUrl = data.url
    const endpoint = '/api/shorten'
    const options = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ longUrl }),
    }

    const response = await fetch(endpoint, options)
    const result = await response.json()

    const url = result.baseUrl + result.url.urlCode
    setShortUrl(url)
    setCode(result.url.urlCode)

    await navigator.clipboard.writeText(url)
  }

  return (
    <div className="columns is-centered is-vcentered">
      <div className="column is-three-quarters">
        <div className="section is-large">
          <Head>
            <title>Really Short URLs Online</title>
            <meta name="description" content="Make your URLs super short!" />
          </Head>

          <div className="content has-text-centered is-large">
            <p className="title">
                            Welcome to Really Short URLs Online!
            </p>
            <p className="subtitle">
                            Make your URLs super short!
            </p>
          </div>
          <section className="section">
            <form className="field block has-addons" onSubmit={handleSubmit(onSubmit)}>
              <label className="label" htmlFor="url"></label>
              <input
                className="input is-large"
                type="text"
                id="url"
                name="url"
                required
                onInput={() => setShortUrl('')}
                defaultValue="https://www.google.com"
                { ...register('url', {
                  required: true,
                  pattern: /https?:\/\/.*/i,
                  validate: x => validateChange(x)
                }) }/>
              <button className="button is-primary is-large" type="submit">Shorten!</button>
            </form>
            <div className="block has-text-centered">
              {errors.url && <span>Please enter a valid URL beginning with <code>http://</code> or <code>https://</code></span>}
            </div>
            { shortUrl &&
                        <div className="box has-text-centered">
                          <Link href={`/api/s/${code}`}>
                            <a className="is-size-4">{shortUrl}</a>
                          </Link>
                        </div>
            }
          </section>
          <section className="section">
            <MostPopularLink />
          </section>
          <section className="section">
            <MostRecentLink />
          </section>
        </div>
      </div>
    </div>
  )
}
