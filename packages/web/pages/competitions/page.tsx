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
  margin-top: 2em;
`

const ButtonContainer = styled.div`
  width: 100%;
  display: flex;
  justify-content: flex-end; /* Esto alinea el botón a la derecha */
  margin-bottom: 1rem;
`

const CreateButton = styled.button`
  background-color: #003787;
  color: white;
  border: none;
  padding: 0.5rem 1rem;
  border-radius: 0.40rem;
  font-size: 22px;
  cursor: pointer;
  margin-top: 5rem;
  margin-right: 10rem;
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
  
  if (isLoading) return <>Cargando...</>

  return (
    <div>
      <ButtonContainer>
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
