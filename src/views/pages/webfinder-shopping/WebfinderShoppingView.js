import React, { Fragment } from 'react';
import { connect } from 'react-redux'
import WebfinderShoppingConfig from './WebfinderShoppingConfig'

class WebfinderShoppingView extends React.PureComponent {
  render() {
    return (
      <Fragment>
        <WebfinderShoppingConfig />
      </Fragment>
    )
  }
}

const mapStateToProps = state => {
  return {
    userDetails: state.auth.userProfile
  }
}

export default connect(mapStateToProps, {})(WebfinderShoppingView)