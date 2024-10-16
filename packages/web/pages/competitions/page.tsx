import { useGetCompetitions } from '~/hooks/competitions/useGetCompetitions'
import styled from 'styled-components'
import { CompetitionTable } from './Item'
import { useNavigate } from 'react-router-dom'
import { ROUTES } from '~/services/routing/Routes/constants'

const PageContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  margin-top: 4em;
`

const ButtonContainer = styled.div`
  width: 85%;
  display: flex;
  justify-content: space-between; /* Coloca los botones en los extremos */
  margin-bottom: 2rem;
  padding: 0 10rem; /* Ajusta el padding para separar un poco más los botones */
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
  margin-left: 7rem;
  padding: 1rem;

  &:hover {
    background-color: #480177;
  }
`

const CreateButton = styled.button`
  background-color: #003787;
  color: white;
  border: none;
  padding: 0.5rem 1rem;
  border-radius: 0.4rem;
  font-size: 22px;
  cursor: pointer;
  margin-top: 5rem;
  padding: 1rem;

  &:hover {
    background-color: #002459;
  }
`

export const Competitions = () => {
  const { data, isLoading } = useGetCompetitions()
  const navigate = useNavigate()

  const handleClick = () => {
    navigate(ROUTES.CREATECOMPETITIONS)
  }

  const handleBackClick = () => {
    navigate(ROUTES.COMPETITIONS)
  }

  if (isLoading) return <>Cargando...</>

  return (
    <div>
      <ButtonContainer>
        <BackButton onClick={handleBackClick}>Volver</BackButton>
        <CreateButton onClick={handleClick}>Crear competición</CreateButton>
      </ButtonContainer>
      <PageContainer>
        {data &&
          data.map((competition) => (
            <CompetitionTable key={competition._id} competition={competition} />
          ))}
      </PageContainer>
    </div>
  )
}
