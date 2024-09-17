import styled from 'styled-components'
import { Item } from './Item'
import { useTranslation } from 'react-i18next'

const Container = styled.div`
  display: grid;
  grid-auto-flow: column;
  grid-template-columns: 1fr 1fr;
  grid-template-rows: 1fr 1fr;
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
      />  
      <Item
        color="#d9c600d9"
        label={t('ITEMS.REFEREES')}
        image="/images/referees.jpg"
      />
      <Item
        color="#c71414"
        label={t('ITEMS.MATCHS')}
        image="/images/matches.jpeg"
      />
      <Item
        color="blue"
        label={t('ITEMS.DESIGNATE')}
        image="/images/designate.jpeg"
      />
    </Container>
  )
}
