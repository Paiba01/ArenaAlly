const withHeadersFetch = (input: RequestInfo | URL, init?: RequestInit) => {
  return fetch(`${import.meta.env.VITE_API_URL}/${input}`, {
    ...init,
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      ...init?.headers,
    },
  })
}

const get = (input: RequestInfo) => withHeadersFetch(input, { method: 'GET' })

const post = (input: RequestInfo, data?: any) => 
  withHeadersFetch(input, { 
    method: 'POST',
    body: data ? JSON.stringify(data) : undefined
  })

const put = (input: RequestInfo, data?: any) => 
  withHeadersFetch(input, { 
    method: 'PUT',
    body: data ? JSON.stringify(data) : undefined
  })

const _delete = (input: RequestInfo) =>
  withHeadersFetch(input, { method: 'DELETE' })

const client = { delete: _delete, get, post, put } as const

export default client