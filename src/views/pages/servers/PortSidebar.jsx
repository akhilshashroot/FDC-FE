import React, { Component, Fragment } from "react"
import { Label, Input, FormGroup, Button, Form, Row, Col } from "reactstrap"
import { X } from "react-feather"
import PerfectScrollbar from "react-perfect-scrollbar"
import classnames from "classnames"
import { addServersPort, UpdatePort } from "../../../redux/actions/servers"
import Spinner from "../../../components/@vuexy/spinner/Loading-spinner"
import { connect } from "react-redux"
import Select from 'react-select';

const initialState = {
  id: "",
  loc_id: "",
  switch_id: "",
  port_no: "",
  bw: "",
  vlan: "",
  ip: "",
  info: "",
  port_no_Req: false,
  childSwitch: ""
};

class PortSidebar extends Component {
  state = initialState
  statusSelectRef = React.createRef();
  addNew = false

  componentDidMount = () => {

    if (this.props.selectedSwitch) {
      this.setState({ childSwitch: { "label": this.props.selectedSwitch.label, "value": this.props.selectedSwitch.id } })
    } else {
      var switchObj = JSON.parse(localStorage.getItem('l_s'));
      switchObj && this.setState({ childSwitch: switchObj })
    }
    if (this.props.data) {
      if (this.props.data.id) {
        this.setState({ id: this.props.data.id })
      }
      if (this.props.data.port_no) {
        this.setState({ port_no: this.props.data.port_no })
      }
      if (this.props.data.bw) {
        this.setState({ bw: this.props.data.bw })
      }
      if (this.props.data.vlan) {
        this.setState({ vlan: this.props.data.vlan })
      }
      if (this.props.data.ip) {
        this.setState({ ip: this.props.data.ip })
      }
      if (this.props.data.port_info) {
        this.setState({ info: this.props.data.port_info })
      }
    }
  }


  componentDidUpdate(prevProps, prevState) {
    if (this.props.data !== null && prevProps.data === null) {
      if (this.props.data.id !== prevState.id) {
        this.setState({ id: this.props.data.id })
      }
      if (this.props.data.port_no !== prevState.port_no) {
        this.setState({ port_no: this.props.data.port_no })
      }
      if (this.props.data.bw !== prevState.bw) {
        this.setState({ bw: this.props.data.bw })
      }
      if (this.props.data.vlan !== prevState.vlan) {
        this.setState({ vlan: this.props.data.vlan })
      }
      if (this.props.data.ip !== prevState.ip) {
        this.setState({ ip: this.props.data.ip })
      }
      if (this.props.data.port_info !== prevState.info) {
        this.setState({ info: this.props.data.port_info })
      }

    }
    if (this.props.data === null && prevProps.data !== null) {
      this.setState(initialState)
    }
    if (this.addNew) {
      this.setState({
        location: "",
        location_short: "",
      })
    }
    this.addNew = false
  }
  handleSubmit = obj => {

    if (this.props.data !== null) {
      if (this.state.port_no) {
        let updateData = {};
        updateData.loc_id = this.props.selectedLocation && this.props.selectedLocation.value;
        updateData.switch_id = this.state.childSwitch && this.state.childSwitch.value;
        (this.props.data.port_no !== this.state.port_no) && (updateData.port_no = this.state.port_no ? this.state.port_no : "");
        this.props.data.ip !== this.state.ip && (updateData.ip = this.state.ip);
        this.props.data.bw !== this.state.bw && (updateData.bw = this.state.bw);
        this.props.data.vlan !== this.state.vlan && (updateData.vlan = this.state.vlan);
        this.props.data.port_info !== this.state.info && (updateData.info = this.state.info);

        var current_location_switch = this.state.childSwitch && this.state.childSwitch.value

        this.props.UpdatePort(this.props.data.port_id, updateData, current_location_switch).then(() => {
          if (this.props.serverList && this.props.serverList.PortUpdated) {
            this.props.handlePortSidebar(false, true)
            this.props.UpdateMessage()
          } else {
            if (this.props.serverList && this.props.serverList.portInUse) {
              this.props.portInUseWarning()
            } else {
              this.props.ErrorMessage()
            }

          }
        })
      } else {
        this.state.port_no ? this.setState({ port_no_Req: false }) : this.setState({ port_no_Req: true })
        this.props.inCompleteData()
      }

    } else {
      if (this.props.selectedLocation && this.state.childSwitch && this.state.port_no) {
        this.addNew = true
        let addServerPortData = {}
        addServerPortData.loc_id = this.props.selectedLocation && this.props.selectedLocation.value;
        addServerPortData.switch_id = this.state.childSwitch && this.state.childSwitch.value;
        addServerPortData.port_no = this.state.port_no ? this.state.port_no : "";
        this.state.ip && (addServerPortData.ip = this.state.ip);
        this.state.bw && (addServerPortData.bw = this.state.bw);
        this.state.vlan && (addServerPortData.vlan = this.state.vlan);
        this.state.info && (addServerPortData.info = this.state.info);
        current_location_switch = this.state.childSwitch && this.state.childSwitch.value
        let list_Server = this.props.selectedSwitch ? true : false;
        this.props.addServersPort(addServerPortData, current_location_switch, list_Server).then(() => {
          if (this.props.serverList && this.props.serverList.addedPort) {
            this.props.handlePortSidebar(false, true)
            this.props.AddMessage()
          } else {
            this.props.ErrorMessage()
          }
        })
      } else {
        this.state.port_no ? this.setState({ port_no_Req: false }) : this.setState({ port_no_Req: true })
        this.props.inCompleteData()
      }

    }
  }


  render() {
    let { show, handlePortSidebar, data } = this.props
    let { port_no, bw, vlan, ip, info, port_no_Req } = this.state

    return (
      <Fragment>
        {this.props.dataList && this.props.dataList.isLoading
          ? <Spinner />
          :
          <div
            className={classnames("data-list-sidebar", {
              show: show
            })}>
            <div className="data-list-sidebar-header mt-2 px-2 d-flex justify-content-between">
              <h4>{data !== null ? "UPDATE PORT" : "ADD NEW PORT"}</h4>
              <X size={20} onClick={() => handlePortSidebar(false, true)} />
            </div>
            <PerfectScrollbar
              className="data-list-fields px-2 mt-0"
              options={{ wheelPropagation: false }}>
              <Form className="mt-1">
                <Row>
                  <Col md="12" sm="12">
                    <FormGroup style={{ marginBottom: "10px" }}>
                      <Label for="data-location">Location<span style={{ color: "red" }}>*</span></Label>
                      <Select
                        isDisabled={true}
                        value={this.props.selectedLocation}
                        placeholder={this.props.selectedLocation && this.props.selectedLocation.label}
                        id="data-location"
                      />
                    </FormGroup>
                  </Col>
                  <Col md="12" sm="12">
                    <FormGroup style={{ marginBottom: "10px" }}>
                      <Label for="switch_id">Switch<span style={{ color: "red" }}>*</span></Label>
                      <Select
                        isDisabled={true}
                        value={this.state.childSwitch && this.state.childSwitch.value}
                        placeholder={this.state.childSwitch && this.state.childSwitch.label}
                        id="switch_id"
                      />
                    </FormGroup>
                  </Col>
                  <Col md="12" sm="12">
                    <FormGroup style={{ marginBottom: "10px" }}>
                      <Label for="port">Port<span style={{ color: "red" }}>*</span></Label>
                      <Input
                        type="text"
                        id="port"
                        value={port_no}
                        onChange={e => this.setState({ port_no: e.target.value })}
                        invalid={port_no_Req}
                      />
                    </FormGroup>
                  </Col>
                  <Col md="12" sm="12">
                    <FormGroup style={{ marginBottom: "10px" }}>
                      <Label for="bw">BW</Label>
                      <Input
                        type="text"
                        id="bw"
                        value={bw}
                        onChange={e => this.setState({ bw: e.target.value })}

                      />
                    </FormGroup>
                  </Col>
                  <Col md="12" sm="12">
                    <FormGroup style={{ marginBottom: "10px" }}>
                      <Label for="vlan">VLAN</Label>
                      <Input
                        type="text"
                        id="vlan"
                        value={vlan}
                        onChange={e => this.setState({ vlan: e.target.value })}
                      />
                    </FormGroup>
                  </Col>
                  <Col md="12" sm="12">
                    <FormGroup style={{ marginBottom: "10px" }}>
                      <Label for="ip">IP</Label>
                      <Input
                        type="text"
                        id="ip"
                        value={ip ? ip : ""}
                        onChange={e => this.setState({ ip: e.target.value })}
                      />
                    </FormGroup>
                  </Col>
                  <Col md="12" sm="12">
                    <FormGroup style={{ marginBottom: "10px" }}>
                      <Label for="info">Info</Label>
                      <Input
                        type="text"
                        id="info"
                        value={info}
                        onChange={e => this.setState({ info: e.target.value })}
                      />
                    </FormGroup>
                  </Col>
                </Row>
              </Form>
            </PerfectScrollbar>
            <div className="data-list-sidebar-footer px-2 d-flex justify-content-start align-items-center mt-1">
              <Button color="primary" onClick={() => this.handleSubmit(this.state)}>
                {data !== null ? "Update" : "Submit"}
              </Button>

              <Button
                className="ml-1"
                color="danger"
                outline
                onClick={() => handlePortSidebar(false, true)}>
                Cancel
          </Button>

            </div>
          </div>
        }
      </Fragment>
    )
  }
}

const mapStateToProps = state => {
  return {
    dataList: state.dataList,
    serverList: state.ServerList
  }
}

export default connect(mapStateToProps, { addServersPort, UpdatePort })(PortSidebar)
