import { useQuery } from '@tanstack/react-query'

import client from '~/services/http/client'

export const useGetCompetitions = () => {
  return useQuery({
    queryFn: () => {
      return client.get('competitions')
    },
    queryKey: ['competitions'],
  })
}
