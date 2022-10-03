import React, { Fragment } from 'react';
import { connect } from 'react-redux'
import PetersmithOrdersList from './PetersmithOrdersList'

class PetersmithCrmView extends React.PureComponent {

  render() {
    return (
      <Fragment>
        <PetersmithOrdersList />
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