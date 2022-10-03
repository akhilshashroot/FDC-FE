import React, { Fragment } from 'react';
import { connect } from 'react-redux'
import { Card, CardBody, CardHeader, CardTitle, Row, Col } from "reactstrap"
import { Settings, MapPin, Star } from "react-feather"
import { Table, Badge } from "reactstrap"


let $primary = "#7367F0"


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

class LocationSummary extends React.PureComponent {
    render() {
        const { location } = this.props.data
        return (
            <Fragment>
                <Card className="mb-1">
                    <CardHeader style={datastyle}>
                        <CardTitle style={{ fontSize: ".9rem", fontWeight: "bolder" }}>
                            LOCATION SUMMARY
                        </CardTitle>
                        <p style={iconstyle}>
                            <Settings size={15} />
                        </p>
                    </CardHeader>
                    <CardBody style={cardbody}>
                        <Row className="pt-50">
                            <Col className="ml-1" md="auto">
                                <Row>
                                    <MapPin size={30} color={$primary} />
                                    <div className="title-section">
                                        <h2 style={{ fontSize: "large" }} className="text-bold-600 mt-0 mb-15">11</h2>
                                        <p style={{ fontSize: "small" }} className="mb-0">Total</p>
                                    </div>
                                </Row>
                            </Col>
                            <Col className="ml-1" md="auto">
                                <Row>
                                    <Star size={30} color={$primary} />
                                    <div className="title-section">
                                        <h2 style={{ fontSize: "large" }} className="text-bold-600 mt-0 mb-15">8</h2>
                                        <p style={{ fontSize: "small" }} className="mb-0">ENT</p>
                                    </div>
                                </Row>
                            </Col>
                        </Row>
                        <Row className="pt-50">
                            <Col md="12">
                                <Table striped responsive>
                                    <tbody className=" striped hover">
                                        {location && location.map((value, index) =>
                                            <tr key={index}>
                                                <td>
                                                    <div className="d-flex justify-content-between">
                                                        <p className="float-left font-weight-bold mb-25 mt-25">
                                                            {value.title}
                                                        </p>
                                                        <p className="float-left font-weight-bold mb-25 mt-25">
                                                            <Badge className="font-weight-bold" color="success">{value.count}</Badge>
                                                        </p>
                                                    </div>
                                                </td>
                                            </tr>
                                        )}
                                    </tbody>
                                </Table>
                            </Col>
                        </Row>
                    </CardBody>
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

export default connect(mapStateToProps, {})(LocationSummary)