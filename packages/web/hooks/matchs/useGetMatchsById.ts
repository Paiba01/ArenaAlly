import { useQuery } from '@tanstack/react-query'
import { Competition } from '~/models/competition'
import { Match } from '~/models/match'

import client from '~/services/http/client'

export const useGetMatchsById = () => {
  return useQuery<Match[]>({
    queryFn: async () => {
      const response = await client.get('competitions')
      return response.json()
    },
    queryKey: ['competitions'],
  })
}