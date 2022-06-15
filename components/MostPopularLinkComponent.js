import * as React from 'react'
import { CircularProgress, Typography } from '@mui/material'
import Link from 'next/link'
import fetcher from '../lib/fetcher'
import useSWR from 'swr'

export default function MostPopularLink() {
  const { data, error } = useSWR('/api/mostPopular', fetcher)

  if (!error && !data) return <Typography variant="h5">Fetching most popular link... <CircularProgress /></Typography>

  return <Typography variant="h5">The most popular link <Link href={`/api/s/${data?.url?.urlCode}`}><a className="is-size-4">{data?.url?.urlCode}</a></Link> has {data?.url?.hits} hits!</Typography>
}
