const withHeadersFetch = (input: RequestInfo | URL, init?: RequestInit) => {

  console.log(`${process.env.VITE_API_URL}/${input}`);
  
  return fetch(`${process.env.VITE_API_URL}/${input}`, {
    ...init,
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      ...init?.headers,
    },
  })
}

const get = (input: RequestInfo) => withHeadersFetch(input, { method: 'GET' })

const post = (input: RequestInfo) => withHeadersFetch(input, { method: 'POST' })

const put = (input: RequestInfo) => withHeadersFetch(input, { method: 'PUT' })

const _delete = (input: RequestInfo) =>
  withHeadersFetch(input, { method: 'DELETE' })

const client = { delete: _delete, get, post, put } as const

export default client
