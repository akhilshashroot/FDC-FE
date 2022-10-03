import React from "react"
import { Row, Col } from "reactstrap"
import ResourcesConfig from "./ResourcesConfig"
import queryString from "query-string"
import { userDetailsFetch } from '../../../redux/actions/auth/userProfileActions'
import { connect } from 'react-redux'
import { Redirect } from 'react-router-dom'
import Spinner from "../../../components/@vuexy/spinner/Loading-spinner"

class ResourcesView extends React.Component {

  componentDidMount() {
    if (this.props.userDetails && this.props.userDetails.userDetails && !this.props.userDetails.userDetails.data) {
      this.props.userDetailsFetch()
    }
  }

  render() {
    let resource_manager = localStorage.getItem('resource_manager') || null;
    let user_role = localStorage.getItem("user_role") || null;
    const user_access = resource_manager == 1 ? user_role : " "
    if (this.props.userDetails && this.props.userDetails.userDetails && this.props.userDetails.userDetails.data && (this.props.userDetails.userDetails.data.role !== "Admin" && this.props.userDetails.userDetails.data.role !== "Manager" && this.props.userDetails.userDetails.data.role !== user_access)) {
      return (<Redirect to="/" />)
    } else {
      if (this.props.serverList && (this.props.serverList.isCpuDataLoading || this.props.serverList.isHddDataLoading || this.props.serverList.isRamDataLoading)) {
        return <Spinner />
      } else {
        return (
          <React.Fragment>
            <Row>
              <Col sm="12">
                <ResourcesConfig parsedFilter={queryString.parse(this.props.location.search)} />
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
    serverList: state.ServerList
  }
}

export default connect(mapStateToProps, { userDetailsFetch })(ResourcesView)
