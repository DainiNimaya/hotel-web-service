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
import * as API from '../../service/HotelsService'
import SearchData from '../../components/searchData'
import './style.css'
import Img from '../../assets/hotel/hotels.png'

class Hotels extends React.Component {
  state = {
    data: [],
    searchClick: false,
  }

  componentDidMount() {}

  searchHotelDetails = async (data) => {
    const result = await API.getSearchHotelsDetail(data)
    await this.setState({
      data: result,
      searchClick: true,
    })
  }

  render() {
    return (
      <CCard>
        <img src={Img} style={{ width: '135px', height: 'auto' }} />
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
              <h3>Discover your new favourite stay</h3>
              <CRow>
                <CCol xs={4}>
                  <div id={'booking-img-1'}>
                    <h5>Villa</h5>
                    <img
                      src={
                        'https://forever.travel-assets.com/flex/flexmanager/images/2023/11/24/VRBO_APFT2_BARCELONA_THERIN_HOUSE_1_1439.jpg?impolicy=fcrop&h=590&w=448&q=mediumHigh'
                      }
                    />
                  </div>
                </CCol>
                <CCol xs={4}>
                  <div id={'booking-img-1'}>
                    <h5>Apartment</h5>
                    <img
                      src={
                        'https://forever.travel-assets.com/flex/flexmanager/images/2023/11/27/5bb7f1c3-dd6c-465f-90e8-ac07b9a66ba5.jpeg?impolicy=fcrop&h=590&w=448&q=mediumHigh'
                      }
                    />
                  </div>
                </CCol>
                <CCol xs={4}>
                  <div id={'booking-img-1'}>
                    <h5>Apart Hotel</h5>
                    <img
                      src={
                        'https://forever.travel-assets.com/flex/flexmanager/images/2023/11/24/a397c648-7662-440b-b023-65a2f5c41623.jpeg?impolicy=fcrop&h=590&w=448&q=mediumHigh'
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

export default Hotels
