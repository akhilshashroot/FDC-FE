import React, { Fragment } from "react"
import { Label, Input, FormGroup, Button, Row, Col, Form } from "reactstrap"
import { X } from "react-feather"
import PerfectScrollbar from "react-perfect-scrollbar"
import classnames from "classnames"
import Select from 'react-select';
import { getManufactures, getBrands, getHardwares, AddInventory, UpdateInventoryProduct, getInventaryProducts, getModelNumbers, getSize } from "../../../redux/actions/inventory/"
import { connect } from "react-redux"

class InventorySidebar extends React.PureComponent {
  state = {
    loc_id: "",
    hw_id: "",
    man_id: "",
    brand_id: "",
    model: "",
    size: "",
    quantity: "",
    note: "",
    selectedOption: null,
    location: "",
    model_no: "",
    qty: "",
    selectedBrand: null,
    selectedHardware: null,
    selectedManufacture: null,
    showBrandText: false,
  }

  addNew = false

  componentDidMount() {

    if (this.props.inventoryList && !this.props.inventoryList.manufactureData) {
      this.props.getManufactures().then(() => {
        if (this.props.data && this.props.data.manufacturer && this.props.inventoryList && this.props.inventoryList.manufactureData && this.props.inventoryList.manufactureData.data && this.props.inventoryList.manufactureData.data.length > 0) {
          let valueSelected = this.props.inventoryList.manufactureData.data.find((value) => value.name === this.props.data.manufacturer)
          valueSelected && this.setState({ selectedManufacture: { "label": valueSelected.name, "value": valueSelected.id } })
        }
      })
    } else {
      if (this.props.data && this.props.data.manufacturer && this.props.inventoryList && this.props.inventoryList.manufactureData && this.props.inventoryList.manufactureData.data && this.props.inventoryList.manufactureData.data.length > 0) {
        let valueSelected = this.props.inventoryList.manufactureData.data.find((value) => value.name === this.props.data.manufacturer)
        valueSelected && this.setState({ selectedManufacture: { "label": valueSelected.name, "value": valueSelected.id } })
      }
    }

    if (this.props.inventoryList && !this.props.inventoryList.hardwareData) {
      this.props.getHardwares().then(() => {
        if (this.props.data && this.props.hardware_name) {
          let hardware_data = { "label": this.props.hardware_name.name, "value": this.props.hardware_name.id }
          this.setState({ selectedHardware: hardware_data })
        }
      })
    } else {
      if (this.props.data && this.props.hardware_name) {
        let hardware_data = { "label": this.props.hardware_name.name, "value": this.props.hardware_name.id }
        this.setState({ selectedHardware: hardware_data })
      }
    }

    if (this.props.inventoryList && !this.props.inventoryList.brandsData) {
      this.props.getBrands().then(() => {
        if (this.props.data && this.props.data.brand && this.props.inventoryList && this.props.inventoryList.brandsData && this.props.inventoryList.brandsData.data && this.props.inventoryList.brandsData.data.length > 0) {
          let valueSelected = this.props.inventoryList.brandsData.data.find((value) => value.name === this.props.data.brand)
          valueSelected && this.setState({ selectedBrand: { "label": valueSelected.name, "value": valueSelected.id } })
        }
      })
    } else {
      if (this.props.data && this.props.data.brand && this.props.inventoryList && this.props.inventoryList.brandsData && this.props.inventoryList.brandsData.data && this.props.inventoryList.brandsData.data.length > 0) {
        let valueSelected = this.props.inventoryList.brandsData.data.find((value) => value.name === this.props.data.brand)
        valueSelected && this.setState({ selectedBrand: { "label": valueSelected.name, "value": valueSelected.id } })
      }
    }

    if (this.props.inventoryList && !this.props.inventoryList.modelData) {
      this.props.getModelNumbers().then(() => {
        if (this.props.data && this.props.data.model && this.props.inventoryList && this.props.inventoryList.modelData && this.props.inventoryList.modelData.data && this.props.inventoryList.modelData.data.length > 0) {
          let valueSelected = this.props.inventoryList.modelData.data.find((value) => value.name === this.props.data.model)
          valueSelected && this.setState({ model_no: { "label": valueSelected.name, "value": valueSelected.id } })
        }
      })
    } else {
      if (this.props.data && this.props.data.model && this.props.inventoryList && this.props.inventoryList.modelData && this.props.inventoryList.modelData.data && this.props.inventoryList.modelData.data.length > 0) {
        let valueSelected = this.props.inventoryList.modelData.data.find((value) => value.name === this.props.data.model)
        valueSelected && this.setState({ model_no: { "label": valueSelected.name, "value": valueSelected.id } })
      }
    }

    if (this.props.inventoryList && !this.props.inventoryList.sizeData) {
      this.props.getSize().then(() => {
        if (this.props.data && this.props.data.size && this.props.inventoryList && this.props.inventoryList.sizeData && this.props.inventoryList.sizeData.data && this.props.inventoryList.sizeData.data.length > 0) {
          let valueSelected = this.props.inventoryList.sizeData.data.find((value) => value.name === this.props.data.size)
          valueSelected && this.setState({ size: { "label": valueSelected.name, "value": valueSelected.id } })
        }
      })
    } else {
      if (this.props.data && this.props.data.size && this.props.inventoryList && this.props.inventoryList.sizeData && this.props.inventoryList.sizeData.data && this.props.inventoryList.sizeData.data.length > 0) {
        let valueSelected = this.props.inventoryList.sizeData.data.find((value) => value.name === this.props.data.size)
        valueSelected && this.setState({ size: { "label": valueSelected.name, "value": valueSelected.id } })
      }
    }
  }

  handleSubmit = obj => {
    if (this.props.data !== null) {
      if (this.props.selectedOption && this.state.selectedBrand && this.state.selectedHardware && this.state.selectedManufacture &&
        this.state.model_no) {
        let inventory_data = {}
        inventory_data.loc_id = this.props.selectedOption && this.props.selectedOption.value
        inventory_data.hw_id = this.state.selectedHardware && this.state.selectedHardware.value
        inventory_data.man_id = this.state.selectedManufacture && this.state.selectedManufacture.value
        inventory_data.name = this.state.selectedBrand && this.state.selectedBrand.label
        inventory_data.model = this.state.model_no && this.state.model_no.label
        this.state.size && (inventory_data.size = this.state.size && this.state.size.label && this.state.size.label !== "N/A" ? this.state.size.label : "");
        if (inventory_data) {
          this.props.UpdateInventoryProduct(this.props.data.product_id, inventory_data, inventory_data.loc_id).then(() => {
            if (this.props.inventoryList && this.props.inventoryList.inventoryUpdated) {
              if (this.props.selectedOption && this.props.selectedOption.value) {
                this.props.UpdateMessage();
                this.props.handleSidebar(false, true);
              }
            }
          })
        }
      } else {
        this.props.inCompleteData()
      }

    } else {
      if (this.props.selectedOption && this.state.selectedBrand && this.state.selectedHardware && this.state.selectedManufacture &&
        this.state.qty && this.state.model_no) {

        let inventory_data = {}
        inventory_data.loc_id = this.props.selectedOption && this.props.selectedOption.value;
        inventory_data.hw_id = this.state.selectedHardware && this.state.selectedHardware.value;
        inventory_data.man_id = this.state.selectedManufacture && this.state.selectedManufacture.value;
        inventory_data.name = this.state.showBrandText ? this.state.selectedBrand : this.state.selectedBrand && this.state.selectedBrand.label;
        inventory_data.model = this.state.model_no && this.state.model_no.label;
        inventory_data.size = this.state.size && this.state.size.label && this.state.size.label !== "N/A" ? this.state.size.label : "";
        inventory_data.quantity = this.state.qty
        inventory_data.note = this.state.note
        if (inventory_data) {
          this.props.AddInventory(inventory_data, inventory_data.loc_id).then(() => {
            if (this.props.inventoryList && this.props.inventoryList.inventoryCreated) {
              this.addNew = true
              this.props.AddMessage()
              this.props.handleSidebar(false, true)

            } else {
              if (this.props.inventoryList && this.props.inventoryList.inventoryCreatedError && this.props.inventoryList.inventoryCreatedError === "already exists") {
                this.props.notifyAlreadyExist()
              } else {
                this.props.notifyError()
              }
            }
          })
        }
      } else {
        this.props.inCompleteData()
      }
    }
  }
  //   custom code


  convertSelectFieldData = data => {
    var resultData = []
    data.forEach((value) => {
      resultData.push({ "label": value.name, "value": value.id })
    })
    return resultData
  }

  convertSelectFieldDataBrand = data => {
    var resultData = []
    data.forEach((value) => {
      resultData.push({ "label": value.name, "value": value.name })
    })
    return resultData
  }

  convertSelectFieldDataModel = data => {
    var resultData = []
    data.forEach((value) => {
      resultData.push({ "label": value.name, "value": value.name })
    })
    return resultData
  }

  convertSelectFieldDataSize = data => {
    var resultData = []
    resultData.push({ "label": "N/A", "value": "" })
    data.forEach((value) => {
      resultData.push({ "label": value.name, "value": value.name })
    })
  
    return resultData
  }

  handleHardwareChange = selectedOption => {
    this.setState({ selectedHardware: selectedOption })
  };

  handleBrandChange = selectedOption => {
    this.setState({ selectedBrand: selectedOption });
  };

  handleModelChange = selectedOption => {
    this.setState({ model_no: selectedOption });
  };

  handleSizeChange = selectedOption => {
    this.setState({ size: selectedOption });
  };

  handleManufactureChange = selectedOption => {
    this.setState({ selectedManufacture: selectedOption });
  };



  render() {
    let { show, handleSidebar, data } = this.props
    let { model_no, size, qty, note, selectedManufacture, selectedBrand, selectedHardware } = this.state
    return (
      <div
        className={classnames("inventory-sidebar", {
          show: show
        })}>
        <div className="data-list-sidebar-header mt-2 px-2 d-flex justify-content-between">
          <h4>{data !== null ? "UPDATE ITEM" : "ADD NEW ITEM"}</h4>
          <X size={20} onClick={() => handleSidebar(false, true)} />
        </div>
        <PerfectScrollbar
          className="data-list-fields px-2 mt-0"
          options={{ wheelPropagation: false }}>
          <Form className="mt-2">
            <Row>
              <Col md="6" sm="12">
                <FormGroup>
                  <Label for="data-location">Location <span style={{ color: "red" }}>*</span></Label>
                  <Select
                    isDisabled={true}
                    value={this.props.selectedOption}
                    placeholder={this.props.selectedOption && this.props.selectedOption.label}
                    onChange={e => this.setState({ location: e.target.value })}
                    id="data-location"
                  />
                </FormGroup>
              </Col>
              <Col md="6" sm="12">
                <FormGroup>
                  <Label for="tech_location">Hardware <span style={{ color: "red" }}>*</span></Label>
                  <Select
                    value={selectedHardware}
                    onChange={this.handleHardwareChange}
                    options={
                      (this.props.inventoryList && this.props.inventoryList.hardwareData && this.props.inventoryList.hardwareData.data && this.props.inventoryList.hardwareData.data.length > 0) &&
                      this.convertSelectFieldData(this.props.inventoryList.hardwareData.data)
                    }
                    isSearchable={true}
                  />
                </FormGroup>
              </Col>
              <Col md="6" sm="12">
                <FormGroup>
                  <Label for="tech_location">Manufacturer <span style={{ color: "red" }}>*</span></Label>
                  <Select
                    value={selectedManufacture}
                    onChange={this.handleManufactureChange}
                    options={(this.props.inventoryList && this.props.inventoryList.manufactureData && this.props.inventoryList.manufactureData.data && this.props.inventoryList.manufactureData.data.length > 0) &&
                      this.convertSelectFieldData(this.props.inventoryList.manufactureData.data)}
                    isSearchable={true}
                  />
                </FormGroup>
              </Col>
              <Col md="6" sm="12">
                <FormGroup>
                  <Label for="brand_name">Brand Name <span style={{ color: "red" }}>*</span></Label>
                  <Select
                    formatCreateLabel={() => ""}
                    value={selectedBrand}
                    onChange={this.handleBrandChange}
                    options={
                      (this.props.inventoryList && this.props.inventoryList.brandsData && this.props.inventoryList.brandsData.data && this.props.inventoryList.brandsData.data.length > 0) &&
                      this.convertSelectFieldDataBrand(this.props.inventoryList.brandsData.data)
                    }
                    isSearchable={true}
                  />
                </FormGroup>
              </Col>
              <Col md="6" sm="12">
                <FormGroup>
                  <Label for="data-model_no">Model No <span style={{ color: "red" }}>*</span></Label>
                  <Select
                    formatCreateLabel={() => ""}
                    value={model_no}
                    onChange={this.handleModelChange}
                    options={
                      (this.props.inventoryList && this.props.inventoryList.modelData && this.props.inventoryList.modelData.data && this.props.inventoryList.modelData.data.length > 0) ?
                        this.convertSelectFieldDataModel(this.props.inventoryList.modelData.data)
                        : []
                    }
                    isSearchable={true}
                  />
                </FormGroup>
              </Col>
              <Col md="6" sm="12">
                <FormGroup>
                  <Label for="data-size">Size</Label>
                  <Select
                    formatCreateLabel={() => ""}
                    value={size}
                    onChange={this.handleSizeChange}
                    options={
                      (this.props.inventoryList && this.props.inventoryList.sizeData && this.props.inventoryList.sizeData.data && this.props.inventoryList.sizeData.data.length > 0) ?
                        this.convertSelectFieldDataSize(this.props.inventoryList.sizeData.data)
                        : []
                    }
                    isSearchable={true}
                  />
                </FormGroup>
              </Col>
              {!this.props.data &&
                <Fragment>
                  <Col md="6" sm="12">
                    <FormGroup>
                      <Label for="data-qty">Quantity <span style={{ color: "red" }}>*</span></Label>
                      <Input
                        type="number"
                        value={qty ? qty : ""}
                        placeholder="Quantity"
                        onChange={e => this.setState({ qty: e.target.value })}
                        id="data-qty"
                      />
                    </FormGroup>
                  </Col>
                  <Col md="6" sm="12">
                    <FormGroup>
                      <Label for="data_note">Note</Label>
                      <Input
                        type="text"
                        value={note ? note : ""}
                        placeholder="If Any"
                        onChange={e => this.setState({ note: e.target.value })}
                        id="data_note"
                      />
                    </FormGroup>
                  </Col>
                </Fragment>
              }
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
  AddInventory,
  UpdateInventoryProduct,
  getInventaryProducts,
  getModelNumbers,
  getSize
})(InventorySidebar)
