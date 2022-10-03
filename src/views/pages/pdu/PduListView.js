import React from "react"
import { Row, Col } from "reactstrap"
import PduListConfig from "./PduListConfig"
import queryString from "query-string"
import { userDetailsFetch } from '../../../redux/actions/auth/userProfileActions'
import { connect } from 'react-redux'
import { Redirect } from 'react-router-dom'
import Spinner from "../../../components/@vuexy/spinner/Loading-spinner"

class PduListView extends React.Component {
  componentDidMount() {
    if (this.props.userDetails && this.props.userDetails.userDetails && !this.props.userDetails.userDetails.data) {
      this.props.userDetailsFetch()
    }
  }
  render() {
    if (this.props.userDetails && this.props.userDetails.userDetails && this.props.userDetails.userDetails.data && this.props.userDetails.userDetails.data.role !== "Admin") {
      return (<Redirect to="/" />)
    } else {
      if (this.props.pduList && this.props.pduList.isAllPduLoading) {
        return <Spinner />
      } else {
        return (
          <React.Fragment>
            <Row>
              <Col sm="12">
                <PduListConfig parsedFilter={queryString.parse(this.props.location.search)} history={this.props.history} />
              </Col>
            </Row>
          </React.Fragment>
        )
      }
    }
  }
}

const mapStateToProps = state => {
  return {
    userDetails: state.auth.userProfile,
    pduList: state.pduList,
  }
}

export default connect(mapStateToProps, { userDetailsFetch })(PduListView)
