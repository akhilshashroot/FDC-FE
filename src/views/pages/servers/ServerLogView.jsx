import React from "react"
import { Row, Col } from "reactstrap"
import ServerLogConfig from "./ServerLogConfig"
import { fetchActivityLogs } from "../../../redux/actions/inventory/"
import { fetchServerLogs } from "../../../redux/actions/servers/"
import { connect } from "react-redux"

class ServerLogView extends React.Component {
  state = { locationValue: this.props.location && this.props.location.state && this.props.location.state.selecetd_location }

  componentDidMount() {
    this.props.fetchServerLogs(this.props.selectedSwitch)
  }
  render() {
    alert()
    return (
      <React.Fragment>
        <Row>
          <Col sm="12">
            <ServerLogConfig />
          </Col>
        </Row>
      </React.Fragment>
    )
  }
}

const mapStateToProps = state => {
  return {
    inventoryList: state.inventoryList,
    serverlogList: state.ServerList
  }
}
export default connect(mapStateToProps, { fetchActivityLogs, fetchServerLogs })(ServerLogView)