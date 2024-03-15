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
  CTable,
} from '@coreui/react'
import * as API from '../../service/BookingService'
import * as API_ from '../../service/AirBnbService'
import * as API_H from '../../service/HotelsService'
import SearchData from '../../components/searchData'

const columnsBooking = [{ key: 'booking', label: 'Booking.com' }]
const columnsAirbnb = [{ key: 'airbnb', label: 'Airbnb.com' }]
const columnsHotels = [{ key: 'hotels', label: 'Hotels.com' }]

class Booking extends React.Component {
  state = {
    bookingData: [],
    airbnbData: [],
    hotelsData: [],
  }

  componentDidMount() {}

  searchHotelDetails = async (data) => {
    const result = await API.getSearchBookingDetail(data)
    await this.setState({
      bookingData: result,
    })

    const result2 = await API_.getSearchAirBnbDetail(data)
    await this.setState({
      airbnbData: result2,
    })

    const result3 = await API_H.getSearchHotelsDetail(data)
    await this.setState({
      hotelsData: result3,
    })
  }

  render() {
    let bookingDiv = this.state.bookingData.map((item, index) => {
      return {
        booking: (
          <div key={index}>
            <CRow>
              {/*<CCol xs={4}>*/}
              {/*<CCardImage*/}
              {/*style={{ width: '130px', height: '110px' }}*/}
              {/*orientation="top"*/}
              {/*src={item.imgUrl}*/}
              {/*/>*/}
              {/*</CCol>*/}
              <CCol xs={12}>
                <CCardTitle>{item.name}</CCardTitle>
                <p className={'mb-1'}>{item.roomName}</p>
                <p>{item.price}</p>
                <CButton href="#" size="sm">
                  Check Availability
                </CButton>
              </CCol>
            </CRow>
          </div>
        ),
      }
    })

    let airbnbDiv = this.state.airbnbData.map((item, index) => {
      return {
        airbnb: (
          <div key={index}>
            <CRow>
              {/*<CCol xs={4}>*/}
              {/*<CCardImage*/}
              {/*style={{ width: '130px', height: '110px' }}*/}
              {/*orientation="top"*/}
              {/*src={item.imgUrl}*/}
              {/*/>*/}
              {/*</CCol>*/}
              <CCol xs={12}>
                <CCardTitle>{item.name}</CCardTitle>
                <p className={'mb-1'}>{item.roomName}</p>
                <p>{item.price}</p>
                <CButton href="#" size="sm">
                  Check Availability
                </CButton>
              </CCol>
            </CRow>
          </div>
        ),
      }
    })

    let hotelsDiv = this.state.hotelsData.map((item, index) => {
      return {
        hotels: (
          <div key={index}>
            <CRow>
              {/*<CCol xs={4}>*/}
              {/*<CCardImage*/}
              {/*style={{ width: '130px', height: '110px' }}*/}
              {/*orientation="top"*/}
              {/*src={item.imgUrl}*/}
              {/*/>*/}
              {/*</CCol>*/}
              <CCol xs={12}>
                <CCardTitle>{item.name}</CCardTitle>
                <p className={'mb-1'}>{item.roomName}</p>
                <p>{item.price}</p>
                <CButton href="#" size="sm">
                  Check Availability
                </CButton>
              </CCol>
            </CRow>
          </div>
        ),
      }
    })

    return (
      <CCard>
        <SearchData search={this.searchHotelDetails} />
        <CCardBody>
          <CRow>
            <CCol xs={4}>
              <CTable columns={columnsBooking} items={bookingDiv} />
            </CCol>
            <CCol xs={4}>
              <CTable columns={columnsAirbnb} items={airbnbDiv} />
            </CCol>
            <CCol xs={4}>
              <CTable columns={columnsHotels} items={hotelsDiv} />
            </CCol>
          </CRow>
        </CCardBody>
      </CCard>
    )
  }
}

export default Booking
