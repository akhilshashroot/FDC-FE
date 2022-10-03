import React from "react"
import { 
    Row,
    Col,
} from "reactstrap"
import TicketSearch from "./TicketSearch"
import IPSearch from "./IPSearch"
import ClientSearch from "./ClientSearch"
import ServiceSearch from "./ServiceSearch"
import DeviceSearch from "./DeviceSearch"

class PetersmithCrmView extends React.Component {
  render() {
    return (
      <React.Fragment>
      <Row>
        <Col lg="4" md="6" sm="12">
            <TicketSearch/>
        </Col>
        <Col lg="4" md="6" sm="12">
            <IPSearch/>
        </Col>
        <Col lg="4" md="6" sm="12">
            <DeviceSearch/>
        </Col>
        <Col lg="4" md="6" sm="12">
            <ServiceSearch/>
        </Col>
        <Col lg="4" md="6" sm="12">
            <ClientSearch/>
        </Col>
      </Row>
      </React.Fragment>
    )
  }
}

export default PetersmithCrmView
