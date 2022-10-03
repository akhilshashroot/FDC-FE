import React from "react"
import { Row, Col } from "reactstrap"
import UserListConfig from "./UserListConfig"
import queryString from "query-string"
import { userDetailsFetch } from '../../../redux/actions/auth/userProfileActions'
import { connect } from 'react-redux'
import { Redirect } from 'react-router-dom'
import Spinner from "../../../components/@vuexy/spinner/Loading-spinner"

class UserView extends React.Component {
  componentDidMount() {
    if (this.props.userDetails && this.props.userDetails.userDetails && !this.props.userDetails.userDetails.data) {
      this.props.userDetailsFetch()
    }

  }
  render() {
    if (this.props.userDetails && this.props.userDetails.userDetails && this.props.userDetails.userDetails.data && this.props.userDetails.userDetails.data.role !== "Admin") {
      return (<Redirect to="/" />)
    } else {
      if (this.props.userList && this.props.userList.isAllUSERLoading) {
        return <Spinner />
      } else {
        return (
          <React.Fragment>
            <Row>
              <Col sm="12">
                <UserListConfig parsedFilter={queryString.parse(this.props.location.search)} />
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
    userList: state.userList
  }
}

export default connect(mapStateToProps, { userDetailsFetch })(UserView)