import React, { Fragment } from 'react';
import { connect } from 'react-redux'
import PetersmithCrmConfig from './PetersmithCrmConfig'

class PetersmithCrmView extends React.PureComponent {

  render() {
    return (
      <Fragment>
        <PetersmithCrmConfig />
      </Fragment>
    )
  }
}

const mapStateToProps = state => {
  return {
    userDetails: state.auth.userProfile
  }
}

export default connect(mapStateToProps, {})(PetersmithCrmView)