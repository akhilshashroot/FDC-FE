import React from "react"
import {
    Card,
    CardHeader,
    CardBody,
    Button, Row, Col, FormGroup, Label, Input
} from "reactstrap"
import { FaServicestack } from 'react-icons/fa';

class ServiceSearch extends React.Component {

    state = {
        service_id: null
    }

    render() {
        const { service_id } = this.state;

        const buttonstyle = {
            paddingTop: "11px",
            paddingBottom: "11px",
            marginTop: "19px",
            paddingLeft: "24px",
            paddingRight: "24px"
        }

        return (
            <React.Fragment>
                <Card>
                    <CardHeader className="mx-auto flex-column">
                        <h4>Service Search</h4>
                    </CardHeader>
                    <CardBody className="text-center pt-0">
                        <div className="icon-section">
                            <div className="avatar avatar-stats p-50 mt-1 bg-rgba-warning">
                                <div className="avatar-content"><FaServicestack className="warning" size={22} /></div>
                            </div>
                        </div>
                        <div className="d-flex justify-content-between mt-2">
                            <Row>
                                <Col lg="12" md="12" sm="12">
                                    <FormGroup className="mb-0">
                                        <Label for="value">Service ID <span style={{ color: "red" }}>*</span></Label>
                                        <Input
                                            type="text"
                                            id="service_id"
                                            value={service_id || ""}
                                            onChange={e => this.setState({ service_id: e.target.value })}
                                        />
                                    </FormGroup>
                                </Col>
                                <Col lg="6" md="6" sm="12">
                                    <Button.Ripple
                                        className="btn-block gradient-light-primary"
                                        style={buttonstyle}
                                        href={`https://crm.fdcservers.net/admin/clientmgr/client_service_details.php?packid=${service_id}`} target="_blank"
                                    >
                                        Open Specific Service
                                </Button.Ripple>
                                </Col>
                                <Col lg="6" md="6" sm="12">
                                    <Button.Ripple
                                        className="btn-block gradient-light-primary"
                                        style={buttonstyle}
                                        href={`https://pts.fdcservers.net/function/information/service.php?packid=${service_id}`} target="_blank"
                                    >
                                        Edit Specific Service
                                </Button.Ripple>
                                </Col>
                            </Row>
                        </div>
                    </CardBody>
                </Card>
            </React.Fragment>
        )
    }
}

export default ServiceSearch
