import React, { Fragment } from 'react';
import { connect } from 'react-redux'
import { Card, CardBody, CardHeader, CardTitle, Row, Col } from "reactstrap"
import { Table, Badge } from "reactstrap"



const datastyle = {
    // backgroundColor: "#c7c4ec",
    paddingTop: "3px",
    fontSize: "10px",
    paddingLeft: "10px",
}

const cardbody = {
    paddingLeft: "10px",
    paddingRight: "10px",
    paddingBottom: "0px",
    paddingTop: "0px"
}



class WindowsLicense extends React.PureComponent {


    render() {
        const { windows_licence } = this.props.data

        return (
            <Fragment>
                <Card >
                    <CardHeader style={datastyle}>
                        <CardTitle style={{ fontSize: ".9rem", fontWeight: "bolder", marginTop: "5px" }}>
                            WINDOWS LICENSE
                        </CardTitle>
                    </CardHeader>
                    <CardBody style={cardbody}>
                        <Row className="pt-50">
                            <Col md="12">
                                <Table striped responsive>
                                    <tbody className=" striped hover">
                                        {windows_licence && windows_licence.length && windows_licence.map((value, index) =>
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
                    <CardHeader className="mb-1" style={datastyle}>
                        <p style={{ marginBottom: "0px" }}>DATA FROM ONAPP</p>
                        <p style={{ marginBottom: "0px" }}>Total - 56</p>
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

export default connect(mapStateToProps, {})(WindowsLicense)