import React, { Fragment } from 'react';
import { connect } from 'react-redux'
import PetersmithTicketsList from './PetersmithTicketsList'

class PetersmithTicketsView extends React.PureComponent {

  render() {
    return (
      <Fragment>
        <PetersmithTicketsList userDetails ={this.props.userDetails} />
      </Fragment>
    )
  }
}

const mapStateToProps = state => {
  return {
    userDetails: state.auth.userProfile
  }
}

export default connect(mapStateToProps, {})(PetersmithTicketsView)