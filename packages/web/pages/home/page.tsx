import { useTranslation } from 'react-i18next'
import { Item } from '../admin/Item'
import styled from 'styled-components'

const Container = styled.div`
  display: grid;
  grid-auto-flow: row;
  grid-template-columns: 1fr;
  grid-template-rows: 1fr 1fr 1fr;
  height: 100%;
`

export const Home = () => {
  const { t } = useTranslation('admin')

  return (
    <Container>
      <Item
        color="red"
        label={t('ITEMS.COMPETITION')}
        image="/images/competitions2.png"
      />
      <Item color="orange" label={t('ITEMS.DESIGNATIONS')} image="/images/designations.png" />
      <Item
        color="blue"
        label={t('ITEMS.DOCUMENTS')}
        image="/images/documents.png"
      />
    </Container>
  )
}

export default Home
