import React, { Component, Fragment } from "react"
import { Label, Input, FormGroup, Button, Form, Row, Col } from "reactstrap"
import { X, RefreshCw } from "react-feather"
import PerfectScrollbar from "react-perfect-scrollbar"
import classnames from "classnames"
import { addServersAction, UpdateServer, GetSwitchPorts, getCpu, getIpmiIp, getServer, getRam, getHdd, GetLocationPdus, callResources,addPasswordLog } from "../../../redux/actions/servers"
import Spinner from "../../../components/@vuexy/spinner/Loading-spinner"
import { connect } from "react-redux"
import CustomSelect from "../../../components/customselect/CustomSelect";
import NewCustomSelect from "../../../components/customselect/NewCustomSelect";
import { Eye, EyeOff } from "react-feather"

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
  location_updated: false, 
  passtype:"password"
};

class ServerSidebar extends Component {
  state = initialState
  statusSelectRef = React.createRef();
  addNew = false

  componentDidMount() {
    if (this.props.selectedLocation) {
      this.props.GetLocationPdus(this.props.selectedLocation.value)
    }
    if (this.props.data) {
      if (this.props.selectedLocation) {
        this.setState({ location: this.props.selectedLocation })
      }

      if (this.props.data.id) {
        this.setState({ id: this.props.data.id })

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

      // Switch label and port based on server selection
      if (this.props.tab_selection && (this.props.tab_selection === "all" || this.props.tab_selection === "free" || this.props.tab_selection === "disconnected")) {
        //  seting switch labels
        if (this.props.data && this.props.data.switch_labels && this.props.data.switch_ids) {
          let switch_l = this.props.data.switch_labels.split(",")
          let switch_i = this.props.data.switch_ids.split(",")
          if (switch_l[0] && switch_i[0]) {
            this.setState({ switch_port1: { "label": switch_l[0], "value": parseInt(switch_i[0]) } })
          }
          if (switch_l[1] && switch_i[1]) {
            this.setState({ switch_port2: { "label": switch_l[1], "value": parseInt(switch_i[1]) } })
          }
          if (switch_l[2] && switch_i[2]) {
            this.setState({ switch_port3: { "label": switch_l[2], "value": parseInt(switch_i[2]) } })
          }
          if (switch_l[3] && switch_i[3]) {
            this.setState({ switch_port4: { "label": switch_l[3], "value": parseInt(switch_i[3]) } })
          }
          if (switch_l[4] && switch_i[4]) {
            this.setState({ switch_port5: { "label": switch_l[4], "value": parseInt(switch_i[4]) } })
          }
        }
        // setting port numbers
        if (this.props.data && this.props.data.port_nos && this.props.data.port_ids) {
          let port_l = this.props.data.port_nos.split(" ")
          let port_i = this.props.data.port_ids.split(",")
          if (port_l[0] && port_i[0]) {
            this.setState({ port1_id: { "label": port_l[0], "value": parseInt(port_i[0]) } })
          }
          if (port_l[1] && port_i[1]) {
            this.setState({ port2_id: { "label": port_l[1], "value": parseInt(port_i[1]) } })
          }
          if (port_l[2] && port_i[2]) {
            this.setState({ port3_id: { "label": port_l[2], "value": parseInt(port_i[2]) } })
          }
          if (port_l[3] && port_i[3]) {
            this.setState({ port4_id: { "label": port_l[3], "value": parseInt(port_i[3]) } })
          }
          if (port_l[4] && port_i[4]) {
            this.setState({ port5_id: { "label": port_l[4], "value": parseInt(port_i[4]) } })
          }
        }
      } else {
        if (this.props.data && this.props.data.switchLabels && this.props.data.switchIds) {
          let switch_l = this.props.data.switchLabels.split(",")
          let switch_i = this.props.data.switchIds.split(",")
          if (switch_l[0] && switch_i[0]) {
            this.setState({ switch_port1: { "label": switch_l[0], "value": parseInt(switch_i[0]) } })
          }
          if (switch_l[1] && switch_i[1]) {
            this.setState({ switch_port2: { "label": switch_l[1], "value": parseInt(switch_i[1]) } })
          }
          if (switch_l[2] && switch_i[2]) {
            this.setState({ switch_port3: { "label": switch_l[2], "value": parseInt(switch_i[2]) } })
          }
          if (switch_l[3] && switch_i[3]) {
            this.setState({ switch_port4: { "label": switch_l[3], "value": parseInt(switch_i[3]) } })
          }
          if (switch_l[4] && switch_i[4]) {
            this.setState({ switch_port5: { "label": switch_l[4], "value": parseInt(switch_i[4]) } })
          }
        }
        if (this.props.data && this.props.data.port_nos && this.props.data.port_ids) {
          let port_l = this.props.data.port_nos.split(" ")
          let port_i = this.props.data.port_ids.split(",")
          if (port_l[0] && port_i[0]) {
            this.setState({ port1_id: { "label": port_l[0], "value": parseInt(port_i[0]) } })
          }
          if (port_l[1] && port_i[1]) {
            this.setState({ port2_id: { "label": port_l[1], "value": parseInt(port_i[1]) } })
          }
          if (port_l[2] && port_i[2]) {
            this.setState({ port3_id: { "label": port_l[2], "value": parseInt(port_i[2]) } })
          }
          if (port_l[3] && port_i[3]) {
            this.setState({ port4_id: { "label": port_l[3], "value": parseInt(port_i[3]) } })
          }
          if (port_l[4] && port_i[4]) {
            this.setState({ port5_id: { "label": port_l[4], "value": parseInt(port_i[4]) } })
          }
        }
      }



      if (this.props.data.pdu_port) {
        let portSplit = this.props.data.pdu_port.split(" ")
        let portIDSplit = this.props.data.pdu_port_ids.split(",")

        if (portSplit[0] && portIDSplit[0]) {
          this.setState({ pdu0: { "label": portSplit[0], "value": parseInt(portIDSplit[0]) } })
        }
        if (portSplit[1] && portIDSplit[1]) {
          this.setState({ pdu1: { "label": portSplit[1], "value": parseInt(portIDSplit[1]) } })
        }
      }

    } else {
      if (this.props.serverList && !this.props.serverList.cpu) {
        this.props.getCpu();
      }
      if (this.props.serverList && !this.props.serverList.ram) {
        this.props.getRam();
      }
      if (this.props.serverList && !this.props.serverList.server) {
        this.props.getServer();
      }
      if (this.props.serverList && !this.props.serverList.hdd) {
        this.props.getHdd();
      }
    }
  }


  componentDidUpdate(prevProps, prevState) {
    if (this.props.data !== null && prevProps.data === null) {
      if (this.props.data.id !== prevState.id) {
        this.setState({ id: this.props.data.id })
        if (this.props.selectedLocation) {
          this.setState({ location: this.props.selectedLocation })
        }
      }
      if (this.props.data.label !== prevState.label) {
        this.setState({ label: this.props.data.label })
      }

      if (this.props.data.server_info !== prevState.info) {
        this.setState({ info: this.props.data.server_info })
      }

      if (this.props.data.ipmi_pwd !== prevState.ipmi_pwd) {
        this.setState({ ipmi_pwd: this.props.data.ipmi_pwd })
      }
      if (this.props.data.ipmi_ip !== prevState.ipmi_pwd) {
        this.setState({ ipmi_ip: this.props.data.ipmi_ip })
      }
      if (this.props.data.ipmi_port !== prevState.ipmi_port) {
        this.setState({ ipmi_port: { "label": this.props.data.ipmi_port, "value": this.props.data.ipmi_port } })
      }

      if (this.props.data.status !== prevState.status) {
        let setStatus = statusData.find((value) => value.value === this.props.data.status)
        setStatus && this.setState({ status: setStatus })
      }
      if (this.props.data.service_id !== prevState.service_id) {
        this.setState({ service_id: this.props.data.service_id })
      }
      if (this.props.data.hdd !== prevState.hdd) {
        this.props.data.hdd && this.setState({ hdd: { "label": this.props.data.hdd, "value": this.props.data.hdd } })
      }
      if (this.props.data.ram !== prevState.ram) {
        this.props.data.ram && this.setState({ ram: { "label": this.props.data.ram, "value": this.props.data.ram } })
      }
      if (this.props.data.cpu !== prevState.cpu) {
        this.props.data.cpu && this.setState({ cpu: { "label": this.props.data.cpu, "value": this.props.data.cpu } })
      }
      if (this.props.data.server !== prevState.server_name) {
        this.setState({ server_name: { "label": this.props.data.server, "value": this.props.data.server } })
      }
      if (this.props.selectedServer) {
        let selSwitch = JSON.parse(localStorage.getItem('l_s'));
        this.setState({ switch_port1: selSwitch })
      }

      if (this.props.data.port_no && this.props.data.port_id) {
        this.setState({ port1_id: { "label": this.props.data.port_no, "value": this.props.data.port_id } })
      }
      if (this.props.data.pdu_port) {
        let portSplit = this.props.data.pdu_port.split(" ")
        let portIDSplit = this.props.data.pdu_port_ids.split(",")

        if (portSplit[0] && portIDSplit[0]) {
          this.setState({ pdu0: { "label": portSplit[0], "value": parseInt(portIDSplit[0]) } })
        }
        if (portSplit[1] && portIDSplit[1]) {
          this.setState({ pdu1: { "label": portSplit[1], "value": parseInt(portIDSplit[1]) } })
        }
      }

    }
    if (this.props.data === null && prevProps.data !== null) {
      this.setState(initialState)
      this.props.GetLocationPdus(this.props.selectedLocation.value)
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
      if (this.props.selectedLocation && this.props.selectedLocation.value && obj.label && this.state.server_name &&
        obj.status && obj.status.value && (obj.switch_port1 && (obj.switch_port1.value !== "null" ? obj.port1_id && obj.port1_id.value : true))) {
        if (obj.pdu0 && obj.pdu1 && (obj.pdu0.value === obj.pdu1.value) && (obj.pdu0.label !== "N/A")) {
          this.props.PduSameWarning()
        } else {
          let updateData = {};
          updateData.loc_id = this.state.location_updated ? this.state.location.value : this.props.selectedLocation && this.props.selectedLocation.value
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
          obj.service_id && (updateData.service_id = obj.service_id !== "nill" ? obj.service_id : "");
          obj.pdu0 && obj.pdu0.value && (updateData.pdu0 = obj.pdu0 ? obj.pdu0.value : "");
          obj.pdu1 && obj.pdu1.value && (updateData.pdu1 = obj.pdu1 ? obj.pdu1.value : "");
          obj.switch_port1 && obj.switch_port1.value && obj.switch_port1.value !== "null" ? (updateData.port1_id = obj.port1_id ? obj.port1_id.value : "") : (updateData.port1_id = 0);
          obj.switch_port2 && obj.switch_port2.value && obj.switch_port2.value !== "null" ? (updateData.port2_id = obj.port2_id ? obj.port2_id.value : "") : (updateData.port2_id = 0);
          obj.switch_port3 && obj.switch_port3.value && obj.switch_port3.value !== "null" ? (updateData.port3_id = obj.port3_id ? obj.port3_id.value : "") : (updateData.port3_id = 0);
          obj.switch_port4 && obj.switch_port4.value && obj.switch_port4.value !== "null" ? (updateData.port4_id = obj.port4_id ? obj.port4_id.value : "") : (updateData.port4_id = 0);
          obj.switch_port5 && obj.switch_port5.value && obj.switch_port5.value !== "null" ? (updateData.port5_id = obj.port5_id ? obj.port5_id.value : "") : (updateData.port5_id = 0);
          var location_ID = this.props.selectedLocation ? this.props.selectedLocation.value : ""
          var locationServerId = this.props.selectedServer ? this.props.selectedServer.id : "";
          var ser_Id = this.props.changeColumns ? this.props.data.server_id : this.props.data.server_id;
          this.props.UpdateServer(ser_Id, updateData, locationServerId, this.props.tab_selection, location_ID, this.props.pageNumber).then(() => {
            if (this.props.serverList && this.props.serverList.ServerUpdated) {
              this.props.handleSidebar(false, true)
              this.props.UpdateMessage()
            } else {
              if (this.props.serverList && this.props.serverList.ServerUpdatedError) {
                this.props.serverList.ServerUpdatedError && this.props.serverList.ServerUpdatedError.label && this.props.labelSameWarning();
                this.props.serverList.ServerUpdatedError && this.props.serverList.ServerUpdatedError.ipmi_ip && this.props.ipmiIpSameWarning();
                this.props.serverList.ServerUpdatedError && this.props.serverList.ServerUpdatedError.service_id && this.props.serviceIdWarning();
              } else {
                this.props.ErrorMessage();
              }
            }
          })
        }
      } else {
        obj.label ? this.setState({ labelReq: false }) : this.setState({ labelReq: true })
        obj.server_name ? this.setState({ serReq: false }) : this.setState({ serReq: true })
        obj.port1_id ? this.setState({ portReq: false }) : this.setState({ portReq: true })
        obj.status ? this.setState({ statusReq: false }) : this.setState({ statusReq: true })
        obj.service_id ? this.setState({ serIdReq: false }) : this.setState({ serIdReq: true })
        this.props.inCompleteData()
      }
    } else {
      if (this.props.selectedLocation && this.props.selectedLocation.value && obj.label && this.state.server_name &&
        obj.status && obj.status.value && obj.port1_id && obj.port1_id.value) {
        if (obj.pdu0 && obj.pdu1 && (obj.pdu0.value === obj.pdu1.value) && (obj.pdu0.label !== "N/A")) {
          this.props.PduSameWarning()
        } else {
          this.addNew = true
          let addServerData = {}
          addServerData.loc_id = this.props.selectedLocation && this.props.selectedLocation.value;
          addServerData.label = obj.label ? obj.label.trim() : "";
          obj.ipmi_ip && (addServerData.ipmi_ip = obj.ipmi_ip ? obj.ipmi_ip.trim() : "nil");
          obj.ipmi_port && (addServerData.ipmi_port = obj.ipmi_port ? obj.ipmi_port.value : "");
          obj.ipmi_pwd && (addServerData.ipmi_pwd = obj.ipmi_pwd ? obj.ipmi_pwd : "");
          addServerData.server_name = this.state.showServerText ? this.state.server_name : this.state.server_name && this.state.server_name.value;
          obj.cpu && (addServerData.cpu = obj.cpu ? obj.cpu.label : "");
          obj.ram && (addServerData.ram = obj.ram ? obj.ram.label : "");
          obj.hdd && (addServerData.hdd = obj.hdd ? obj.hdd.label : "");
          obj.info && (addServerData.info = obj.info ? obj.info : "");
          obj.status && obj.status.value && (addServerData.status = obj.status ? obj.status.value : "");
          obj.service_id && (addServerData.service_id = obj.service_id ? obj.service_id : "");
          obj.pdu0 && obj.pdu0.value && (addServerData.pdu0 = obj.pdu0 ? obj.pdu0.value : "");
          obj.pdu1 && obj.pdu1.value && (addServerData.pdu1 = obj.pdu1 ? obj.pdu1.value : "");
          addServerData.port1_id = obj.port1_id ? obj.port1_id.value : "";
          obj.port2_id && (addServerData.port2_id = obj.port2_id ? obj.port2_id.value : "");
          obj.port3_id && (addServerData.port3_id = obj.port3_id ? obj.port3_id.value : "");
          obj.port4_id && (addServerData.port4_id = obj.port4_id ? obj.port4_id.value : "");
          obj.port5_id && (addServerData.port5_id = obj.port5_id ? obj.port5_id.value : "");
          locationServerId = this.props.selectedServer ? this.props.selectedServer.id : "";
          this.props.addServersAction(addServerData, locationServerId).then(() => {
            if (this.props.serverList && this.props.serverList.addedServer) {
              this.props.handleSidebar(false, true)
              this.props.AddMessage()
            } else {
              if (this.props.serverList && this.props.serverList.addServerError) {
                this.props.serverList.addServerError && this.props.serverList.addServerError.label && this.props.labelSameWarning();
                this.props.serverList.addServerError && this.props.serverList.addServerError.ipmi_ip && this.props.ipmiIpSameWarning();
                this.props.serverList.addServerError && this.props.serverList.addServerError.service_id && this.props.serviceIdWarning();
              } else {
                this.props.ErrorMessage();
              }
            }
          })
        }
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

  convertPortData1 = data => {
    var portData = []
    var switch_selected = ""
    if (data && data.length > 0 && this.state.switch_port1 && !this.state.location_updated) {
      switch_selected = data.find((value) => value.id === this.state.switch_port1.value)
    }
    if (this.state.location_updated) {
      if (this.props.serverList && this.props.serverList.allServerDetails && this.props.serverList.allServerDetails.length > 0) {
        var current_loc = this.props.serverList.allServerDetails.find((value) => value.id === this.state.location.value)
      }
      switch_selected = current_loc && current_loc.switch_models && current_loc.switch_models.find((val) => val.id === this.state.switch_port1.value)
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

  convertPortData2 = data => {
    var portData = []
    var switch_selected = ""
    if (data && data.length > 0 && this.state.switch_port2 && !this.state.location_updated) {
      switch_selected = data.find((value) => value.id === this.state.switch_port2.value)
    }

    if (this.state.location_updated) {
      if (this.props.serverList && this.props.serverList.allServerDetails && this.props.serverList.allServerDetails.length > 0) {
        var current_loc = this.props.serverList.allServerDetails.find((value) => value.id === this.state.location.value)
      }
      switch_selected = current_loc && current_loc.switch_models && current_loc.switch_models.find((val) => val.id === this.state.switch_port2.value)
    }

    switch_selected && switch_selected.portModels && switch_selected.portModels.forEach((value) => {
      portData.push({ "label": value.port_no, "value": value.id })
    })
    return portData
  }

  convertPortData3 = data => {
    var portData = []
    var switch_selected = ""
    if (data && data.length > 0 && this.state.switch_port3 && !this.state.location_updated) {
      switch_selected = data.find((value) => value.id === this.state.switch_port3.value)
    }

    if (this.state.location_updated) {
      if (this.props.serverList && this.props.serverList.allServerDetails && this.props.serverList.allServerDetails.length > 0) {
        var current_loc = this.props.serverList.allServerDetails.find((value) => value.id === this.state.location.value)
      }
      switch_selected = current_loc && current_loc.switch_models && current_loc.switch_models.find((val) => val.id === this.state.switch_port3.value)
    }

    switch_selected && switch_selected.portModels && switch_selected.portModels.forEach((value) => {
      portData.push({ "label": value.port_no, "value": value.id })
    })
    return portData
  }

  convertPortData4 = data => {
    var portData = []
    var switch_selected = ""
    if (data && data.length > 0 && this.state.switch_port4 && !this.state.location_updated) {
      switch_selected = data.find((value) => value.id === this.state.switch_port4.value)
    }

    if (this.state.location_updated) {
      if (this.props.serverList && this.props.serverList.allServerDetails && this.props.serverList.allServerDetails.length > 0) {
        var current_loc = this.props.serverList.allServerDetails.find((value) => value.id === this.state.location.value)
      }
      switch_selected = current_loc && current_loc.switch_models && current_loc.switch_models.find((val) => val.id === this.state.switch_port4.value)
    }

    switch_selected && switch_selected.portModels && switch_selected.portModels.forEach((value) => {
      portData.push({ "label": value.port_no, "value": value.id })
    })
    return portData
  }
  convertPortData5 = data => {
    var portData = []
    var switch_selected = ""
    if (data && data.length > 0 && this.state.switch_port5 && !this.state.location_updated) {
      switch_selected = data.find((value) => value.id === this.state.switch_port5.value)
    }

    if (this.state.location_updated) {
      if (this.props.serverList && this.props.serverList.allServerDetails && this.props.serverList.allServerDetails.length > 0) {
        var current_loc = this.props.serverList.allServerDetails.find((value) => value.id === this.state.location.value)
      }
      switch_selected = current_loc && current_loc.switch_models && current_loc.switch_models.find((val) => val.id === this.state.switch_port5.value)
    }

    switch_selected && switch_selected.portModels && switch_selected.portModels.forEach((value) => {
      portData.push({ "label": value.port_no, "value": value.id })
    })
    return portData
  }

  convertLocationPdu = data => {
    var pduDatas = []
    pduDatas.push({ label: "N/A", value: null })
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
    if (this.props.serverList && this.props.serverList.allServerDetails && this.props.serverList.allServerDetails.length > 0) {
      var current_loc = this.props.serverList.allServerDetails.find((value) => value.id === this.state.location.value)
    }
    var switchData = []
    current_loc && current_loc.switch_models && current_loc.switch_models.forEach((value) => {
      switchData.push({ "label": value.label, "value": value.id })
    })
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
 
  handlepasstype= (props) =>{
    if (this.state.passtype == "password"){

      this.setState({passtype:"text"})
      let addPasslog={};

      //for main ports
       if ( this.props.data.switchIds || this.props.data.switchIds == "" ){
        
          let switchvalue = this.props.data.switchIds;
          let portvalue = this.props.data.port_ids;

          //for comma seperated switches
          if (switchvalue.indexOf(',') > -1) { 
          let commaswitch = switchvalue.split(',') 
          let swtichid = commaswitch[0]
          addPasslog.switch_id = swtichid;
           }else if (switchvalue=""){
              addPasslog.switch_id = null;
           }
           else {
          addPasslog.switch_id = this.props.data.switchIds;
           }

            //for comma seperated port values
            if (portvalue.indexOf(',') > -1) { 
              let commaport = portvalue.split(',') 
              let portid = commaport[0]
              addPasslog.port_id = portid;
               }else if (portvalue=""){
                  addPasslog.port_id = null;
               }
               else {
              addPasslog.port_id = this.props.data.port_ids;
               }
           addPasslog.user_id = localStorage.getItem("user_id");
           addPasslog.location_id = this.props.selectedLocation.value;
           addPasslog.server_label = this.props.data.label;
           this.props.addPasswordLog(addPasslog)

       } 

       //for sub ports
       else if (this.props.data.switch_ids || this.props.data.switch_ids == "" ){

          let switchvalue = this.props.data.switch_ids;
          let portvalue = this.props.data.port_ids;

          //for comma seperated switches
          if (switchvalue.indexOf(',') > -1) { 
          let commaswitch = switchvalue.split(',') 
          let swtichid = commaswitch[0]
          addPasslog.switch_id = swtichid;
           } else if (switchvalue=""){
              addPasslog.switch_id = null;
           }
           else {
          addPasslog.switch_id = this.props.data.switch_ids;
           }

           //for comma seperated port values
           if (portvalue.indexOf(',') > -1) { 
              let commaport = portvalue.split(',') 
              let portid = commaport[0]
              addPasslog.port_id = portid;
               }else if (portvalue=""){
                  addPasslog.port_id = null;
               }
               else {
              addPasslog.port_id = this.props.data.port_ids;
               }
           addPasslog.user_id = localStorage.getItem("user_id");
           addPasslog.location_id = this.props.selectedLocation.value;
           addPasslog.server_label = this.props.data.label;
           this.props.addPasswordLog(addPasslog)

       } 
    //   let addPasslog={};
    //   let switchvalue = this.props.data.switchIds;

    //        if (switchvalue.indexOf(',') > -1) {
    //         let commaless = switchvalue.split(',') 
    //           let swtichid = commaless[0]
    //   addPasslog.user_id = localStorage.getItem("user_id");
    //  addPasslog.location_id = this.props.selectedLocation.value;
    //  addPasslog.switch_id = swtichid;
    //  addPasslog.server_label = this.props.data.label;
    //  addPasslog.port_id = this.props.data.port_id; 
    //  this.props.addPasswordLog(addPasslog)
    //         }else{
    //           addPasslog.user_id = localStorage.getItem("user_id");
    //  addPasslog.location_id = this.props.selectedLocation.value;
    //  addPasslog.switch_id = this.props.data.switchIds;
    //  addPasslog.server_label = this.props.data.label;
    //  addPasslog.port_id = this.props.data.port_id; 
    //  this.props.addPasswordLog(addPasslog)
    //         }
      
    }else{
      this.setState({passtype:"password"})
    }
  }

  render() {
    let { show, handleSidebar, data } = this.props
    let { location, switch_port1, port1_id, switch_port2, port2_id, switch_port3, port3_id,
      switch_port4, port4_id, switch_port5, port5_id, pdu0, pdu1, ipmi_port, ipmi_ip,
      ipmi_pwd, label, server_name, cpu, ram, hdd, status, service_id, info, showServerText, location_updated} = this.state
    let labelstyle = {
      color: '#da8d18'
    }
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
                      <Label for="data-location" style={labelstyle}>Location <span style={{ color: "red" }}>*</span> </Label>
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
                      <Label for="switch_port1" style={labelstyle}>Switch port #1 <span style={{ color: "red" }}>*</span></Label>
                      <CustomSelect
                        value={switch_port1}
                        onChange={(e) => this.setState({ switch_port1: e, port1_id: "" })}
                        options={location_updated ? this.convertSwitchData() : this.props.serverData}
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
                        options={this.props.allServerData && this.props.allServerData.switch_models ? this.convertPortData1(this.props.allServerData.switch_models) : []}
                        invalid={this.state.portReq}
                      />
                    </FormGroup>
                  </Col>
                  <Col md="8" sm="12">
                    <FormGroup style={{ marginBottom: "10px" }}>
                      <Label for="switch_port2" style={labelstyle}>Switch port #2</Label>
                      <CustomSelect
                        value={switch_port2}
                        onChange={(e) => this.setState({ switch_port2: e, port2_id: "" })}
                        options={location_updated ? this.convertSwitchData() : this.props.serverData}
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
                        options={this.props.allServerData && this.props.allServerData.switch_models ? this.convertPortData2(this.props.allServerData.switch_models) : []}
                      />
                    </FormGroup>
                  </Col>
                  <Col md="8" sm="12">
                    <FormGroup style={{ marginBottom: "10px" }}>
                      <Label for="switch_port3" style={labelstyle}>Switch port #3</Label>
                      <CustomSelect
                        value={switch_port3}
                        onChange={(e) => this.setState({ switch_port3: e, port3_id: "" })}
                        options={location_updated ? this.convertSwitchData() : this.props.serverData}
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
                        options={this.props.allServerData && this.props.allServerData.switch_models ? this.convertPortData3(this.props.allServerData.switch_models) : []}
                      />
                    </FormGroup>
                  </Col>
                  <Col md="8" sm="12">
                    <FormGroup style={{ marginBottom: "10px" }}>
                      <Label for="switch_port4" style={labelstyle}>Switch port #4</Label>
                      <CustomSelect
                        value={switch_port4}
                        onChange={(e) => this.setState({ switch_port4: e, port4_id: "" })}
                        options={location_updated ? this.convertSwitchData() : this.props.serverData}
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
                        options={this.props.allServerData && this.props.allServerData.switch_models ? this.convertPortData4(this.props.allServerData.switch_models) : []}
                      />
                    </FormGroup>
                  </Col>
                  <Col md="8" sm="12">
                    <FormGroup style={{ marginBottom: "10px" }}>
                      <Label for="switch_port5" style={labelstyle}>Switch port #5</Label>
                      <CustomSelect
                        value={switch_port5}
                        onChange={(e) => this.setState({ switch_port5: e, port5_id: "" })}
                        options={location_updated ? this.convertSwitchData() : this.props.serverData}
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
                        options={this.props.allServerData && this.props.allServerData.switch_models ? this.convertPortData5(this.props.allServerData.switch_models) : []}
                      />
                    </FormGroup>
                  </Col>
                  <Col md="6" sm="12">
                    <FormGroup style={{ marginBottom: "10px" }}>
                      <Label for="pdu0" style={labelstyle}>PDU port #1</Label>
                      <CustomSelect
                        isDisabled={false}
                        value={pdu0}
                        onChange={(e) => this.setState({ pdu0: e })}
                        options={this.props.pduData ? this.convertLocationPdu(this.props.pduData) : []}
                        id="pdu0"
                      />
                    </FormGroup>
                  </Col>
                  <Col md="6" sm="12">
                    <FormGroup style={{ marginBottom: "10px" }}>
                      <Label for="pdu1" style={labelstyle}>PDU port #2</Label>
                      <CustomSelect
                        isDisabled={false}
                        value={pdu1}
                        onChange={e => this.setState({ pdu1: e })}
                        options={this.props.pduData ? this.convertLocationPdu(this.props.pduData) : []}
                        id="pdu1"
                      />
                    </FormGroup>
                  </Col>
                  <Col md="6" sm="12">
                    <FormGroup style={{ marginBottom: "10px" }}>
                      <Label for="ipmi_port" style={labelstyle}>IPMI Port</Label>
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
                      <Label for="ipmi_ip" style={labelstyle}>IPMI IP</Label>
                      <Input
                        className="form-control-sm form-control"
                        type="text"
                        id="ipmi_port"
                        autoComplete="off"
                        value={ipmi_ip ? ipmi_ip : ""}
                        onChange={e => this.setState({ ipmi_ip: e.target.value })}
                      />
                    </FormGroup>
                  </Col>
                  {
                    localStorage.getItem("user_role") && (localStorage.getItem("user_role") === "Sales" || localStorage.getItem("user_role") === "Senior Sales") ?
                      null :
                      <Col md="6" sm="12">
                        <FormGroup                        
                        style={{ marginBottom: "10px" }}>
                          <Label for="ipmi_pwd" style={labelstyle}> IPMI Password </Label>
                          <div className="d-flex w-100">
                          <Input
                            className="form-control-sm h-100 form-control w-90"
                            style={{borderRadius:"5px 0px 0px 5px"}}
                            type={this.state.passtype}
                            autoComplete="new-password"
                            id="ipmi_pwd"
                            value={ipmi_pwd ? ipmi_pwd : null}
                            onChange={e => this.setState({ ipmi_pwd: e.target.value })}
                          />
                          {ipmi_pwd === null || ipmi_pwd == "" ? " " :
                          <Button 
                          className="w-10 h-100 btn btn-sm btn-primary text-white" 
                          style={{borderRadius:"0px 5px 5px 0px"}}
                          onClick={()=>this.handlepasstype()}>
                          {this.state.passtype === "password" ?
                          <Eye size={15}/> : <EyeOff size={15}/>}
                          </Button> }
                          
                          
                          </div>
                         
                        </FormGroup>
                      </Col>
                  }
                  <Col
                    md={(localStorage.getItem("user_role") === "Sales" || localStorage.getItem("user_role") === "Senior Sales") ? "12" : "6"}
                    sm="12">
                    <FormGroup style={{ marginBottom: "10px" }}>
                      <Label for="label" style={labelstyle}>Label <span style={{ color: "red" }}>*</span></Label>
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
                      <Label for="server" style={labelstyle}>Server <span style={{ color: "red" }}>*</span></Label>
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
                      <Label for="cpu" style={labelstyle}>CPU</Label>
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
                      <Label for="ram" style={labelstyle}>RAM</Label>
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
                      <Label for="hdd" style={labelstyle}>HDD</Label>
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
                      <Label for="status" style={labelstyle}>Status <span style={{ color: "red" }}>*</span></Label>
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
                  {status.value!=='free' && 
                    <Col md="6" sm="12">
                    <FormGroup style={{ marginBottom: "100px" }}>
                      <Label for="service_id" style={labelstyle}>Service ID</Label>
                      <Input
                        className="form-control-sm form-control"
                        type="number"
                        id="service_id"
                        value={service_id ? service_id : ""}
                        onChange={e => this.setState({ service_id: e.target.value })}
                      />
                    </FormGroup>
                  </Col>}
                
                  <Col md="6" sm="12">
                    <FormGroup style={{ marginBottom: "100px" }}>
                      <Label for="info" style={labelstyle}>Info</Label>
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
    addPasswordLog,
    getServer, getIpmiIp, GetLocationPdus, callResources
  })(ServerSidebar)
