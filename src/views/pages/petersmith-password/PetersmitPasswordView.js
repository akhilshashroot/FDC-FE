import React, { Fragment } from 'react';
import { connect } from 'react-redux'
import PetersmithPasswordGenerator from './PetersmithPasswordGenerator'

class PetersmithPasswordView extends React.PureComponent {

  render() {
    return (
      <Fragment>
        <PetersmithPasswordGenerator />
      </Fragment>
    )
  }
}

const mapStateToProps = state => {
  return {
    userDetails: state.auth.userProfile
  }
}

export default connect(mapStateToProps, {})(PetersmithPasswordView)