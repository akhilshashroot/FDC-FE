import React, { Fragment } from "react"
import IpwatchShipmentList from './IpwatchShipmentList'
import { connect } from 'react-redux'

class IpwatchShipmentView extends React.PureComponent {

    render() {
        return (
            <Fragment>
                <IpwatchShipmentList />
            </Fragment>
        )
    }
}

const mapStateToProps = state => {
    return {
        userDetails: state.auth.userProfile
    }
}


export default connect(mapStateToProps, {})(IpwatchShipmentView)