
import styled from 'styled-components'
import { useGetAllUsers } from '~/hooks/users/useGetAllUsers'
import { UserTable } from './Item'
import { useNavigate, useParams } from 'react-router-dom'
import { ROUTES } from '~/services/routing/Routes/constants'
import { useGetUser } from '~/hooks/users/useGetUser'
import { Spinner, SpinnerContainer } from '../spinner/item'


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
  background-color: #1b5e20;
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
    background-color: #2e7d32;
  }
`

export const Referees = () => {
  const { data, isLoading } = useGetAllUsers()
  const { userId } = useParams()
  
  if (!userId) {
    return <div>Error: no se ha proporcionado un ID de competición.</div>
  }

  const navigate = useNavigate()

  const handleClick = () => {
      navigate(`${ROUTES.ADMIN.replace(':userId', userId)}`)
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
        {data &&
          data.map((user) => (
            <UserTable key={user._id} userId={userId} editableUser={user}/>
          ))}
      </PageContainer>
    </div>
  )
}

