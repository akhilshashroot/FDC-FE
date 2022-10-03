import React from "react";
import { Row, Col } from "reactstrap";
import LocationConfig from "./LocationConfig";
import { connect } from 'react-redux';

class LocationView extends React.PureComponent {
  render() {
    return (
      <React.Fragment>
        <Row>
          <Col sm="12">
            <LocationConfig />
          </Col>
        </Row>
      </React.Fragment>
    )
  }
}

const mapStateToProps = state => {
  return {
    userDetails: state.auth.userProfile
  }
}

export default connect(mapStateToProps, null)(LocationView)
