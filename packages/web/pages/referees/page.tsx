
import styled from 'styled-components'
import { useGetUsers } from '~/hooks/users/useGetAllUsers'
import { UserTable } from './Item'


const PageContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  margin-top: 2em;
`

const userId = "384a1414-9667-4547-b68b-b4219903c47e"

export const Referees = () => {
  const { data, isLoading } = useGetUsers()
  const isAdmin = !data

  if (isLoading) return <>Cargando...</>

  return (
    <div className="container mx-auto px-4 py-8">
      <PageContainer>
        {data &&
          data.map((user) => (
            <UserTable key={user._id} user={user} />
          ))}
      </PageContainer>
    </div>
  )
}

