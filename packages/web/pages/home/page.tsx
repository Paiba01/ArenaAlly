import { useTranslation } from 'react-i18next'
import { Item } from '../admin/Item'
import styled from 'styled-components'
import { ROUTES } from '~/services/routing/Routes/constants'
import { useParams } from 'react-router-dom'

const Container = styled.div`
  display: grid;
  grid-auto-flow: row;
  grid-template-columns: 1fr;
  grid-template-rows: 1fr 1fr 1fr;
  height: 100%;
`

export const Home = () => {
  const { t } = useTranslation('admin')
  const { userId } = useParams()

  if (!userId) {
    return <div>Error: no se ha proporcionado un ID de competición.</div>
  }

  return (
    <Container>
      <Item
        color="darkslategrey"
        label={t('ITEMS.COMPETITION')}
        image="/images/competitions2.png"
        to={`${ROUTES.COMPETITIONS.replace(':userId', userId)}`}
        />
      <Item
        color="slategrey"
        label={t('ITEMS.DESIGNATIONS')}
        image="/images/designations.png"
        to={`${ROUTES.MY_DESIGNATIONS.replace(':userId', userId)}`}

        />
      <Item
        color="darkslategrey"
        label={t('ITEMS.DOCUMENTS')}
        image="/images/documents.png"
        to={`${ROUTES.DOCUMENTS.replace(':userId', userId)}`}
      />
    </Container>
  )
}

export default Home
