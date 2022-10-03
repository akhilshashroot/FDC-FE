import React from "react"
import {
    Card,
    CardHeader,
    CardBody,
    Button, Row, Col, FormGroup, Label, Input
} from "reactstrap"
import { BiDevices } from 'react-icons/bi';

class DeviceSearch extends React.Component {

    state = {
        device: null
    }

    // Search on "Enter" key 
    handleSearchKeyDown = (e) => {
        if (e.keyCode === 13) {
            e.preventDefault();
            let device = this.state.device;
            window.open(`https://crm.fdcservers.net/admin/search_results.php?searchfor=${device}`, "_blank")
        }
    }

    render() {
        const { device } = this.state
        const buttonstyle = {
            paddingTop: "11px",
            paddingBottom: "11px",
            marginTop: "19px"
        }
        return (
            <React.Fragment>
                <Card>
                    <CardHeader className="mx-auto flex-column">
                        <h4>Device Search</h4>
                    </CardHeader>
                    <CardBody className="text-center pt-0">
                        <div className="icon-section">
                            <div className="avatar avatar-stats p-50 mt-1 bg-rgba-danger">
                                <div className="avatar-content"><BiDevices className="danger" size={22} /></div>
                            </div>
                        </div>
                        <div className="d-flex justify-content-between mt-2">
                            <Row>
                                <Col lg="12" md="12" sm="12">
                                    <FormGroup className="mb-0">
                                        <Label for="value">Device <span style={{ color: "red" }}>*</span></Label>
                                        <Input
                                            type="text"
                                            id="device"
                                            value={device || ""}
                                            onChange={e => this.setState({ device: e.target.value })}
                                            onKeyDown={this.handleSearchKeyDown}
                                        />
                                    </FormGroup>
                                </Col>
                                <Col lg="12" md="12" sm="12">
                                    <Button.Ripple
                                        className="btn-block gradient-light-primary"
                                        style={buttonstyle}
                                        href={`https://crm.fdcservers.net/admin/search_results.php?searchfor=${device}`} target="_blank"
                                    >
                                        Search In Devices
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

export default DeviceSearch
