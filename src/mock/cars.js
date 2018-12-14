import qs from 'qs'

export const getCars = req => {
  const data = qs.parse(req.body)
  let list = []
  for (let i = 0; i < data.number; i++) {
    list.push({
      id: i,
      title: '某某二手车-XL 2018款',
      mileage: '2.3万公里',
      date: '2015年12月'
    })
  }
  return {
    success: true,
    body: list
  }
}
