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
} from '@coreui/react'
import { DatePicker } from 'antd'
import { AREA_LIST } from '../../const/const'
import moment from 'moment'
import dayjs from 'dayjs'
import './style.css'
import PropTypes from 'prop-types'

const { RangePicker } = DatePicker
const dateFormat = 'YYYY-MM-DD'

class SearchData extends React.Component {
  state = {
    location: AREA_LIST[0].value,
    bookingDate: [moment().format(dateFormat), moment().add(3, 'days').format(dateFormat)],
    adult: 1,
    children: 0,
    room: 0,
    age: 10,
    data: [],
  }

  componentDidMount() {}

  onChangeAction = (e) => {
    this.setState({
      [e.target.name]: e.target.value,
    })
  }

  onChangeDate = (value, dateString) => {
    this.setState({
      bookingDate: dateString,
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
    this.props.search({ age, location, bookingDate, adult, children, room })
  }

  render() {
    return (
      <CCardBody>
        <CRow>
          <CCol xs={3}>
            <CFormLabel>Location</CFormLabel>
            <CFormSelect
              id={'com-style'}
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
              defaultValue={[
                dayjs(this.state.bookingDate[0], dateFormat),
                dayjs(this.state.bookingDate[1], dateFormat),
              ]}
              onChange={this.onChangeDate}
              name="bookingDate"
            />
          </CCol>
          <CCol xs={2}>
            <CFormLabel>Adult Count</CFormLabel>
            <CFormInput
              id={'com-style'}
              value={this.state.adult}
              name="adult"
              onChange={(e) => this.onChangeAction(e)}
            />
          </CCol>
          <CCol xs={2}>
            <CFormLabel>Children Count</CFormLabel>
            <CFormInput
              id={'com-style'}
              value={this.state.children}
              name="children"
              onChange={(e) => this.onChangeAction(e)}
            />
          </CCol>
          <CCol xs={2}>
            <CFormLabel>Room Count</CFormLabel>
            <CFormInput
              id={'com-style'}
              value={this.state.room}
              name="room"
              onChange={(e) => this.onChangeAction(e)}
            />
          </CCol>
        </CRow>
        <CRow>
          <CCol>
            <div className={'search-btn-div'}>
              <CButton onClick={() => this.validateForm()}>Search</CButton>
            </div>
          </CCol>
        </CRow>
      </CCardBody>
    )
  }
}

SearchData.propTypes = {
  search: PropTypes.string.isRequired,
  // Add other prop types as needed
}

export default SearchData
