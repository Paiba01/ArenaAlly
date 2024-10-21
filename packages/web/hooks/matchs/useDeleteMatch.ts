import { useMutation, useQueryClient } from '@tanstack/react-query'
import client from '~/services/http/client'

export const useDeleteMatch = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (id: string) => client.delete(`matchs/${id}`),
    onSuccess: () => {
      
      queryClient.invalidateQueries({ queryKey: ['matchs'] })
    },
  })
}