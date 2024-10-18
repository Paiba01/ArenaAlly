import { useMutation, useQueryClient } from '@tanstack/react-query'
import client from '~/services/http/client'

export const useDeleteCompetition = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (id: string) => client.delete(`competitions/${id}`),
    onSuccess: () => {
      
      queryClient.invalidateQueries({ queryKey: ['competitions'] })
    },
  })
}