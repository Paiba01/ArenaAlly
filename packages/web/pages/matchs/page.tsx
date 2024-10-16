import styled from 'styled-components'
import { useGetMatchsByCompetitionId } from '~/hooks/matchs/useGetMatchsById'
import { MatchTable } from './Item'
import { useNavigate, useParams } from 'react-router-dom';
import { ROUTES } from '~/services/routing/Routes/constants';

const PageContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  margin-top: 2em;

`

const ButtonContainer = styled.div`
  width: 100%;
  display: flex;
  justify-content: left; 
  margin-bottom: 1rem;
`

const BackButton = styled.button`
  background-color: #6500a7;
  color: white;
  border: none;
  padding: 0.5rem 1rem;
  border-radius: 0.40rem;
  font-size: 22px;
  cursor: pointer;
  margin-top: 5rem;
  margin-left: 17rem;
  padding: 1rem;
 
  &:hover {
    background-color: #480177;
  }
`

export const Matchs = () => {
  const { competitionId } = useParams();
  if (!competitionId) {
    return <div>Error: no se ha proporcionado un ID de competición.</div>;
  }

  const navigate = useNavigate()

  const handleClick = () => {
      navigate(ROUTES.COMPETITIONS)
  }

  const { data, isLoading } = useGetMatchsByCompetitionId(competitionId)

  if (isLoading) return <>Cargando...</>

  return (
    <div>
      <ButtonContainer>
        <BackButton onClick={handleClick}>Volver</BackButton>
      </ButtonContainer>
      <PageContainer>
        {data &&
          data.map((match) => (
            <MatchTable key={match._id} match={match} />
          ))}
      </PageContainer>
    </div>
  )
}
