import { useGetCompetitions } from '~/hooks/competitions/useGetCompetitions'
import styled from 'styled-components'
import { CompetitionTable } from './Item'
import { useNavigate, useParams } from 'react-router-dom'
import { ROUTES } from '~/services/routing/Routes/constants'
import { useGetUser } from '~/hooks/users/useGetUser'

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

export const Designate = () => {
  const { userId } = useParams()
  const navigate = useNavigate()

  if (!userId) {
    return <div>Error: no se ha proporcionado un ID de competición.</div>
  }

  const { data: userData, isLoading: isUserLoading, error: userError } = useGetUser(userId);
  const { data, isLoading } = useGetCompetitions()

  if (!userData) {
    return <div>Error: no se ha proporcionado un ID de usuario.</div>
  }

  const handleBackClick = () => {
    if(userData?.isAdmin == false){
      navigate(`${ROUTES.HOME.replace(':userId', userData._id)}`)
    }else{
      navigate(`${ROUTES.ADMIN.replace(':userId', userData._id)}`)
    }
  }

  if (isLoading) return <>Cargando...</>

  return (
    <div>
      <ButtonContainer>
        <BackButton onClick={handleBackClick}>Volver</BackButton>
      </ButtonContainer>
      <PageContainer>
        {data &&
          data.map((competition) => (
            <CompetitionTable key={competition._id} competition={competition} userData={userData}/>
          ))}
      </PageContainer>
    </div>
  )
}
