import client from './client'

const fetcher = async (url: string) => {
  const response = await client.get(url)

  if (!response.ok) {
    let error

    try {
      error = await response.json()
    } catch {}

    throw {
      ...error,
      status: response.status,
    }
  }

  return response.json()
}

export default fetcher
