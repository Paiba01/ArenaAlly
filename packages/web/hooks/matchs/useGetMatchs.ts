import { useQuery } from '@tanstack/react-query'
import { Match } from '~/models/match'

import client from '~/services/http/client'

export const useGetMatchs = () => {
  return useQuery<Match[]>({
    queryFn: async () => {
      const response = await client.get('matchs')
      return response.json()
    },
    queryKey: ['matchs'],
  })
}
