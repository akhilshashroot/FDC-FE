import React from "react"
import { Row, Col } from "reactstrap"
import InventoryListConfig from "./InventoryConfig"

class InventoryView extends React.PureComponent {
  render() {
    return (
      <React.Fragment>
        <Row>
          <Col sm="12">
            <InventoryListConfig />
          </Col>
        </Row>
      </React.Fragment>
    )
  }
}

export default InventoryView