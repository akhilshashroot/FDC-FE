import React, { Component, Fragment } from "react"
import { Label, Input, FormGroup, Button, Form, Row, Col } from "reactstrap"
import { X, RefreshCw } from "react-feather"
import PerfectScrollbar from "react-perfect-scrollbar"
import classnames from "classnames"
import { GetLocationServer, GetAllServerDetails, addServersAction, UpdateServer, GetSwitchPorts, getCpu, getIpmiIp, getServer, getRam, getHdd, GetLocationPdus, callResources } from "../../../redux/actions/servers"
import Spinner from "../../../components/@vuexy/spinner/Loading-spinner"
import { connect } from "react-redux"
import CustomSelect from "../../../components/customselect/CustomSelect";
import NewCustomSelect from "../../../components/customselect/NewCustomSelect";


const statusData = [
  { "value": "free", "label": "Free" },
  { "value": "online", "label": "Online" },
  { "value": "reserved", "label": "Reserved" },
  { "value": "moving", "label": "Moving" },
]


const initialState = {
  id: "",
  loc_id: "",
  label: "",
  ipmi_port: "",
  ipmi_ip: "",
  ipmi_pwd: "",
  server_name: "",
  cpu: "",
  ram: "",
  hdd: "",
  info: "",
  status: "",
  service_id: "",
  pdu0: "",
  pdu1: "",
  port1_id: "",
  port2_id: "",
  port3_id: "",
  port4_id: "",
  port5_id: "",
  switch_port1: "",
  switch_port2: "",
  switch_port3: "",
  switch_port4: "",
  switch_port5: "",
  showServerText: false,
  portReq: false,
  labelReq: false,
  serReq: false,
  serIdReq: false,
  statusReq: false,
  location_updated: false
};

class SearchSidebar extends Component {
  state = initialState
  statusSelectRef = React.createRef();
  addNew = false

  componentDidMount() {
    if (this.props.data) {
      this.props.GetAllServerDetails()
      if (this.props.data.loc_id) {
        this.props.GetLocationServer(this.props.data.loc_id);
        this.props.GetLocationPdus(this.props.data.loc_id);
      }
      if (this.props.data.id) {
        this.setState({ id: this.props.data.id })
      }

      if (this.props.data.loc_id && this.props.data.loc_name) {
        this.setState({ location: { "label": this.props.data.loc_name, "value": this.props.data.loc_id } })
      }

      if (this.props.data.label) {
        this.setState({ label: this.props.data.label })
      }

      if (this.props.data.server_info) {
        this.setState({ info: this.props.data.server_info })
      }

      if (this.props.data.ipmi_pwd) {
        this.setState({ ipmi_pwd: this.props.data.ipmi_pwd })
      }

      if (this.props.data.ipmi_ip) {
        this.setState({ ipmi_ip: this.props.data.ipmi_ip })
      }

      if (this.props.data.ipmi_port) {
        this.setState({ ipmi_port: { "label": this.props.data.ipmi_port, "value": this.props.data.ipmi_port } })
      }

      if (this.props.data.status) {
        let setStatus = statusData.find((value) => value.value === this.props.data.status)
        setStatus && this.setState({ status: setStatus })
      }

      if (this.props.data.service_id) {
        this.setState({ service_id: this.props.data.service_id })
      }

      if (this.props.serverList && !this.props.serverList.cpu) {
        this.props.getCpu().then(() => {
          if (this.props.data.cpu) {
            this.props.data.cpu && this.setState({ cpu: { "label": this.props.data.cpu, "value": this.props.data.cpu } })
          }
        })
      } else {
        if (this.props.data.cpu) {
          this.props.data.cpu && this.setState({ cpu: { "label": this.props.data.cpu, "value": this.props.data.cpu } })
        }
      }

      if (this.props.serverList && !this.props.serverList.ram) {
        this.props.getRam().then(() => {
          if (this.props.data.ram) {
            this.props.data.ram && this.setState({ ram: { "label": this.props.data.ram, "value": this.props.data.ram } })
          }
        })
      } else {
        if (this.props.data.ram) {
          this.props.data.ram && this.setState({ ram: { "label": this.props.data.ram, "value": this.props.data.ram } })
        }
      }

      if (this.props.serverList && !this.props.serverList.server) {
        this.props.getServer().then(() => {
          if (this.props.data.server) {
            this.setState({ server_name: { "label": this.props.data.server, "value": this.props.data.server } })
          }
        })
      } else {
        if (this.props.data.server) {
          this.setState({ server_name: { "label": this.props.data.server, "value": this.props.data.server } })
        }
      }


      if (this.props.serverList && !this.props.serverList.hdd) {
        this.props.getHdd().then(() => {
          if (this.props.data.hdd) {
            this.props.data.hdd && this.setState({ hdd: { "label": this.props.data.hdd, "value": this.props.data.hdd } })
          }
        })
      } else {
        if (this.props.data.hdd) {
          this.props.data.hdd && this.setState({ hdd: { "label": this.props.data.hdd, "value": this.props.data.hdd } })
        }
      }

      if (this.props.data.port && this.props.data.port.length > 0) {
        if (this.props.data.port[0]) {
          this.setState({
            switch_port1: { "label": this.props.data.port[0].switch_label, "value": this.props.data.port[0].switch_id },
            port1_id: { "label": this.props.data.port[0].port_no, "value": this.props.data.port[0].id }
          })
        }
        if (this.props.data.port[1]) {
          this.setState({
            switch_port2: { "label": this.props.data.port[1].switch_label, "value": this.props.data.port[1].switch_id },
            port2_id: { "label": this.props.data.port[1].port_no, "value": this.props.data.port[1].id }
          })
        }
        if (this.props.data.port[2]) {
          this.setState({
            switch_port3: { "label": this.props.data.port[2].switch_label, "value": this.props.data.port[2].switch_id },
            port3_id: { "label": this.props.data.port[2].port_no, "value": this.props.data.port[2].id }
          })
        }
        if (this.props.data.port[3]) {
          this.setState({
            switch_port4: { "label": this.props.data.port[3].switch_label, "value": this.props.data.port[3].switch_id },
            port4_id: { "label": this.props.data.port[3].port_no, "value": this.props.data.port[3].id }
          })
        }
        if (this.props.data.port[4]) {
          this.setState({
            switch_port5: { "label": this.props.data.port[4].switch_label, "value": this.props.data.port[4].switch_id },
            port5_id: { "label": this.props.data.port[4].port_no, "value": this.props.data.port[4].id }
          })
        }
      }

      if (this.props.data.pdu_port) {
        let portSplit = this.props.data.pdu_port.split(",")
        let portIDSplit = this.props.data.pdu_port_ids.split(",")

        if (portSplit[0] && portIDSplit[0]) {
          this.setState({ pdu0: { "label": portSplit[0], "value": parseInt(portIDSplit[0]) } })
        }
        if (portSplit[1] && portIDSplit[1]) {
          this.setState({ pdu1: { "label": portSplit[1], "value": parseInt(portIDSplit[1]) } })
        }
      }

    }
  }

  handleSubmit = obj => {
    if (this.props.data !== null) {
      if (this.state.location && this.state.location.value && obj.label && this.state.server_name &&
        obj.status && obj.status.value && (obj.switch_port1 && (obj.switch_port1.value !== "null" ? obj.port1_id && obj.port1_id.value : true))) {
        let updateData = {};
        updateData.loc_id = this.state.location_updated ? this.state.location.value : this.props.data.loc_id && this.props.data.loc_id
        this.props.data.label !== obj.label && (updateData.label = obj.label ? obj.label.trim() : "");
        updateData.server_name = this.state.showServerText ? this.state.server_name : this.state.server_name && this.state.server_name.value;
        this.props.data.ipmi_ip !== obj.ipmi_ip && (updateData.ipmi_ip = obj.ipmi_ip ? obj.ipmi_ip.trim() : "nil");
        obj.ipmi_port && (updateData.ipmi_port = obj.ipmi_port ? obj.ipmi_port.value : "");
        obj.ipmi_pwd && (updateData.ipmi_pwd = obj.ipmi_pwd ? obj.ipmi_pwd : "");
        obj.cpu && (updateData.cpu = obj.cpu ? obj.cpu.label : "");
        obj.ram && (updateData.ram = obj.ram ? obj.ram.label : "");
        obj.hdd && (updateData.hdd = obj.hdd ? obj.hdd.label : "");
        obj.info && (updateData.info = obj.info ? obj.info : "");
        obj.status && obj.status.value && (updateData.status = obj.status ? obj.status.value : "");
        obj.service_id && (updateData.service_id = obj.service_id ? obj.service_id : "");
        obj.pdu0 && obj.pdu0.value && (updateData.pdu0 = obj.pdu0 ? obj.pdu0.value : "");
        obj.pdu1 && obj.pdu1.value && (updateData.pdu1 = obj.pdu1 ? obj.pdu1.value : "");
        obj.switch_port1 && obj.switch_port1.value && obj.switch_port1.value !== "null" ? (updateData.port1_id = obj.port1_id ? obj.port1_id.value : "") : (updateData.port1_id = 0);
        obj.switch_port2 && obj.switch_port2.value && obj.switch_port2.value !== "null" ? (updateData.port2_id = obj.port2_id ? obj.port2_id.value : "") : (updateData.port2_id = 0);
        obj.switch_port3 && obj.switch_port3.value && obj.switch_port3.value !== "null" ? (updateData.port3_id = obj.port3_id ? obj.port3_id.value : "") : (updateData.port3_id = 0);
        obj.switch_port4 && obj.switch_port4.value && obj.switch_port4.value !== "null" ? (updateData.port4_id = obj.port4_id ? obj.port4_id.value : "") : (updateData.port4_id = 0);
        obj.switch_port5 && obj.switch_port5.value && obj.switch_port5.value !== "null" ? (updateData.port5_id = obj.port5_id ? obj.port5_id.value : "") : (updateData.port5_id = 0);
        var ser_Id = this.props.data && this.props.data.server_id;
        this.props.UpdateServer(ser_Id, updateData, false, false, false).then(() => {
          if (this.props.serverList && this.props.serverList.ServerUpdated) {
            var loc_id_values = ""
            var location_ids = []
            if (this.props.selectedOption && this.props.selectedOption.length > 0) {
              this.props.selectedOption.forEach((value) => {
                location_ids.push(value.value)
              })
              loc_id_values = location_ids.toString()
            } else {
              loc_id_values = "all"

            }
            const searchbody = { "loc_ids": loc_id_values, "servers_type": this.props.selectedServer.value, "label": this.props.value }
            this.props.SearchServer(searchbody, this.props.pageNumber);
            this.props.handleSidebar(false, true);
            this.props.UpdateMessage();
          } else {
            if (this.props.serverList && this.props.serverList.ServerUpdatedError && this.props.serverList.ServerUpdatedError === "same_label") {
              this.props.labelSameWarning();
            } else {
              this.props.ErrorMessage();
            }
          }
        })
      } else {
        obj.label ? this.setState({ labelReq: false }) : this.setState({ labelReq: true })
        obj.server_name ? this.setState({ serReq: false }) : this.setState({ serReq: true })
        obj.port1_id ? this.setState({ portReq: false }) : this.setState({ portReq: true })
        obj.status ? this.setState({ statusReq: false }) : this.setState({ statusReq: true })
        obj.service_id ? this.setState({ serIdReq: false }) : this.setState({ serIdReq: true })
        this.props.inCompleteData()
      }
    }
  }



  convertPortData1 = () => {
    var portData = []
    var switch_selected = ""
    var location_id_value = this.state.location_updated ? this.state.location && this.state.location.value : (this.props.data && this.props.data.loc_id);
    var switch_id_value = this.state.switch_port1 && this.state.switch_port1.value;
    if (location_id_value) {
      if (this.props.serverList && this.props.serverList.allServerDetails && this.props.serverList.allServerDetails.length > 0) {
        var current_loc = this.props.serverList.allServerDetails.find((value) => value.id === location_id_value)
      }
      switch_selected = current_loc && current_loc.switch_models && current_loc.switch_models.find((val) => val.id === switch_id_value)
    }
    switch_selected && switch_selected.portModels && switch_selected.portModels.forEach((value) => {
      portData.push({ "label": value.port_no, "value": value.id })
    })
    return portData
  }

  returnEditingPdu = (port) => {
    var portEdit = ""
    var switchEdit = ""
    var selSwitch = JSON.parse(localStorage.getItem('l_s'));
    if (this.props.allServerData && this.props.allServerData.switch_models) {
      switchEdit = this.props.allServerData.switch_models.find((value) => value.id === selSwitch.value)
      portEdit = switchEdit && switchEdit.portModels && switchEdit.portModels.find((value) => value.port_no === port)
      if (portEdit) {
        return ({ "label": portEdit.port_no, "value": portEdit.id })
      }
    }
  }

  convertPortData2 = () => {
    var portData = []
    var switch_selected = ""
    var location_id_value = this.state.location_updated ? this.state.location && this.state.location.value : (this.props.data && this.props.data.loc_id);
    var switch_id_value = this.state.switch_port2 && this.state.switch_port2.value;

    if (location_id_value) {
      if (this.props.serverList && this.props.serverList.allServerDetails && this.props.serverList.allServerDetails.length > 0) {
        var current_loc = this.props.serverList.allServerDetails.find((value) => value.id === location_id_value)
      }
      switch_selected = current_loc && current_loc.switch_models && current_loc.switch_models.find((val) => val.id === switch_id_value)
    }

    switch_selected && switch_selected.portModels && switch_selected.portModels.forEach((value) => {
      portData.push({ "label": value.port_no, "value": value.id })
    })
    return portData
  }

  convertPortData3 = () => {
    var portData = []
    var switch_selected = ""
    var location_id_value = this.state.location_updated ? this.state.location && this.state.location.value : (this.props.data && this.props.data.loc_id);
    var switch_id_value = this.state.switch_port3 && this.state.switch_port3.value;

    if (location_id_value) {
      if (this.props.serverList && this.props.serverList.allServerDetails && this.props.serverList.allServerDetails.length > 0) {
        var current_loc = this.props.serverList.allServerDetails.find((value) => value.id === location_id_value)
      }
      switch_selected = current_loc && current_loc.switch_models && current_loc.switch_models.find((val) => val.id === switch_id_value)
    }

    switch_selected && switch_selected.portModels && switch_selected.portModels.forEach((value) => {
      portData.push({ "label": value.port_no, "value": value.id })
    })
    return portData
  }

  convertPortData4 = () => {
    var portData = []
    var switch_selected = ""
    var location_id_value = this.state.location_updated ? this.state.location && this.state.location.value : (this.props.data && this.props.data.loc_id);
    var switch_id_value = this.state.switch_port4 && this.state.switch_port4.value;

    if (location_id_value) {
      if (this.props.serverList && this.props.serverList.allServerDetails && this.props.serverList.allServerDetails.length > 0) {
        var current_loc = this.props.serverList.allServerDetails.find((value) => value.id === location_id_value)
      }
      switch_selected = current_loc && current_loc.switch_models && current_loc.switch_models.find((val) => val.id === switch_id_value)
    }

    switch_selected && switch_selected.portModels && switch_selected.portModels.forEach((value) => {
      portData.push({ "label": value.port_no, "value": value.id })
    })
    return portData
  }
  convertPortData5 = () => {
    var portData = []
    var switch_selected = ""
    var location_id_value = this.state.location_updated ? this.state.location && this.state.location.value : (this.props.data && this.props.data.loc_id);
    var switch_id_value = this.state.switch_port5 && this.state.switch_port5.value;

    if (location_id_value) {
      if (this.props.serverList && this.props.serverList.allServerDetails && this.props.serverList.allServerDetails.length > 0) {
        var current_loc = this.props.serverList.allServerDetails.find((value) => value.id === location_id_value)
      }
      switch_selected = current_loc && current_loc.switch_models && current_loc.switch_models.find((val) => val.id === switch_id_value)
    }

    switch_selected && switch_selected.portModels && switch_selected.portModels.forEach((value) => {
      portData.push({ "label": value.port_no, "value": value.id })
    })
    return portData
  }

  convertLocationPdu = data => {
    var pduDatas = []
    pduDatas.push({ label: "N/A", value: null });
    data && data.forEach((value) => {
      pduDatas.push({ "label": value.port, "value": value.id })
    })
    return pduDatas
  }

  // convert cpu/ram/hdd to options
  convertResourceData = data => {
    var resourceData = []
    data && data.forEach((value) => {
      resourceData.push({ "label": value.resource_value, "value": value.resource_value })
    })
    return resourceData
  }


  convertServerData = data => {
    var server_Data = []
    server_Data.push({ "label": "Create New", "value": "create_new" })
    data && data.forEach((value) => {
      server_Data.push({ "label": value.resource_value, "value": value.resource_value })
    })
    return server_Data
  }

  convertIpmipData = data => {
    var ipmipData = []
    data && data.forEach((value) => {
      ipmipData.push({ "label": value, "value": value })
    })
    return ipmipData
  }

  handleServerChange = selectedOption => {
    if (selectedOption.value === "create_new") {
      this.setState({ showServerText: true, server_name: "" })
    } else {
      this.setState({ server_name: selectedOption })
    }

  };

  convertLocationData = data => {
    var locationData = []
    data && data.forEach((value) => {
      locationData.push({ "label": value.location, "value": value.id })
    })
    return locationData
  }

  convertSwitchData = () => {
    var location_id_value = this.state.location_updated ? this.state.location.value : (this.props.data && this.props.data.loc_id);
    var switchData = [];
    if (this.props.serverList && this.props.serverList.allServerDetails && this.props.serverList.allServerDetails.length > 0) {
      var current_loc = this.props.serverList.allServerDetails.find((value) => value.id === location_id_value);
      switchData.push({ "label": 'N/A', "value": "null" })
      current_loc && current_loc.switch_models && current_loc.switch_models.forEach((value) => {
        switchData.push({ "label": value.label, "value": value.id })
      })
    }
    return switchData
  }

  handleLocationChange = (e) => {
    this.setState({
      location: e, switch_port1: "", pdu0: "", pdu1: "", port1_id: "", port2_id: "", port3_id: "", port4_id: "", port5_id: "",
      switch_port2: "", switch_port3: "", switch_port4: "", switch_port5: "", location_updated: true
    })
    this.props.GetLocationPdus(e.value)
  }

  ipmiPortNumbers = () => {
    var ipmiPortData = []
    for (var i = 1; i < 49; i++) {
      ipmiPortData.push({ "label": i.toString(), "value": i.toString() })
    }
    return ipmiPortData
  }

  render() {
    let { show, handleSidebar, data } = this.props
    let { location, switch_port1, port1_id, switch_port2, port2_id, switch_port3, port3_id,
      switch_port4, port4_id, switch_port5, port5_id, pdu0, pdu1, ipmi_port, ipmi_ip,
      ipmi_pwd, label, server_name, cpu, ram, hdd, status, service_id, info, showServerText } = this.state

    return (

      <Fragment>
        {this.props.dataList && this.props.dataList.isLoading
          ? <Spinner />
          :
          <div
            className={classnames("inventory-sidebar", {
              show: show
            })}>
            <div className="data-list-sidebar-header mt-2 px-2 d-flex justify-content-between">
              <h4>{data !== null ? "UPDATE SERVER" : "ADD NEW SERVER"}</h4>
              <X size={20} onClick={() => handleSidebar(false, true)} />
            </div>
            <PerfectScrollbar
              className="data-list-fields px-2 mt-0"
              options={{ wheelPropagation: false }}>
              <Form className="mt-1">
                <Row>
                  <Col md="12" sm="12">
                    <FormGroup style={{ marginBottom: "10px" }}>
                      <Label for="data-location">Location <span style={{ color: "red" }}>*</span></Label>
                      <CustomSelect
                        isDisabled={this.props.data ? false : true}
                        value={!this.props.data ? this.props.selectedLocation : location}
                        placeholder={this.props.selectedLocation && this.props.selectedLocation.label}
                        onChange={this.handleLocationChange}
                        options={this.convertLocationData(this.props.locationData)}
                        id="data-location"
                      />
                    </FormGroup>
                  </Col>
                  <Col md="8" sm="12">
                    <FormGroup style={{ marginBottom: "10px" }}>
                      <Label for="switch_port1">Switch port #1 <span style={{ color: "red" }}>*</span></Label>
                      <CustomSelect
                        value={switch_port1}
                        onChange={(e) => this.setState({ switch_port1: e, port1_id: "" })}
                        options={this.convertSwitchData()}
                        id="switch_port1"
                      />
                    </FormGroup>
                  </Col>
                  <Col md="4" sm="12">
                    <FormGroup style={{ marginBottom: "10px" }}>
                      <NewCustomSelect
                        id="port1_id"
                        value={port1_id}
                        onChange={(e) => this.setState({ port1_id: e })}
                        options={this.convertPortData1()}
                        invalid={this.state.portReq}
                      />
                    </FormGroup>
                  </Col>
                  <Col md="8" sm="12">
                    <FormGroup style={{ marginBottom: "10px" }}>
                      <Label for="switch_port2">Switch port #2</Label>
                      <CustomSelect
                        value={switch_port2}
                        onChange={(e) => this.setState({ switch_port2: e, port2_id: "" })}
                        options={this.convertSwitchData()}
                        id="switch_port2"
                      />
                    </FormGroup>
                  </Col>
                  <Col md="4" sm="12">
                    <FormGroup style={{ marginBottom: "10px" }}>
                      <NewCustomSelect
                        id="port2_id"
                        value={port2_id}
                        onChange={(e) => this.setState({ port2_id: e })}
                        options={this.convertPortData2()}
                      />
                    </FormGroup>
                  </Col>
                  <Col md="8" sm="12">
                    <FormGroup style={{ marginBottom: "10px" }}>
                      <Label for="switch_port3">Switch port #3</Label>
                      <CustomSelect
                        value={switch_port3}
                        onChange={(e) => this.setState({ switch_port3: e, port3_id: "" })}
                        options={this.convertSwitchData()}
                        id="switch_port3"
                      />
                    </FormGroup>
                  </Col>
                  <Col md="4" sm="12">
                    <FormGroup style={{ marginBottom: "10px" }}>
                      <NewCustomSelect
                        id="port3_id"
                        value={port3_id}
                        onChange={(e) => this.setState({ port3_id: e })}
                        options={this.convertPortData3()}
                      />
                    </FormGroup>
                  </Col>
                  <Col md="8" sm="12">
                    <FormGroup style={{ marginBottom: "10px" }}>
                      <Label for="switch_port4">Switch port #4</Label>
                      <CustomSelect
                        value={switch_port4}
                        onChange={(e) => this.setState({ switch_port4: e, port4_id: "" })}
                        options={this.convertSwitchData()}
                        id="switch_port4"
                      />
                    </FormGroup>
                  </Col>
                  <Col md="4" sm="12">
                    <FormGroup style={{ marginBottom: "10px" }}>
                      <NewCustomSelect
                        id="port4_id"
                        value={port4_id}
                        onChange={(e) => this.setState({ port4_id: e })}
                        options={this.convertPortData4()}
                      />
                    </FormGroup>
                  </Col>
                  <Col md="8" sm="12">
                    <FormGroup style={{ marginBottom: "10px" }}>
                      <Label for="switch_port5">Switch port #5</Label>
                      <CustomSelect
                        value={switch_port5}
                        onChange={(e) => this.setState({ switch_port5: e, port5_id: "" })}
                        options={this.convertSwitchData()}
                        id="switch_port5"
                      />
                    </FormGroup>
                  </Col>
                  <Col md="4" sm="12">
                    <FormGroup style={{ marginBottom: "10px" }}>
                      <NewCustomSelect
                        id="port5_id"
                        value={port5_id}
                        onChange={(e) => this.setState({ port5_id: e })}
                        options={this.convertPortData5()}
                      />
                    </FormGroup>
                  </Col>
                  <Col md="6" sm="12">
                    <FormGroup style={{ marginBottom: "10px" }}>
                      <Label for="pdu0">PDU port #1</Label>
                      <CustomSelect
                        isDisabled={false}
                        value={pdu0}
                        onChange={(e) => this.setState({ pdu0: e })}
                        options={this.props.serverList && this.props.serverList.locationPdus ? this.convertLocationPdu(this.props.serverList.locationPdus) : []}
                        id="pdu0"
                      />
                    </FormGroup>
                  </Col>
                  <Col md="6" sm="12">
                    <FormGroup style={{ marginBottom: "10px" }}>
                      <Label for="pdu1">PDU port #2</Label>
                      <CustomSelect
                        isDisabled={false}
                        value={pdu1}
                        onChange={e => this.setState({ pdu1: e })}
                        options={this.props.serverList && this.props.serverList.locationPdus ? this.convertLocationPdu(this.props.serverList.locationPdus) : []}
                        id="pdu1"
                      />
                    </FormGroup>
                  </Col>
                  <Col md="6" sm="12">
                    <FormGroup style={{ marginBottom: "10px" }}>
                      <Label for="ipmi_port">IPMI Port</Label>
                      <CustomSelect
                        id="ipmi_port"
                        value={ipmi_port}
                        options={this.ipmiPortNumbers()}
                        onChange={e => this.setState({ ipmi_port: e })}
                      />
                    </FormGroup>
                  </Col>
                  <Col md="6" sm="12">
                    <FormGroup style={{ marginBottom: "10px" }}>
                      <Label for="ipmi_ip">IPMI IP</Label>
                      <Input
                        className="form-control-sm form-control"
                        type="text"
                        id="ipmi_port"
                        value={ipmi_ip ? ipmi_ip : ""}
                        onChange={e => this.setState({ ipmi_ip: e.target.value })}
                      />
                    </FormGroup>
                  </Col>
                  {
                    localStorage.getItem("user_role") && (localStorage.getItem("user_role") === "Sales" || localStorage.getItem("user_role") === "Senior Sales") ?
                      null :
                      <Col md="6" sm="12">
                        <FormGroup style={{ marginBottom: "10px" }}>
                          <Label for="ipmi_pwd">IPMI Password</Label>
                          <Input
                            className="form-control-sm form-control"
                            type="text"
                            id="ipmi_pwd"
                            value={ipmi_pwd ? ipmi_pwd : ""}
                            onChange={e => this.setState({ ipmi_pwd: e.target.value })}
                          />
                        </FormGroup>
                      </Col>
                  }
                  <Col
                    md={(localStorage.getItem("user_role") === "Sales" || localStorage.getItem("user_role") === "Senior Sales") ? "12" : "6"}
                    sm="12">
                    <FormGroup style={{ marginBottom: "10px" }}>
                      <Label for="label">Label <span style={{ color: "red" }}>*</span></Label>
                      <Input
                        className="form-control-sm form-control"
                        type="text"
                        id="label"
                        value={label ? label : ""}
                        onChange={e => this.setState({ label: e.target.value })}
                        invalid={this.state.labelReq}
                      />
                    </FormGroup>
                  </Col>
                  <Col md="6" sm="12">
                    <FormGroup style={{ marginBottom: "10px" }}>
                      <Label for="server">Server <span style={{ color: "red" }}>*</span></Label>
                      {showServerText ?
                        <FormGroup className="position-relative form-label-group input-divider-right">
                          <Input
                            className="form-control-sm form-control"
                            type="text"
                            value={server_name ? server_name : ""}
                            placeholder="Server"
                            onChange={e => this.setState({ server_name: e.target.value })}
                            id="server"
                            invalid={this.state.serReq}
                          />
                          <div className="form-control-position">
                            <RefreshCw onClick={() => this.setState({ showServerText: false, server_name: "" })} />
                          </div>
                        </FormGroup>
                        :
                        <CustomSelect
                          id="server"
                          value={server_name}
                          options={this.props.serverList && this.props.serverList.server && this.props.serverList.server.data ? this.convertServerData(this.props.serverList.server.data) : []}
                          onChange={this.handleServerChange}
                          invalid={this.state.serReq}
                        />
                      }
                    </FormGroup>
                  </Col>
                  <Col md="6" sm="12">
                    <FormGroup style={{ marginBottom: "10px" }}>
                      <Label for="cpu">CPU</Label>
                      <CustomSelect
                        id="cpu"
                        value={cpu}
                        options={this.props.serverList && this.props.serverList.cpu && this.props.serverList.cpu.length > 0 ? this.convertResourceData(this.props.serverList.cpu) : []}
                        onChange={e => this.setState({ cpu: e })}
                      />
                    </FormGroup>
                  </Col>
                  <Col md="4" sm="12">
                    <FormGroup style={{ marginBottom: "10px" }}>
                      <Label for="ram">RAM</Label>
                      <CustomSelect
                        id="ram"
                        value={ram}
                        options={this.props.serverList && this.props.serverList.ram && this.props.serverList.ram.length > 0 ? this.convertResourceData(this.props.serverList.ram) : []}
                        onChange={e => this.setState({ ram: e })}
                      />
                    </FormGroup>
                  </Col>
                  <Col md="4" sm="12">
                    <FormGroup style={{ marginBottom: "10px" }}>
                      <Label for="hdd">HDD</Label>
                      <CustomSelect
                        id="hdd"
                        value={hdd}
                        options={this.props.serverList && this.props.serverList.hdd && this.props.serverList.hdd.length > 0 ? this.convertResourceData(this.props.serverList.hdd) : []}
                        onChange={e => this.setState({ hdd: e })}
                      />
                    </FormGroup>
                  </Col>
                  <Col md="4" sm="12">
                    <FormGroup style={{ marginBottom: "10px" }}>
                      <Label for="status">Status <span style={{ color: "red" }}>*</span></Label>
                      <CustomSelect
                        isDisabled={false}
                        value={status}
                        onChange={(e) => { this.setState({ status: e }) }}
                        options={statusData}
                        id="status"
                        invalid={this.state.statusReq}
                      />
                    </FormGroup>
                  </Col>
                  <Col md="6" sm="12">
                    <FormGroup style={{ marginBottom: "20px" }}>
                      <Label for="service_id">Service ID</Label>
                      <Input
                        className="form-control-sm form-control"
                        type="number"
                        id="service_id"
                        value={service_id ? service_id : ""}
                        onChange={e => this.setState({ service_id: e.target.value })}
                      />
                    </FormGroup>
                  </Col>
                  <Col md="6" sm="12">
                    <FormGroup style={{ marginBottom: "20px" }}>
                      <Label for="info">Info</Label>
                      <Input
                        className="form-control-sm form-control"
                        type="text"
                        id="info"
                        value={info ? info : ""}
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
                onClick={() => handleSidebar(false, true)}>
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

export default connect(mapStateToProps,
  {
    addServersAction,
    UpdateServer,
    GetSwitchPorts,
    getCpu,
    getRam,
    getHdd,
    getServer, getIpmiIp, GetLocationPdus, callResources, GetLocationServer, GetAllServerDetails
  })(SearchSidebar)
