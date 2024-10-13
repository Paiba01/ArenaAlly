import { useGetCompetitions } from '~/hooks/competitions/useGetCompetitions'
import styled from 'styled-components'
import { CompetitionTable } from './Item'

const PageContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  margin-top: 2em;
`
export const Competitions = () => {
  const { data, isLoading } = useGetCompetitions()
  const isAdmin = !data

  if (isLoading ) return <>Cargando...</>

  return (
    <div className="container mx-auto px-4 py-8">
      <PageContainer>
        {data &&
          data.map((competition) => (
            <CompetitionTable key={competition._id} competition={competition} />
          ))}
      </PageContainer>
    </div>
  )
}


