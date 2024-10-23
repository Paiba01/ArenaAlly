import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import { useNavigate, useParams } from 'react-router-dom'
import { ROUTES } from '~/services/routing/Routes/constants'
import { DesignateMatch } from '~/models/designateMatch'
import { useDesignateMatch } from '~/hooks/matchs/useDesignateMatch'
import { useGetActiveUsers } from '~/hooks/users/useGetActiveusers'

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
  height: 60%;
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
  margin-bottom: 2rem;
`

const SelectGroup = styled.div`
  display: flex;
  justify-content: space-between;
  width: 60%;
  margin-top: 5rem;
  margin-bottom: 7rem;
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

const ErrorText = styled.div`
  color: #ff0000;
  font-size: 1rem;
  margin-top: 0.5rem;
  align-self: center;
`

const ErrorSelect = styled(SmallSelect)<{ hasError: boolean }>`
  ${({ hasError }) => hasError && `
    border: 2px solid #ff0000;
  `}
`

export const DesignateReferees: React.FC = () => {
  const { competitionId, matchId, userId } = useParams<{ competitionId: string; matchId: string; userId: string }>()
  const navigate = useNavigate()
  const editMatch = useDesignateMatch()
  const { data: activeUsers, isLoading, isError } = useGetActiveUsers()

  const [matchData, setMatchData] = useState<DesignateMatch>({
    id: matchId || '',
    referee1: '',
    referee2: ''
  })
  const [errors, setErrors] = useState<Record<string, boolean>>({
    referee1: false,
    referee2: false
  })
  const [showErrorMessage, setShowErrorMessage] = useState(false)

  useEffect(() => {
    if (!competitionId || !matchId || !userId) {
      console.error('Missing required parameters')
      navigate(ROUTES.HOME)
    }
  }, [competitionId, matchId, userId, navigate])

  const handleSelectChange = (e: React.ChangeEvent<HTMLSelectElement>, field: 'referee1' | 'referee2') => {
    setMatchData(prevData => ({
      ...prevData,
      [field]: e.target.value,
    }))
    setErrors(prevErrors => ({
      ...prevErrors,
      [field]: false
    }))
    setShowErrorMessage(false)
  }

  const validateForm = (): boolean => {
    const newErrors = {
      referee1: !matchData.referee1,
      referee2: !matchData.referee2
    }
    setErrors(newErrors)
    setShowErrorMessage(!matchData.referee1 || !matchData.referee2)
    return !newErrors.referee1 && !newErrors.referee2
  }

  const handleSubmit = () => {
    if (!validateForm()) {
      return
    }

    editMatch.mutate(matchData, {
      onSuccess: () => {
        console.log('Partido designado exitosamente')
        if (competitionId && userId) {
          navigate(ROUTES.DESIGNATEMATCHS.replace(':competitionId', competitionId).replace(':userId', userId))
        }
      },
      onError: (error) => {
        console.error('Error al designar el partido:', error)
      },
    })
  }

  const handleCancel = () => {
    setMatchData({
      id: matchId || '',
      referee1: '',
      referee2: '',
    })
    setErrors({
      referee1: false,
      referee2: false
    })
    setShowErrorMessage(false)
    if (competitionId && userId) {
      navigate(ROUTES.DESIGNATEMATCHS.replace(':competitionId', competitionId).replace(':userId', userId))
    }
  }

  if (isLoading) return <div>Cargando usuarios...</div>
  if (isError) return <div>Error al cargar los usuarios</div>
  if (!activeUsers) return <div>No hay usuarios activos disponibles</div>

  return (
    <PageContainer>
      <EditCard>
        <EditText>Designar árbitros del partido</EditText>
        <Separator />
        {showErrorMessage && <ErrorText>Deben designarse dos árbitros</ErrorText>}
        <SelectGroup>
          <ErrorSelect
            name="referee1"
            value={matchData.referee1}
            onChange={(e) => handleSelectChange(e, 'referee1')}
            hasError={errors.referee1}
          >
            <option value="">Seleccione un árbitro</option>
            {activeUsers.map((user) => (
              <option 
                key={user._id} 
                value={user._id}
                disabled={user._id === matchData.referee2}
              >
                {user.name}
              </option>
            ))}
          </ErrorSelect>
          <ErrorSelect
            name="referee2"
            value={matchData.referee2}
            onChange={(e) => handleSelectChange(e, 'referee2')}
            hasError={errors.referee2}
          >
            <option value="">Seleccione un árbitro</option>
            {activeUsers.map((user) => (
              <option 
                key={user._id} 
                value={user._id}
                disabled={user._id === matchData.referee1}
              >
                {user.name}
              </option>
            ))}
          </ErrorSelect>
        </SelectGroup>
        <Separator />
        <ButtonGroup>
          <CancelButton onClick={handleCancel}>Cancelar</CancelButton>
          <Button onClick={handleSubmit} disabled={editMatch.isPending}>
            {editMatch.isPending ? 'Designando...' : 'Designar'}
          </Button>
        </ButtonGroup>
      </EditCard>
    </PageContainer>
  )
}
