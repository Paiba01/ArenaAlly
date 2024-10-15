import styled from 'styled-components'
import { Competition } from '~/models/competition'
import EditIcon from 'shared/assets/icons/edit.svg?react'
import DeleteIcon from 'shared/assets/icons/delete.svg?react'
import { useDeleteCompetition } from '~/hooks/competitions/useDeleteCompetition'
import { useState } from 'react'
import ConfirmationModal from './confirmationModal'
import Toast from './toast'
import { useNavigate } from 'react-router-dom'
import { ROUTES } from '~/services/routing/Routes/constants'

const CenteredContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
`

const CompetitionCard = styled.div`
  background-color: #edf5e9;
  border-radius: 0.5rem;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  padding: 1.5rem;
  margin-bottom: 1em;
  width: 70%;
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
  margin-right: 4em;
`

const ActionButton = styled.button<{
  backgroundColor: string
  hoverColor: string
}>`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-right: 0.8rem;
  background-color: ${(props) => props.backgroundColor};
  color: white;
  border: none;
  padding: 0.5rem 1rem;
  border-radius: 0.25rem;
  cursor: pointer;

  &:hover {
    background-color: ${(props) => props.hoverColor};
  }
`

const StyledIcon = styled.svg`
  width: 20px;
  height: 20px;
  fill: white;
`

export const CompetitionTable = ({competition,}: {competition: Competition}) => {
  const deleteCompetition = useDeleteCompetition()
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false)
  const [showToast, setShowToast] = useState(false)

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
    deleteCompetition.mutate(competition._id, {
      onSuccess: () => {
        setIsDeleteModalOpen(false);
        setShowToast(true);

        setTimeout(() => setShowToast(false), 6000);
      },
    })
  }

  const handleCancelDelete = () => {
    setIsDeleteModalOpen(false)
  }

  const navigate = useNavigate(); 
  const handleClick = () => {
    navigate(`${ROUTES.MATCHS.replace(':competitionId', competition._id)}`); 
  };

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
          <RightColumn>
            <ActionButton backgroundColor="#e3e300" hoverColor="#cbcb14">
              <StyledIcon as={EditIcon} />
            </ActionButton>
            <ActionButton
              backgroundColor="#e30000"
              hoverColor="#c30101"
              onClick={handleDeleteClick}
              disabled={deleteCompetition.isPending}
            >
              <StyledIcon as={DeleteIcon} />
            </ActionButton>
          </RightColumn>
        </Elements>
      </CompetitionCard>
      <ConfirmationModal
          isOpen={isDeleteModalOpen}
          onClose={handleCancelDelete}
          onConfirm={handleConfirmDelete}
          title="Confirmar eliminación"
          description={`¿Estás seguro de que quieres eliminar la competición "${competition.name}"?`}
        />
        {showToast && (
          <Toast message="La competición ha sido borrada" type="success" duration={6000} />
        )}
    </CenteredContainer>
  )
}
