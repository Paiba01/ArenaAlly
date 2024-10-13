import styled from 'styled-components'

import { useGetMatchsByCompetitionId } from '~/hooks/matchs/useGetMatchsById'
import { MatchTable } from './Item'


const PageContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  margin-top: 2em;
`
const competitionId = '61c69dd6-ad52-446a-8b98-4038153ea401'

export const Matchs = () => {
  const { data, isLoading } = useGetMatchsByCompetitionId(competitionId)
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
