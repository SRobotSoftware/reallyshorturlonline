import * as React from 'react'
import { Box, FormGroup, Grid, Typography } from '@mui/material'
import { FormContainer, TextFieldElement } from 'react-hook-form-mui'
import Button from '@mui/material/Button'
import Link from 'next/link'
import debounce from '../lib/debounce'
import { useForm } from 'react-hook-form'
import validUrl from 'valid-url'

export default function ShortenForm() {
  const [shortUrl, setShortUrl] = React.useState()
  const [code, setCode] = React.useState()

  const validate = async url => {
    console.log('validating')
    if (!url || !validUrl.isWebUri(url)) return false
    const response = await fetch('/api/safety', { method: 'POST', body: url })
    return await response.json()
  }

  const validateChange = debounce(validate)

  const actionFunc = async () => {
    console.log('submitting')
    const endpoint = '/api/shorten'
    const options = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ longUrl }),
    }

    const response = await fetch(endpoint, options)
    const result = await response.json()

    const newShortUrl = result.baseUrl + result.url.urlCode
    setShortUrl(newShortUrl)
    setCode(result.url.urlCode)

    await navigator.clipboard.writeText(newShortUrl)
  }

  const formContext = useForm({ defaultValues: { url: 'https://www.google.com' } })
  const { handleSubmit, register, formState: { errors }, watch } = formContext
  const longUrl = watch('url')
  const onSubmit = handleSubmit(formData => actionFunc(formData))

  return <Grid
    container
    direction="column"
    justifyContent="center"
    alignItems="center"
    spacing={2}
  >
    <Grid item sx={{ width: '100vw', textAlign: 'center', display: 'flex', justifyContent: 'center' }}>
      <FormContainer
        formContext={formContext}
        handleSubmit={onSubmit}
      >
        <FormGroup row={true}>
          <TextFieldElement
            name={'url'}
            label={'URL'}
            onInput={() => setShortUrl('')}
            { ...register('url', {
              required: true,
              pattern: /https?:\/\/.*/i,
              validate: x => validateChange(x)
            }) }
          />
          <Button
            type={'submit'}
            color={'primary'}
            variant={'contained'}
          >
          Shorten
          </Button>
        </FormGroup>
      </FormContainer>
    </Grid>

    <Grid item sx={{ width: '100vw', textAlign: 'center' }}>
      <Box sx={{ height: '2rem' }}>
        {errors?.url &&
        <span>Please enter a valid URL beginning with <code>http://</code> or <code>https://</code></span>
        }
        {shortUrl &&
        <Link href={`/api/s/${code}`}>
          <a>
            <Typography variant={'h4'}>{shortUrl}</Typography>
          </a>
        </Link>
        }
      </Box>
    </Grid>
  </Grid>
}
