import axios from 'axios'
import cookie from 'react-cookies'

export const registerUser = async (data) => {
  await axios({
    method: 'post',
    url: 'http://localhost:8081/api/v1/user',
    data,
  })
    .then(async (response) => {
      let result = await response.data.success
      console.log(response)
      console.log(response.data, response.data.success)
      console.log(result)
      return result
    })
    .catch((error) => {
      return false
    })
}

export const updateUser = async (data) => {
  await axios({
    method: 'put',
    url: 'http://localhost:8081/api/v1/user',
    data,
  })
    .then(async (response) => {
      let result = await response.data.success
      return result
    })
    .catch((error) => {
      return false
    })
}

export const loginAction = async (data) => {
  let result = false
  await axios({
    method: 'post',
    url: 'http://localhost:8081/api/v1/token',
    data,
  })
    .then(async (response) => {
      result = await response.data.success
      if (result) {
        cookie.save('ghh_token', response.data.object.token, { path: '/' })
        cookie.save('ghh_user', response.data.object.userDTO, { path: '/' })
      }
      return result
    })
    .catch((error) => {
      return false
    })
  return result
}
