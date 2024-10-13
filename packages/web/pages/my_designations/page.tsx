import { MatchTable } from './Item'
import styled from 'styled-components'
import { useGetMatchsOfUser } from '~/hooks/matchs/useGetMatchsOfUser'



const PageContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  margin-top: 2em;
`

const userId = "384a1414-9667-4547-b68b-b4219903c47e"

export const My_designations = () => {
  const { data, isLoading } = useGetMatchsOfUser(userId)
  const isAdmin = !data

  if (isLoading) return <>Cargando...</>

  return (
    <div className="container mx-auto px-4 py-8">
      <PageContainer>
        {data &&
          data.map((match) => (
            <MatchTable key={match._id} match={match} />
          ))}
      </PageContainer>
    </div>
  )
}
