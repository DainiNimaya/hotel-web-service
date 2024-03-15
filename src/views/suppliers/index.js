import React from 'react'
import {
  CCard,
  CCardBody,
  CTable,
  CButton,
  CModal,
  CModalBody,
  CModalHeader,
  CModalTitle,
  CModalFooter,
  CCol,
  CFormInput,
  CRow,
  CFormSwitch,
} from '@coreui/react'
import * as API from '../../service/UserService'
import moment from 'moment'
import * as API_ from '../../service/RegisterService'
import { EMAIL_REGEX } from '../../utils/validation'
import { isPossiblePhoneNumber } from 'react-phone-number-input'
import Swal from 'sweetalert2'

const columns = [
  { key: 'userId', label: 'User Id', _props: { scope: 'col' } },
  { key: 'name', label: 'Name', _props: { scope: 'col' } },
  { key: 'mobile', label: 'Contact No.', _props: { scope: 'col' } },
  { key: 'email', label: 'Email', _props: { scope: 'col' } },
  { key: 'userRole', label: 'User Role', _props: { scope: 'col' } },
  { key: 'status', label: 'Status', _props: { scope: 'col' } },
  { key: 'joinedDate', label: 'Joined Date', _props: { scope: 'col' } },
  { key: 'action', label: 'Action', _props: { scope: 'col' } },
]

class Suppliers extends React.Component {
  state = {
    data: [],
    visible: false,
    username: '',
    name: '',
    email: '',
    mobile: '',
    password: '',
    re_password: '',
    id: '',
    edit: false,
    status: 'ACTIVE',
  }

  componentDidMount() {
    this.loadUsers()
  }

  loadUsers = async () => {
    const result = await API.loadUsers('OTHER')
    if (result.length !== 0) {
      result.map((item) => {
        item.userId = item.id
        item.name = item.firstName
        item.mobile = item.mobileNumber
        item.joinedDate = moment(item.joinedDate).format('YYYY-MM-DD')
        item.action = (
          <CButton size="sm" onClick={() => this.manageModal(item)}>
            Edit
          </CButton>
        )
      })
      await this.setState({
        data: result,
      })
    }
  }

  manageModal = (data) => {
    this.setState({
      visible: true,
    })
    if (data) {
      this.setState({
        name: data.name,
        email: data.email,
        mobile: data.mobile,
        id: data.id,
        username: data.username,
        status: data.status,
        edit: true,
        password: '',
        re_password: '',
      })
    } else {
      this.setState({
        name: '',
        email: '',
        mobile: '',
        id: '',
        username: '',
        status: 'ACTIVE',
        edit: false,
        password: '',
        re_password: '',
      })
    }
  }

  onChangeAction = async (e) => {
    this.setState({
      [e.target.name]: e.target.value,
    })
  }

  onChangeStatus = async () => {
    this.setState({
      status: this.state.status === 'ACTIVE' ? 'INACTIVE' : 'ACTIVE',
    })
  }

  validateForm = () => {
    const { username, name, email, password, re_password, mobile, edit } = this.state
    name === ''
      ? alert('Please enter the name')
      : username === '' && !edit
      ? alert('Please enter the username')
      : email === '' || !EMAIL_REGEX.test(email)
      ? alert('Please enter a valid email')
      : mobile === ''
      ? alert('Please enter a valid mobile')
      : password === '' && !edit
      ? alert('Please enter the password')
      : password !== re_password && !edit
      ? alert('Please enter the re-password correctly')
      : this.registerUser()
  }

  registerUser = async () => {
    const { id, username, name, email, password, re_password, mobile, edit, status } = this.state
    const data = {
      id,
      firstName: name,
      lastName: '',
      mobileNumber: mobile,
      email,
      username,
      password,
      userRole: 'OTHER',
      status,
    }
    const result = !edit ? await API_.registerUser(data) : await API_.updateUser(data)

    if (!edit) {
      Swal.fire('Saved!', 'Registration successful..', 'success')
    } else {
      Swal.fire('Updated!', 'User details updated successful..', 'success')
    }
    await this.loadUsers()
    await this.setState({
      visible: false,
      edit: false,
    })
  }

  closeAction = () => {
    this.setState({
      visible: false,
    })
  }

  render() {
    const { username, name, email, password, re_password, mobile, edit, status, visible } =
      this.state
    console.log(this.state.visible)
    return (
      <CCard>
        <CCardBody>
          <div style={{ textAlign: 'right' }}>
            <CButton onClick={() => this.manageModal(null)}>Add Supplier</CButton>
          </div>
          <br />
          <CTable columns={columns} items={this.state.data} />
        </CCardBody>
        <CModal size="lg" visible={this.state.visible} aria-labelledby="LiveDemoExampleLabel">
          <div style={{ margin: '1rem' }}>
            <h4>Manage Supplier</h4>
          </div>
          <CModalBody>
            <CRow>
              <CCol xs={6} style={{ marginTop: '20px' }}>
                <CFormInput
                  placeholder="Full Name"
                  value={name}
                  name="name"
                  autoComplete="full name"
                  onChange={(e) => this.onChangeAction(e)}
                />
              </CCol>
              <CCol xs={6} style={{ marginTop: '20px' }}>
                <CFormInput
                  readOnly={edit}
                  placeholder="Username"
                  value={username}
                  name="username"
                  autoComplete="username"
                  onChange={(e) => this.onChangeAction(e)}
                />
              </CCol>
              <CCol xs={6} style={{ marginTop: '20px' }}>
                <CFormInput
                  placeholder="Email"
                  value={email}
                  name="email"
                  onChange={(e) => this.onChangeAction(e)}
                  autoComplete="email"
                />
              </CCol>
              <CCol xs={6} style={{ marginTop: '20px' }}>
                <CFormInput
                  type="number"
                  placeholder="Mobile"
                  name="mobile"
                  value={mobile}
                  onChange={(e) => this.onChangeAction(e)}
                />
              </CCol>
              {this.state.id === '' && (
                <>
                  <CCol xs={6} style={{ marginTop: '20px' }}>
                    <CFormInput
                      type="password"
                      placeholder="Password"
                      autoComplete="new-password"
                      name="password"
                      onChange={(e) => this.onChangeAction(e)}
                      value={password}
                    />
                  </CCol>
                  <CCol xs={6} style={{ marginTop: '20px' }}>
                    <CFormInput
                      type="password"
                      placeholder="Repeat password"
                      value={re_password}
                      name="re_password"
                      onChange={(e) => this.onChangeAction(e)}
                      autoComplete="new-password"
                    />
                  </CCol>
                </>
              )}
              <CCol xs={6} style={{ marginTop: '20px' }}>
                <CFormSwitch
                  label="Status"
                  onChange={() => this.onChangeStatus()}
                  checkbox
                  checked={status === 'ACTIVE'}
                  id="formSwitchCheckDefault"
                />
              </CCol>
            </CRow>
          </CModalBody>
          <CModalFooter>
            <CButton color="secondary" onClick={() => this.closeAction()}>
              Close
            </CButton>
            <CButton color="primary" onClick={() => this.validateForm()}>
              Save changes
            </CButton>
          </CModalFooter>
        </CModal>
      </CCard>
    )
  }
}

export default Suppliers
