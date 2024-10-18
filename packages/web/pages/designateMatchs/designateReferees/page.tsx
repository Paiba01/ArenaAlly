import React, { useState } from 'react'
import styled from 'styled-components'
import { useNavigate, useParams } from 'react-router-dom'
import { ROUTES } from '~/services/routing/Routes/constants'
import { DesignateMatch } from '~/models/designateMatch'
import { useDesignateMatch } from '~/hooks/matchs/useDesignateMatch'

const PageContainer = styled.div`
  height: 90vh;
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
  margin-top: 8em;
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
`

const SelectGroup = styled.div`
  display: flex;
  justify-content: space-between;
  width: 60%;
  margin-top: 5rem;
  margin-bottom: 7rem;
`

const SmallSelect = styled.select`
  width: 30%;
  padding: 0.8rem;
  border-radius: 0.25rem;
  margin-right: 3rem;
  border-color: white;
  font-size: 1.2rem;
  color: white;
  cursor: pointer;
  background-color: #1fb16b;

  &::placeholder {
    color: #d1d1d1;
  }

  &:focus {
    outline: none;
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

export const DesignateReferees = () => {
  const { competitionId, matchId, userId } = useParams()

  if (!competitionId || !matchId || !userId) {
    return (
      <div>Error: No se han proporcionado un ID de competición, partido o usuario logueado.</div>
    )
  }

  const navigate = useNavigate()
  const editMatch = useDesignateMatch()

  const [matchData, setRefereeData] = useState<DesignateMatch>({
    id: matchId,
    referee1: '',
    referee2: ''
  })
  const [errors, setErrors] = useState<Record<string, boolean>>({})

  const handleSelect1Change = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setRefereeData({
      ...matchData,
      referee1: e.target.value,
    })
  }

  const handleSelect2Change = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setRefereeData({
      ...matchData,
      referee2: e.target.value,
    })
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
      ...matchData,
    }

    editMatch.mutate(match, {
      onSuccess: () => {
        console.log('Competición editada exitosamente')
        navigate(ROUTES.DESIGNATEMATCHS.replace(':competitionId', competitionId).replace(':userId', userId))
      },
      onError: (error) => {
        console.error('Error al editar la competición:', error)
      },
    })
  }

  const handleCancel = () => {
    setRefereeData({
      id: '',
      referee1: '',
      referee2: '',
    })

    navigate(ROUTES.DESIGNATEMATCHS.replace(':competitionId', competitionId).replace(':userId', userId))
  }

  return (
    <PageContainer>
      <EditCard>
        <EditText>Editor de partidos</EditText>
        <Separator />
        <SelectGroup>
          <SmallSelect
              name="referee1"
              value={matchData.referee1}
              onChange={handleSelect1Change}
          >
          </SmallSelect>
          <SmallSelect
              name="referee2"
              value={matchData.referee2}
              onChange={handleSelect2Change}
          >
          </SmallSelect>
        </SelectGroup>
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
