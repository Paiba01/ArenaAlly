export const ROUTES = {
  STARTPAGE: '/start',
  LOGIN: '/login',
  REGISTER: '/register',
  ADMIN: '/admin/:userId',
  COMPETITIONS: '/competitions/:userId',
  CREATECOMPETITIONS: '/competitions/:userId/create',
  EDITCOMPETITIONS: '/competitions/:userId/edit/:competitionId',
  MATCHS: '/competitions/:userId/matchs/:competitionId',
  EDITMATCHS: '/competitions/:userId/:competitionId/matchs/edit/:matchId',
  REFEREES: '/referees/:userId',
  EDITREFEREE: '/referees/:userId/edit/:editableUserId',
  DESIGNATE: '/designate/:userId',
  DESIGNATEMATCHS:'/designate/:userId/matchs/:competitionId',
  DESIGNATEREFEREES:'/designate/:userId/matchs/:competitionId/to/:matchId',
  HOME: '/:userId',
  MY_DESIGNATIONS: '/my-designations/:userId',
  DOCUMENTS: '/documents/:userId'
}
