import { useQuery } from '@tanstack/react-query'
import client from '~/services/http/client'

export const useGetCompetitions = () => {
  return useQuery<{}>({
    queryKey: ['competitions'],
    queryFn: () => {
      console.log(`${process.env.VITE_API_URL}`);
      return client.get('competitions')
    }
  })
}
