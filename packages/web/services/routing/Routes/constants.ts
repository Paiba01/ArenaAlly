export const ROUTES = {
  ADMIN: '/admin/:userId',
  HOME: '/:userId',
  COMPETITIONS: '/competitions/:userId',
  CREATECOMPETITIONS: '/competitions/:userId/create',
  EDITCOMPETITIONS: '/competitions/:userId/edit/:competitionId',
  REFEREES: '/referees/:userId',
  EDITREFEREE: '/referees/:adminId/edit/:userId',
  DESIGNATE: '/designate/userId',
  MY_DESIGNATIONS: '/my-designations/:userId',
  DOCUMENTS: '/documents',
  MATCHS: '/competitions/:userId/matchs/:competitionId',
  EDITMATCHS: '/competitions/:userId/:competitionId/matchs/edit/:matchId',
  STARTPAGE: '/start',
  LOGIN: '/login',
  REGISTER: '/register'
}
