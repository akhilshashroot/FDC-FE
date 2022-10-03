import React, { Fragment } from "react"
import DocsDocumentationConfig from './documentationConfig'
import { connect } from 'react-redux'
class DocsDocumentation extends React.PureComponent {

    render() {
        return (
            <Fragment>
                <DocsDocumentationConfig />
            </Fragment>
        )
    }
}

const mapStateToProps = state => {
    return {
        userDetails: state.auth.userProfile
    }
}


export default connect(mapStateToProps, {})(DocsDocumentation)