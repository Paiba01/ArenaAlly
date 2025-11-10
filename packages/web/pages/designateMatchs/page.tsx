import styled from 'styled-components'
import { useGetMatchsByCompetitionId } from '~/hooks/matchs/useGetMatchsById'
import { MatchTable } from './Item'
import { useNavigate, useParams } from 'react-router-dom'
import { ROUTES } from '~/services/routing/Routes/constants'
import { useGetUser } from '~/hooks/users/useGetUser'
import { useMemo, useState } from 'react'
import { Spinner, SpinnerContainer } from '../spinner/item'

const MainContainer = styled.div`
  display: flex;
  width: 100%;
  overflow-x: auto;
`

const FilterContainer = styled.div`
  background-color: #66bb6a;
  width: 21rem;
  height: 100%;
  padding: 2rem;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 1rem;
  position: fixed;
`

const PageContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  margin-left: 30rem;
  margin-right: 4rem;
`

const ButtonContainer = styled.div`
  width: 100%;
  justify-content: left;
  margin-bottom: 2rem;
`
const FilterText = styled.span`
  font-size: 2.5rem;
  color: white;
  margin-top: 3rem;
  margin-bottom: 3rem;
  align-self: center;

`

const BackButton = styled.button`
  background-color: #1b5e20;
  color: white;
  border: none;
  padding: 0.5rem 1rem;
  border-radius: 0.4rem;
  font-size: 22px;
  cursor: pointer;
  margin-top: 5rem;
  margin-left: 3rem;
  padding: 1rem;

  &:hover {
    background-color: #2e7d32;
  }
`

const SmallInput = styled.input`
  width: 80%;
  padding: 0.8rem;
  margin-left: 1rem;
  margin-bottom: 0.5rem;
  border: 1px solid #ddd;
  border-radius: 0.25rem;
  font-size: 1.2rem;
  color: white;

  &::placeholder {
    color: #d1d1d1;
  }
`

const DateInput = styled.input`
  width: 80%;
  padding: 0.8rem;
  margin-left: 1rem;
  margin-bottom: 0.5rem;
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

const FilterLabel = styled.span`
  margin-left: 1em;
  margin-top: 0.5rem;
  font-size: 18px;
  width: 100%;
  color: white;
`

const NotFound = styled.span`
  margin-top: 3rem;
  font-size: 3rem;
  font-weigth: bold;
  color: #1b5e20;
  overflow-y: hidden;
`

const FilterButton = styled.button`
  background-color: #1b5e20;
  color: white;
  border-radius: 0.4rem;
  font-size: 22px;
  cursor: pointer;
  margin-top: 2rem;
  margin-left: 3.5rem;
  padding: 1rem 5rem;

  &:hover {
    background-color: #2e7d32;
  }
`

const CleanButton = styled.button`
  background-color: #2e7d32;
  color: white;
  border-radius: 0.4rem;
  font-size: 20px;
  cursor: pointer;
  margin-top: 1rem;
  margin-left: 2.8rem;
  padding: 1rem 4rem;

  &:hover {
    background-color: #388e3c;
  }
`

const isDateInRange = (
  matchDate: string | Date,
  fromDate: string,
  toDate: string,
): boolean => {
  const date = new Date(matchDate)

  if (fromDate && !toDate) {
    return date >= new Date(fromDate)
  }

  if (!fromDate && toDate) {
    return date <= new Date(toDate)
  }

  if (fromDate && toDate) {
    return date >= new Date(fromDate) && date <= new Date(toDate)
  }

  return true
}

export const DesignateMatchs = () => {
  const { competitionId, userId } = useParams()
  const navigate = useNavigate()

  const [team1Input, setTeam1Input] = useState('')
  const [team2Input, setTeam2Input] = useState('')
  const [dateFromInput, setDateFromInput] = useState('')
  const [dateToInput, setDateToInput] = useState('')

  const [appliedTeam1Filter, setAppliedTeam1Filter] = useState('')
  const [appliedTeam2Filter, setAppliedTeam2Filter] = useState('')
  const [appliedDateFrom, setAppliedDateFrom] = useState('')
  const [appliedDateTo, setAppliedDateTo] = useState('')

  if (!competitionId || !userId) {
    return <div>Error: no se ha proporcionado un ID de competición.</div>
  }

  const {
    data: userData,
    isLoading: isUserLoading,
    error: userError,
  } = useGetUser(userId)

  if (!userData) {
    return <div>Error: Su sesión ha expirado.</div>
  }

  const { data, isLoading } = useGetMatchsByCompetitionId(competitionId)

  const filteredMatches = useMemo(() => {
    if (!data) return []

    return data.filter((match) => {
      const team1Match = appliedTeam1Filter.toLowerCase()
      const team2Match = appliedTeam2Filter.toLowerCase()
      const localTeam = match.local.toLowerCase()
      const visitorTeam = match.visitor.toLowerCase()

      const matchesTeam1 =
        !appliedTeam1Filter ||
        localTeam.includes(team1Match) ||
        visitorTeam.includes(team1Match)

      const matchesTeam2 =
        !appliedTeam2Filter ||
        localTeam.includes(team2Match) ||
        visitorTeam.includes(team2Match)

      const matchesDate = isDateInRange(
        match.day,
        appliedDateFrom,
        appliedDateTo,
      )

      return matchesTeam1 && matchesTeam2 && matchesDate
    })
  }, [
    data,
    appliedTeam1Filter,
    appliedTeam2Filter,
    appliedDateFrom,
    appliedDateTo,
  ])

  const handleClick = () => {
    navigate(`${ROUTES.DESIGNATE.replace(':userId', userId)}`)
  }

  const handleFilter = () => {
    setAppliedTeam1Filter(team1Input)
    setAppliedTeam2Filter(team2Input)
    setAppliedDateFrom(dateFromInput)
    setAppliedDateTo(dateToInput)
  }

  const handleClearFilters = () => {
    setTeam1Input('')
    setAppliedTeam1Filter('')
    setTeam2Input('')
    setAppliedTeam2Filter('')
    setDateFromInput('')
    setAppliedDateFrom('')
    setDateToInput('')
    setAppliedDateTo('')
  }

  if (isLoading) {
    return (
      <SpinnerContainer>
        <Spinner />
      </SpinnerContainer>
    )
  }

  return (
    <MainContainer>
      <FilterContainer>
        <FilterText>Filtros</FilterText>
        <SmallInput
          name="team1"
          placeholder="Buscar por equipo"
          value={team1Input}
          onChange={(e) => setTeam1Input(e.target.value)}
        />
        <SmallInput
          name="team2"
          placeholder="Buscar por equipo"
          value={team2Input}
          onChange={(e) => setTeam2Input(e.target.value)}
        />
        <br />
        <FilterLabel>Escoge una fecha o un rango de fechas</FilterLabel>
        <DateInput
          type="date"
          name="dateFrom"
          value={dateFromInput}
          onChange={(e) => setDateFromInput(e.target.value)}
        />
        <DateInput
          type="date"
          name="dateTo"
          value={dateToInput}
          onChange={(e) => setDateToInput(e.target.value)}
        />
        <FilterButton onClick={handleFilter}>Buscar</FilterButton>
        <CleanButton onClick={handleClearFilters}>Limpiar filtros</CleanButton>
      </FilterContainer>

      <PageContainer>
        <ButtonContainer>
          <BackButton onClick={handleClick}>Volver</BackButton>
        </ButtonContainer>

        {filteredMatches.length > 0 ? (
          filteredMatches.map((match) => (
            <MatchTable key={match._id} match={match} userId={userId} />
          ))
        ) : (
          <NotFound>
            No se encontraron resultados para los filtros aplicados
          </NotFound>
        )}
      </PageContainer>
    </MainContainer>
  )
}
