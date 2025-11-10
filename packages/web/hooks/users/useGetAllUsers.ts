import { useQuery } from '@tanstack/react-query'
import { User } from '~/models/User'

import client from '~/services/http/client'

export const useGetAllUsers = () => {
  return useQuery<User[]>({
    queryFn: async () => {
      const response = await client.get('users')
      return response.json()
    },
    queryKey: ['users'],
  })
}