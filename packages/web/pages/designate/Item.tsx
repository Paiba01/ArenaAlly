import styled from 'styled-components'
import { Competition } from '~/models/competition'
import { useNavigate } from 'react-router-dom'
import { ROUTES } from '~/services/routing/Routes/constants'
import { User } from '~/models/User'

const CenteredContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  margin-bottom: 1em;
`

const CompetitionCard = styled.div`
  background-color: #edf5e9;
  border-radius: 0.5rem;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  padding: 1.5rem;
  margin-bottom: 1em;
  width: 90%;
`

const Name = styled.div`
  font-size: 22px;
  font-weight: bold;
  text-transform: uppercase;
  margin-bottom: 0.5rem;
  margin-bottom: 1em;
`
const Elements = styled.div`
  display: flex;
  justify-content: space-between;
`

const LeftColumn = styled.button`
  width: 75%;
  text-align: left;
  cursor: pointer;
`

const Atributes = styled.span`
  font-size: 16px;
  margin-right: 3em;
`

export const CompetitionTable = ({
  competition,
  userData
}: {
  competition: Competition,
  userData: User
}) => {

  const navigate = useNavigate()

  const formatDate = (dateString: string) => {
    const options: Intl.DateTimeFormatOptions = {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    }
    return new Date(dateString).toLocaleDateString('es-ES', options)
  }


  const handleClick = () => {
    navigate(`${ROUTES.DESIGNATEMATCHS
      .replace(':competitionId', competition._id)
      .replace(':userId', userData._id)}`)
  }

  return (
    <CenteredContainer>
      <CompetitionCard>
        <Elements>
          <LeftColumn onClick={handleClick}>
            <Name>{competition.name}</Name>
            <p>
              <Atributes>
                Categoría: <b>{competition.category}</b>
              </Atributes>
              <Atributes>||</Atributes>
              <Atributes>
                Fecha de inicio: {formatDate(competition.dateFrom)}
              </Atributes>
              <Atributes>||</Atributes>
              <Atributes>
                Fecha de fin: {formatDate(competition.dateTo)}
              </Atributes>
            </p>
          </LeftColumn>
        </Elements>
      </CompetitionCard>
    </CenteredContainer>
  )
}
