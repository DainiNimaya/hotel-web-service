import axios from 'axios'
import Cookies from 'js-cookie'

export const searchHistory = async () => {
  let user = JSON.parse(Cookies.get('ghh_user'))
  const temp = await axios({
    method: 'get',
    url: 'http://localhost:8081/api/v1/user/search-history/' + user.username,
  }).then(async (response) => {
    let result = await response.data.object
    return result
  })
  return temp
}
