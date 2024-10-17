import { useMutation, useQueryClient } from '@tanstack/react-query'
import { EditCompetition } from '~/models/editCompetition'

import client from '~/services/http/client'

export const useEditCompetition = () => {
    const queryClient = useQueryClient()
  
    return useMutation({
      mutationFn: (competitionData: EditCompetition) => {
        const { id, ...updateData } = competitionData
        return client.put(`competitions/${id}`, updateData)
      },
      onSuccess: (_, vars) => {
        queryClient.invalidateQueries({ queryKey: ['competitions'] })
        queryClient.invalidateQueries({ queryKey: ['competition', vars.id] })
      },
    })
  }