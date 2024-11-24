import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import { useNavigate, useParams } from 'react-router-dom'
import { ROUTES } from '~/services/routing/Routes/constants'
import { useEditCompetition } from '~/hooks/competitions/useEditCompetitions'
import { useGetUser } from '~/hooks/users/useGetUser'
import { useEditUser } from '~/hooks/users/useEditUser'
import { WriteUser } from '~/models/writeUser'
import { User } from '~/models/User'

export type EditCompetition = {
  name: string
  category: string
  dateFrom: string
  dateTo: string
}

const PageContainer = styled.div`
  height: 80vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  overflow: hidden !important;
`

const EditCard = styled.div`
  background-color: #1fb16b;
  border-radius: 0.5rem;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  padding: 3rem;
  margin-top: 2rem;
  width: 60%;
  height: 65%;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
`

const EditText = styled.span`
  font-size: 3rem;
  color: white;
  margin-bottom: 1.5rem;
  align-self: center;
`

const Separator = styled.hr`
  width: 100%;
  border: 0;
  border-top: 2px solid white; /* Línea blanca */
  margin-bottom: 4rem;
  margin-top: 2rem;
`

const InputGroup = styled.div`
  display: flex;
  justify-content: space-between;
  width: 90%;
  margin-bottom: 2rem;
`

const SmallInput = styled.input<{ hasError?: boolean }>`
  width: 37%;
  padding: 0.8rem;
  margin-right: 3rem;
  border: 1px solid ${props => props.hasError ? 'red' : '#ddd'};
  border-radius: 0.25rem;
  font-size: 1.2rem;
  color: white;

  &::placeholder {
    color: #d1d1d1;
  }

  &::-webkit-calendar-picker-indicator {
    filter: invert(1);
  }

  &::selection {
    background-color: #006400;
  }

  &::-webkit-datetime-edit-fields-wrapper {
    &::selection {
      background-color: #006400;
    }
  }
`

const ButtonGroup = styled.div`
  display: flex;
  justify-content: space-between;
  width: 80%;
`

const Button = styled.button`
  width: 50%;
  padding: 0.8rem;
  background-color: #00389bd1;
  color: white;
  border: none;
  border-radius: 0.25rem;
  font-size: 1.2rem;
  cursor: pointer;

  &:hover {
    background-color: #00276dd1;
  }
`

const CancelButton = styled.button`
  width: 25%;
  padding: 0.8rem;
  background-color: #ff4d4d;
  color: white;
  border: none;
  border-radius: 0.25rem;
  font-size: 1.2rem;
  cursor: pointer;

  &:hover {
    background-color: #ff1a1a;
  }
`

export const EditReferee = () => {
  const { userId, editableUserId } = useParams()
  const navigate = useNavigate()
  const { data: userData, isLoading, isError } = useGetUser(editableUserId)
  const editUser = useEditUser()

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    isActive: false,
    isAdmin: false,
  })

  const [errors, setErrors] = useState<Record<string, boolean>>({})

  useEffect(() => {
    if (userData) {
      setFormData({
        name: userData.name,
        email: userData.email,
        password: '',
        isActive: userData.isActive,
        isAdmin: userData.isAdmin,
      })
    }
  }, [userData])

  if (!userId || !editableUserId) {
    return <div>Error: no se ha proporcionado un ID del usuario o usuario logueado.</div>
  }

  if (isLoading) {
    return <div>Cargando...</div>
  }

  if (isError || !userData) {
    return <div>Error: no se ha obtenido el usuario.</div>
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData({
      ...formData,
      [name]: value,
    })

    if (value) {
      setErrors((prev) => ({ ...prev, [name]: false }))
    }
  }

  const handleSubmit = () => {
    const user = {
      id: editableUserId,
      name: formData.name,
      email: formData.email,
      password: formData.password || userData.password,
      isActive: formData.isActive,
      isAdmin: formData.isAdmin,
    }

    editUser.mutate(user, {
      onSuccess: () => {
        console.log('Usuario editado exitosamente')
        navigate(ROUTES.REFEREES.replace(':userId', userId))
      },
      onError: (error) => {
        console.error('Error al editar el usuario:', error)
      },
    })
  }

  const handleCancel = () => {
    navigate(ROUTES.REFEREES.replace(':userId', userId))
  }

  return (
    <PageContainer>
      <EditCard>
        <EditText>Editar usuario</EditText>
        <Separator />
        <InputGroup>
          <SmallInput
            name="name"
            placeholder="Nombre"
            value={formData.name}
            onChange={handleInputChange}
            hasError={errors.name}
          />
          <SmallInput
            name="email"
            placeholder="Email"
            value={formData.email}
            onChange={handleInputChange}
            hasError={errors.email}
          />
        </InputGroup>
        <InputGroup>
          <SmallInput
            type='password'
            name="password"
            placeholder="Contraseña"
            value={formData.password}
            onChange={handleInputChange}
            hasError={errors.password}
          />
        </InputGroup>
        <Separator />
        <ButtonGroup>
          <CancelButton onClick={handleCancel}>Cancelar</CancelButton>
          <Button onClick={handleSubmit} disabled={editUser.isPending}>
            {editUser.isPending ? 'Editando...' : 'Editar usuario'}
          </Button>
        </ButtonGroup>
      </EditCard>
    </PageContainer>
  )
}
