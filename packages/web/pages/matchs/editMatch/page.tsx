import React, { useState } from 'react'
import styled from 'styled-components'
import { useNavigate, useParams } from 'react-router-dom'
import { ROUTES } from '~/services/routing/Routes/constants'
import { useEditMatch } from '~/hooks/matchs/useEditMatch'

export type EditMatch = {
  day: string
}

const PageContainer = styled.div`
  height: 80vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  overflow: hidden;
`

const EditCard = styled.div`
  background-color: #1fb16b;
  border-radius: 0.5rem;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  padding: 3rem;
  margin-top: 2.5em;
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
  border-top: 2px solid white;
  margin-bottom: 2rem;
`

const SmallInput = styled.input<{ hasError?: boolean }>`
  width: 37%;
  padding: 0.8rem;
  margin-right: 3rem;
  border: 1px solid ${(props) => (props.hasError ? 'red' : '#ddd')};
  border-radius: 0.25rem;
  font-size: 1.2rem;
  color: white;
  margin-bottom: 5rem;
  margin-top: 5rem;

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

export const EditMatchs = () => {
  const { userId, competitionId, matchId } = useParams()

  if (!userId || !competitionId || !matchId) {
    return (
      <div>Error: No se han proporcionado un ID de competición, partido o usuario logueado.</div>
    )
  }

  const navigate = useNavigate()
  const editMatch = useEditMatch()
  const [matchData, setMatchData] = useState<EditMatch>({
    day: '',
  })
  const [errors, setErrors] = useState<Record<string, boolean>>({})

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setMatchData({
      ...matchData,
      [name]: value,
    })

    if (value) {
      setErrors((prev) => ({ ...prev, [name]: false }))
    }
  }

  const validateForm = (): boolean => {
    const newErrors: Record<string, boolean> = {}
    let isValid = true

    Object.entries(matchData).forEach(([key, value]) => {
      if (!value) {
        newErrors[key] = true
        isValid = false
      }
    })

    setErrors(newErrors)
    return isValid
  }

  const handleSubmit = () => {
    if (!validateForm()) {
      console.log('Formulario inválido. Por favor, complete todos los campos.')
      return
    }

    const match = {
      id: matchId,
      ...matchData,
      day: new Date(matchData.day).toISOString(),
    }

    editMatch.mutate(match, {
      onSuccess: () => {
        console.log('Competición editada exitosamente')
        navigate(
          ROUTES.MATCHS
            .replace(':userId', userId)
            .replace(':competitionId', competitionId)
        )
      },
      onError: (error) => {
        console.error('Error al editar la competición:', error)
      },
    })
  }

  const handleCancel = () => {
    setMatchData({
      day: '',
    })

    navigate(
      ROUTES.MATCHS
        .replace(':userId', userId)
        .replace(':competitionId', competitionId)
    )
  }

  return (
    <PageContainer>
      <EditCard>
        <EditText>Editor de partidos</EditText>
        <Separator />
        <SmallInput
          type="date"
          name="day"
          placeholder="Fecha"
          value={matchData.day}
          onChange={handleInputChange}
          onFocus={(e) => e.target.showPicker()}
          hasError={errors.day}
        />
        <br />
        <br />
        <Separator />

        <ButtonGroup>
          <CancelButton onClick={handleCancel}>Cancelar</CancelButton>
          <Button onClick={handleSubmit} disabled={editMatch.isPending}>
            {editMatch.isPending ? 'Editando...' : 'Editar partido'}
          </Button>
        </ButtonGroup>
      </EditCard>
    </PageContainer>
  )
}
