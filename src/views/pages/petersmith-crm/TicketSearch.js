import React from "react"
import {
    Card,
    CardHeader,
    CardBody,
    Button, Row, Col, FormGroup, Label, Input
} from "reactstrap"
import { FaTicketAlt } from 'react-icons/fa';

class TicketSearch extends React.Component {

    state = {
        ticket: null
    }

    // Search on "Enter" key 
    handleSearchKeyDown = (e) => {
        if (e.keyCode === 13) {
            e.preventDefault();
            let ticket = this.state.ticket;
            window.open(`https://crm.fdcservers.net/admin/supportmgr/ticket_view.php?ticket=${ticket}`, "_blank")
        }
    }

    render() {
        const { ticket } = this.state
        const buttonstyle = {
            paddingTop: "11px",
            paddingBottom: "11px",
            marginTop: "19px"
        }
        return (
            <React.Fragment>
                <Card>
                    <CardHeader className="mx-auto flex-column">
                        <h4>Ticket Search</h4>
                    </CardHeader>
                    <CardBody className="text-center pt-0">
                        <div className="icon-section">
                            <div className="avatar avatar-stats p-50 mt-1 bg-rgba-primary">
                                <div className="avatar-content"><FaTicketAlt className="primary" size={22} /></div>
                            </div>
                        </div>
                        <div className="d-flex justify-content-between mt-2">
                            <Row>
                                <Col lg="12" md="12" sm="12">
                                    <FormGroup className="mb-0">
                                        <Label for="value">Ticket <span style={{ color: "red" }}>*</span></Label>
                                        <Input
                                            type="text"
                                            id="ticket"
                                            value={ticket || ""}
                                            onChange={e => this.setState({ ticket: e.target.value })}
                                            onKeyDown={this.handleSearchKeyDown}
                                        />
                                    </FormGroup>
                                </Col>
                                <Col lg="12" md="12" sm="12">
                                    <Button.Ripple
                                        className="btn-block gradient-light-primary"
                                        style={buttonstyle}
                                        href={`https://crm.fdcservers.net/admin/supportmgr/ticket_view.php?ticket=${ticket}`} target="_blank"
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

export default TicketSearch
