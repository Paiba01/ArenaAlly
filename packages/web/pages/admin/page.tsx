import styled from 'styled-components'
import { Item } from './Item'
import { useTranslation } from 'react-i18next'
import { ROUTES } from '~/services/routing/Routes/constants'
import { useParams } from 'react-router-dom'

const Box = styled.div`
  display: grid;
  grid-auto-flow: column;
  grid-template-columns: 1fr 1fr;
`

const Container = styled.div`
  display: grid;
  grid-auto-flow: row;
  grid-template-row: 1fr 1fr;
  height: 100%;
`

export const Admin = () => {
  const { t } = useTranslation('admin')
  const { userId } = useParams()
  if (!userId) {
    return <div>Error: no se ha proporcionado un ID de competición.</div>
  }

  return (
    <Container>
      <Item
        color="slategrey"
        label={t('ITEMS.COMPETITION')}
        image="/images/competitions.jpeg"
        to={`${ROUTES.COMPETITIONS.replace(':userId', userId)}`}
      />
      <Box>
        <Item
          color="darkslategrey"
          label={t('ITEMS.REFEREES')}
          image="/images/referees.jpg"
          to={`${ROUTES.REFEREES.replace(':userId', userId)}`}
        />
        <Item
          color="dimgrey"
          label={t('ITEMS.DESIGNATE')}
          image="/images/designate.jpeg"
          to={`${ROUTES.DESIGNATE.replace(':userId', userId)}`}
        />
      </Box>
    </Container>
  )
}
