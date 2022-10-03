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
  getManufactures,
  getHardwares,
  getBrands,
  getModelNumbers,
  getSize,
  AddHardware,
  AddManufacture,
  AddBrand,
  AddModelno,
  AddSize,
  UpdateManufacture,
  UpdateBrand,
  UpdateHardware,
  UpdateModelno,
  UpdateSize,
  DeleteHardware, DeleteBrand, DeleteManufacture, DeleteSize, DeleteModel
} from "../../../redux/actions/inventory"
import "react-toastify/dist/ReactToastify.css"
import "../../../assets/scss/plugins/extensions/toastr.scss"
import {
  Edit,
  Save,
  XCircle,
  Trash
  // Inbox
} from "react-feather"
import { Table } from "reactstrap"
import { toast, ToastContainer, Zoom } from "react-toastify"
import "react-toastify/dist/ReactToastify.css"
import "../../../assets/scss/plugins/extensions/toastr.scss"
import InventoryResourceModal from "./DeleteInvResource"


const hardwareUpdate = () => toast.info("Hardware Updated Successfully", { transition: Zoom })
const hardwareAdd = () => toast.success("Hardware Added Successfully", { transition: Zoom })
const manufactureUpdate = () => toast.info("Manufacture Updated Successfully", { transition: Zoom })
const manufactureAdd = () => toast.success("Manufacture Added Successfully", { transition: Zoom })
const brandUpdate = () => toast.info("Brand Name Updated Successfully", { transition: Zoom })
const brandAdd = () => toast.success("Brand Name Added Successfully", { transition: Zoom })
const modelUpdate = () => toast.info("Model Number Updated Successfully", { transition: Zoom })
const modelAdd = () => toast.success("Model Number Added Successfully", { transition: Zoom })
const sizeUpdate = () => toast.info("Size Updated Successfully", { transition: Zoom })
const sizeAdd = () => toast.success("Size Added Successfully", { transition: Zoom })
const errorMessage = () => toast.warning("Something went wrong.Please try again..", { transition: Zoom })
const deletedHardware = () => toast.success("Hardware Deleted Successfully", { transition: Zoom })
const deletedManufacture = () => toast.success("Manufacturer Deleted Successfully", { transition: Zoom })
const deletedBrand = () => toast.success("Brand Deleted Successfully", { transition: Zoom })
const deletedModel = () => toast.success("Model Deleted Successfully", { transition: Zoom })
const deletedSize = () => toast.success("Size Deleted Successfully", { transition: Zoom })
const usedHardware = () => toast.info("Hardware is in use by inventory products", { transition: Zoom })
const usedManufacture = () => toast.info("Manufacturer is in use by inventory products", { transition: Zoom })

class ResourcesConfig extends Component {

  state = {
    showUpdateBtn: false,
    showUpdateBtn2: false,
    showUpdateBtn3: false,
    showUpdateBtn4: false,
    showUpdateBtn5: false,
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
    selectedBrand: null,
    selectedHardware: null,
    selectedManufacture: null,
    selectedModel: null,
    selectedSize: null,
    editManufactureValue: "",
    editHardwareValue: "",
    editBrandValue: "",
    editModelValue: "",
    editSizeValue: "",
    toggleDeleteModal: false,
    resourceValue: "",
  }

  thumbView = this.props.thumbView
  componentDidMount() {
    if (this.props.inventoryList && !this.props.inventoryList.manufactureData) {
      this.props.getManufactures(true)
    }
    if (this.props.inventoryList && !this.props.inventoryList.hardwareData) {
      this.props.getHardwares(true)
    }
    if (this.props.inventoryList && !this.props.inventoryList.brandsData) {
      this.props.getBrands(true)
    }
    if (this.props.inventoryList && !this.props.inventoryList.modelData) {
      this.props.getModelNumbers(true)
    }
    if (this.props.inventoryList && !this.props.inventoryList.sizeData) {
      this.props.getSize(true)
    }
  }

  convertSelectFieldData = data => {
    var resultData = []
    data.forEach((value) => {
      resultData.push({ "label": value.name, "value": value.id })
    })
    return resultData
  }

  handleHardwareChange = (selectedOption, meta) => {
    if (meta.action === "select-option") {
      this.setState({ selectedHardware: selectedOption })
    }

    if (meta.action === "create-option") {
      this.props.AddHardware({ "hardware_name": selectedOption.label }).then(() => {
        hardwareAdd();
        this.props.getHardwares();
        if (this.props.inventoryList && this.props.inventoryList.hardwareCreated) {
          this.props.getHardwares()
        }
      })
    }
  };

  handleBrandChange = (selectedOption, meta) => {

    if (meta.action === "select-option") {
      this.setState({ selectedBrand: selectedOption })
    }

    if (meta.action === "create-option") {
      this.props.AddBrand({ "brand_name": selectedOption.label }).then(() => {
        brandAdd();
        this.props.getBrands();
        if (this.props.inventoryList && this.props.inventoryList.hardwareCreated) {
          this.props.getBrands()
        }
      })
    }
  };

  handleManufactureChange = (selectedOption, meta) => {
    if (meta.action === "select-option") {
      this.setState({ selectedManufacture: selectedOption })
    }

    if (meta.action === "create-option") {
      let sendData = {}
      sendData.manufacturer_name = selectedOption.label
      this.props.AddManufacture(sendData).then(() => {
        manufactureAdd();
        this.props.getManufactures();
        if (this.props.inventoryList && this.props.inventoryList.hardwareCreated) {
          this.props.getManufactures()
        }
      })
    }
  };

  handleModelChange = (selectedOption, meta) => {
    if (meta.action === "select-option") {
      this.setState({ selectedModel: selectedOption })
    }

    if (meta.action === "create-option") {
      let sendData = {}
      sendData.name = selectedOption.label
      this.props.AddModelno(sendData).then(() => {
        modelAdd();
        this.props.getModelNumbers();
        if (this.props.inventoryList && this.props.inventoryList.modelnoCreated) {
          this.props.getModelNumbers()
        }
      })
    }
  };

  handleSizeChange = (selectedOption, meta) => {
    if (meta.action === "select-option") {
      this.setState({ selectedSize: selectedOption })
    }

    if (meta.action === "create-option") {
      let sendData = {}
      sendData.name = selectedOption.label
      this.props.AddSize(sendData).then(() => {
        sizeAdd();
        this.props.getSize();
        if (this.props.inventoryList && this.props.inventoryList.sizeCreated) {
          this.props.getSize()
        }
      })
    }
  };

  // edit part

  editManufacture = (value) => {
    this.setState({ showUpdateBtn: true })
    if (this.props.inventoryList && this.props.inventoryList.manufactureData && this.props.inventoryList.manufactureData.data && this.props.inventoryList.manufactureData.data.length > 0) {
      let valueSelected = this.props.inventoryList.manufactureData.data.find((data) => data.name === value.name)
      valueSelected && this.setState({ selectedManufacture: { "label": valueSelected.name, "value": valueSelected.id }, editManufactureValue: valueSelected.name })

    }
  }

  editBrand = (value) => {
    this.setState({ showUpdateBtn2: true })
    if (this.props.inventoryList && this.props.inventoryList.brandsData && this.props.inventoryList.brandsData.data && this.props.inventoryList.brandsData.data.length > 0) {
      let valueSelected = this.props.inventoryList.brandsData.data.find((data) => data.name === value.name)
      valueSelected && this.setState({ selectedBrand: { "label": valueSelected.name, "value": valueSelected.id }, editBrandValue: valueSelected.name })

    }
  }

  edithardware = (value) => {
    this.setState({ showUpdateBtn3: true })
    if (this.props.inventoryList && this.props.inventoryList.hardwareData && this.props.inventoryList.hardwareData.data && this.props.inventoryList.hardwareData.data.length > 0) {
      let valueSelected = this.props.inventoryList.hardwareData.data.find((data) => data.name === value.name)
      valueSelected && this.setState({ selectedHardware: { "label": valueSelected.name, "value": valueSelected.id }, editHardwareValue: valueSelected.name })

    }
  }

  editmodel = (value) => {
    this.setState({ showUpdateBtn4: true })
    if (this.props.inventoryList && this.props.inventoryList.modelData && this.props.inventoryList.modelData.data && this.props.inventoryList.modelData.data.length > 0) {
      let valueSelected = this.props.inventoryList.modelData.data.find((data) => data.name === value.name)
      valueSelected && this.setState({ selectedModel: { "label": valueSelected.name, "value": valueSelected.id }, editModelValue: valueSelected.name })

    }
  }

  editsize = (value) => {
    this.setState({ showUpdateBtn5: true })
    if (this.props.inventoryList && this.props.inventoryList.sizeData && this.props.inventoryList.sizeData.data && this.props.inventoryList.sizeData.data.length > 0) {
      let valueSelected = this.props.inventoryList.sizeData.data.find((data) => data.name === value.name)
      valueSelected && this.setState({ selectedSize: { "label": valueSelected.name, "value": valueSelected.id }, editSizeValue: valueSelected.name })

    }
  }


  // updation part
  updateManufactureData = () => {
    if (this.props.inventoryList && this.props.inventoryList.manufactureData && this.props.inventoryList.manufactureData.data && this.props.inventoryList.manufactureData.data.length > 0) {
      let indexValue = this.props.inventoryList.manufactureData.data.findIndex((data) => data.name === this.state.editManufactureValue);
      (indexValue === -1) && this.props.UpdateManufacture(this.state.selectedManufacture.value, { "name": this.state.editManufactureValue }).then(() => {
        this.props.getManufactures();
        this.setState({ showUpdateBtn: false, editManufactureValue: "", selectedManufacture: "" });
        manufactureUpdate();
      })
    }
  }

  updateHardwareData = () => {
    if (this.props.inventoryList && this.props.inventoryList.hardwareData && this.props.inventoryList.hardwareData.data && this.props.inventoryList.hardwareData.data.length > 0) {
      let indexValue = this.props.inventoryList.hardwareData.data.findIndex((data) => data.name === this.state.editHardwareValue);
      (indexValue === -1) &&
        this.props.UpdateHardware(this.state.selectedHardware.value, { "name": this.state.editHardwareValue }).then(() => {
          hardwareUpdate();
          this.props.getHardwares();
          this.setState({ showUpdateBtn3: false, editHardwareValue: "", selectedHardware: "" });

        })
    }
  }

  updateBrandData = () => {
    if (this.props.inventoryList && this.props.inventoryList.brandsData && this.props.inventoryList.brandsData.data && this.props.inventoryList.brandsData.data.length > 0) {
      let indexValue = this.props.inventoryList.brandsData.data.findIndex((data) => data.name === this.state.editBrandValue);
      (indexValue === -1) && this.props.UpdateBrand(this.state.selectedBrand.value, { "name": this.state.editBrandValue }).then(() => {
        brandUpdate()
        this.props.getBrands()
        this.setState({ showUpdateBtn2: false, editBrandValue: "", selectedBrand: "" })
      })


    }
  }

  updateModelData = () => {
    if (this.props.inventoryList && this.props.inventoryList.modelData && this.props.inventoryList.modelData.data && this.props.inventoryList.modelData.data.length > 0) {
      let indexValue = this.props.inventoryList.modelData.data.findIndex((data) => data.name === this.state.editModelValue);
      (indexValue === -1) && this.props.UpdateModelno(this.state.selectedModel.value, { "name": this.state.editModelValue }).then(() => {
        modelUpdate()
        this.props.getModelNumbers()
        this.setState({ showUpdateBtn4: false, editModelValue: "", selectedModel: "" })
      })


    }
  }

  updateSizeData = () => {
    if (this.props.inventoryList && this.props.inventoryList.sizeData && this.props.inventoryList.sizeData.data && this.props.inventoryList.sizeData.data.length > 0) {
      let indexValue = this.props.inventoryList.sizeData.data.findIndex((data) => data.name === this.state.editSizeValue);
      (indexValue === -1) && this.props.UpdateSize(this.state.selectedSize.value, { "name": this.state.editSizeValue }).then(() => {
        sizeUpdate()
        this.props.getSize()
        this.setState({ showUpdateBtn5: false, editSizeValue: "", selectedSize: "" })
      })


    }
  }


  // cancel
  cancelUpdateBranchData = () => {
    this.setState({ selectedBrand: "", editBrandValue: "", showUpdateBtn2: false })
  }

  cancelUpdateHardwareData = () => {
    this.setState({ selectedHardware: "", editHardwareValue: "", showUpdateBtn3: false })
  }

  cancelUpdateManufactureData = () => {
    this.setState({ selectedManufacture: "", editManufacture: "", showUpdateBtn: false })
  }

  cancelUpdateModelData = () => {
    this.setState({ selectedModel: "", editModelValue: "", showUpdateBtn4: false })
  }

  cancelUpdateSizeData = () => {
    this.setState({ selectedSize: "", editSizeValue: "", showUpdateBtn5: false })
  }

  // Delete

  deleteHardware = (value) => {
    this.setState({ toggleDeleteModal: true, resourceValue: value, resourceType: "hardware" })
  }

  deleteManufacture = (value) => {
    this.setState({ toggleDeleteModal: true, resourceValue: value, resourceType: "manufacture" })
  }

  deleteBrand = (value) => {
    this.setState({ toggleDeleteModal: true, resourceValue: value, resourceType: "brand" })
  }

  deleteModel = (value) => {
    this.setState({ toggleDeleteModal: true, resourceValue: value, resourceType: "model" })
  }

  deleteSize = (value) => {
    this.setState({ toggleDeleteModal: true, resourceValue: value, resourceType: "size" })
  }

  closeDeleteModal = () => {
    this.setState({ toggleDeleteModal: false, resourceValue: "", resourceType: "" })
  }

  render() {
    let { selectedManufacture, selectedBrand, selectedHardware, selectedModel, selectedSize, editManufactureValue, editHardwareValue, editBrandValue, editModelValue, editSizeValue } = this.state
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

    const thstyle1 = {
      width: "20%"
    }
    const thstyle2 = {
      width: "60%"
    }
    const thstyle3 = {
      width: "20%"
    }

    // const cancelicon = {
    //   cursor: "pointer",
    // }
    return (
      <Fragment>
        <Row>
          <Col lg="6" md="12">
            <Card>
              <CardBody>
                <h5>Hardwares</h5>
                <div className="card-btns d-flex justify-content-between mt-2">
                  <FormGroup style={!this.state.showUpdateBtn3 ? item_full : item_update}>
                    {!this.state.showUpdateBtn3 ?
                      <CreatableSelect
                        value={selectedHardware}
                        isClearable
                        onChange={this.handleHardwareChange}
                        options={
                          (this.props.inventoryList && this.props.inventoryList.hardwareData && this.props.inventoryList.hardwareData.data && this.props.inventoryList.hardwareData.data.length > 0) &&
                          this.convertSelectFieldData(this.props.inventoryList.hardwareData.data)
                        }
                        isSearchable={true}
                      />
                      :
                      <Input
                        type="text"
                        value={editHardwareValue}
                        placeholder="Hardware"
                        onChange={(e) => this.setState({ editHardwareValue: e.target.value })}
                      />
                    }
                  </FormGroup>
                  {this.state.showUpdateBtn3 &&
                    <Fragment>
                      <Button style={saveicon} outline color="success" id="hwupdate" onClick={this.updateHardwareData}>
                        <Save size={20} />
                      </Button>
                      <UncontrolledTooltip placement="top" target="hwupdate">
                        Update
                        </UncontrolledTooltip>
                      <Button style={saveicon} outline color="danger" id="hwcancel" onClick={this.cancelUpdateHardwareData}>
                        <XCircle size={20} />
                      </Button>
                      <UncontrolledTooltip placement="top" target="hwcancel">
                        Cancel
                        </UncontrolledTooltip>
                    </Fragment>
                  }
                </div>
                <div className="card-btns d-flex justify-content-between mt-2" style={{ maxHeight: "150px" }}>
                  <Table striped responsive>
                    <thead>
                      <tr>
                        <th style={thstyle1}>#</th>
                        <th style={thstyle2}>Hardware</th>
                        <th style={thstyle3}>Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {(this.props.inventoryList && this.props.inventoryList.hardwareData && this.props.inventoryList.hardwareData.data && this.props.inventoryList.hardwareData.data.length > 0) &&
                        this.props.inventoryList.hardwareData.data.map((value, index) =>
                          <tr key={index}>
                            <th scope="row">{index + 1}</th>
                            <td>{value.name}</td>
                            <td>
                              <Edit className="vx-icon" size={15} style={tdediticons} onClick={(e) => this.edithardware(value)} />
                              <Trash className="vx-icon" size={15} style={tddeleteicons} onClick={(e) => this.deleteHardware(value)} />
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
                <h5>Manufacturers</h5>
                <div className="card-btns d-flex justify-content-between mt-2">
                  <FormGroup style={!this.state.showUpdateBtn ? item_full : item_update}>
                    {!this.state.showUpdateBtn ?
                      <CreatableSelect
                        isClearable
                        value={selectedManufacture}
                        onChange={this.handleManufactureChange}
                        options={(this.props.inventoryList && this.props.inventoryList.manufactureData && this.props.inventoryList.manufactureData.data && this.props.inventoryList.manufactureData.data.length > 0) &&
                          this.convertSelectFieldData(this.props.inventoryList.manufactureData.data)}
                        isSearchable={true}
                      />
                      :
                      <Input
                        type="text"
                        value={editManufactureValue}
                        placeholder="Manufacture"
                        onChange={(e) => this.setState({ editManufactureValue: e.target.value })}
                      />
                    }
                  </FormGroup>
                  {this.state.showUpdateBtn &&
                    <Fragment>
                      <Button style={saveicon} outline color="success" id="mfupdate" onClick={this.updateManufactureData}>
                        <Save size={20} />
                      </Button>
                      <UncontrolledTooltip placement="top" target="mfupdate">
                        Update
                        </UncontrolledTooltip>
                      <Button style={saveicon} outline color="danger" id="mfcancel" onClick={this.cancelUpdateManufactureData}>
                        <XCircle size={20} />
                      </Button>
                      <UncontrolledTooltip placement="top" target="mfcancel">
                        Cancel
                        </UncontrolledTooltip>
                    </Fragment>
                  }
                </div>
                <div className="card-btns d-flex justify-content-between mt-2" style={{ maxHeight: "150px" }}>
                  <Table striped responsive>
                    <thead>
                      <tr>
                        <th style={thstyle1}>#</th>
                        <th style={thstyle2}>Manufacturer</th>
                        <th style={thstyle3}>Actions</th>
                      </tr>

                    </thead>
                    <tbody>
                      {(this.props.inventoryList && this.props.inventoryList.manufactureData && this.props.inventoryList.manufactureData.data && this.props.inventoryList.manufactureData.data.length > 0) &&
                        this.props.inventoryList.manufactureData.data.map((value, index) =>
                          <tr key={index}>
                            <th scope="row">{index + 1}</th>
                            <td>{value.name}</td>
                            <td>
                              <Edit className="vx-icon" size={15} style={tdediticons} onClick={(e) => this.editManufacture(value)} />
                              <Trash className="vx-icon" size={15} style={tddeleteicons} onClick={(e) => this.deleteManufacture(value)} />
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
                <h5>Size</h5>
                <div className="card-btns d-flex justify-content-between mt-2">
                  <FormGroup style={!this.state.showUpdateBtn5 ? item_full : item_update}>
                    {!this.state.showUpdateBtn5 ?
                      <CreatableSelect
                        isClearable
                        value={selectedSize}
                        onChange={this.handleSizeChange}
                        options={
                          (this.props.inventoryList && this.props.inventoryList.sizeData && this.props.inventoryList.sizeData.data && this.props.inventoryList.sizeData.data.length > 0) &&
                          this.convertSelectFieldData(this.props.inventoryList.sizeData.data)
                        }
                        isSearchable={true}
                      />
                      :
                      <Input
                        type="text"
                        value={editSizeValue}
                        placeholder="Size"
                        onChange={(e) => this.setState({ editSizeValue: e.target.value })}
                      />
                    }
                  </FormGroup >
                  {this.state.showUpdateBtn5 &&
                    <Fragment>
                      <Button style={saveicon} outline color="success" id="brupdate" onClick={this.updateSizeData}>
                        <Save size={20} />
                      </Button>
                      <UncontrolledTooltip placement="top" target="brupdate">
                        Update
                        </UncontrolledTooltip>
                      <Button style={saveicon} outline color="danger" id="brcancel" onClick={this.cancelUpdateSizeData}>
                        <XCircle size={20} />
                      </Button>
                      <UncontrolledTooltip placement="top" target="brcancel">
                        Cancel
                        </UncontrolledTooltip>
                    </Fragment>
                  }
                </div>
                <div className="card-btns d-flex justify-content-between mt-2" style={{ maxHeight: "150px" }}>
                  <Table striped responsive>
                    <thead>

                      <tr >
                        <th style={thstyle1}>#</th>
                        <th style={thstyle2}>Size</th>
                        <th style={thstyle3}>Actions</th>
                      </tr>

                    </thead>
                    <tbody>
                      {(this.props.inventoryList && this.props.inventoryList.sizeData && this.props.inventoryList.sizeData.data && this.props.inventoryList.sizeData.data.length > 0) &&
                        this.props.inventoryList.sizeData.data.map((value, index) =>
                          <tr key={index}>
                            <th scope="row">{index + 1}</th>
                            <td>{value.name}</td>
                            <td>
                              <Edit className="vx-icon" size={15} style={tdediticons} onClick={(e) => this.editsize(value)} />
                              <Trash className="vx-icon" size={15} style={tddeleteicons} onClick={(e) => this.deleteSize(value)} />
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
                <h5>Model Number</h5>
                <div className="card-btns d-flex justify-content-between mt-2">
                  <FormGroup style={!this.state.showUpdateBtn4 ? item_full : item_update}>
                    {!this.state.showUpdateBtn4 ?
                      <CreatableSelect
                        isClearable
                        value={selectedModel}
                        onChange={this.handleModelChange}
                        options={
                          (this.props.inventoryList && this.props.inventoryList.modelData && this.props.inventoryList.modelData.data && this.props.inventoryList.modelData.data.length > 0) &&
                          this.convertSelectFieldData(this.props.inventoryList.modelData.data)
                        }
                        isSearchable={true}
                      />
                      :
                      <Input
                        type="text"
                        value={editModelValue}
                        placeholder="Model No"
                        onChange={(e) => this.setState({ editModelValue: e.target.value })}
                      />
                    }
                  </FormGroup >
                  {this.state.showUpdateBtn4 &&
                    <Fragment>
                      <Button style={saveicon} outline color="success" id="brupdate" onClick={this.updateModelData}>
                        <Save size={20} />
                      </Button>
                      <UncontrolledTooltip placement="top" target="brupdate">
                        Update
                        </UncontrolledTooltip>
                      <Button style={saveicon} outline color="danger" id="brcancel" onClick={this.cancelUpdateModelData}>
                        <XCircle size={20} />
                      </Button>
                      <UncontrolledTooltip placement="top" target="brcancel">
                        Cancel
                        </UncontrolledTooltip>
                    </Fragment>
                  }
                </div>
                <div className="card-btns d-flex justify-content-between mt-2" style={{ maxHeight: "150px" }}>
                  <Table striped responsive>
                    <thead>

                      <tr>
                        <th style={thstyle1}>#</th>
                        <th style={thstyle2}>Model No</th>
                        <th style={thstyle3}>Actions</th>
                      </tr>

                    </thead>
                    <tbody>
                      {(this.props.inventoryList && this.props.inventoryList.modelData && this.props.inventoryList.modelData.data && this.props.inventoryList.modelData.data.length > 0) &&
                        this.props.inventoryList.modelData.data.map((value, index) =>
                          <tr key={index}>
                            <th scope="row">{index + 1}</th>
                            <td>{value.name}</td>
                            <td>
                              <Edit className="vx-icon" size={15} style={tdediticons} onClick={(e) => this.editmodel(value)} />
                              <Trash className="vx-icon" size={15} style={tddeleteicons} onClick={(e) => this.deleteModel(value)} />
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
                <h5>Brand Names</h5>
                <div className="card-btns d-flex justify-content-between mt-2">
                  <FormGroup style={!this.state.showUpdateBtn2 ? item_full : item_update}>
                    {!this.state.showUpdateBtn2 ?
                      <CreatableSelect
                        isClearable
                        value={selectedBrand}
                        onChange={this.handleBrandChange}
                        options={
                          (this.props.inventoryList && this.props.inventoryList.brandsData && this.props.inventoryList.brandsData.data && this.props.inventoryList.brandsData.data.length > 0) &&
                          this.convertSelectFieldData(this.props.inventoryList.brandsData.data)
                        }
                        isSearchable={true}
                      />
                      :
                      <Input
                        type="text"
                        value={editBrandValue}
                        placeholder="Brand"
                        onChange={(e) => this.setState({ editBrandValue: e.target.value })}
                      />
                    }
                  </FormGroup >
                  {this.state.showUpdateBtn2 &&
                    <Fragment>
                      <Button style={saveicon} outline color="success" id="brupdate" onClick={this.updateBrandData}>
                        <Save size={20} />
                      </Button>
                      <UncontrolledTooltip placement="top" target="brupdate">
                        Update
                        </UncontrolledTooltip>
                      <Button style={saveicon} outline color="danger" id="brcancel" onClick={this.cancelUpdateBranchData}>
                        <XCircle size={20} />
                      </Button>
                      <UncontrolledTooltip placement="top" target="brcancel">
                        Cancel
                        </UncontrolledTooltip>
                    </Fragment>
                  }
                </div>
                <div className="card-btns d-flex justify-content-between mt-2" style={{ maxHeight: "150px" }}>
                  <Table striped responsive>
                    <thead>

                      <tr >
                        <th style={thstyle1}>#</th>
                        <th style={thstyle2}>Brand</th>
                        <th style={thstyle3}>Actions</th>
                      </tr>

                    </thead>
                    <tbody>
                      {(this.props.inventoryList && this.props.inventoryList.brandsData && this.props.inventoryList.brandsData.data && this.props.inventoryList.brandsData.data.length > 0) &&
                        this.props.inventoryList.brandsData.data.map((value, index) =>
                          <tr key={index}>
                            <th scope="row">{index + 1}</th>
                            <td>{value.name}</td>
                            <td>
                              <Edit className="vx-icon" size={15} style={tdediticons} onClick={(e) => this.editBrand(value)} />
                              <Trash className="vx-icon" size={15} style={tddeleteicons} onClick={(e) => this.deleteBrand(value)} />
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
          <InventoryResourceModal
            toggleDeleteModal={this.state.toggleDeleteModal}
            closeModal={this.closeDeleteModal}
            resourceValue={this.state.resourceValue}
            DeleteHardware={this.props.DeleteHardware}
            DeleteManufacture={this.props.DeleteManufacture}
            DeleteBrand={this.props.DeleteBrand}
            DeleteModel={this.props.DeleteModel}
            DeleteSize={this.props.DeleteSize}
            resourceType={this.state.resourceType}
            deletedHardware={deletedHardware}
            deletedManufacture={deletedManufacture}
            deletedBrand={deletedBrand}
            deletedModel={deletedModel}
            deletedSize={deletedSize}
            errorMessage={errorMessage}
            usedHardware={usedHardware}
            usedManufacture={usedManufacture}
            inventoryList={this.props.inventoryList}
          />
        }

        <ToastContainer />
      </Fragment>
    )
  }
}

const mapStateToProps = state => {
  return {
    inventoryList: state.inventoryList
  }
}

export default connect(mapStateToProps, {
  getManufactures,
  getHardwares,
  getBrands,
  getModelNumbers,
  getSize,
  AddHardware,
  AddManufacture,
  AddBrand,
  AddModelno,
  AddSize,
  UpdateManufacture,
  UpdateHardware,
  UpdateBrand,
  UpdateModelno,
  UpdateSize,
  DeleteHardware,
  DeleteBrand,
  DeleteManufacture,
  DeleteSize,
  DeleteModel
})(ResourcesConfig)
