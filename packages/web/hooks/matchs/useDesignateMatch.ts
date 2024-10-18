import { useMutation, useQueryClient } from '@tanstack/react-query'
import { DesignateMatch } from '~/models/designateMatch'
import client from '~/services/http/client'

export const useDesignateMatch = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (matchData: DesignateMatch) => {
      const { id, ...updateData } = matchData
      return client.put(`matchs/${id}/designate`, updateData) 
    },
    onSuccess: (_, vars) => {
      queryClient.invalidateQueries({ queryKey: ['matchs'] }) 
      queryClient.invalidateQueries({ queryKey: ['match', vars.id] }) 
    },
  })
}


