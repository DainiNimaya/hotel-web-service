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
import * as API from '../../service/AirBnbService'
import SearchData from '../../components/searchData'
import './style.css'
import Img from '../../assets/hotel/airbnb.png'

class AirBnb extends React.Component {
  state = {
    data: [],
    searchClick: false,
  }

  componentDidMount() {}

  searchHotelDetails = async (data) => {
    const result = await API.getSearchAirBnbDetail(data)
    await this.setState({
      data: result,
      searchClick: true,
    })
  }

  render() {
    return (
      <CCard>
        <img src={Img} style={{ width: '135px', height: 'auto', margin: '1rem' }} />
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
                            <CCardImage
                              style={{ width: '130px', height: '110px' }}
                              orientation="top"
                              src={item.imgUrl}
                            />
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
              <h3>Guest Favorites</h3>
              <p>Travellers searching for Sri Lanka also booked these</p>
              <CRow>
                <CCol xs={4}>
                  <div id={'booking-img-1'}>
                    <h5>Kandy</h5>
                    <img
                      src={
                        'https://a0.muscache.com/im/pictures/miso/Hosting-804959254707180514/original/fdba3a5f-da62-4b50-83ea-517639ba1385.jpeg?im_w=720'
                      }
                    />
                  </div>
                </CCol>
                <CCol xs={4}>
                  <div id={'booking-img-1'}>
                    <h5>Badulla</h5>
                    <img
                      src={
                        'https://a0.muscache.com/im/pictures/miso/Hosting-53163431/original/b795749c-0d45-48b9-b458-120dbfba9794.jpeg?im_w=720'
                      }
                    />
                  </div>
                </CCol>
                <CCol xs={4}>
                  <div id={'booking-img-1'}>
                    <h5>Negombo</h5>
                    <img
                      src={
                        'https://a0.muscache.com/im/pictures/7be27856-9ea9-424b-81ae-7672e37a5229.jpg?im_w=720'
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

export default AirBnb
