import styled from 'styled-components'
import { Competition } from '~/models/competition'
import EditIcon from 'shared/assets/icons/edit.svg?react'
import DeleteIcon from 'shared/assets/icons/delete.svg?react'
import ExcelIcon from 'shared/assets/icons/excel.svg?react'
import { useDeleteCompetition } from '~/hooks/competitions/useDeleteCompetition'
import { useState } from 'react'
import ConfirmationModal from './confirmationModal'
import { useNavigate } from 'react-router-dom'
import { ROUTES } from '~/services/routing/Routes/constants'
import { User } from '~/models/User'
import { exportFile } from '~/lib/exportFile'
import { jsonToCsvHref } from '~/lib/jsonToCsv'
import { useGetMatchsByCompetitionId } from '~/hooks/matchs/useGetMatchsById'
import { useGetAllUsers } from '~/hooks/users/useGetAllUsers'

const CenteredContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  margin-bottom: 1em;
`

const CompetitionCard = styled.div`
  background-color: white;
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

const RightColumn = styled.div`
  width: 25%;
  display: flex;
  justify-content: flex-end;
  align-items: center;
`

const Atributes = styled.span`
  font-size: 16px;
  margin-right: 2em;
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

export const CompetitionTable = ({
  competition,
  userData,
}: {
  competition: Competition
  userData: User
}) => {

  const navigate = useNavigate()
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false)

  const { data: users } = useGetAllUsers()
  const { data: matchs } = useGetMatchsByCompetitionId(competition._id)
  const deleteCompetition = useDeleteCompetition()

  const formatDate =  (dateString: string) => {
      const options: Intl.DateTimeFormatOptions = {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
      }
      return new Date(dateString).toLocaleDateString('es-ES', options)
    }
    
  const handleClick = () => {
    navigate(
      `${ROUTES.MATCHS.replace(':competitionId', competition._id).replace(
        ':userId',
        userData._id,
      )}`,
    )
  }

  const handleEditClick = () => {
    navigate(
      `${ROUTES.EDITCOMPETITIONS.replace(
        ':competitionId',
        competition._id,
      ).replace(':userId', userData._id)}`,
    )
  }

  const handleDeleteClick = () => {
    setIsDeleteModalOpen(true)
  }

  const handleConfirmDelete = () => {
    deleteCompetition.mutate(competition._id, {})
  }

  const handleCancelDelete = () => {
    setIsDeleteModalOpen(false)
  }

  const handleExportToCsv = () => {
    exportFile(
      jsonToCsvHref([
        { ...['Equipos', 'Categoria', 'Fecha', 'Árbitro', 'Árbitro'] },
        ...(matchs?.map((match) => ({
          ...[
            `${match.local} - ${match.visitor}`,
            competition.category,
            formatDate(match.day),
            users?.find((user) => user._id === match.referee1)?.name,
            users?.find((user) => user._id === match.referee2)?.name,
          ],
        })) ?? []),
      ]),
      `${competition.name}.csv`,
    )
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
                $backgroundColor="#00a91b"
                $hoverColor="#017714"
                onClick={handleExportToCsv}
              >
                <StyledIcon as={ExcelIcon} />
              </ActionButton>
              <ActionButton
                $backgroundColor="#e30000"
                $hoverColor="#c30101"
                onClick={handleDeleteClick}
                disabled={deleteCompetition.isPending}
              >
                <StyledIcon as={DeleteIcon} />
              </ActionButton>
            </RightColumn>
          )}
        </Elements>
      </CompetitionCard>
      <ConfirmationModal
        isOpen={isDeleteModalOpen}
        onClose={handleCancelDelete}
        onConfirm={handleConfirmDelete}
        title="Confirmar eliminación"
        description={`¿Estás seguro de que quieres eliminar la competición "${competition.name}"?`}
      />
    </CenteredContainer>
  )
}
