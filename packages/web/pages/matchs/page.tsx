import styled from 'styled-components'
import { useGetMatchsByCompetitionId } from '~/hooks/matchs/useGetMatchsById'
import { MatchTable } from './Item'
import { useParams } from 'react-router-dom';

const PageContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  margin-top: 2em;

`

export const Matchs = () => {
  const { competitionId } = useParams();
  if (!competitionId) {
    return <div>Error: no se ha proporcionado un ID de competición.</div>;
  }

  const { data, isLoading } = useGetMatchsByCompetitionId(competitionId)

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
