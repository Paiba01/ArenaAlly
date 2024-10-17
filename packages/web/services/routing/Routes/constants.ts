export const ROUTES = {
  ADMIN: '/admin/:userId',
  HOME: '/:userId',
  COMPETITIONS: '/competitions/:userId',
  CREATECOMPETITIONS: '/competitions/create',
  EDITCOMPETITIONS: '/competitions/edit/:competitionId',
  REFEREES: '/referees/:userId',
  EDITREFEREE: '/referees/:userId',
  DESIGNATE: '/designate/userId',
  MY_DESIGNATIONS: '/my-designations/:userId',
  DOCUMENTS: '/documents',
  MATCHS: '/competitions/:userId/matchs/:competitionId',
  EDITMATCHS: '/competitions/:competitionId/matchs/edit/:matchId',
  STARTPAGE: '/start',
  LOGIN: '/login',
  REGISTER: '/register'
}
