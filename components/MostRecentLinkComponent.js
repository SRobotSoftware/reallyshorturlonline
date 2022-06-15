import * as React from 'react'
import { CircularProgress, Typography } from '@mui/material'
import Link from 'next/link'
import fetcher from '../lib/fetcher'
import { formatDistance } from 'date-fns'
import useSWR from 'swr'

export default function MostRecentLink() {
  const { data, error } = useSWR('api/mostRecent', fetcher)

  if (!error && !data) return <Typography variant="h5">Fetching most recent link... <CircularProgress /></Typography>

  return <Typography variant="h5">The most recent link <Link href={`/api/s/${data?.url?.urlCode}`}><a className="is-size-4">{data?.url?.urlCode}</a></Link> was created {formatDistance(new Date(data?.url?.createdAt), new Date(), { addSuffix: true })}</Typography>
}
