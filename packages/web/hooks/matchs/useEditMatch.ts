import { useMutation, useQueryClient } from '@tanstack/react-query'
import { EditMatch } from '~/models/editMatch'
import client from '~/services/http/client'

export const useEditMatch = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (matchData: EditMatch) => {
      const { id, ...updateData } = matchData
      return client.put(`matchs/${id}/date`, updateData) 
    },
    onSuccess: (_, vars) => {
      queryClient.invalidateQueries({ queryKey: ['matchs'] }) 
      queryClient.invalidateQueries({ queryKey: ['match', vars.id] }) 
    },
  })
}
