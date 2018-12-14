import request from '@/request'
export const getCars = ({ number }) => {
  const data = {
    number
  }
  return request({
    url: '/getCars',
    data,
    method: 'post'
  })
}
