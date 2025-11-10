import { useMutation, useQueryClient } from '@tanstack/react-query'
import { NewUser } from '~/models/newUser'
import client from '~/services/http/client'

export const useCreateUser = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (userData: NewUser) =>
      client.post('users', userData),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['users'] })
    },
  })
}