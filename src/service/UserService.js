import axios from 'axios'

export const loadUsers = async (role) => {
  const temp = await axios({
    method: 'get',
    url: 'http://localhost:8081/api/v1/user/all/' + role,
  }).then(async (response) => {
    let result = await response.data.object
    return result
  })
  return temp
}

export const getProfileDetails = async (username) => {
  const temp = await axios({
    method: 'get',
    url: 'http://localhost:8081/api/v1/user/' + username,
  }).then(async (response) => {
    let result = await response.data.object
    return result
  })
  return temp
}
