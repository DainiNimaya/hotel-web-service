import React from 'react'
import { CCard, CCardBody, CTable } from '@coreui/react'
import * as API from '../../service/SearchHistory'
import moment from 'moment'

const columns = [
  { key: 'searchDate', label: 'Search On', _props: { scope: 'col' } },
  { key: 'searchSite', label: 'Website', _props: { scope: 'col' } },
  { key: 'searchLocation', label: 'Location', _props: { scope: 'col' } },
  { key: 'searchCheckIn', label: 'CheckIn', _props: { scope: 'col' } },
  { key: 'searchCheckOut', label: 'CheckInOut', _props: { scope: 'col' } },
  { key: 'searchAdultCount', label: 'Adults', _props: { scope: 'col' } },
  { key: 'searchChildCount', label: 'Children', _props: { scope: 'col' } },
  { key: 'searchRoomCount', label: 'Rooms', _props: { scope: 'col' } },
]

class Booking extends React.Component {
  state = {
    data: [],
  }

  componentDidMount() {
    this.searchHistory()
  }

  searchHistory = async () => {
    const result = await API.searchHistory()
    if (result.length !== 0) {
      result.map((item) => {
        item.searchCheckIn = item.searchCheckIns.split(' ')[0]
        item.searchCheckOut = item.searchCheckIns.split(' ')[1]
        item.searchDate = moment(item.searchDate).format('YYYY-MM-DD')
      })
      await this.setState({
        data: result,
      })
    }
  }

  render() {
    return (
      <CCard>
        <CCardBody>
          <CTable columns={columns} items={this.state.data} />
        </CCardBody>
      </CCard>
    )
  }
}

export default Booking
