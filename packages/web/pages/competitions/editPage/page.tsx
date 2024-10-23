import React, { useState } from 'react'
import styled from 'styled-components'
import { useNavigate, useParams } from 'react-router-dom'
import { ROUTES } from '~/services/routing/Routes/constants'
import { useEditCompetition } from '~/hooks/competitions/useEditCompetitions'

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
  overflow: hidden;
`

const EditCard = styled.div`
  background-color: #1fb16b;
  border-radius: 0.5rem;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  padding: 3rem;
  margin-top: 2.5rem;
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

const SmallSelect = styled.select<{ hasError?: boolean }>`
  width: 40%;
  padding: 0.8rem;
  border-radius: 0.25rem;
  margin-right: 3rem;
  border: 1px solid ${props => props.hasError ? 'red' : 'white'};
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

export const EditCompetitions = () => {
  const { competitionId } = useParams()
  const { userId } = useParams()

  const navigate = useNavigate()
  const editCompetition = useEditCompetition()
  const [competitionData, setCompetitionData] = useState<EditCompetition>({
    name: '',
    category: '',
    dateFrom: '',
    dateTo: '',
  })
  const [errors, setErrors] = useState<Record<string, boolean>>({})

  if (!competitionId) {
    return <div>Error: no se ha proporcionado un ID de competición.</div>
  }

  if (!userId) {
    return <div>Error: no se ha proporcionado un ID de competición.</div>
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setCompetitionData({
      ...competitionData,
      [name]: value,
    })

    if (value) {
      setErrors((prev) => ({ ...prev, [name]: false }))
    }
  }

  const handleSelectChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setCompetitionData({
      ...competitionData,
      category: e.target.value,
    })
    
    if (e.target.value) {
      setErrors((prev) => ({ ...prev, category: false }))
    }
  }

  const validateForm = (): boolean => {
    const newErrors: Record<string, boolean> = {}
    let isValid = true

    Object.entries(competitionData).forEach(([key, value]) => {
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

    const competition = {
      id: competitionId,
      ...competitionData,
      dateFrom: new Date(competitionData.dateFrom).toISOString(),
      dateTo: new Date(competitionData.dateTo).toISOString(),
    }

    editCompetition.mutate(competition, {
      onSuccess: () => {
        console.log('Competición editada exitosamente')
        navigate(`${ROUTES.COMPETITIONS.replace(':userId', userId)}`)
      },
      onError: (error) => {
        console.error('Error al editar la competición:', error)
      },
    })
  }

  const handleCancel = () => {
    setCompetitionData({
      name: '',
      category: '',
      dateFrom: '',
      dateTo: '',
    })

    navigate(`${ROUTES.COMPETITIONS.replace(':userId', userId)}`)
  }

  return (
    <PageContainer>
      <EditCard>
        <EditText>Editor de competición</EditText>
        <Separator />
        <InputGroup>
          <SmallInput
            name="name"
            placeholder="Nombre de la competición"
            value={competitionData.name}
            onChange={handleInputChange}
            hasError={errors.name}
          />
          <SmallSelect
            name="category"
            value={competitionData.category}
            onChange={handleSelectChange}
            hasError={errors.category}
          >
            <option value="" disabled>
              Selecciona la categoría
            </option>
            <option value="ALEVIN">ALEVIN</option>
            <option value="INFANTIL">INFANTIL</option>
            <option value="CADETE">CADETE</option>
            <option value="JUVENIL">JUVENIL</option>
            <option value="SENIOR">SENIOR</option>
          </SmallSelect>
        </InputGroup>

        <InputGroup>
          <SmallInput
            type="date"
            name="dateFrom"
            placeholder="Fecha de inicio"
            value={competitionData.dateFrom}
            onChange={handleInputChange}
            onFocus={(e) => e.target.showPicker()}
            hasError={errors.dateFrom}
          />
          <SmallInput
            type="date"
            name="dateTo"
            placeholder="Fecha de fin"
            value={competitionData.dateTo}
            onChange={handleInputChange}
            onFocus={(e) => e.target.showPicker()}
            hasError={errors.dateTo}
          />
        </InputGroup>

        <Separator />
        <ButtonGroup>
          <CancelButton onClick={handleCancel}>Cancelar</CancelButton>
          <Button onClick={handleSubmit} disabled={editCompetition.isPending}>
            {editCompetition.isPending ? 'Editando...' : 'Editar competición'}
          </Button>
        </ButtonGroup>
      </EditCard>
    </PageContainer>
  )
}
