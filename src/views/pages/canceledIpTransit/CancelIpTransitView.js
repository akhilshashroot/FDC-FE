import React, { Fragment } from 'react';
import { connect } from 'react-redux'
import CancelIpTransitConfig from './CancelIpTransitConfig'

class CancelIpTransistView extends React.PureComponent {
  render() {
    return (
      <Fragment>
        <CancelIpTransitConfig />
      </Fragment>
    )
  }
}

const mapStateToProps = state => {
  return {
    userDetails: state.auth.userProfile
  }
}

export default connect(mapStateToProps, {})(CancelIpTransistView)

