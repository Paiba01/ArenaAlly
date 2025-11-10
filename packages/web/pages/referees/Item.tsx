import React, { useState } from 'react'
import styled from 'styled-components'
import EditIcon from 'shared/assets/icons/edit.svg?react'
import isActiveIcon from 'shared/assets/icons/isActive.svg?react'
import { User } from '~/models/User'
import { useEditUser } from '~/hooks/users/useEditUser'
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

const Atributes = styled.span`
  font-size: 16px;
  margin-right: 4em;
`

const StatusIndicator = styled.span<{ isActive: boolean }>`
  color: ${(props) => (props.isActive ? 'green' : 'red')};
  font-weight: bold;
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

export const UserTable= ({
  userId,
  editableUser,
}: {
  userId: string,
  editableUser: User,
}) => {
  const statusColor = editableUser.isActive ? 'green' : 'red'
  const editUser = useEditUser()

  const [userData, setUserData] = useState({
    name: editableUser.name,
    email: editableUser.email,
    password: editableUser.password,
    isActive: editableUser.isActive,
    isAdmin: editableUser.isAdmin,
  })

  const handleActive = () => {
    const updatedUser = {
      id: editableUser._id,
      ...userData,
      isActive: !userData.isActive, 
    }

    editUser.mutate(updatedUser, {
      onSuccess: () => {
        console.log('Usuario editado exitosamente')
        setUserData((prev) => ({
          ...prev,
          isActive: !prev.isActive,
        }))
      },
      onError: (error) => {
        console.error('Error al editar el usuario:', error)
      },
    })
  }

  const navigate = useNavigate()
  const handleEditClick = () => {
    navigate(
      ROUTES.EDITREFEREE
      .replace(':userId', userId)
      .replace(':editableUserId', editableUser._id)
    )
  }

  return (
    <CenteredContainer>
      <CompetitionCard>
        <Elements>
          <LeftColumn>
            <Name>{editableUser.name}</Name>
            <p>
              <Atributes>Correo: {editableUser.email}</Atributes>
            </p>
          </LeftColumn>
          <RightColumn>
            <ActionButton
              $backgroundColor={statusColor}
              $hoverColor={userData.isActive ? '#00a000' : '#bd0000'}
              onClick={handleActive}
            >
              <StyledIcon as={isActiveIcon} />
            </ActionButton>
            <ActionButton $backgroundColor="#e3e300" $hoverColor="#cbcb14" onClick={handleEditClick}>
              <StyledIcon as={EditIcon} />
            </ActionButton>
          </RightColumn>
        </Elements>
      </CompetitionCard>
    </CenteredContainer>
  )
}
