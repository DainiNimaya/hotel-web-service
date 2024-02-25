import axios from 'axios'
import moment from 'moment'

export const getSearchDetail = async (data) => {
  const data1 = {
    username: 'NIMAL',
    location: data.location.value,
    checkIn: moment(data.bookingDate[0]).format('YYYY-MM-DD'),
    checkOut: moment(data.bookingDate[1]).format('YYYY-MM-DD'),
    adultCount: data.adult,
    childCount: data.children,
    roomCount: data.room,
    age: data.age,
  }
  const temp = await axios({
    method: 'post',
    url: 'http://localhost:8081/api/v1/hotel/BOOKING',
    data: data1,
  }).then(async (response) => {
    let result = await response.data.object
    return result
  })
  return temp
}
