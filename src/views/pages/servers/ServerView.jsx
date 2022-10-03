import React from "react"
import { Row, Col } from "reactstrap"
import ServerConfig from './ServerConfig'
import { connect } from "react-redux"
import Spinner from "../../../components/@vuexy/spinner/Loading-spinner"
import { getInitialData } from "../../../redux/actions/data-list"

class ServerView extends React.Component {
  componentDidMount() {
    if (this.props.dataList && this.props.dataList.allData && !this.props.dataList.allData.length > 0) {
      this.props.getInitialData()
    }
  }
  render() {
    return (
      <React.Fragment>
        {this.props.dataList && this.props.dataList.allData && this.props.dataList.allData.length > 0
          ?
          <React.Fragment>
            <Row>
              <Col sm="12">
                <ServerConfig />
              </Col>
            </Row>
          </React.Fragment>

          :
          <Spinner />
        }
      </React.Fragment>
    )
  }
}

const mapStateToProps = state => {
  return {
    dataList: state.dataList,
    serverList: state.serverList
  }
}

export default connect(mapStateToProps, { getInitialData })(ServerView)
