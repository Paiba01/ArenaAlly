import { useMutation, useQueryClient } from '@tanstack/react-query'
import { WriteUser } from '~/models/writeUser'

import client from '~/services/http/client'

export const useEditUser = () => {
    const queryClient = useQueryClient()
  
    return useMutation({
      mutationFn: (userData: WriteUser) => {
        const { id, ...updateData } = userData
        return client.put(`users/${id}`, updateData)
      },
      onSuccess: (_, vars) => {
        queryClient.invalidateQueries({ queryKey: ['users'] })
        queryClient.invalidateQueries({ queryKey: ['users', vars.id] })
      },
    })
  }