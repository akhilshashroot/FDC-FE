import React, { Component, Fragment } from "react"
import {
  Card,
  CardBody,
  Row,
  Col,
  Button,
  Input,
  FormGroup,
  UncontrolledTooltip
} from "reactstrap"
import { connect } from "react-redux"
import "../../../assets/scss/pages/data-list.scss"
import CreatableSelect from 'react-select/creatable';
import {
  getCpu,
  getRam,
  getHdd,
  AddCpu,
  AddRam,
  AddHdd,
  UpdateCpu,
  UpdateRam,
  UpdateHdd,
  DeleteServerResource
} from "../../../redux/actions/servers"
import "../../../assets/scss/plugins/extensions/react-paginate.scss"
import {
  Edit,
  Save,
  XCircle,
  Trash
} from "react-feather"
import { Table } from "reactstrap"
import { toast, ToastContainer, Zoom } from "react-toastify"
import "react-toastify/dist/ReactToastify.css"
import "../../../assets/scss/plugins/extensions/toastr.scss"
import ServerResourceModal from './DeleteResourceModal'

const cpuUpdate = () => toast.info("CPU Updated Successfully", { transition: Zoom })
const cpuAdd = () => toast.success("CPU Added Successfully", { transition: Zoom })
const ramUpdate = () => toast.info("RAM Updated Successfully", { transition: Zoom })
const ramAdd = () => toast.success("RAM Added Successfully", { transition: Zoom })
const hddUpdate = () => toast.info("HDD Updated Successfully", { transition: Zoom })
const hddAdd = () => toast.success("HDD Added Successfully", { transition: Zoom })
const errorMessage = () => toast.warning("Something went wrong.Please try again..", { transition: Zoom })
const ramValidation = () => toast.warning("Ram value should be in GB/TB.", { transition: Zoom })
const deletedCpu = () => toast.success("Cpu Deleted Successfully", { transition: Zoom })
const deletedRam = () => toast.success("Ram Deleted Successfully", { transition: Zoom })
const deletedHdd = () => toast.success("Hdd Deleted Successfully", { transition: Zoom })

class ResourcesConfig extends Component {

  state = {
    showUpdateBtn: false,
    showUpdateBtn2: false,
    showUpdateBtn3: false,
    modal: false,
    data: [],
    totalPages: 0,
    currentPage: 0,
    allData: [],
    value: "",
    rowsPerPage: 4,
    sidebar: false,
    currentData: null,
    selected: [],
    totalRecords: 0,
    sortIndex: [],
    addNew: "",
    selectedCPU: null,
    selectedRAM: null,
    selectedHDD: null,
    editCPUValue: "",
    editRAMValue: "",
    editHDDValue: "",
    toggleDeleteModal: false,
    resourceValue: "",
    resourceType: ""
  }

  thumbView = this.props.thumbView

  componentDidMount() {
    if (this.props.serverList && !this.props.serverList.cpu) {
      this.props.getCpu(true)
    }
    if (this.props.serverList && !this.props.serverList.ram) {
      this.props.getRam(true)
    }
    if (this.props.serverList && !this.props.serverList.hdd) {
      this.props.getHdd(true)
    }
  }

  convertSelectFieldData = data => {
    var resultData = []
    data.forEach((value) => {
      resultData.push({ "label": value.resource_value, "value": value.id })
    })
    return resultData
  }

  handleCPUChange = (selectedOption, meta) => {
    if (meta.action === "select-option") {
      this.setState({ selectedCPU: selectedOption })
    }

    if (meta.action === "create-option") {
      this.props.AddCpu({ "resource_type": "cpu", "resource_value": selectedOption.label }).then(() => {
        this.props.getCpu();
        if (this.props.serverList && this.props.serverList.cpuCreated) {
          cpuAdd();
          this.props.getCpu()
        }
        else {
          errorMessage()
        }
      })
    }
  };

  handleRamChange = (selectedOption, meta) => {

    if (meta.action === "select-option") {
      this.setState({ selectedRAM: selectedOption })
    }

    if (meta.action === "create-option") {
      var val = selectedOption.value.trim().toUpperCase().split(' ')
      if (val.length === 1) {
        val = val[0]
      }
      if (val.includes("GB") || val.includes("TB")) {
        var ram_value = selectedOption.value.replace(/ /g, "").toUpperCase();
        this.props.AddRam({ "resource_type": "ram", "resource_value": ram_value }).then(() => {
          this.props.getRam();
          if (this.props.serverList && this.props.serverList.ramCreated) {
            ramAdd();
            this.props.getRam()
          }
          else {
            errorMessage()
          }
        })
      } else {
        ramValidation()
      }

    }
  };

  handleHddChange = (selectedOption, meta) => {
    if (meta.action === "select-option") {
      this.setState({ selectedHDD: selectedOption })
    }

    if (meta.action === "create-option") {
      this.props.AddHdd({ "resource_type": "hdd", "resource_value": selectedOption.label }).then(() => {
        this.props.getHdd();
        if (this.props.serverList && this.props.serverList.hddCreated) {
          hddAdd();
          this.props.getHdd()
        }
        else {
          errorMessage()
        }
      })
    }
  };

  // edit part

  editCpu = (value) => {
    this.setState({ showUpdateBtn: true })
    if (this.props.serverList && this.props.serverList.cpu && this.props.serverList.cpu.length > 0) {
      let valueSelected = this.props.serverList.cpu.find((data) => data.resource_value === value.resource_value)
      valueSelected && this.setState({ selectedCPU: { "label": valueSelected.resource_value, "value": valueSelected.id }, editCPUValue: valueSelected.resource_value })

    }
  }

  editRam = (value) => {
    this.setState({ showUpdateBtn2: true })
    if (this.props.serverList && this.props.serverList.ram && this.props.serverList.ram.length > 0) {
      let valueSelected = this.props.serverList.ram.find((data) => data.resource_value === value.resource_value)
      valueSelected && this.setState({ selectedRAM: { "label": valueSelected.resource_value, "value": valueSelected.id }, editRAMValue: valueSelected.resource_value })

    }
  }

  editHdd = (value) => {
    this.setState({ showUpdateBtn3: true })
    if (this.props.serverList && this.props.serverList.hdd && this.props.serverList.hdd.length > 0) {
      let valueSelected = this.props.serverList.hdd.find((data) => data.resource_value === value.resource_value)
      valueSelected && this.setState({ selectedHDD: { "label": valueSelected.resource_value, "value": valueSelected.id }, editHDDValue: valueSelected.resource_value })

    }
  }



  // updation part
  updateCpuData = () => {
    if (this.props.serverList && this.props.serverList.cpu && this.props.serverList.cpu.length > 0) {
      let indexValue = this.props.serverList.cpu.findIndex((data) => data.resource_value === this.state.editCPUValue);
      (indexValue === -1) && this.props.UpdateCpu(this.state.selectedCPU.value, { "resource_value": this.state.editCPUValue }).then(() => {
        this.props.getCpu();
        cpuUpdate();
        this.setState({ showUpdateBtn: false, editCPUValue: "", selectedCPU: "" });
      })
    }
  }

  updateRamData = () => {
    var val = this.state.editRAMValue.trim().toUpperCase().split(' ')
    if (val.length === 1) {
      val = val[0]
    }
    if (val.includes("GB") || val.includes("TB")) {
      var ram_value = this.state.editRAMValue.replace(/ /g, "").toUpperCase();
      if (this.props.serverList && this.props.serverList.ram && this.props.serverList.ram.length > 0) {
        let indexValue = this.props.serverList.ram.findIndex((data) => data.resource_value === this.state.editRAMValue);
        (indexValue === -1) &&
          this.props.UpdateRam(this.state.selectedRAM.value, { "resource_value": ram_value }).then(() => {
            this.props.getRam();
            ramUpdate();
            this.setState({ showUpdateBtn2: false, editRAMValue: "", selectedRAM: "" });
          })
      }
    } else {
      ramValidation()
    }
  }

  updateHddData = () => {
    if (this.props.serverList && this.props.serverList.hdd && this.props.serverList.hdd.length > 0) {
      let indexValue = this.props.serverList.hdd.findIndex((data) => data.resource_value === this.state.editHDDValue);
      (indexValue === -1) && this.props.UpdateHdd(this.state.selectedHDD.value, { "resource_value": this.state.editHDDValue }).then(() => {
        this.props.getHdd()
        hddUpdate()
        this.setState({ showUpdateBtn3: false, editHDDValue: "", selectedHDD: "" })
      })


    }
  }

  // delete

  deleteResource = (value, type) => {
    this.setState({ toggleDeleteModal: true, resourceValue: value, resourceType: type })
  }

  closeDeleteModal = () => {
    this.setState({ toggleDeleteModal: false, resourceValue: "", resourceType: "" })
  }


  // cancel
  cancelUpdateCpuData = () => {
    this.setState({ selectedCPU: "", editPUValue: "", showUpdateBtn: false })
  }

  cancelUpdateRamData = () => {
    this.setState({ selectedRAM: "", editRAMValue: "", showUpdateBtn2: false })
  }

  cancelUpdateHddData = () => {
    this.setState({ selectedHDD: "", editHDDValue: "", showUpdateBtn3: false })
  }

  render() {
    const datalisthieght = window.screen.height - 600
    const responsiveheight = datalisthieght + "px"
    let { selectedCPU, selectedRAM, selectedHDD, editCPUValue, editRAMValue, editHDDValue } = this.state
    const item_full = {
      width: "100%",
      marginBottom: "0px"
    };
    const item_update = {
      width: "90%",
      marginBottom: "0px"
    };
    const tdediticons = {
      cursor: "pointer",
      marginBottom: "4px"
    };
    const tddeleteicons = {
      cursor: "pointer",
      marginLeft: "10px",
      marginBottom: "4px"
    };

    const saveicon = {
      cursor: "pointer",
      width: "38px",
      marginLeft: "5px",
      marginRight: "0px",
      paddingLeft: "0px",
      marginTop: "4px",
      paddingRight: "0px",
      paddingTop: "0px",
      paddingBottom: "0px",
      height: "30px"
    }
    const tablebody = {
      maxHeight: responsiveheight
    }
    const thstyle1 = {
      width: "20%"
    }
    const thstyle2 = {
      width: "60%"
    }
    const thstyle3 = {
      width: "20%"
    }

    return (
      <Fragment>
        <Row>
          <Col lg="6" md="12">
            <Card>
              <CardBody>
                <h5>CPU</h5>
                <div className="card-btns d-flex justify-content-between mt-2">
                  <FormGroup style={!this.state.showUpdateBtn ? item_full : item_update}>
                    {!this.state.showUpdateBtn ?
                      <CreatableSelect
                        value={selectedCPU}
                        isClearable
                        onChange={this.handleCPUChange}
                        options={
                          (this.props.serverList && this.props.serverList.cpu && this.props.serverList.cpu.length > 0) &&
                          this.convertSelectFieldData(this.props.serverList.cpu)
                        }
                        isSearchable={true}
                      />
                      :
                      <Input
                        type="text"
                        value={editCPUValue}
                        placeholder="CPU"
                        onChange={(e) => this.setState({ editCPUValue: e.target.value })}
                      />
                    }
                  </FormGroup>
                  {this.state.showUpdateBtn &&
                    <Fragment>
                      <Button style={saveicon} outline color="success" id="hwupdate" onClick={this.updateCpuData}>
                        <Save size={20} />
                      </Button>
                      <UncontrolledTooltip placement="top" target="hwupdate">
                        Update
                        </UncontrolledTooltip>
                      <Button style={saveicon} outline color="danger" id="hwcancel" onClick={this.cancelUpdateCpuData}>
                        <XCircle size={20} />
                      </Button>
                      <UncontrolledTooltip placement="top" target="hwcancel">
                        Cancel
                        </UncontrolledTooltip>
                    </Fragment>
                  }
                </div>
                <div className="card-btns d-flex justify-content-between mt-2" style={tablebody}>
                  <Table striped responsive>
                    <thead>
                      <tr>
                        <th style={thstyle1}>#</th>
                        <th style={thstyle2}>CPU</th>
                        <th style={thstyle3}>Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {(this.props.serverList && this.props.serverList.cpu && this.props.serverList.cpu.length > 0) &&
                        this.props.serverList.cpu.map((value, index) =>
                          <tr key={index}>
                            <th scope="row">{index + 1}</th>
                            <td>{value.resource_value}</td>
                            <td>
                              <Edit className="vx-icon" size={15} style={tdediticons} onClick={(e) => this.editCpu(value)} />
                              <Trash className="vx-icon" size={15} style={tddeleteicons} onClick={(e) => this.deleteResource(value, "cpu")} />
                            </td>
                          </tr>
                        )

                      }
                    </tbody>
                  </Table>
                </div>
              </CardBody>
            </Card>
          </Col>
          <Col lg="6" md="6" sm="12">
            <Card>
              <CardBody>
                <h5>RAM</h5>
                <div className="card-btns d-flex justify-content-between mt-2">
                  <FormGroup style={!this.state.showUpdateBtn2 ? item_full : item_update}>
                    {!this.state.showUpdateBtn2 ?
                      <CreatableSelect
                        isClearable
                        value={selectedRAM}
                        onChange={this.handleRamChange}
                        options={(this.props.serverList && this.props.serverList.ram && this.props.serverList.ram.length > 0) &&
                          this.convertSelectFieldData(this.props.serverList.ram)}
                        isSearchable={true}
                      />
                      :
                      <Input
                        type="text"
                        value={editRAMValue}
                        placeholder="RAM"
                        onChange={(e) => this.setState({ editRAMValue: e.target.value })}
                      />
                    }
                  </FormGroup>
                  {this.state.showUpdateBtn2 &&
                    <Fragment>
                      <Button style={saveicon} outline color="success" id="mfupdate" onClick={this.updateRamData}>
                        <Save size={20} />
                      </Button>
                      <UncontrolledTooltip placement="top" target="mfupdate">
                        Update
                        </UncontrolledTooltip>
                      <Button style={saveicon} outline color="danger" id="mfcancel" onClick={this.cancelUpdateRamData}>
                        <XCircle size={20} />
                      </Button>
                      <UncontrolledTooltip placement="top" target="mfcancel">
                        Cancel
                        </UncontrolledTooltip>
                    </Fragment>
                  }
                </div>
                <div className="card-btns d-flex justify-content-between mt-2" style={tablebody}>
                  <Table striped responsive>
                    <thead>
                      <tr>
                        <th style={thstyle1}>#</th>
                        <th style={thstyle2}>RAM</th>
                        <th style={thstyle3}>Actions</th>
                      </tr>

                    </thead>
                    <tbody>
                      {(this.props.serverList && this.props.serverList.ram && this.props.serverList.ram.length > 0) &&
                        this.props.serverList.ram.map((value, index) =>
                          <tr key={index}>
                            <th scope="row">{index + 1}</th>
                            <td>{value.resource_value}</td>
                            <td>
                              <Edit className="vx-icon" size={15} style={tdediticons} onClick={(e) => this.editRam(value)} />
                              <Trash className="vx-icon" size={15} style={tddeleteicons} onClick={(e) => this.deleteResource(value, "ram")} />
                            </td>
                          </tr>
                        )
                      }
                    </tbody>
                  </Table>
                </div>
              </CardBody>
            </Card>
          </Col>
          <Col lg="6" md="6" sm="12">
            <Card>
              <CardBody>
                <h5>HDD</h5>
                <div className="card-btns d-flex justify-content-between mt-2">
                  <FormGroup style={!this.state.showUpdateBtn3 ? item_full : item_update}>
                    {!this.state.showUpdateBtn3 ?
                      <CreatableSelect
                        isClearable
                        value={selectedHDD}
                        onChange={this.handleHddChange}
                        options={
                          (this.props.serverList && this.props.serverList.hdd && this.props.serverList.hdd.length > 0) &&
                          this.convertSelectFieldData(this.props.serverList.hdd)
                        }
                        isSearchable={true}
                      />
                      :
                      <Input
                        type="text"
                        value={editHDDValue}
                        placeholder="HDD"
                        onChange={(e) => this.setState({ editHDDValue: e.target.value })}
                      />
                    }
                  </FormGroup >
                  {this.state.showUpdateBtn3 &&
                    <Fragment>
                      <Button style={saveicon} outline color="success" id="brupdate" onClick={this.updateHddData}>
                        <Save size={20} />
                      </Button>
                      <UncontrolledTooltip placement="top" target="brupdate">
                        Update
                        </UncontrolledTooltip>
                      <Button style={saveicon} outline color="danger" id="brcancel" onClick={this.cancelUpdateHddData}>
                        <XCircle size={20} />
                      </Button>
                      <UncontrolledTooltip placement="top" target="brcancel">
                        Cancel
                        </UncontrolledTooltip>
                    </Fragment>
                  }
                </div>
                <div className="card-btns d-flex justify-content-between mt-2" style={tablebody}>
                  <Table striped responsive>
                    <thead>

                      <tr >
                        <th style={thstyle1}>#</th>
                        <th style={thstyle2}>HDD</th>
                        <th style={thstyle3}>Actions</th>
                      </tr>

                    </thead>
                    <tbody>
                      {(this.props.serverList && this.props.serverList.hdd && this.props.serverList.hdd.length > 0) &&
                        this.props.serverList.hdd.map((value, index) =>
                          <tr key={index}>
                            <th scope="row">{index + 1}</th>
                            <td>{value.resource_value}</td>
                            <td>
                              <Edit className="vx-icon" size={15} style={tdediticons} onClick={(e) => this.editHdd(value)} />
                              <Trash className="vx-icon" size={15} style={tddeleteicons} onClick={(e) => this.deleteResource(value, "hdd")} />
                            </td>
                          </tr>
                        )
                      }
                    </tbody>
                  </Table>
                </div>
              </CardBody>
            </Card>
          </Col>

        </Row>
        {this.state.toggleDeleteModal &&
          <ServerResourceModal
            toggleDeleteModal={this.state.toggleDeleteModal}
            closeModal={this.closeDeleteModal}
            resourceValue={this.state.resourceValue}
            DeleteServerResource={this.props.DeleteServerResource}
            resourceType={this.state.resourceType}
            deletedCpu={deletedCpu}
            deletedRam={deletedRam}
            deletedHdd={deletedHdd}
            errorMessage={errorMessage}
            serverList={this.props.serverList}
          />
        }

        <ToastContainer />
      </Fragment>
    )
  }
}

const mapStateToProps = state => {
  return {
    serverList: state.ServerList
  }
}

export default connect(mapStateToProps, {
  getCpu,
  getRam,
  getHdd,
  AddCpu,
  AddRam,
  AddHdd,
  UpdateCpu,
  UpdateRam,
  UpdateHdd,
  DeleteServerResource
})(ResourcesConfig)