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
import SearchData from '../../components/searchData'

const columnsBooking = [{ key: 'booking', label: 'Booking.com' }]
const columnsAirbnb = [{ key: 'airbnb', label: 'Airbnb.com' }]
const columnsHotels = [{ key: 'hotels', label: 'Hotels.com' }]

class Booking extends React.Component {
  state = {
    data: [
      {
        name: 'Marino Beach Colombo',
        location: 'Colombo',
        price: '',
        imgUrl:
          'https://cf.bstatic.com/xdata/images/hotel/square200/156672332.jpg?k=b4f3d04cbc8b0c80193f63046e63e576ba1a50fc9f48289aa152f10a026aab4d&o=',
        roomName: '',
      },
    ],
  }

  componentDidMount() {}

  searchHotelDetails = async (data) => {
    const result = await API.getSearchDetail(data)
    await this.setState({
      data: result,
    })
  }

  render() {
    let bookingDiv = this.state.data.map((item, index) => {
      return { booking: <div key={index}>{item.name}</div> }
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
              <CTable columns={columnsAirbnb} items={this.state.data} />
            </CCol>
            <CCol xs={4}>
              <CTable columns={columnsHotels} items={this.state.data} />
            </CCol>
          </CRow>
        </CCardBody>
      </CCard>
    )
  }
}

export default Booking
