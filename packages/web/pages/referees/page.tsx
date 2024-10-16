
import styled from 'styled-components'
import { useGetUsers } from '~/hooks/users/useGetAllUsers'
import { UserTable } from './Item'
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

export const Referees = () => {
  const { data, isLoading } = useGetUsers()

  const navigate = useNavigate()

  const handleClick = () => {
      navigate(ROUTES.ADMIN)
  }

  if (isLoading) return <>Cargando...</>

  return (
    <div>
      <ButtonContainer>
        <BackButton onClick={handleClick}>Volver</BackButton>
      </ButtonContainer>
      <PageContainer>
        {data &&
          data.map((user) => (
            <UserTable key={user._id} user={user} />
          ))}
      </PageContainer>
    </div>
  )
}

