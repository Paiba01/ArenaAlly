import { useQuery } from '@tanstack/react-query'
import { Competition } from '~/models/competition'

import client from '~/services/http/client'

export const useGetCompetitions = () => {
  return useQuery<Competition[]>({
    queryFn: async () => {
      const response = await client.get('competitions')
      return response.json()
    },
    queryKey: ['competitions'],
  })
}
