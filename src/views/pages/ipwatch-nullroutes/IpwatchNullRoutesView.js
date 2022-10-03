import React, { Fragment } from 'react';
import { connect } from 'react-redux'
import IpwatchNullrouteList from './IpwatchNullRouteList'

class IpwatchNullrouteView extends React.PureComponent {

  render() {
    return (
      <Fragment>
        <IpwatchNullrouteList />
      </Fragment>
    )
  }
}

const mapStateToProps = state => {
  return {
    userDetails: state.auth.userProfile
  }
}

export default connect(mapStateToProps, {})(IpwatchNullrouteView)