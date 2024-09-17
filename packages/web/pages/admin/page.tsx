import styled from 'styled-components'
import { Item } from './Item'
import { useTranslation } from 'react-i18next'
import { ROUTES } from '~/services/routing/Routes/constants'

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

  return (
    <Container>
      <Item
        color="purple"
        label={t('ITEMS.COMPETITION')}
        image="/images/competitions.jpeg"
        to={ROUTES.COMPETITIONS}
      />
      <Box>
        <Item
          color="#d9c600d9"
          label={t('ITEMS.REFEREES')}
          image="/images/referees.jpg"
          to={ROUTES.REFEREES}
        />
        <Item
          color="blue"
          label={t('ITEMS.DESIGNATE')}
          image="/images/designate.jpeg"
          to={ROUTES.DESIGNATE}
        />
      </Box>
    </Container>
  )
}
