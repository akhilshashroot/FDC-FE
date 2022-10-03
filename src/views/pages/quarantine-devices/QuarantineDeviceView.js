import React, { Fragment } from 'react';
import { connect } from 'react-redux'
import QuarantineDeviceList from './QuarantineDeviceList'

class QuarantineDeviceView extends React.PureComponent {

  render() {
    return (
      <Fragment>
        <QuarantineDeviceList userDetails ={this.props.userDetails} />
      </Fragment>
    )
  }
}

const mapStateToProps = state => {
  return {
    userDetails: state.auth.userProfile
  }
}

export default connect(mapStateToProps, {})(QuarantineDeviceView)