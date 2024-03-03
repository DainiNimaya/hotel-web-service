import React from 'react'
import {
  CButton,
  CCard,
  CCardBody,
  CCol,
  CFormInput,
  CFormLabel,
  CFormSelect,
  CRow,
  CCardTitle,
  CCardImage,
} from '@coreui/react'
import * as API from '../../service/BookingService'
import SearchData from '../../components/searchData'
import './style.css'

class Booking extends React.Component {
  state = {
    data: [],
    searchClick: false,
  }

  componentDidMount() {}

  searchHotelDetails = async (data) => {
    const result = await API.getSearchDetail(data)
    await this.setState({
      data: result,
      searchClick: true,
    })
  }

  render() {
    return (
      <CCard>
        <SearchData search={this.searchHotelDetails} />
        <CCardBody>
          {this.state.searchClick ? (
            <CRow>
              {this.state.data.length !== 0 &&
                this.state.data.map((item, i) => {
                  return (
                    <CCol xs={6} key={i} id={'htl-div-1'}>
                      <CCard>
                        <CRow>
                          <CCol xs={4}>
                            <CCardImage orientation="top" src={item.imgUrl} />
                          </CCol>
                          <CCol xs={8}>
                            <CCardTitle>{item.name}</CCardTitle>
                            <p className={'mb-1'}>{item.roomName}</p>
                            <p>{item.price}</p>
                            <CButton href="#" size="sm">
                              Check Availability
                            </CButton>
                          </CCol>
                        </CRow>
                      </CCard>
                    </CCol>
                  )
                })}
            </CRow>
          ) : (
            <div>
              <h3>Trending Destinations</h3>
              <p>Travellers searching for Sri Lanka also booked these</p>
              <CRow>
                <CCol xs={4}>
                  <div id={'booking-img-1'}>
                    <h5>Colombo</h5>
                    <img
                      src={
                        'https://cf.bstatic.com/xdata/images/city/600x600/685293.jpg?k=799ffc96a5a78c6ed25a9f622dd64617e54e27219c54a828d1830cb3055560db&o='
                      }
                    />
                  </div>
                </CCol>
                <CCol xs={4}>
                  <div id={'booking-img-1'}>
                    <h5>Mirissa</h5>
                    <img
                      src={
                        'https://cf.bstatic.com/xdata/images/city/600x600/685322.jpg?k=e29ccaeca3576b692e39f01d613b237ad0dd03a2a886b62db77c11b8dd3379ce&o='
                      }
                    />
                  </div>
                </CCol>
                <CCol xs={4}>
                  <div id={'booking-img-1'}>
                    <h5>Negombo</h5>
                    <img
                      src={
                        'https://cf.bstatic.com/xdata/images/city/600x600/685339.jpg?k=cda6f68d7587b0d17790737f0451caf777cf1d8382591a228f303a0e79f9b475&o='
                      }
                    />
                  </div>
                </CCol>
              </CRow>
              <br />
              <CRow>
                <CCol xs={6}>
                  <div id={'booking-img-1'}>
                    <h5>Ella</h5>
                    <img
                      src={
                        'https://cf.bstatic.com/xdata/images/city/600x600/685291.jpg?k=df198931295a3a24c278b32556c0779cd74e95a239489a7fe98d89eb2aed72ee&o='
                      }
                    />
                  </div>
                </CCol>
                <CCol xs={6}>
                  <div id={'booking-img-1'}>
                    <h5>Kandy</h5>
                    <img
                      src={
                        'https://cf.bstatic.com/xdata/images/city/600x600/685330.jpg?k=ee4ac422e47649d2d04a9759dc81fa51f138f477796a8043557e864517ae6f5f&o='
                      }
                    />
                  </div>
                </CCol>
              </CRow>
            </div>
          )}
        </CCardBody>
      </CCard>
    )
  }
}

export default Booking
