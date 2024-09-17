import { useGetCompetitions } from '~/hooks/competitions/useGetCompetitions'

export const Competitions = () => {
  const { data } = useGetCompetitions()

  return <>{data}</>
}
