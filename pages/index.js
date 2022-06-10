import Head from 'next/head'
import styles from '../styles/Home.module.css'
import validUrl from 'valid-url'
import React from 'react'
import { useForm } from 'react-hook-form'
import Link from 'next/link'

export default function Home() {
    const { register, handleSubmit, watch, formState: { errors } } = useForm()
    const [shortUrl, setShortUrl] = React.useState()
    const [code, setCode] = React.useState()
    const validate = async url => {
        setShortUrl('')
        if (!url || !validUrl.isWebUri(url)) return false
        const response = await fetch('/api/safety', {
            method: 'POST',
            body: url
        })
        return await response.json()
    }
    const onSubmit = async data => {
        const longUrl = data.url
        const endpoint = '/api/shorten'
        const options = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ longUrl })
        }
        const response = await fetch(endpoint, options)
        const result = await response.json()
        const url = result.baseUrl + result.urlCode
        setShortUrl(url)
        setCode(result.urlCode)
        navigator.clipboard.writeText(url)
    }
  return (
    <div className={styles.container}>
      <Head>
        <title>Really Short URLs Online</title>
        <meta name="description" content="Make your URLs super short!" />
      </Head>

      <main className={styles.main}>
        <h1 className={styles.title}>
          Welcome to Really Short URLs Online!
        </h1>

        <div className={styles.description}>
            <form onSubmit={handleSubmit(onSubmit)}>
                <label htmlFor="url">Url:</label>
                <input
                    type="text"
                    id="url"
                    name="url"
                    required
                    defaultValue="https://www.google.com"
                    { ...register('url', {
                        required: true,
                        pattern: /https?:\/\/.*/i,
                        validate: x => validate(x)
                    }) }
                />
                <button type="submit">Shorten!</button>
                <br/>
                <div>
                    {errors.url && <span>Please enter a valid URL</span>}
                </div>
            </form>
        </div>
          { shortUrl &&
              <Link href={`/api/s/${code}`}>
                <a>{shortUrl}</a>
              </Link>
          }
      </main>
    </div>
  )
}
