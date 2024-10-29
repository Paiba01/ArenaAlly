import styled from 'styled-components'
import { Competition } from '~/models/competition'
import EditIcon from 'shared/assets/icons/edit.svg?react'
import DeleteIcon from 'shared/assets/icons/delete.svg?react'
import { Match } from '~/models/match'
import { useGetUser } from '~/hooks/users/useGetUser'

const CenteredContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
`

const MatchCard = styled.div`
  background-color: #edf5e9;
  border-radius: 0.5rem;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  padding: 1.5rem;
  margin-bottom: 1em;
  width: 70%;
`

const Teams = styled.div`
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

const LeftColumn = styled.div`
  width: 75%;
`

const RightColumn = styled.div`
  width: 25%;
  display: flex;
  justify-content: flex-end;
  align-items: center;
`
const AtributesDate = styled.span`
  margin-right: 4em;
  margin-top: 2em !important;
  margin-bottom: 1em; 
  font-size: 19px;
  display: block;
`

const Atributes = styled.span`
  margin-right: 4em;
  margin-bottom: 1em;
  font-size: 18px;
  
`


export const MatchTable = ({ match }: { match: Match }) => {
  const { data: referee1Data, isLoading: isLoadingReferee1 } = useGetUser(
    match?.referee1 ?? '',
  )
  const { data: referee2Data, isLoading: isLoadingReferee2 } = useGetUser(
    match?.referee2 ?? '',
  )

  const formatDate = (dateString: string) => {
    const options: Intl.DateTimeFormatOptions = {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    }
    return new Date(dateString).toLocaleDateString('es-ES', options)
  }

  return (
    <CenteredContainer>
      <MatchCard>
        <Elements>
          <LeftColumn>
            <Teams>
              {match.local} - {match.visitor}{' '}
            </Teams>
            <AtributesDate>Fecha: {formatDate(match.day)}</AtributesDate>
            <p>
              <Atributes>Arbitro: {referee1Data?.name}</Atributes>
              <Atributes>||</Atributes>
              <Atributes>Arbitro: {referee2Data?.name}</Atributes>
            </p>
          </LeftColumn>
          <RightColumn/>
        </Elements>
      </MatchCard>
    </CenteredContainer>
  )
}
