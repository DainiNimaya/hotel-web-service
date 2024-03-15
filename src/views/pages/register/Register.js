import React, { useState } from 'react'
import {
  CButton,
  CCard,
  CCardBody,
  CCol,
  CContainer,
  CForm,
  CFormInput,
  CInputGroup,
  CInputGroupText,
  CRow,
} from '@coreui/react'
import CIcon from '@coreui/icons-react'
import { cilLockLocked, cilUser } from '@coreui/icons'
import * as API from '../../../service/RegisterService'
import { EMAIL_REGEX } from '../../../utils/validation'
import { isPossiblePhoneNumber } from 'react-phone-number-input'
import Swal from 'sweetalert2'

const Register = () => {
  const [username, setUsername] = useState('')
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [mobile, setMobile] = useState('')
  const [password, setPassword] = useState('')
  const [re_password, setRePassword] = useState('')

  const validateForm = () => {
    name === ''
      ? alert('Please enter the name')
      : username === ''
      ? alert('Please enter the username')
      : email === '' || !EMAIL_REGEX.test(email)
      ? alert('Please enter a valid email')
      : mobile === '' || isPossiblePhoneNumber(mobile)
      ? alert('Please enter a valid mobile')
      : password === ''
      ? alert('Please enter the password')
      : password !== re_password
      ? alert('Please enter the re-password correctly')
      : registerUser()
  }

  const registerUser = async () => {
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
    const result = await API.registerUser(data)
    window.location = 'http://localhost:3000/#/login'
    Swal.fire('Saved!', 'Registration successful..', 'success')
  }

  return (
    <div className="bg-light min-vh-100 d-flex flex-row align-items-center">
      <CContainer>
        <CRow className="justify-content-center">
          <CCol xs={8}>
            <CCard className="mx-4">
              <CCardBody className="p-4">
                <CForm>
                  <h1>Register</h1>
                  <p className="text-medium-emphasis">Create your account</p>
                  <CRow>
                    <CCol xs={6}>
                      <CInputGroup className="mb-2">
                        <CInputGroupText>
                          <CIcon icon={cilUser} />
                        </CInputGroupText>
                        <CFormInput
                          placeholder="Full Name"
                          value={name}
                          autoComplete="full name"
                          onChange={(e) => setName(e.target.value)}
                        />
                      </CInputGroup>
                    </CCol>
                    <CCol xs={6}>
                      <CInputGroup className="mb-2">
                        <CInputGroupText>
                          <CIcon icon={cilUser} />
                        </CInputGroupText>
                        <CFormInput
                          placeholder="Username"
                          value={username}
                          autoComplete="username"
                          onChange={(e) => setUsername(e.target.value)}
                        />
                      </CInputGroup>
                    </CCol>
                    <CCol xs={6}>
                      <CInputGroup className="mb-3">
                        <CInputGroupText>@</CInputGroupText>
                        <CFormInput
                          placeholder="Email"
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                          autoComplete="email"
                        />
                      </CInputGroup>
                    </CCol>
                    <CCol xs={6}>
                      <CInputGroup className="mb-3">
                        <CInputGroupText>@</CInputGroupText>
                        <CFormInput
                          type="number"
                          placeholder="Mobile"
                          value={mobile}
                          onChange={(e) => setMobile(e.target.value)}
                        />
                      </CInputGroup>
                    </CCol>
                    <CCol xs={6}>
                      <CInputGroup className="mb-3">
                        <CInputGroupText>
                          <CIcon icon={cilLockLocked} />
                        </CInputGroupText>
                        <CFormInput
                          type="password"
                          placeholder="Password"
                          autoComplete="new-password"
                          onChange={(e) => setPassword(e.target.value)}
                          value={password}
                        />
                      </CInputGroup>
                    </CCol>
                    <CCol xs={6}>
                      <CInputGroup className="mb-4">
                        <CInputGroupText>
                          <CIcon icon={cilLockLocked} />
                        </CInputGroupText>
                        <CFormInput
                          type="password"
                          placeholder="Repeat password"
                          value={re_password}
                          onChange={(e) => setRePassword(e.target.value)}
                          autoComplete="new-password"
                        />
                      </CInputGroup>
                    </CCol>
                  </CRow>
                  <div className="d-grid">
                    <CButton color="primary" onClick={() => validateForm()}>
                      Create Account
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

export default Register
