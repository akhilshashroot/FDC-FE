import React, { Fragment } from 'react';
import { connect } from 'react-redux'
import StatisticsConfig from './statisticsConfig'
class statisticsView extends React.PureComponent {



  render() {
    return (
      <Fragment>
        <StatisticsConfig />
      </Fragment>
    )
  }
}

const mapStateToProps = state => {
  return {
    userDetails: state.auth.userProfile
  }
}

export default connect(mapStateToProps, {})(statisticsView)