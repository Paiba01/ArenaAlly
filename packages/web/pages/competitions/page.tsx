import { useGetCompetitions } from '~/hooks/competitions/useGetCompetitions'
import styled from 'styled-components'
import { CompetitionTable } from './Item'
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
  overflow-x: hidden;
`

const ButtonContainer = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
  margin-bottom: 2rem;
  padding: 0 10rem;
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

const CreateButton = styled.button`
  background-color: #00bfa5;
  color: white;
  border: none;
  padding: 0.5rem 1rem;
  border-radius: 0.4rem;
  font-size: 22px;
  cursor: pointer;
  margin-top: 5rem;
  margin-right: 3rem;

  padding: 1rem;

  &:hover {
    background-color: #1de9b6;
  }
`

const FilterText = styled.span`
  font-size: 2.5rem;
  color: white;
  margin-top: 3rem;
  margin-bottom: 3rem;
  align-self: center;
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

const SmallSelect = styled.select`
  width: 88%;
  padding: 0.8rem;
  border-radius: 0.25rem;
  margin-left: 1rem;
  border-color: white;
  font-size: 1.2rem;
  color: white;
  cursor: pointer;
  background-color: #66bb6a;

  &::placeholder {
    color: #d1d1d1;
  }
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
  margin-top: 3rem;
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
  margin-top: 2rem;
  margin-left: 2.8rem;
  padding: 1rem 4rem;

  &:hover {
    background-color: #388e3c;
  }
`

export const Competitions = () => {
  const { userId } = useParams()
  const navigate = useNavigate()

  const [nameInput, setNameInput] = useState('')
  const [categoryInput, setCategoryInput] = useState('')
  const [appliedNameFilter, setAppliedNameFilter] = useState('')
  const [appliedCategoryFilter, setAppliedCategoryFilter] = useState('')

  const { data: userData, isLoading: isUserDataLoading } = useGetUser(userId)
  const { data, isLoading } = useGetCompetitions()


  const filteredCompetitions = useMemo(() => {
    if (!data) return []

    return data.filter((competition) => {
      const nameMatch =
        !appliedNameFilter ||
        competition.name.toLowerCase().includes(appliedNameFilter.toLowerCase())

      const categoryMatch =
        !appliedCategoryFilter || competition.category === appliedCategoryFilter

      return nameMatch && categoryMatch
    })
  }, [data, appliedNameFilter, appliedCategoryFilter])

  if (isLoading || isUserDataLoading) {
    return (
      <SpinnerContainer>
        <Spinner />
      </SpinnerContainer>
    )
  }


  if (!userData) {
    return <NotFound>Error: no se ha proporcionado un ID de usuario.</NotFound>
  }

  if (!userId) {
    return (
      <NotFound>Error: no se ha proporcionado un ID de competición.</NotFound>
    )
  }

  const handleFilter = () => {
    setAppliedNameFilter(nameInput)
    setAppliedCategoryFilter(categoryInput)
  }

  const handleClearFilters = () => {
    setNameInput('')
    setCategoryInput('')
    setAppliedNameFilter('')
    setAppliedCategoryFilter('')
  }

  const handleClick = () => {
    navigate(`${ROUTES.CREATECOMPETITIONS.replace(':userId', userId)}`)
  }

  const handleBackClick = () => {
    if (userData?.isAdmin == false) {
      navigate(`${ROUTES.HOME.replace(':userId', userData._id)}`)
    } else {
      navigate(`${ROUTES.ADMIN.replace(':userId', userData._id)}`)
    }
  }





  return (
    <MainContainer>
      <FilterContainer>
        <FilterText>Filtros</FilterText>
        <SmallInput
          name="Nombre"
          placeholder="Buscar por nombre"
          value={nameInput}
          onChange={(e) => setNameInput(e.target.value)}
        />
        <SmallSelect
          name="category"
          value={categoryInput}
          onChange={(e) => setCategoryInput(e.target.value)}
        >
          <option value="">Todas las categorías</option>
          <option value="ALEVIN">ALEVIN</option>
          <option value="INFANTIL">INFANTIL</option>
          <option value="CADETE">CADETE</option>
          <option value="JUVENIL">JUVENIL</option>
          <option value="SENIOR">SENIOR</option>
        </SmallSelect>
        <br />
        <FilterButton onClick={handleFilter}>Buscar</FilterButton>
        <CleanButton onClick={handleClearFilters}>Limpiar filtros</CleanButton>
      </FilterContainer>

      <PageContainer>
        <ButtonContainer>
          <BackButton onClick={handleBackClick}>Volver</BackButton>
          {userData?.isAdmin && (
            <CreateButton onClick={handleClick}>Crear competición</CreateButton>
          )}
        </ButtonContainer>

        {filteredCompetitions.length > 0 ? (
          filteredCompetitions.map((competition) => (
            <CompetitionTable
              key={competition._id}
              competition={competition}
              userData={userData}
            />
          ))
        ) : (
          <NotFound>
            No se encontraron competiciones con los filtros aplicados
          </NotFound>
        )}
      </PageContainer>
    </MainContainer>
  )
}
