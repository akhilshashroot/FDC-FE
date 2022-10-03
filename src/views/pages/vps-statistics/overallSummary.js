import React, { Fragment } from 'react';
import { connect } from 'react-redux'
import { Card, CardBody, CardHeader, CardTitle, Progress, Row, Col } from "reactstrap"
import { Settings, ThumbsUp, ThumbsDown, ChevronRight } from "react-feather"
import Chart from "react-apexcharts"
import { Line } from "react-chartjs-2"
import { FaLinux, FaWindows } from "react-icons/fa";
import { Table } from "reactstrap"


let $primary = "#7367F0",
    $white = "#fff",
    grid_line_color = "#dae1e7"

const datastyle = {
    // backgroundColor: "#c7c4ec",
    paddingTop: "3px",
    fontSize: "10px",
    paddingLeft: "10px",
}
const newdatastyle = {
    backgroundColor: "#c7c4ec",
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
const newcardbody = {
    paddingLeft: "0px",
    paddingRight: "0px",
    paddingBottom: "0px",
    paddingTop: "10px"
}





class OverallSummary extends React.PureComponent {

    chartlabels = () => {
        var dat = this.props.data && this.props.data.monthly_sale;
        let labels = []
        if (dat) {
            for (let i = 0; i < dat.length; i++) {
                labels.push(dat[i].title_s)
            }
        }
        return labels
    }
    chartvalues = () => {
        var dat = this.props.data && this.props.data.monthly_sale;
        let values = []
        if (dat) {
            for (let i = 0; i < dat.length; i++) {
                values.push(dat[i].count)
            }
        }
        return values
    }

    data = {
        labels: this.chartlabels(),
        datasets: [
            {
                label: "Overall Summary",
                data: this.chartvalues(),
                borderColor: $primary
            }
        ]
    }

    options = {
        maintainAspectRatio: false,
        responsive: true,
        legend: {
            position: "top"
        },

        scales: {
            xAxes: [
                {
                    display: true,
                    gridLines: {
                        color: grid_line_color
                    },
                    scaleLabel: {
                        display: true,
                    }
                }
            ],
            yAxes: [
                {
                    display: true,
                    gridLines: {
                        color: grid_line_color
                    },
                    scaleLabel: {
                        display: true
                    }
                }
            ]
        },
    }

    state = {
        options: {
            chart: {
                toolbar: {
                    show: false
                }
            },
            dataLabels: {
                enabled: false
            },
            legend: { show: false },
            comparedResult: [2, -3, 8],
            labels: ["Active VMs", "Suspended VMs"],
            stroke: { width: 0 },
            colors: [$primary, $white],
        },
        series: this.props.data && this.props.data.overall && [this.props.data.overall[1].count, this.props.data.overall[2].count]
    }


    render() {

        return (
            <Fragment>
                <Card className="mb-1">
                    <CardHeader style={datastyle}>
                        <CardTitle style={{ fontSize: ".9rem", fontWeight: "bolder" }}>
                            OVERALL SUMMARY
                        </CardTitle>
                        <p style={iconstyle}>
                            <Settings size={15} />
                        </p>
                    </CardHeader>
                    <CardBody style={cardbody}>
                        <Row className="pt-50">
                            <Col md="3">
                                <Chart
                                    options={this.state.options}
                                    series={this.state.series}
                                    type="donut"
                                    height={100}
                                />
                                <p className="mt-1" style={{ fontSize: "xx-large", fontWeight: "bolder", textAlign: "center" }}>
                                    {this.props.data && this.props.data.overall && this.props.data.overall[1].count}
                                </p>
                            </Col>
                            <Col md="9" >
                                <Line data={this.data} options={this.options} height={200} />
                            </Col>
                            <Col md="auto">
                                <div className="title-section">
                                    <h2 style={{ fontSize: "small" }} className="text-bold-600 mt-0 mb-25">{this.props.data && this.props.data.overall && this.props.data.overall[0].count}</h2>
                                    <p style={{ fontSize: "small" }} className="mb-0">Total VMs</p>
                                </div>
                            </Col>
                            <Col className="ml-1" md="auto">
                                <Row>
                                    <ThumbsUp size={30} color={$primary} />
                                    <div className="title-section">
                                        <h2 style={{ fontSize: "small" }} className="text-bold-600 mt-0 mb-25">{this.props.data && this.props.data.overall && this.props.data.overall[1].count}</h2>
                                        <p style={{ fontSize: "small" }} className="mb-0">Active VMs</p>
                                    </div>
                                </Row>
                            </Col>
                            <Col className="ml-1" md="auto">
                                <Row>
                                    <ThumbsDown size={30} color={$primary} />
                                    <div className="title-section">
                                        <h2 style={{ fontSize: "small" }} className="text-bold-600 mt-0 mb-25">{this.props.data && this.props.data.overall && this.props.data.overall[2].count}</h2>
                                        <p style={{ fontSize: "small" }} className="mb-0">Suspended VMs</p>
                                    </div>
                                </Row>
                            </Col>
                            <Col className="ml-1" md="auto">
                                <Row className="float-right">
                                    <FaLinux size={30} color={$primary} />
                                    <div className="title-section">
                                        <h2 style={{ fontSize: "small" }} className="text-bold-600 mt-0 mb-25">{this.props.data && this.props.data.overall && this.props.data.overall[3].count}</h2>
                                        <p style={{ fontSize: "small" }} className="mb-0">Linux</p>
                                    </div>
                                </Row>
                            </Col>
                            <Col className="ml-1" md="auto">
                                <Row>
                                    <FaWindows size={30} color={$primary} />
                                    <div className="title-section">
                                        <h2 style={{ fontSize: "small" }} className="text-bold-600 mt-0 mb-25">{this.props.data && this.props.data.overall && this.props.data.overall[4].count}</h2>
                                        <p style={{ fontSize: "small" }} className="mb-0">Windows</p>
                                    </div>
                                </Row>
                            </Col>
                        </Row>
                        <Card className="ml-0 mr-0 mt-1 mb-0">
                            <CardHeader style={newdatastyle}>
                                <CardTitle style={{ fontSize: ".9rem", fontWeight: "bolder" }}>
                                    CHURN RATE
                                </CardTitle>
                            </CardHeader>
                            <CardBody style={newcardbody}>
                                <Row>
                                    <Col md="12">
                                        <Table striped responsive>
                                            <tbody className="unpaddingrow striped hover">
                                                <tr>
                                                    <td>
                                                        <div className="d-flex justify-content-between">
                                                            <small className="float-left font-weight-bold mb-25">
                                                                Total suspended {this.props.data && this.props.data.churn_rate && this.props.data.churn_rate[4].title} <ChevronRight size={12}></ChevronRight> {this.props.data && this.props.data.churn_rate && this.props.data.churn_rate[4].count} VMs
                                                            </small>
                                                            <small className="float-left font-weight-bold mb-25">
                                                                {this.props.data && this.props.data.churn_rate && this.props.data.churn_rate[4].percent} %
                                                            </small>
                                                        </div>
                                                        <Progress className="mt-25" color="success" value={this.props.data && this.props.data.churn_rate && this.props.data.churn_rate[4].percent} />
                                                    </td>
                                                </tr>
                                                <tr>
                                                    <td>
                                                        <div className="d-flex justify-content-between">
                                                            <small className="float-left font-weight-bold mb-25">
                                                                Total suspended {this.props.data && this.props.data.churn_rate && this.props.data.churn_rate[3].title} <ChevronRight size={12}></ChevronRight> {this.props.data && this.props.data.churn_rate && this.props.data.churn_rate[3].count} VMs
                                                            </small>
                                                            <small className="float-left font-weight-bold mb-25">
                                                                {this.props.data && this.props.data.churn_rate && this.props.data.churn_rate[3].percent} %
                                                            </small>
                                                        </div>
                                                        <Progress className="mt-25" color="danger" value={this.props.data && this.props.data.churn_rate && this.props.data.churn_rate[3].percent} />
                                                    </td>
                                                </tr>
                                                <tr>
                                                    <td>
                                                        <div className="d-flex justify-content-between">
                                                            <small className="float-left font-weight-bold mb-25">
                                                                Total suspended {this.props.data.churn_rate[2].title} <ChevronRight size={12}></ChevronRight> {this.props.data.churn_rate[2].count} VMs
                                                            </small>
                                                            <small className="float-left font-weight-bold mb-25">
                                                                {this.props.data.churn_rate[2].percent} %
                                                            </small>
                                                        </div>
                                                        <Progress className="mt-25" color="primary" value={this.props.data.churn_rate[2].percent} />
                                                    </td>
                                                </tr>
                                                <tr>
                                                    <td>
                                                        <div className="d-flex justify-content-between">
                                                            <small className="float-left font-weight-bold mb-25">
                                                                Total suspended {this.props.data && this.props.data.churn_rate && this.props.data.churn_rate[1].title} <ChevronRight size={12}></ChevronRight> {this.props.data && this.props.data.churn_rate && this.props.data.churn_rate[1].count} VMs
                                                            </small>
                                                            <small className="float-left font-weight-bold mb-25">
                                                                {this.props.data && this.props.data.churn_rate && this.props.data.churn_rate[1].percent} %
                                                            </small>
                                                        </div>
                                                        <Progress className="mt-25" color="info" value={this.props.data.churn_rate[1].percent} />
                                                    </td>
                                                </tr>
                                                <tr>
                                                    <td>
                                                        <div className="d-flex justify-content-between">
                                                            <small className="float-left font-weight-bold mb-25">
                                                                Total suspended {this.props.data && this.props.data.churn_rate && this.props.data.churn_rate[0].title} <ChevronRight size={12}></ChevronRight> {this.props.data && this.props.data.churn_rate && this.props.data.churn_rate[0].count} VMs
                                                            </small>
                                                            <small className="float-left font-weight-bold mb-25">
                                                                {this.props.data && this.props.data.churn_rate && this.props.data.churn_rate[0].percent} %
                                                            </small>
                                                        </div>
                                                        <Progress className="mt-25" color="warning" value={this.props.data && this.props.data.churn_rate && this.props.data.churn_rate[0].percent} />
                                                    </td>
                                                </tr>
                                            </tbody>
                                        </Table>
                                    </Col>
                                </Row>
                            </CardBody>
                        </Card>
                    </CardBody>
                    <CardHeader style={datastyle}>
                        {/* <Button.Ripple color="primary">History</Button.Ripple> */}
                        <p>
                            DATA FROM CRM
                            </p>
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

export default connect(mapStateToProps, {})(OverallSummary)