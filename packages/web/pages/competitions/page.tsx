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


  if (isLoading ) return <>Cargando...</>

  return (
    <div>
      <PageContainer>
        {data &&
          data.map((competition) => (
            <CompetitionTable key={competition._id} competition={competition} />
          ))}
      </PageContainer>
    </div>
  )
}


