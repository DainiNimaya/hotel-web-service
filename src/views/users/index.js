import React from 'react'
import { CCard, CCardBody, CTable } from '@coreui/react'
import * as API from '../../service/UserService'
import moment from 'moment'

const columns = [
  { key: 'userId', label: 'User Id', _props: { scope: 'col' } },
  { key: 'name', label: 'Name', _props: { scope: 'col' } },
  { key: 'mobile', label: 'Contact No.', _props: { scope: 'col' } },
  { key: 'email', label: 'Email', _props: { scope: 'col' } },
  { key: 'userRole', label: 'User Role', _props: { scope: 'col' } },
  { key: 'status', label: 'Status', _props: { scope: 'col' } },
  { key: 'joinedDate', label: 'Joined Date', _props: { scope: 'col' } },
]

class Users extends React.Component {
  state = {
    data: [],
  }

  componentDidMount() {
    this.loadUsers()
  }

  loadUsers = async () => {
    const result = await API.loadUsers('USER')
    if (result.length !== 0) {
      result.map((item) => {
        item.userId = item.id
        item.name = item.firstName
        item.mobile = item.mobileNumber
        item.status = 'Active'
        item.joinedDate = moment(item.joinedDate).format('YYYY-MM-DD')
      })
      await this.setState({
        data: result,
      })
    }
  }

  render() {
    return (
      <CCard>
        <CCardBody>
          <CTable columns={columns} items={this.state.data} />
        </CCardBody>
      </CCard>
    )
  }
}

export default Users
