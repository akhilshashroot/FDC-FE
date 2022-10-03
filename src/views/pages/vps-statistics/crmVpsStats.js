import React, { Fragment } from 'react';
import { connect } from 'react-redux'
import { Card, CardBody, CardHeader, CardTitle, Progress, Row, Col } from "reactstrap"
import { Settings, ChevronsRight, ChevronRight } from "react-feather"

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

class CrmVpsStats extends React.PureComponent {

    convertToPercentage = (value) => {
        const percentage = (value / this.props.data.CRM_data[0].count) * 100
        const roundoff = Math.round((percentage + Number.EPSILON) * 100) / 100
        return roundoff
    }

    render() {
        const { CRM_data } = this.props.data
        return (
            <Fragment>
                <Card className="mb-1">
                    <CardHeader style={datastyle}>
                        <CardTitle style={{ fontSize: ".9rem", fontWeight: "bolder" }}>
                            CRM VPS STATS
                        </CardTitle>
                        <p style={iconstyle}>
                            <Settings size={15} />
                        </p>
                    </CardHeader>
                    <CardBody style={cardbody}>

                        <p className="mb-0 mt-1" style={{ fontSize: "small", fontWeight: "bolder" }}>
                            Total <ChevronsRight size={12}></ChevronsRight> {CRM_data && CRM_data.length && CRM_data[0].count}
                        </p>
                        <Row className="pt-50">
                            <Col md="12">
                                <div className="d-flex justify-content-between">
                                    <small className="float-left font-weight-bold mb-25">
                                        Activate <ChevronRight size={12}></ChevronRight> {CRM_data && CRM_data.length && CRM_data[1].count}
                                    </small>
                                    <small className="float-left font-weight-bold mb-25">
                                        {CRM_data && CRM_data.length && this.convertToPercentage(CRM_data[1].count)} %
                                    </small>
                                </div>
                                <Progress className="mt-25" color="success" value={CRM_data && CRM_data.length && this.convertToPercentage(CRM_data[1].count)} />
                            </Col>
                            <Col md="12">
                                <div className="d-flex justify-content-between">
                                    <small className="float-left font-weight-bold mb-25">
                                        Deactivate <ChevronRight size={12}></ChevronRight> {CRM_data && CRM_data.length && CRM_data[2].count}
                                    </small>
                                    <small className="float-left font-weight-bold mb-25">
                                        {CRM_data && CRM_data.length && this.convertToPercentage(CRM_data[2].count)} %
                                    </small>
                                </div>
                                <Progress className="mt-25" color="danger" value={CRM_data && CRM_data.length && this.convertToPercentage(CRM_data[2].count)} />
                            </Col>
                            <Col md="12">
                                <div className="d-flex justify-content-between">
                                    <small className="float-left font-weight-bold mb-25">
                                        Cancelled <ChevronRight size={12}></ChevronRight> {CRM_data && CRM_data.length && CRM_data[3].count}
                                    </small>
                                    <small className="float-left font-weight-bold mb-25">
                                        {CRM_data && CRM_data.length && this.convertToPercentage(CRM_data[3].count)} %
                                    </small>
                                </div>
                                <Progress className="mt-25" color="warning" value={CRM_data && CRM_data.length && this.convertToPercentage(CRM_data[3].count)} />
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

export default connect(mapStateToProps, {})(CrmVpsStats)