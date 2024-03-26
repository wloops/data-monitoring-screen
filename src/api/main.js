import request from '@/utils/fetch'

export function login(data) {
  return request.post('/loginEvlation', data)
}

export function main(data) {
  return request.post('/main', data)
}

export function getRsaParams(data) {
  return request.post('/getRsaParams',data)
}
export function getMenuGrp(data) {
  return request.post('/getMenuGrp', data)
}
