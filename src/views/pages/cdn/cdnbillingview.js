import React, { Fragment } from 'react';
import { connect } from 'react-redux'
import CDNBillingConfig from './cdnbillingconfig'

class CDNBillingView extends React.PureComponent {
  render() {
    return (
      <Fragment>
        <CDNBillingConfig />
      </Fragment>
    )
  }
}

const mapStateToProps = state => {
  return {
    userDetails: state.auth.userProfile
  }
}

export default connect(mapStateToProps, {})(CDNBillingView)