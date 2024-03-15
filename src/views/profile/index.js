import React, { useState, useEffect } from 'react'
import {
  CButton,
  CCard,
  CCardBody,
  CCol,
  CContainer,
  CForm,
  CFormInput,
  CFormSwitch,
  CInputGroup,
  CInputGroupText,
  CRow,
} from '@coreui/react'
import CIcon from '@coreui/icons-react'
import { cilLockLocked, cilUser } from '@coreui/icons'
import * as API from '../../service/UserService'
import * as API_ from '../../service/RegisterService'
import { EMAIL_REGEX } from '../../utils/validation'
import { isPossiblePhoneNumber } from 'react-phone-number-input'
import Swal from 'sweetalert2'
import Cookies from 'js-cookie'

const Profile = () => {
  const [username, setUsername] = useState('')
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [mobile, setMobile] = useState('')
  const [status, setStatus] = useState('ACTIVE')
  const [oldPswrd, setOldPswrd] = useState('')
  const [password, setPassword] = useState('')
  const [re_password, setRePassword] = useState('')

  useEffect(() => {
    loadData()
  })

  const loadData = async () => {
    const result = await API.getProfileDetails(JSON.parse(Cookies.get('ghh_user')).username)
    if (result) {
      setUsername(result.username)
      setName(result.firstName)
      setMobile(result.mobileNumber)
      setEmail(result.email)
    }
  }

  const validateForm = () => {
    name === ''
      ? alert('Please enter the name')
      : username === ''
      ? alert('Please enter the username')
      : email === '' || !EMAIL_REGEX.test(email)
      ? alert('Please enter a valid email')
      : mobile === '' || isPossiblePhoneNumber(mobile)
      ? alert('Please enter a valid mobile')
      : updateUser()
  }

  const updateUser = async () => {
    const data = {
      firstName: name,
      lastName: '',
      mobileNumber: mobile,
      email,
      username,
      password,
      userRole: 'USER',
      status: 'ACTIVE',
    }
    const result = await API_.updateUser(data)
    Swal.fire('Updated!', 'User details updated successful..', 'success')
  }

  return (
    <div className="bg-light min-vh-90 d-flex flex-row align-items-center">
      <CContainer>
        <CRow className="justify-content-center">
          <CCol xs={8}>
            <CCard className="mx-4">
              <CCardBody className="p-4">
                <CForm>
                  <h3>Manage your profile</h3>
                  <p> </p>
                  <CRow>
                    <CCol xs={6} style={{ marginTop: '20px' }}>
                      <CFormInput
                        placeholder="Full Name"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                      />
                    </CCol>
                    <CCol xs={6} style={{ marginTop: '20px' }}>
                      <CFormInput
                        readOnly={true}
                        placeholder="Username"
                        value={username}
                        name="username"
                        autoComplete="username"
                        onChange={(e) => setUsername(e.target.value)}
                      />
                    </CCol>
                    <CCol xs={6} style={{ marginTop: '20px' }}>
                      <CFormInput
                        placeholder="Email"
                        value={email}
                        name="email"
                        onChange={(e) => setEmail(e.target.value)}
                        autoComplete="email"
                      />
                    </CCol>
                    <CCol xs={6} style={{ marginTop: '20px' }}>
                      <CFormInput
                        type="number"
                        placeholder="Mobile"
                        name="mobile"
                        value={mobile}
                        onChange={(e) => setMobile(e.target.value)}
                      />
                    </CCol>
                    <CCol xs={6} style={{ marginTop: '20px' }}>
                      <CFormSwitch
                        label="Status"
                        onChange={(e) => setStatus(status === 'ACTIVE' ? 'INACTIVE' : 'ACTIVE')}
                        checkbox
                        checked={status === 'ACTIVE'}
                        id="formSwitchCheckDefault"
                      />
                    </CCol>
                  </CRow>
                  <div style={{ textAlign: 'right' }}>
                    <CButton color="primary" onClick={() => validateForm()}>
                      Save Changes
                    </CButton>
                  </div>
                  <br />
                  <h6>Change Password</h6>
                  <CRow>
                    <CCol xs={6} style={{ marginTop: '20px' }}>
                      <CFormInput
                        placeholder="Old Password"
                        value={oldPswrd}
                        name="oldPswrd"
                        autoComplete=""
                        onChange={(e) => setOldPswrd(e.target.value)}
                      />
                    </CCol>
                    <CCol xs={6} style={{ marginTop: '20px' }}>
                      <CFormInput
                        placeholder="New Password"
                        value={password}
                        name="password"
                        autoComplete=""
                        onChange={(e) => setPassword(e.target.value)}
                      />
                    </CCol>
                    <CCol xs={6} style={{ marginTop: '20px' }}>
                      <CFormInput
                        placeholder="Retype Password"
                        value={re_password}
                        name="re_password"
                        autoComplete=""
                        onChange={(e) => setRePassword(e.target.value)}
                      />
                    </CCol>
                  </CRow>
                  <div style={{ textAlign: 'right' }}>
                    <CButton color="primary" onClick={() => validateForm()}>
                      Reset
                    </CButton>
                  </div>
                </CForm>
              </CCardBody>
            </CCard>
          </CCol>
        </CRow>
      </CContainer>
    </div>
  )
}

export default Profile
