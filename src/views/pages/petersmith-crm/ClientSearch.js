import React from "react"
import {
    Card,
    CardHeader,
    CardBody,
    Button, Row, Col, FormGroup, Label, Input
} from "reactstrap"
import { FaUser } from 'react-icons/fa';

class ClientSearch extends React.Component {

    state = {
        client_id: null
    }

    render() {
        const { client_id } = this.state
        const buttonstyle = {
            paddingTop: "11px",
            paddingBottom: "11px",
            marginTop: "19px"
        }
        return (
            <React.Fragment>
                <Card>
                    <CardHeader className="mx-auto flex-column">
                        <h4>Client Search</h4>
                    </CardHeader>
                    <CardBody className="text-center pt-0">
                        <div className="icon-section">
                            <div className="avatar avatar-stats p-50 mt-1 bg-rgba-info">
                                <div className="avatar-content"><FaUser className="info" size={22} /></div>
                            </div>
                        </div>
                        <div className="d-flex justify-content-between mt-2">
                            <Row>
                                <Col lg="12" md="12" sm="12">
                                    <FormGroup className="mb-0">
                                        <Label for="value">Client ID <span style={{ color: "red" }}>*</span></Label>
                                        <Input
                                            type="text"
                                            id="client_id"
                                            value={client_id || ""}
                                            onChange={e => this.setState({ client_id: e.target.value })}
                                        />
                                    </FormGroup>
                                </Col>
                                <Col lg="4" md="4" sm="12">
                                <Button.Ripple
                                        className="btn-block gradient-light-primary"
                                        style={buttonstyle}
                                        href={`https://crm.fdcservers.net/admin/clientmgr/client_profile.php?clientid=${client_id}`} target="_blank"
                                    >
                                        Open Profile
                                </Button.Ripple>
                                </Col>
                                <Col lg="4" md="4" sm="12">
                                <Button.Ripple
                                        className="btn-block gradient-light-primary"
                                        style={buttonstyle}
                                        href={`https://crm.fdcservers.net/admin/clientmgr/client_view.php?clientid=${client_id}`} target="_blank"
                                    >
                                        Open Service
                                </Button.Ripple>
                                </Col>
                                <Col lg="4" md="4" sm="12">
                                <Button.Ripple
                                        className="btn-block gradient-light-primary"
                                        style={buttonstyle}
                                        href={`https://crm.fdcservers.net/admin/clientmgr/popup_emailclient.php?clientid=${client_id}`} target="_blank"
                                    >
                                        Open Ticket
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

export default ClientSearch
