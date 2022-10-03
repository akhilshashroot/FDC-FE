import React, { Component, Fragment } from "react"
import { Label, Input, FormGroup, Button } from "reactstrap"
import { X } from "react-feather"
import PerfectScrollbar from "react-perfect-scrollbar"
import classnames from "classnames"
import { addSwitchesAction, fetchSwitchData, UpdateSwitches } from "../../../redux/actions/switches"
import { GetLocationServer } from "../../../redux/actions/servers"
import { connect } from "react-redux"
import Select from 'react-select';


const ports_value = [
  { "label": "32", value: "32" },
  { "label": "48", value: "48" },
  { "label": "32x4 (QFX5200)", value: "qfx5200" },
  { "label": "32x100G", value: "32x100G" }
]

const ports_BW_value = [
  { "label": "1Gb", value: "1Gb" },
  { "label": "10Gb", value: "10Gb"},
]
const new_BW_value =[
  { "label": "100Gb", value: "100Gb"},
]

class SwitchSidebar extends Component {
  state = {
    selectedLocation: "",
    switch_label: "",
    switch_short_label: "",
    info: "",
    selectedSwitch: "",
    ip: "",
    selectedPort: "",
    selectedPortBW: "",
    first_vlan: "",
    last_vlan: "",
    first_vlan_port: "",
    switch_ips: "",
    toggleLastVlan: false,
    toggleFirstVlan: false,
    toggleIp:false,
    FirstVlanstate:false,
    togglePortSelect:ports_BW_value,
    selectedPDU_1: "",
    selectedPDU_2: ""

  }

  addNew = false

  componentDidUpdate(prevProps, prevState) {
    if (this.props.data !== null && prevProps.data === null) {
      if (this.props.data.loc_id && this.props.data.locaton_name) {
        let location_data = { "label": this.props.data.locaton_name, "value": this.props.data.loc_id }
        this.setState({ selectedLocation: location_data })
      }
      if (this.props.data.label !== prevState.switch_label) {
        this.setState({ switch_label: this.props.data.label })
      }
      if (this.props.data.switch !== prevState.switch_short_label) {
        this.setState({ switch_short_label: this.props.data.switch })
      }
      if (this.props.data.ip !== prevState.ip) {
        this.setState({ ip: this.props.data.ip })
      }
      if (this.props.data.info !== prevState.info) {
        this.setState({ info: this.props.data.info })
      }
      this.props.fetchSwitchData(this.props.data.id).then(() => {
        if (this.props.switchesData && this.props.switchesData.fetchSwitchData && this.props.switchesData.fetchSwitchData.data &&
          this.props.switchesData.fetchSwitchData.data.pduModels && this.props.switchesData.fetchSwitchData.data.pduModels.length > 0) {
          var pdu_1data = this.props.data && this.props.data.pdu_1_id && this.props.switchesData.fetchSwitchData.data.pduModels.find((value) => value.id === this.props.data.pdu_1_id)
          var pdu_2data = this.props.data && this.props.data.pdu_2_id && this.props.switchesData.fetchSwitchData.data.pduModels.find((value) => value.id === this.props.data.pdu_2_id)
        }
        if (pdu_1data) {
          this.setState({ selectedPDU_1: { "label": pdu_1data.port, "value": pdu_1data.id } })
        } else {
          if (this.props.data && this.props.data.pdu_1_id && this.props.data.pdu_1_name) {
            this.setState({ selectedPDU_1: { "label": this.props.data.pdu_1_name, "value": this.props.data.pdu_1_id } })
          }
        }
        if (pdu_2data) {
          this.setState({ selectedPDU_2: { "label": pdu_2data.port, "value": pdu_2data.id } })
        } else {
          if (this.props.data && this.props.data.pdu_2_id && this.props.data.pdu_2_name) {
            this.setState({ selectedPDU_1: { "label": this.props.data.pdu_2_name, "value": this.props.data.pdu_2_id } })
          }
        }
      })

    }
    if (this.props.data === null && prevProps.data !== null) {
      this.setState({
        selectedLocation: "",
        switch_label: "",
        switch_short_label: "",
        info: "",
        selectedSwitch: "",
        ip: "",
        selectedPort: "",
        selectedPortBW: "",
        first_vlan: "",
        last_vlan: "",
        first_vlan_port: "",
        switch_ips: "",
        toggleLastVlan: false,
        toggleFirstVlan:false,
        toggleIp:false,
    FirstVlanstate:false,
    togglePortSelect:ports_BW_value,
        selectedPDU_1: "",
        selectedPDU_2: ""
      })
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
      let updateData = {};
      updateData.id = this.props.data.id;
      updateData.loc_id = obj.selectedLocation && obj.selectedLocation.value;
      updateData.switch = obj.switch_short_label;
      if (obj.switch_label !== this.props.data.label) {
        updateData.label = obj.switch_label;
      }
      if (obj.ip !== this.props.data.ip) {
        updateData.ip = obj.ip ? obj.ip : "nil";
      }
      updateData.info = obj.info;
      updateData.pdu_1_id = (obj.selectedPDU_1 && obj.selectedPDU_1.value) ? obj.selectedPDU_1.value : 0;
      updateData.pdu_2_id = (obj.selectedPDU_2 && obj.selectedPDU_2.value) ? obj.selectedPDU_2.value : 0;
      if (updateData) {
        this.props.UpdateSwitches(this.props.data.id, updateData).then(() => {
          if (this.props.switchesData && this.props.switchesData.SwitchesUpdated) {
            if (this.props.location_all) {
              this.props.getSwitchesData(this.props.currentPage, false);
            } else {
              this.props.GetLocationSwitchesView(this.props.sel_loc_id)
            }
            this.props.handleSidebar(false, true)
            this.props.UpdateMessage()
          } else {
            if (this.props.switchesData && this.props.switchesData.SwitchesUpdatedError && this.props.switchesData.SwitchesUpdatedError.message && this.props.switchesData.SwitchesUpdatedError.message === "The given data was invalid.") {
              if (this.props.switchesData.SwitchesUpdatedError.errors && this.props.switchesData.SwitchesUpdatedError.errors.switch_label && this.props.switchesData.SwitchesUpdatedError.errors.switch_label[0] === 'The switch label has already been taken.') {
                this.props.labelError()
              }
              if (this.props.switchesData.SwitchesUpdatedError.errors && this.props.switchesData.SwitchesUpdatedError.errors.switch && this.props.switchesData.SwitchesUpdatedError.errors.switch.length) {
                this.props.labelShortError()
              }
              if (this.props.switchesData.SwitchesUpdatedError.errors && this.props.switchesData.SwitchesUpdatedError.errors.ip && this.props.switchesData.SwitchesUpdatedError.errors.ip[0] === 'The ip has already been taken.') {
                this.props.ipError()
              }
            }
            else {
              this.props.ErrorMessage()
            }
          }
        })
      }

    } else {
      if (obj.selectedLocation && obj.selectedLocation.value && obj.switch_label && obj.switch_short_label && obj.selectedPort && obj.selectedPort.value &&
        obj.selectedPortBW && obj.selectedPortBW.value && obj.first_vlan && obj.switch_ips && obj.first_vlan_port && ((obj.selectedPort && obj.selectedPort.value !== "qfx5200") ? obj.last_vlan : true)) {
        let sendData = {}
        sendData.loc_id = obj.selectedLocation && obj.selectedLocation.value;
        sendData.switch_label = obj.switch_label;
        sendData.switch_short_label = obj.switch_short_label;
        obj.ip && (sendData.ip = obj.ip);
        sendData.switch_ports = obj.selectedPort && obj.selectedPort.value;
        sendData.bw = obj.selectedPortBW && obj.selectedPortBW.value;
        sendData.first_vlan = obj.first_vlan;
        sendData.last_vlan = obj.selectedPort && obj.selectedPort.value && obj.selectedPort.value === "qfx5200" ? "0" : obj.last_vlan;
        sendData.first_vlan_port = obj.first_vlan_port ? obj.first_vlan_port : "";
        sendData.switch_ips = obj.switch_ips;
        sendData.parent_switch_id = (obj.selectedSwitch && obj.selectedSwitch.value) ? obj.selectedSwitch.value : "";
        sendData.info = obj.info ? obj.info : "";
        if (sendData) {
          this.props.addSwitchesAction(sendData).then(() => {
            if (this.props.switchesData && this.props.switchesData.addedSwitches) {
              if (this.props.location_all) {
                this.props.getSwitchesData(this.props.currentPage, false);
              } else {
                this.props.GetLocationSwitchesView(this.props.sel_loc_id)
              }
              this.props.handleSidebar(false, true);
              this.props.AddMessage();
              this.setState({
                selectedLocation: "", switch_label: "", switch_short_label: "", ip: "",
                selectedPort: "", selectedPortBW: "", first_vlan: "", last_vlan: "", switch_ips: "",
                selectedSwitch: "", info: "", first_vlan_port: "", toggleLastVlan: false,toggleFirstVlan:false,toggleIp:false,togglePortSelect:ports_BW_value,FirstVlanstate:false, selectedPDU_1: "",
                selectedPDU_2: ""
              })
            } else {
              if (this.props.switchesData && this.props.switchesData.addSwitchesError && this.props.switchesData.addSwitchesError.message && this.props.switchesData.addSwitchesError.message === "The given data was invalid.") {
                if (this.props.switchesData.addSwitchesError.errors && this.props.switchesData.addSwitchesError.errors.switch_label && this.props.switchesData.addSwitchesError.errors.switch_label[0] === 'The switch label has already been taken.') {
                  this.props.labelError()
                }
                if (this.props.switchesData.addSwitchesError.errors && this.props.switchesData.addSwitchesError.errors.switch_short_label && this.props.switchesData.addSwitchesError.errors.switch_short_label[0] === 'The switch short label has already been taken.') {
                  this.props.labelShortError()
                }
                if (this.props.switchesData.addSwitchesError.errors && this.props.switchesData.addSwitchesError.errors.ip && this.props.switchesData.addSwitchesError.errors.ip[0] === 'The ip has already been taken.') {
                  this.props.ipError()
                }
              }
              else {
                this.props.ErrorMessage()
              }
            }

          })
        }
      } else if (obj.selectedLocation && obj.selectedLocation.value && 
        obj.switch_label && obj.switch_short_label && obj.selectedPort && 
        obj.selectedPort.value &&
        obj.selectedPortBW && 
        obj.selectedPortBW.value && 
        ((obj.selectedPort && obj.selectedPort.value !== "32x100G") ? obj.last_vlan : true)&&
        ((obj.selectedPort && obj.selectedPort.value !== "32x100G") ? obj.first_vlan : true)&& 
        ((obj.selectedPort && obj.selectedPort.value !== "32x100G") ? obj.switch_ips : true)&& 
        ((obj.selectedPort && obj.selectedPort.value !== "32x100G") ? obj.first_vlan_port : true)  ) {
        let sendData = {}
        sendData.loc_id = obj.selectedLocation && obj.selectedLocation.value;
        sendData.switch_label = obj.switch_label;
        sendData.switch_short_label = obj.switch_short_label;
        obj.ip && (sendData.ip = obj.ip);
        sendData.switch_ports = obj.selectedPort && obj.selectedPort.value;
        sendData.bw = obj.selectedPortBW && obj.selectedPortBW.value;
        sendData.first_vlan = obj.selectedPort && obj.selectedPort.value && obj.selectedPort.value === "32x100G" ? "0" : obj.first_vlan;
        sendData.last_vlan = obj.selectedPort && obj.selectedPort.value && obj.selectedPort.value === "32x100G" ? "0" : obj.last_vlan;
        sendData.first_vlan_port = obj.selectedPort && obj.selectedPort.value && obj.selectedPort.value === "32x100G" ? "0" : obj.first_vlan_port;
        sendData.switch_ips = obj.selectedPort && obj.selectedPort.value && obj.selectedPort.value === "32x100G" ? "0" : obj.switch_ips;
        sendData.parent_switch_id = (obj.selectedSwitch && obj.selectedSwitch.value) ? obj.selectedSwitch.value : "";
        sendData.info = obj.info ? obj.info : "";
        if (sendData) {
          this.props.addSwitchesAction(sendData).then(() => {
            if (this.props.switchesData && this.props.switchesData.addedSwitches) {
              if (this.props.location_all) {
                this.props.getSwitchesData(this.props.currentPage, false);
              } else {
                this.props.GetLocationSwitchesView(this.props.sel_loc_id)
              }
              this.props.handleSidebar(false, true);
              this.props.AddMessage();
              this.setState({
                selectedLocation: "", switch_label: "", switch_short_label: "", ip: "",
                selectedPort: "", selectedPortBW: "", first_vlan: "", last_vlan: "", switch_ips: "",
                selectedSwitch: "", info: "", first_vlan_port: "", toggleLastVlan: false,toggleFirstVlan:false,toggleIp:false,togglePortSelect:ports_BW_value,FirstVlanstate:false, selectedPDU_1: "",
                selectedPDU_2: ""
              })
            } else {
              if (this.props.switchesData && this.props.switchesData.addSwitchesError && this.props.switchesData.addSwitchesError.message && this.props.switchesData.addSwitchesError.message === "The given data was invalid.") {
                if (this.props.switchesData.addSwitchesError.errors && this.props.switchesData.addSwitchesError.errors.switch_label && this.props.switchesData.addSwitchesError.errors.switch_label[0] === 'The switch label has already been taken.') {
                  this.props.labelError()
                }
                if (this.props.switchesData.addSwitchesError.errors && this.props.switchesData.addSwitchesError.errors.switch_short_label && this.props.switchesData.addSwitchesError.errors.switch_short_label[0] === 'The switch short label has already been taken.') {
                  this.props.labelShortError()
                }
                if (this.props.switchesData.addSwitchesError.errors && this.props.switchesData.addSwitchesError.errors.ip && this.props.switchesData.addSwitchesError.errors.ip[0] === 'The ip has already been taken.') {
                  this.props.ipError()
                }
              }
              else {
                this.props.ErrorMessage()
              }
            }

          })
        }
      } 
       else {
        this.props.inCompleteData()
      }

    }
  }
  convertLocation = data => {
    var locationData = []
    data.forEach((value) => {
      locationData.push({ "label": value.location, "value": value.id })
    })
    return locationData
  }

  handleChange = selectedLocation => {
    selectedLocation && this.props.GetLocationServer(selectedLocation.value);
    this.setState({ selectedLocation });
  };

  convertSwitch = data => {
    var parentSwitchData = [];
    parentSwitchData.push({ "label": "N/A", "value": "" })
    data && data.forEach((value) => {
      parentSwitchData.push({ "label": value.label, "value": value.id })
    })
    return parentSwitchData
  }

  convertPDU_1 = data => {
    var pduData = [];
    pduData.push({label:"N/A" , value : 0})
    if (data && data.fetchSwitchData && data.fetchSwitchData.data && data.fetchSwitchData.data.pduModels && data.fetchSwitchData.data.pduModels.length > 0) {
      data.fetchSwitchData.data.pduModels.forEach((value) => {
        pduData.push({ "label": value.port, "value": value.id })
      })
    }
    return pduData
  }

  handlePdu_1Change = selectedPDU_1 => {
    this.setState({ selectedPDU_1 });
  };

  handlePdu_2Change = selectedPDU_2 => {
    this.setState({ selectedPDU_2 });
  };

  handleParentSwitchChange = selectedSwitch => {
    this.setState({ selectedSwitch });
  };

  handlePortsChange = selectedPort => {
    this.setState({ selectedPort });
   
    if (selectedPort.value === "qfx5200") {
      this.setState({ 
        toggleLastVlan: true, 
        first_vlan_port:"01:0",
        toggleFirstVlan:true,
        toggleIp:false,
        selectedPortBW:"",
        FirstVlanstate:false,
        togglePortSelect:ports_BW_value, })
    } 
    else  if (selectedPort.value === "32x100G") {
      this.setState({ 
        toggleLastVlan: true,
        first_vlan_port:"",
        toggleIp:true,
        FirstVlanstate:true,
        selectedPortBW:{"label":"100Gb",value:"100Gb"},
        toggleFirstVlan:true,
        togglePortSelect:new_BW_value,})
    } 
    else {
      this.setState({ 
        toggleLastVlan: false, 
        first_vlan_port:"",
        toggleFirstVlan:false,
        toggleIp:false,
        selectedPortBW:"",
        FirstVlanstate:false, 
        togglePortSelect:ports_BW_value, })
    }
  };

  handlePortBWChange = selectedPortBW => {
    this.setState({ selectedPortBW });
   
  };

  render() {
    let { show, handleSidebar, data } = this.props
    let { selectedLocation, switch_label, info, selectedSwitch, switch_short_label, ip, selectedPort, selectedPortBW, first_vlan, last_vlan, first_vlan_port, switch_ips, selectedPDU_1, selectedPDU_2 } = this.state
    return (
      <Fragment>
        <div
          className={classnames("data-list-sidebar", {
            show: show
          })}>
          <div className="data-list-sidebar-header mt-2 px-2 d-flex justify-content-between">
            <h4>{data !== null ? "UPDATE SWITCH" : "ADD NEW SWITCH"}</h4>
            <X size={20} onClick={() => handleSidebar(false, true)} />
          </div>
          <PerfectScrollbar
            className="data-list-fields px-2 mt-3"
            options={{ wheelPropagation: false }}>
            {data !== null &&
              <FormGroup >
                <Label for="data-location">Location</Label>
                <Select
                  isDisabled={true}
                  value={selectedLocation}
                  onChange={this.handleChange}
                  options={this.convertLocation(this.props.locationData)}
                  isSearchable={true}
                />
              </FormGroup>
            }
            {data == null &&
              <FormGroup>
                <Label for="data-location">Location <span style={{ color: "red" }}>*</span></Label>
                <Select
                  value={selectedLocation}
                  onChange={this.handleChange}
                  options={this.convertLocation(this.props.locationData)}
                  isSearchable={true}
                />
              </FormGroup>
            }
            <FormGroup>
              <Label for="data-label">Label <span style={{ color: "red" }}>*</span></Label>
              <Input
                type="text"
                id="data-label"
                value={switch_label}
                placeholder="e. g. Amsterdam Juniper #1"
                onChange={e => this.setState({ switch_label: e.target.value })}
              />
            </FormGroup>

            <FormGroup>
              <Label for="data-info">Info</Label>
              <Input
                type="text"
                id="data-info"
                value={info ? info : ""}
                placeholder="Info"
                onChange={e => this.setState({ info: e.target.value })}
              />
            </FormGroup>
            {!this.props.data &&
              <FormGroup>
                <Label for="data-parent-switch">Parent switch (if any)</Label>
                <Select
                  value={selectedSwitch}
                  onChange={this.handleParentSwitchChange}
                  options={this.props.serverList && this.props.serverList.LocationServer && this.convertSwitch(this.props.serverList.LocationServer)}
                  isSearchable={true}
                />
              </FormGroup>
            }

            <div className="row">
              <div className="col-sm-6">
                <FormGroup>
                  <Label for="data-label-short">Label (short) <span style={{ color: "red" }}>*</span></Label>
                  <Input
                    type="text"
                    id="data-label-short"
                    value={switch_short_label}
                    placeholder=""
                    onChange={e => this.setState({ switch_short_label: e.target.value })}
                  />
                </FormGroup>
              </div>

              <div className="col-sm-6">
                <FormGroup>
                  <Label for="data-ip">IP</Label>
                  <Input
                    type="text"
                    id="data-ip"
                    value={ip || ''}
                    placeholder=""
                    onChange={e => this.setState({ ip: e.target.value })}
                  />
                </FormGroup>
              </div>
            </div>

            {!this.props.data &&
              <Fragment>
                <div className="row">
                  <div className="col-sm-6">
                    <FormGroup>
                      <Label for="data-ports">Ports <span style={{ color: "red" }}>*</span></Label>
                      <Select
                        value={selectedPort}
                        onChange={this.handlePortsChange}
                        options={ports_value}
                      />
                    </FormGroup>
                  </div>
                  <div className="col-sm-6">
                    <FormGroup>
                      <Label for="data-ports-bw">Ports BW <span style={{ color: "red" }}>*</span></Label>
                      <Select
                        value={selectedPortBW}
                        onChange={this.handlePortBWChange}
                        options={this.state.togglePortSelect}
                      />
                    </FormGroup>
                  </div>
                </div>


                <div className="row">
                  <div className="col-sm-6">
                    <FormGroup>
                      <Label for="data-first-vlan">First VLAN {selectedPort && selectedPort.value !== "32x100G" && <span style={{ color: "red" }}>*</span>}</Label>
                      <Input
                        type="number"
                        id="data-first-vlan"
                        value={first_vlan}
                        disabled={this.state.FirstVlanstate}
                        placeholder=""
                        onChange={e => this.setState({ first_vlan: e.target.value })}
                      />
                    </FormGroup>
                  </div>

                  <div className="col-sm-6">
                    <FormGroup>
                      <Label for="data-last-vlan">Last VLAN {selectedPort && selectedPort.value !== "qfx5200" && selectedPort && selectedPort.value !== "32x100G" && <span style={{ color: "red" }}>*</span>}</Label>
                      <Input
                        type="number"
                        id="data-last-vlan"
                        disabled={this.state.toggleLastVlan}
                        value={last_vlan}
                        placeholder="leave blank for QFX5200"
                        onChange={e => this.setState({ last_vlan: e.target.value })}
                      />
                    </FormGroup>
                  </div>
                </div>

                <div className="row">
                  <div className="col-sm-6">
                    <FormGroup>
                      <Label for="data-first-vlan">First port with VLAN {selectedPort && selectedPort.value !== "32x100G" && <span style={{ color: "red" }}>*</span>}</Label>
                      <Input
                        type="text"
                        id="data-first-vlan"
                        value={first_vlan_port}
                        readOnly={this.state.toggleFirstVlan}
                        disabled={this.state.toggleFirstVlan}
                        placeholder="e. g. 00, 05, 00:0"
                        onChange={e => this.setState({ first_vlan_port: e.target.value })}
                      />
                    </FormGroup>
                  </div>

                  <div className="col-sm-6">
                    <FormGroup>
                      <Label for="switch_ips">IPs (first 3 octets) {selectedPort && selectedPort.value !== "32x100G" && <span style={{ color: "red" }}>*</span>}</Label>
                      <Input
                        type="text"
                        id="switch_ips"
                        value={switch_ips}
                        disabled={this.state.toggleIp}
                        placeholder="e. g. 50.7.120"
                        onChange={e => this.setState({ switch_ips: e.target.value })}
                      />
                    </FormGroup>
                  </div>
                </div>
              </Fragment>
            }

            {this.props.data &&
              <div className="row">
                <div className="col-sm-6">
                  <FormGroup>
                    <Label for="data-pdu1">PDU 1</Label>
                    <Select
                      value={selectedPDU_1}
                      onChange={this.handlePdu_1Change}
                      options={this.convertPDU_1(this.props.switchesData)}
                    />
                  </FormGroup>
                </div>
                <div className="col-sm-6">
                  <FormGroup>
                    <Label for="data-pdu2">PDU 2</Label>
                    <Select
                      value={selectedPDU_2}
                      onChange={this.handlePdu_2Change}
                      options={this.convertPDU_1(this.props.switchesData)}
                    />
                  </FormGroup>
                </div>
              </div>
            }



          </PerfectScrollbar>
          <div className="data-list-sidebar-footer px-2 d-flex justify-content-start align-items-center mt-1">
            <Button color="primary" onClick={() => this.handleSubmit(this.state)}>
              {data !== null ? "Update" : "Submit"}
            </Button>

            <Button
              className="ml-1"
              color="danger"
              outline
              onClick={() => handleSidebar(false, true)}>
              Cancel
          </Button>

          </div>
        </div>
      </Fragment>
    )
  }
}

const mapStateToProps = state => {
  return {
    switchesData: state.SwitchList,
    serverList: state.ServerList
  }
}

export default connect(mapStateToProps, { addSwitchesAction, fetchSwitchData, UpdateSwitches, GetLocationServer })(SwitchSidebar)