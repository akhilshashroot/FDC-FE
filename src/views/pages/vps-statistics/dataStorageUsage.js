import React, { Fragment } from 'react';
import { connect } from 'react-redux'
import { Card, CardBody, CardHeader, CardTitle, Row, Col } from "reactstrap"
import { Settings, Disc } from "react-feather"
import { Table } from "reactstrap"
import { Bar } from "react-chartjs-2"


let $primary = "#7367F0",
  grid_line_color = "#dae1e7"

const datastyle = {
  // backgroundColor: "#c7c4ec",
  paddingTop: "3px",
  fontSize: "10px",
  paddingLeft: "10px"
}
const iconstyle = {
  marginTop: "2px",
  marginBottom: "5px"
}
const cardbody = {
  paddingLeft: "10px",
  paddingRight: "10px",
  paddingBottom: "0px",
  paddingTop: "0px"
}



class DataStorageUsage extends React.PureComponent {
  chartlabels = () => {
    let dat = this.props.data && this.props.data.storage
    let labels = [];
    if (dat) {
      for (let i = 0; i < this.props.data.storage.length; i++) {
        labels.push(this.props.data.storage[i].title)
      }
    }

    return labels
  }
  chartvalues = () => {
    let dat = this.props.data && this.props.data.storage
    let values = []
    if (dat) {
      for (let i = 0; i < this.props.data.storage.length; i++) {
        values.push(this.props.data.storage[i].count)
      }
    }
    return values
  }
  data = {
    labels: this.chartlabels(),
    datasets: [
      {
        label: "Data Storage Usage",
        data: this.chartvalues(),
        backgroundColor: $primary,
        borderColor: "transparent"
      }
    ]
  }

  options = {
    elements: {
      rectangle: {
        borderWidth: 2,
        borderSkipped: "left"
      }
    },
    responsive: true,
    responsiveAnimationDuration: 500,

    scales: {
      xAxes: [
        {
          display: false,
          gridLines: {
            color: grid_line_color
          },
          scaleLabel: {
            display: false
          }
        }
      ],
      yAxes: [
        {
          display: false,
          gridLines: {
            color: grid_line_color
          },
          scaleLabel: {
            display: false
          },
          ticks: {
            stepSize: 1000
          }
        }
      ]
    },
    maintainAspectRatio: false,
    title: {
      display: false,
      text: "Data Storage Usage"
    },
    legend: { display: false }
  }

  render() {
    const { storage } = this.props.data
    return (
      <Fragment>
        <Card >
          <CardHeader style={datastyle}>
            <CardTitle style={{ fontSize: ".9rem", fontWeight: "bolder" }}>
              DATA STORAGE USAGE
                        </CardTitle>
            <p style={iconstyle}>
              <Settings size={15} />
            </p>
          </CardHeader>
          <CardBody style={cardbody}>
            <Row className="ml-0 mr-0">
              <Col md="auto" className="mx-auto flex-column">
                <Bar data={this.data} options={this.options} height={200} />
              </Col>
            </Row>
            <Row className="pt-50">
              <Col md="12">
                <div className="card-btns d-flex justify-content-between mt-1">
                  <Table striped responsive>
                    <tbody className="striped hover">
                      {storage && storage.map((value, index) =>
                        <tr key={index}>
                          <td>
                            <div className="d-flex justify-content-between">
                              <a style={{ fontSize: "x-small" }} className="float-left font-weight-bold ">
                                <Disc style={{ marginRight: "5px" }} size={12} color={$primary} />
                                {value.title}
                              </a>
                              <a style={{ fontSize: "x-small" }} className="float-left font-weight-bold ">
                                [{value.count}]
                                                        </a>
                            </div>
                          </td>
                        </tr>
                      )}
                    </tbody>
                  </Table>
                </div>
              </Col>
            </Row>
          </CardBody>
          <CardHeader className="mb-1" style={datastyle}>
            <p style={{ marginBottom: "0px" }}>DATA FROM ONAPP</p>
            <p style={{ marginBottom: "0px" }}>IN TB</p>
          </CardHeader>
        </Card>
      </Fragment>
    )
  }
}

const mapStateToProps = state => {
  return {
    userDetails: state.auth.userProfile
  }
}

export default connect(mapStateToProps, {})(DataStorageUsage)