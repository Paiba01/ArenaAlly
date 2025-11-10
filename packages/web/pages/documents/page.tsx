import styled from 'styled-components'
import { Item } from './Item'
import { useTranslation } from 'react-i18next'
import { useParams, useNavigate } from 'react-router-dom'
import { ROUTES } from '~/services/routing/Routes/constants'

const Container = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  height: 100%;
`

const LeftColumn = styled.div`
  height: 100%;
  position: relative;
  overflow: hidden;
`

const RightColumn = styled.div`
  display: grid;
  grid-template-rows: 1fr 1fr;
`

const ButtonContainer = styled.div`
  position: absolute;
  z-index: 10;
  margin-left: 5rem;
  margin-top: 5rem;
`

const BackButton = styled.button`
  background-color: #1b5e20;
  color: white;
  border: none;
  padding: 1rem 1.5rem;
  border-radius: 0.40rem;
  font-size: 22px;
  height: 100%;
  cursor: pointer;

  &:hover {
    background-color: #2e7d32;
  }
`

export const Documents = () => {
  const { userId } = useParams()
  const navigate = useNavigate()

  if (!userId) {
    return <div>Error: no se ha proporcionado un ID de competición.</div>
  }

  const handleBackClick = () => {
    navigate(`${ROUTES.HOME.replace(':userId', userId)}`)
  }

  return (
    <Container>
      <LeftColumn>
        <ButtonContainer>
          <BackButton onClick={handleBackClick}>Volver</BackButton>
        </ButtonContainer>
        <Item
          color=""
          label={""}
          image="/images/rules.png"
          documentPath="/documents/Reglamento2022.pdf"
        />
      </LeftColumn>
      <RightColumn>
        <Item
          color="aquamarine"
          label={"Plantilla exclusión"}
          image="/images/2min.png"
          documentPath="/documents/2min.pdf"
        />
        <Item
          color="darkcyan"
          label={"Jugador lesionado"}
          image="/images/issue.png"
          documentPath="/documents/lesionado.pdf"
        />
      </RightColumn>
    </Container>
  )
}