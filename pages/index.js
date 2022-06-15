import * as React from 'react'
import { Box, CssBaseline, Grid, Typography } from '@mui/material'
import Head from 'next/head'
import MostPopularLink from '../components/MostPopularLinkComponent'
import MostRecentLink from '../components/MostRecentLinkComponent'
import ShortenForm from '../components/ShortenFormComponent'

export default function Home() {
  return <Box sx={{ height: '100vh' }}>
    <Head>
      <title>Really Short URLs Online</title>
      <meta name="description" content="Make your URLs super short!" />
      <meta name="viewport" content="initial-scale=1, width=device-width" />
      <CssBaseline />
    </Head>

    <Grid
      container
      direction="column"
      justifyContent="center"
      alignItems="center"
      spacing={2}
      sx={{ height: '100vh' }}
    >
      <Grid item sx={{ width: '100vw', textAlign: 'center' }}>
        <Typography variant="h3">Welcome to Really Short URL Online!</Typography>
        <Typography variant="subtitle1">Make your URLs really short!</Typography>
      </Grid>
      <Grid item sx={{ width: '100vw' }}>
        <ShortenForm />
      </Grid>
      <Grid item sx={{ width: '100vw', textAlign: 'center' }}>
        <MostPopularLink />
      </Grid>
      <Grid item sx={{ width: '100vw', textAlign: 'center' }}>
        <MostRecentLink />
      </Grid>
    </Grid>
  </Box>
}
