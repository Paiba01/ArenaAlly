import { useQuery } from "@tanstack/react-query"
import { User } from "~/models/User"
import client from "~/services/http/client"

export const useGetUser = (id: string | undefined) => {
    return useQuery<User | null>({
      queryFn: async () => {
        if (!id) return null
        const response = await client.get(`users/${id}`)
        if (!response.ok) {
          throw new Error('Network response was not ok')
        }
        return response.json()
      },
      queryKey: ['users', id],
      enabled: !!id, 
    })
  }