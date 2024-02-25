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
import { DatePicker } from 'antd'
import { AREA_LIST } from '../../const/const'
import * as API from '../../service/BookingService'
import moment from 'moment'
import dayjs from 'dayjs'

const { RangePicker } = DatePicker
const dateFormat = 'YYYY-MM-DD'

class Booking extends React.Component {
  state = {
    location: AREA_LIST[0],
    bookingDate: [moment('2024-02-25'), moment('2024-02-28')],
    adult: 1,
    children: 0,
    room: 0,
    age: 10,
    data: [],
    searchClick: false,
  }

  componentDidMount() {
    this.searchHotelDetails()
  }

  onChangeAction = (e) => {
    this.setState({
      [e.target.name]: e.target.value,
    })
  }

  onChangeDate = (value, dateString) => {
    this.setState({
      bookingDate: value,
    })
  }

  validateForm = () => {
    const { location, bookingDate, adult, children, room } = this.state
    location.value === ''
      ? alert('Please select a location')
      : bookingDate.length === 0
      ? alert('Please select a date range')
      : adult === ''
      ? alert('Please enter the adult count')
      : children === ''
      ? alert('Please enter the children count')
      : room === ''
      ? alert('Please enter the room count')
      : this.searchHotelDetails()
  }

  searchHotelDetails = async () => {
    const { location, bookingDate, adult, children, room, age } = this.state
    const result = await API.getSearchDetail({ location, bookingDate, adult, children, room, age })
    await this.setState({
      data: result,
      searchClick: true,
    })
  }

  render() {
    const { location, bookingDate, adult, children, room, age } = this.state
    console.log(location, bookingDate, adult, children, room, age)
    return (
      <CCard>
        <CCardBody>
          <CRow>
            <CCol xs={3}>
              <CFormLabel>Location</CFormLabel>
              <CFormSelect
                // aria-label="Default select example"
                options={AREA_LIST}
                value={this.state.location}
                name="location"
                onChange={(e) => this.onChangeAction(e)}
              />
            </CCol>
            <CCol xs={3}>
              <CFormLabel>Pick a Date</CFormLabel>
              <RangePicker
                defaultValue={[dayjs('2015/01/01', dateFormat), dayjs('2015/01/01', dateFormat)]}
                value={this.state.bookingDate}
                onChange={this.onChangeDate}
                name="bookingDate"
              />
            </CCol>
            <CCol xs={2}>
              <CFormLabel>Adult Count</CFormLabel>
              <CFormInput
                value={this.state.adult}
                name="adult"
                onChange={(e) => this.onChangeAction(e)}
              />
            </CCol>
            <CCol xs={2}>
              <CFormLabel>Children Count</CFormLabel>
              <CFormInput
                value={this.state.children}
                name="children"
                onChange={(e) => this.onChangeAction(e)}
              />
            </CCol>
            <CCol xs={2}>
              <CFormLabel>Room Count</CFormLabel>
              <CFormInput
                value={this.state.room}
                name="room"
                onChange={(e) => this.onChangeAction(e)}
              />
            </CCol>
          </CRow>
          <CRow>
            <CCol>
              <div>
                <CButton onClick={() => this.validateForm()}>Search</CButton>
              </div>
            </CCol>
          </CRow>
        </CCardBody>
        <CCardBody>
          <CRow>
            {this.state.data.length !== 0 &&
              this.state.data.map((item, i) => {
                return (
                  <CCol xs={6} key={i}>
                    <CCard>
                      <CRow>
                        <CCol xs={4}>
                          <CCardImage orientation="top" src={item.imgUrl} />
                        </CCol>
                        <CCol xs={8}>
                          <CCardTitle>{item.name}</CCardTitle>
                          <CButton href="#">Check Availability</CButton>
                        </CCol>
                      </CRow>
                    </CCard>
                  </CCol>
                )
              })}
          </CRow>
        </CCardBody>
      </CCard>
    )
  }
}

export default Booking
