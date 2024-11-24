import styled from 'styled-components'
import { Competition } from '~/models/competition'
import EditIcon from 'shared/assets/icons/edit.svg?react'
import DeleteIcon from 'shared/assets/icons/delete.svg?react'
import { Match } from '~/models/match'
import { useGetUser } from '~/hooks/users/useGetUser'
import { useState } from 'react'
import ConfirmationModal from '../competitions/confirmationModal'
import { useDeleteMatch } from '~/hooks/matchs/useDeleteMatch'
import { useNavigate } from 'react-router-dom'
import { ROUTES } from '~/services/routing/Routes/constants'
import { User } from '~/models/User'

const CenteredContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
`

const MatchCard = styled.div`
  background-color: white;
  border-radius: 0.5rem;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  padding: 1.5rem;
  margin-bottom: 1em;
  width: 90%;
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
const ActionButton = styled.button<{
  $backgroundColor: string
  $hoverColor: string
}>`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-right: 0.8rem;
  background-color: ${(props) => props.$backgroundColor};
  color: white;
  border: none;
  padding: 0.5rem 1rem;
  border-radius: 0.25rem;
  cursor: pointer;

  &:hover {
    background-color: ${(props) => props.$hoverColor};
  }
`

const StyledIcon = styled.svg`
  width: 20px;
  height: 20px;
  fill: white;
`

export const MatchTable = ({
  match,
  userData,
}: {
  match: Match
  userData: User
}) => {
  const { data: referee1Data, isLoading: isLoadingReferee1 } = useGetUser(
    match?.referee1 ?? '',
  )
  const { data: referee2Data, isLoading: isLoadingReferee2 } = useGetUser(
    match?.referee2 ?? '',
  )
  const deleteMatch = useDeleteMatch()
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false)

  const formatDate = (dateString: string) => {
    const options: Intl.DateTimeFormatOptions = {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    }
    return new Date(dateString).toLocaleDateString('es-ES', options)
  }

  const handleDeleteClick = () => {
    setIsDeleteModalOpen(true)
  }

  const handleConfirmDelete = () => {
    deleteMatch.mutate(match._id, {})
  }

  const handleCancelDelete = () => {
    setIsDeleteModalOpen(false)
  }
  const navigate = useNavigate()

  const handleEditClick = () => {
    navigate(
      ROUTES.EDITMATCHS.replace(':userId', userData._id)
        .replace(':competitionId', match.competitionId)
        .replace(':matchId', match._id),
    )
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
          {userData?.isAdmin && (
            <RightColumn>
              <ActionButton
                $backgroundColor="#e3e300"
                $hoverColor="#cbcb14"
                onClick={handleEditClick}
              >
                <StyledIcon as={EditIcon} />
              </ActionButton>
              <ActionButton
                $backgroundColor="#e30000"
                $hoverColor="#c30101"
                onClick={handleDeleteClick}
                disabled={deleteMatch.isPending}
              >
                <StyledIcon as={DeleteIcon} />
              </ActionButton>
            </RightColumn>
          )}
        </Elements>
      </MatchCard>
      <ConfirmationModal
        isOpen={isDeleteModalOpen}
        onClose={handleCancelDelete}
        onConfirm={handleConfirmDelete}
        title="Confirmar eliminación"
        description={`¿Estás seguro de que quieres eliminar este partido?`}
      />
    </CenteredContainer>
  )
}
