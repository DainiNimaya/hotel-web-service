import React from 'react'
import { NavLink } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import {
  CContainer,
  CHeader,
  CHeaderBrand,
  CHeaderDivider,
  CHeaderNav,
  CHeaderToggler,
  CNavLink,
  CNavItem,
} from '@coreui/react'
import CIcon from '@coreui/icons-react'
import { cilAccountLogout, cilMenu } from '@coreui/icons'

import { AppBreadcrumb } from './index'
import { AppHeaderDropdown } from './header/index'
import { logo } from 'src/assets/brand/logo'
import coffee from 'src/assets/hotel/download.png'
import Cookies from 'js-cookie'

const AppHeader = () => {
  const dispatch = useDispatch()
  const sidebarShow = useSelector((state) => state.sidebarShow)

  const logoutAction = () => {
    Cookies.remove('ghh_token')
    Cookies.remove('ghh_user')
  }

  return (
    <CHeader position="sticky" className="mb-4">
      <CContainer fluid>
        <CHeaderToggler
          className="ps-1"
          onClick={() => dispatch({ type: 'set', sidebarShow: !sidebarShow })}
        >
          <CIcon icon={cilMenu} size="lg" />
        </CHeaderToggler>
        <CHeaderBrand className="mx-auto d-md-none" to="/">
          <CIcon icon={logo} height={48} alt="Logo" />
        </CHeaderBrand>
        <CHeaderNav className="d-none d-md-flex me-auto">
          {Cookies.get('ghh_user') && JSON.parse(Cookies.get('ghh_user')).userRole === 'USER' ? (
            <>
              <CNavItem>
                <CNavLink to="/booking-site" component={NavLink}>
                  <h6>Booking.com</h6>
                </CNavLink>
              </CNavItem>
              <CNavItem>
                <CNavLink to="/airbnb-site" component={NavLink}>
                  <h6>Airbnb.com</h6>
                </CNavLink>
              </CNavItem>
              <CNavItem>
                <CNavLink to="/hotels-site" component={NavLink}>
                  <h6>Hotels.com</h6>
                </CNavLink>
              </CNavItem>
              <CNavItem>
                <CNavLink to="/compare" component={NavLink}>
                  <h6>Compare Hotels</h6>
                </CNavLink>
              </CNavItem>
              <CNavItem>
                <CNavLink to="/history" component={NavLink}>
                  <h6>History</h6>
                </CNavLink>
              </CNavItem>
              <CNavItem>
                <CNavLink to="/profile" component={NavLink}>
                  <h6>Profile</h6>
                </CNavLink>
              </CNavItem>
            </>
          ) : (
            <>
              <CNavItem>
                <CNavLink to="/dashboard" component={NavLink}>
                  <h6>Dashboard</h6>
                </CNavLink>
              </CNavItem>
              <CNavItem>
                <CNavLink to="/users" component={NavLink}>
                  <h6>Users</h6>
                </CNavLink>
              </CNavItem>
              <CNavItem>
                <CNavLink to="/suppliers" component={NavLink}>
                  <h6>Suppliers</h6>
                </CNavLink>
              </CNavItem>
            </>
          )}
        </CHeaderNav>
        <CHeaderNav>
          <CNavItem>
            <CNavLink href="https://www.buymeacoffee.com/daininimaya" target="blank">
              <img src={coffee} style={{ height: '30px', width: 'auto' }} />
            </CNavLink>
          </CNavItem>
          <CNavItem>
            <CNavLink to="/login" component={NavLink} onClick={() => logoutAction()}>
              <CIcon icon={cilAccountLogout} title="Logout" />
            </CNavLink>
          </CNavItem>
        </CHeaderNav>
      </CContainer>
      <CHeaderDivider />
      <CContainer fluid>
        <AppBreadcrumb />
      </CContainer>
    </CHeader>
  )
}

export default AppHeader
