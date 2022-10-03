import React, { Fragment } from 'react';
import { connect } from 'react-redux'
import IpWatchSearchView from './IpwatchSearchView'

class IpWatchView extends React.PureComponent {

  render() {
    return (
      <Fragment>
        <IpWatchSearchView />
      </Fragment>
    )
  }
}

const mapStateToProps = state => {
  return {
    userDetails: state.auth.userProfile
  }
}

export default connect(mapStateToProps, {})(IpWatchView)