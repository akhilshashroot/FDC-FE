import React, { Fragment } from 'react';
import { connect } from 'react-redux'
import { Card, CardBody, CardHeader, CardTitle, Row, Col } from "reactstrap"
import { Settings, RefreshCw } from "react-feather"
import { Line } from "react-chartjs-2"
import { FaDesktop, FaLaptop, FaGlobeAmericas } from "react-icons/fa";


let $primary = "#7367F0",
    $danger = "#EA5455",
    $warning = "#FF9F43",
    grid_line_color = "#dae1e7"

const datastyle = {
    // backgroundColor: "#c7c4ec",
    paddingTop: "3px",
    fontSize: "10px",
    paddingLeft: "10px",
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





class PackageSummary extends React.PureComponent {
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

    chartstartervalues = () => {
        var dat = this.props.data && this.props.data.monthly_sale;
        let values = []
        if (dat) {
            for (let i = 0; i < dat.length; i++) {
                values.push(dat[i].start)
            }
        }
        return values
    }

    chartenterpricevalues = () => {
        var dat = this.props.data && this.props.data.monthly_sale;
        let values = []
        if (dat) {
            for (let i = 0; i < dat.length; i++) {
                values.push(dat[i].enterprise)
            }
        }
        return values
    }

    chartcloudvalues = () => {
        var dat = this.props.data && this.props.data.monthly_sale;
        let values = []
        for (let i = 0; i < dat.length; i++) {
            values.push(dat[i].cloud)
        }
        return values
    }
    data = {
        labels: this.chartlabels(),
        datasets: [
            {
                label: "Starter",
                data: this.chartstartervalues(),
                borderColor: $primary
            },
            {
                label: "Enterprice",
                data: this.chartenterpricevalues(),
                borderColor: $warning
            },
            {
                label: "Cold Storage",
                data: this.chartcloudvalues(),
                borderColor: $danger
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


    render() {

        return (
            <Fragment>
                <Card >
                    <CardHeader style={datastyle}>
                        <CardTitle style={{ fontSize: ".9rem", fontWeight: "bolder" }}>
                            PACKAGE SUMMARY
                        </CardTitle>
                        <p style={iconstyle}>
                            <RefreshCw size={15} />
                            <Settings size={15} className="ml-1" />
                        </p>
                    </CardHeader>
                    <CardBody style={cardbody}>
                        <Row className="pt-50">
                            <Col md="12" >
                                <Line data={this.data} options={this.options} height={200} />
                            </Col>
                            <Col className="ml-1" md="auto">
                                <Row>
                                    <FaGlobeAmericas size={30} color={$primary} />
                                    <div className="title-section">
                                        <h2 style={{ fontSize: "small" }} className="text-bold-600 mt-0 mb-25">{this.props.data && this.props.data.package && this.props.data.package.length && this.props.data.package[0].count}</h2>
                                        <p style={{ fontSize: "small" }} className="mb-0">Starter</p>
                                    </div>
                                </Row>
                            </Col>
                            <Col className="ml-1" md="auto">
                                <Row>
                                    <FaDesktop size={30} color={$primary} />
                                    <div className="title-section">
                                        <h2 style={{ fontSize: "small" }} className="text-bold-600 mt-0 mb-25">{this.props.data && this.props.data.package && this.props.data.package.length && this.props.data.package[1].count}</h2>
                                        <p style={{ fontSize: "small" }} className="mb-0">Enterprice</p>
                                    </div>
                                </Row>
                            </Col>
                            <Col className="ml-1" md="auto">
                                <Row>
                                    <FaLaptop size={30} color={$primary} />
                                    <div className="title-section">
                                        <h2 style={{ fontSize: "small" }} className="text-bold-600 mt-0 mb-25">{this.props.data && this.props.data.package && this.props.data.package.length && this.props.data.package[2].count}</h2>
                                        <p style={{ fontSize: "small" }} className="mb-0">Cloud-Storage</p>
                                    </div>
                                </Row>
                            </Col>
                        </Row>
                    </CardBody>
                    <CardHeader className="mt-1" style={datastyle}>
                        {/* <Button.Ripple color="primary">History</Button.Ripple> */}
                        <p>
                            DATA FROM ONAPP
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

export default connect(mapStateToProps, {})(PackageSummary)