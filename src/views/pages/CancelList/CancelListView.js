import React, { Fragment } from 'react';
import { connect } from 'react-redux'
import CancelListConfig from './CancelListConfig'

class CancelListView extends React.PureComponent {
  render() {
    return (
      <Fragment>
        <CancelListConfig />
      </Fragment>
    )
  }
}

const mapStateToProps = state => {
  return {
    userDetails: state.auth.userProfile
  }
}

export default connect(mapStateToProps, {})(CancelListView)