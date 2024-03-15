import React from 'react'
import CanvasJSReact from '@canvasjs/react-charts'
import Cookies from 'js-cookie'

var CanvasJS = CanvasJSReact.CanvasJS
var CanvasJSChart = CanvasJSReact.CanvasJSChart
class Dashboard extends React.Component {
  state = {
    options: {
      animationEnabled: true,
      title: {
        text: 'Search History',
        fontFamily: 'Montserra',
        fontSize: 20,
      },
      axisY: {
        title: 'Search Count',
        fontFamily: 'Montserrat',
        fontSize: 14,
      },
      toolTip: {
        shared: true,
      },
      data: [
        {
          type: 'spline',
          name: 'Booking.com',
          showInLegend: true,
          dataPoints: [
            { y: 155, label: 'Jan' },
            { y: 150, label: 'Feb' },
            { y: 152, label: 'Mar' },
            { y: 148, label: 'Apr' },
            { y: 142, label: 'May' },
            { y: 150, label: 'Jun' },
            { y: 146, label: 'Jul' },
            { y: 149, label: 'Aug' },
            { y: 153, label: 'Sep' },
            { y: 158, label: 'Oct' },
            { y: 154, label: 'Nov' },
            { y: 150, label: 'Dec' },
          ],
        },
        {
          type: 'spline',
          name: 'Airbnb.com',
          showInLegend: true,
          dataPoints: [
            { y: 172, label: 'Jan' },
            { y: 173, label: 'Feb' },
            { y: 175, label: 'Mar' },
            { y: 172, label: 'Apr' },
            { y: 162, label: 'May' },
            { y: 165, label: 'Jun' },
            { y: 172, label: 'Jul' },
            { y: 168, label: 'Aug' },
            { y: 175, label: 'Sep' },
            { y: 170, label: 'Oct' },
            { y: 165, label: 'Nov' },
            { y: 169, label: 'Dec' },
          ],
        },
        {
          type: 'spline',
          name: 'Hotels.com',
          showInLegend: true,
          dataPoints: [
            { y: 142, label: 'Jan' },
            { y: 143, label: 'Feb' },
            { y: 145, label: 'Mar' },
            { y: 142, label: 'Apr' },
            { y: 132, label: 'May' },
            { y: 135, label: 'Jun' },
            { y: 152, label: 'Jul' },
            { y: 158, label: 'Aug' },
            { y: 135, label: 'Sep' },
            { y: 140, label: 'Oct' },
            { y: 155, label: 'Nov' },
            { y: 159, label: 'Dec' },
          ],
        },
      ],
    },
  }

  render() {
    return (
      <div>
        {JSON.parse(Cookies.get('ghh_user')).userRole === 'USER' ? (
          <div style={{ textAlign: 'center' }}>
            <h6 style={{ color: '#bfbf14', fontSize: '8rem', marginTop: '7rem' }}>
              Global Hotel Hub
            </h6>
          </div>
        ) : (
          <CanvasJSChart options={this.state.options} />
        )}
      </div>
    )
  }
}

export default Dashboard
