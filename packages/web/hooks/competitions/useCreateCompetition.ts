import { useMutation, useQueryClient } from '@tanstack/react-query'
import { CreateCompetition } from '~/models/createCompetition'
import client from '~/services/http/client'

export const useCreateCompetition = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (competitionData: CreateCompetition) =>
      client.post('competitions', competitionData),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['competitions'] })
    },
  })
}