import React from "react"
import {
    Card,
    CardHeader,
    CardBody,
    Button, Row, Col, FormGroup, Label, Input
} from "reactstrap"
import { FaLink } from 'react-icons/fa';

class IPSearch extends React.Component {

    state = {
        ip_id: null
    }

    // Search on "Enter" key 
    handleSearchKeyDown = (e) => {
        if (e.keyCode === 13) {
            e.preventDefault();
            let ip_id = this.state.ip_id;
            window.open(`https://crm.fdcservers.net/admin/devicemgr/popup_ip_assignment.php?assign_id=${ip_id}`, "_blank")
        }
    }

    render() {
        const { ip_id } = this.state
        const buttonstyle = {
            paddingTop: "11px",
            paddingBottom: "11px",
            marginTop: "19px"
        }
        return (
            <React.Fragment>
                <Card>
                    <CardHeader className="mx-auto flex-column">
                        <h4>IP Search</h4>
                    </CardHeader>
                    <CardBody className="text-center pt-0">
                        <div className="icon-section">
                            <div className="avatar avatar-stats p-50 mt-1 bg-rgba-success">
                                <div className="avatar-content"><FaLink className="success" size={22} /></div>
                            </div>
                        </div>
                        <div className="d-flex justify-content-between mt-2">
                            <Row>
                                <Col lg="12" md="12" sm="12">
                                    <FormGroup className="mb-0">
                                        <Label for="value">IP ID <span style={{ color: "red" }}>*</span></Label>
                                        <Input
                                            type="text"
                                            id="ip_id"
                                            value={ip_id || ""}
                                            onChange={e => this.setState({ ip_id: e.target.value })}
                                            onKeyDown={this.handleSearchKeyDown}
                                        />
                                    </FormGroup>
                                </Col>
                                <Col lg="12" md="12" sm="12">
                                    <Button.Ripple
                                        className="btn-block gradient-light-primary"
                                        style={buttonstyle}
                                        href={`https://crm.fdcservers.net/admin/devicemgr/popup_ip_assignment.php?assign_id=${ip_id}`} target="_blank"
                                    >
                                        Assign A Service ID
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

export default IPSearch
