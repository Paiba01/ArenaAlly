import { useQuery } from "@tanstack/react-query"
import { User } from "~/models/User"
import client from "~/services/http/client"

export const useGetUserByEmail = (email: string | undefined) => {
    return useQuery<User | null>({
      queryFn: async () => {
        if (!email) return null
        const response = await client.get(`users/searchEmail/${email}`)
        if (!response.ok) {
          throw new Error('Network response was not ok')
        }
        return response.json()
      },
      queryKey: ['users', email],
      enabled: !!email, 
    })
  }