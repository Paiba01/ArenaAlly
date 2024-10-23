import React, { useState } from 'react'
import { v4 as uuidv4 } from 'uuid'
import styled from 'styled-components'
import { useNavigate, useParams } from 'react-router-dom'
import { ROUTES } from '~/services/routing/Routes/constants'
import { useCreateCompetition } from '~/hooks/competitions/useCreateCompetition'

export type CreateCompetition = {
  name: string
  category: string
  teams: string[]
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

const CreateCard = styled.div`
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

const CreateText = styled.span`
  font-size: 3rem;
  color: white;
  margin-bottom: 1.5rem;
  align-self: center;
`

const Separator = styled.hr`
  width: 100%;
  border: 0;
  border-top: 2px solid white; /* Línea blanca */
  margin-bottom: 3rem;
`

const InputGroup = styled.div`
  display: flex;
  justify-content: space-between;
  width: 90%;
  margin-bottom: 2rem;
`

const SmallInput = styled.input`
  width: 37%; 
  padding: 0.8rem;
  margin-right: 3rem;
  border: 1px solid #ddd;
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

const SmallSelect = styled.select`
  width: 40%;
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

const Input = styled.input`
  width: 84%;
  padding: 0.8rem;
  margin-right: 3rem;
  margin-bottom: 2.5rem;
  border: 1px solid #ddd;
  border-radius: 0.25rem;
  font-size: 1.2rem;
  color: white;

  &::placeholder {
    color: #d1d1d1;
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

export const CreateCompetitions = () => {
  const navigate = useNavigate()
  const { userId } = useParams()

  const createCompetition = useCreateCompetition()
  const [competitionData, setCompetitionData] = useState<CreateCompetition>({
    name: '',
    category: '',
    teams: [],
    dateFrom: '',
    dateTo: '',
  })

  if (!userId) {
    return <div>Error: no se ha proporcionado un ID de competición.</div>
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setCompetitionData({
      ...competitionData,
      [name]: value,
    })
  }

  const handleSelectChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setCompetitionData({
      ...competitionData,
      category: e.target.value,
    })
  }

  const handleSubmit = () => {
    const competition = {
      id: uuidv4(),
      ...competitionData,
      dateFrom: new Date(competitionData.dateFrom).toISOString(),
      dateTo: new Date(competitionData.dateTo).toISOString(),
    }

    createCompetition.mutate(competition, {
      onSuccess: () => {
        console.log('Competición creada exitosamente')
        navigate(`${ROUTES.COMPETITIONS.replace(':userId', userId)}`)
      },
      onError: (error) => {
        console.error('Error al crear la competición:', error)
      }
    })
  }

  const handleCancel = () => {
    setCompetitionData({
      name: '',
      category: '',
      teams: [],
      dateFrom: '',
      dateTo: '',
    })

    navigate(`${ROUTES.COMPETITIONS.replace(':userId', userId)}`)
  }

  return (
    <PageContainer>
      <CreateCard>
        <CreateText>Creación de competición</CreateText>
        <Separator />
        <InputGroup>
          <SmallInput
            name="name"
            placeholder="Nombre de la competición"
            value={competitionData.name}
            onChange={handleInputChange}
          />
          <SmallSelect
            name="category"
            value={competitionData.category}
            onChange={handleSelectChange}
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
            />
          <SmallInput
            type="date"
            name="dateTo"
            placeholder="Fecha de fin"
            value={competitionData.dateTo}
            onChange={handleInputChange}
            onFocus={(e) => e.target.showPicker()}
          />
        </InputGroup>

        <Input
          name="Teams"
          placeholder="Equipos (separados por comas)"
          value={competitionData.teams.join(',')}
          onChange={(e) =>
            setCompetitionData({
              ...competitionData,
              teams: e.target.value.split(','),
            })
          }
        />
        <Separator />
        <ButtonGroup>
          <CancelButton onClick={handleCancel}>Cancelar</CancelButton>
          <Button onClick={handleSubmit} disabled={createCompetition.isPending}>
            {createCompetition.isPending ? 'Creando...' : 'Crear competición'}
          </Button>
        </ButtonGroup>
      </CreateCard>
    </PageContainer>
  )
}
