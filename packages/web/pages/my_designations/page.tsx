import { useNavigate, useParams } from 'react-router-dom'
import { MatchTable } from './Item'
import styled, { keyframes } from 'styled-components'
import { useGetMatchsOfUser } from '~/hooks/matchs/useGetMatchsOfUser'
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
const EmptyMessage = styled.h2`
  font-size: 2rem;
  color: #333;
  text-align: center;
  margin-top: 2rem;
  font-weight: bold;
`

const spin = keyframes`
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
`

const SpinnerContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
`

const Spinner = styled.div`
  border: 8px solid #f3f3f3; 
  border-top: 8px solid green; 
  border-radius: 50%;
  width: 60px;
  height: 60px;
  animation: ${spin} 1s linear infinite;
  margin-top: 5rem;
`

export const My_designations = () => {
  const { userId } = useParams()

  if (!userId) {
    return <div>Error: no se ha proporcionado un ID de competición.</div>
  }

  const { data, isLoading } = useGetMatchsOfUser(userId)
  const navigate = useNavigate()

  const handleClick = () => {
      navigate(`${ROUTES.HOME.replace(':userId', userId)}`)
  }

  if (isLoading) {
    return (
      <SpinnerContainer>
        <Spinner />
      </SpinnerContainer>
    )
  }

  return (
    <div>
      <ButtonContainer>
        <BackButton onClick={handleClick}>Volver</BackButton>
      </ButtonContainer>
      <PageContainer>
        {data && data.length > 0 ? (
          data.map((match) => (
            <MatchTable key={match._id} match={match} />
          ))
        ) : (
          <EmptyMessage>Todavía no tienes partidos designados!</EmptyMessage>
        )}
      </PageContainer>
    </div>
  )
}
