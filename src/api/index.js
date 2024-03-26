import { request } from '@/utils'

export default {
  getUser: () => request.get('/user'),
  refreshToken: () => request.post('/auth/refreshToken', null, { noNeedTip: true }),

  getRsaParams: () => request.post('/getRsaParams'),
  login: (data) => request.post('/loginEvlation', data),
  main: (data) => request.post('/main', data),
  getMenuGrp: (data) => request.post('/getMenuGrp', data),
  genSubMenu: (data) => request.post('/genSubMenu', data),
  getRecordMenuGrp: (data) => request.post('/getRecordMenuGrp', data),
  getTaskInfor: (data) => request.post('/getTaskInfor', data),
  largeScreen: (data) => request.post('/largeScreen', data),
}
