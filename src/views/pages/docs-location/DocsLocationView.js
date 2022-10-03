import React from "react"
import { Row, Col } from "reactstrap"
import DocsLocationList from "./DocsLocationList"
import { connect } from 'react-redux'
import { Redirect } from 'react-router-dom'

class LocationView extends React.PureComponent {


  render() {
    if (this.props.userDetails && this.props.userDetails.userDetails && this.props.userDetails.userDetails.data && this.props.userDetails.userDetails.data.role !== "Admin") {
      return (<Redirect to="/" />)
    } else {
      return (
        <React.Fragment>
          <Row>
            <Col sm="12">
              <DocsLocationList />
            </Col>
          </Row>
        </React.Fragment>
      )
    }
  }
}

const mapStateToProps = state => {
  return {
    userDetails: state.auth.userProfile
  }
}

export default connect(mapStateToProps, null)(LocationView)
