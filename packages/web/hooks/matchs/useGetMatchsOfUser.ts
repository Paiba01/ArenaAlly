import { useQuery } from '@tanstack/react-query'
import { Match } from '~/models/match'

import client from '~/services/http/client'

export const useGetMatchsOfUser = (userId: string) => {
  return useQuery<Match[]>({
    queryFn: async () => {
      const response = await client.get(`matchs/users/${userId}`)
      if (!response.ok) {
        throw new Error('Network response was not ok')
      }
      return response.json()
    },
    queryKey: ['matchs', 'users', userId],
  })
}