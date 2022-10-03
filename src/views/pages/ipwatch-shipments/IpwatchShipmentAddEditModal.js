import React, { Fragment } from "react";
import { Link } from "react-router-dom";
import {
  Row,
  Col,
  Button,
  Form,
  FormGroup,
  Input,
  Modal,
  ModalBody,
  ModalFooter,
  ModalHeader,
  Label,
  Card,
  UncontrolledTooltip,
  CustomInput,
} from "reactstrap";
import Select from "react-select";
import { getInitialData } from "../../../redux/actions/data-list";
import {
  addShipment,
  updateShipment,
  updateShipmentStatus,
  getShipmentLocation,
  getShipmentCarrier,
} from "../../../redux/actions/ipwatch-shipments";
import { connect } from "react-redux";
import CreatableSelect from "react-select/creatable";
import { DownloadCloud, X, LogIn } from "react-feather";
import "./styles.scss";
import Tooltip from "@material-ui/core/Tooltip";
import { makeStyles } from "@material-ui/core/styles";

const useStylesBootstrap = makeStyles((theme) => ({
  arrow: {
    color: theme.palette.common.black,
  },
  tooltip: {
    backgroundColor: theme.palette.common.black,
    fontSize: 15,
  },
}));
function BootstrapTooltip(props) {
  const classes = useStylesBootstrap();

  return <Tooltip arrow classes={classes} {...props} />;
}
class IpwatchShipmentAddModal extends React.PureComponent {
  state = {
    tracking_number: "",
    selectedLocation: "",
    selectedcarrier: "",
    customLocation: "",
    customLocEnable: false,
    contents: "",
    ticket_id: "",
    locationDataArray: [],
    carrierDataArray: [],
    selectedFile: [],
    showfile: false,
    show: false,
    confirm_delivered: false,
    sendFile: [],
    editedFile: [],
    deletedFile: [],
  };

  componentDidMount() {
    if (this.props.shipments && !this.props.shipments.carrierData) {
      this.props.getShipmentCarrier(true).then(() => {
        let dat = this.getCarrierData();
        if (this.props.shipmentData.courier) {
this.handleCarrierchange(dat.filter(e=>e.label==this.props.shipmentData.courier || e.value==this.props.shipmentData.courier)[0])
        }
        this.setState({ carrierDataArray: dat });
      });
    }
    if (this.props.shipments && !this.props.shipments.allData) {
      this.props.getShipmentLocation(true).then(() => {
        let dat = this.getLocationdata();
        if (this.props.shipmentData && this.props.shipmentData.location) {
          if (this.props.shipmentData.new_location_status === 1) {
            var custom =
              this.props.shipments &&
              this.props.shipments.allData &&
              this.props.shipments.allData.shipmentNewLocations.find(
                (element) =>
                  element.location === this.props.shipmentData.location
              );
            this.setState({
              selectedLocation: {
                value: "customlocation",
                label: "Custom Location",
              },
              customLocEnable: true,
              customLocation: {
                label: custom.location,
                value: custom.location,
              },
            });
          } else {
            var found =
              dat &&
              dat.find(
                (element) => element.value === this.props.shipmentData.location
              );
            this.setState({ selectedLocation: found });
          }
        }
        this.setState({ locationDataArray: dat });
      });
    } else {
      let dat = this.getLocationdata();
      if (this.props.shipmentData && this.props.shipmentData.location) {
        if (this.props.shipmentData.new_location_status === 1) {
          var custom =
            this.props.shipments &&
            this.props.shipments.allData &&
            this.props.shipments.allData.shipmentNewLocations.find(
              (element) => element.location === this.props.shipmentData.location
            );
          this.setState({
            selectedLocation: {
              value: "customlocation",
              label: "Custom Location",
            },
            customLocEnable: true,
            customLocation: { label: custom.location, value: custom.location },
          });
        } else {
          var found =
            dat &&
            dat.find(
              (element) => element.value === this.props.shipmentData.location
            );
          this.setState({ selectedLocation: found });
        }
      }
      this.setState({ locationDataArray: dat });
    }
    if (this.props.shipmentData) {
      if (this.props.shipmentData.tracking_number) {
        this.setState({
          tracking_number: this.props.shipmentData.tracking_number,
        });
      }
      if (this.props.shipmentData.contents) {
        this.setState({ contents: this.props.shipmentData.contents });
      }
      if (this.props.shipmentData.ticket_id) {
        this.setState({ ticket_id: this.props.shipmentData.ticket_id });
      }
      if (this.props.shipmentData.files) {
        var list = [];
        var edit = this.props.shipmentData.files.split(",");
        for (let i = 0; i < edit.length; i++) {
          list.push({
            name: edit[i],
            size: "",
            url: `https://docsdev.fdcservers.net/server/storage/app/public/shipments/${edit[i]}`,
          });
        }
        this.setState({ editedFile: list });
      }
    }
  }

  toggleModal = () => {
    this.props.toggleShipmentAddModal();
  };

  handleChange = (selectedLocation) => {
    if (selectedLocation.value === "customlocation") {
      this.setState({ customLocEnable: true });
    } else {
      this.setState({ customLocEnable: false });
    }
    this.setState({ selectedLocation });
  };
  handleCarrierchange = (selectedcarrier) => {
  console.log("🚀 ~ file: IpwatchShipmentAddEditModal.js ~ line 182 ~ IpwatchShipmentAddModal ~ selectedcarrier", selectedcarrier)
    this.setState({ selectedcarrier });
  };

  handleCustomChange = (customLocation) => {
    this.setState({ customLocation });
  };

  getCustomLocation = (data) => {
    var locationData = [];
    // locationData.push({ "label": "All", "value": "all" })
    data &&
      data.forEach((value) => {
        locationData.push({ label: value.location, value: value.location });
      });
    return locationData;
  };

  getLocationdata = () => {
    var locationArray = [{ value: "customlocation", label: "Custom Location" }];
    if (this.props.shipments.allData) {
      this.props.shipments.allData.userLoc.forEach((data) => {
        let locValue = data.loc_short.toUpperCase();
        let locLabel = `${data.location} (${
          data.iw_loc_desc
        }) (${data.loc_short.toUpperCase()})`;
        // let locLabel = `${data.location}`
        locationArray.push({ value: locValue, label: locLabel });
      });
      return locationArray;
    } else {
      return locationArray;
    }
  };
  getCarrierData = () => {
    var carrierArray = [];

    if (this.props.shipments.carrrierData) {
      this.props.shipments.carrrierData.data.forEach((data) => {
        let carValue = data.carrier_id;
        let carLabel = data.name;

        carrierArray.push({ value: carValue, label: carLabel });
      });

      return carrierArray;
    } else {
      return carrierArray;
    }
  };

  handleFile = (e) => {
    // test data
    // const filelist: FileList = e.target.files;
    // for (let i = 0; i < e.target.files.length; i++) {
    //     var temp = e.target.files[i]
    // }
    // let filename = temp.name
    // if (filelist.length === 0) {
    //     return;
    // };
    // const formData: FormData = new FormData();
    // formData.append('file', filelist[0], filelist[0].name);
    // formData.append('UploadPath', 'Pictures')
    // console.log(formData,'form')

    // console.log(e.target.files[0])
    this.setState({ showfile: false });
    let files = e.target.files;
    let list = this.state.selectedFile;
    for (let i = 0; i < files.length; i++) {
      list.push(files[i]);
      // list.push({
      //     "name": files[i].name, "lastModified": files[i].lastModified, "lastModifiedDate": files[i].lastModifiedDate,
      //     "size": files[i].size, "type": files[i].type, "webkitRelativePath": files[i].webkitRelativePath
      // })
    }
    this.setState({ selectedFile: list }, () => {
      this.setState({ showfile: true, sendFile: files });
    });
  };

  cancelFile = (index) => {
    this.setState({ showfile: false });
    let list = this.state.selectedFile;
    list.splice(index, 1);
    this.setState({ selectedFile: list }, () => {
      this.setState({ showfile: true });
    });
  };

  deleteFile = (index) => {
    this.setState({ show: false });
    let list = this.state.editedFile;
    let del = this.state.editedFile[index];
    var temp = this.state.deletedFile;
    temp.push(del);
    list.splice(index, 1);
    this.setState({ editedFile: list, deletedFile: temp }, () => {
      this.setState({ show: true });
    });
  };

  formatBytes(bytes, decimals = 2) {
    if (bytes === 0) return "0 Bytes";

    const k = 1024;
    const dm = decimals < 0 ? 0 : decimals;
    const sizes = ["Bytes", "KB", "MB", "GB", "TB", "PB", "EB", "ZB", "YB"];

    const i = Math.floor(Math.log(bytes) / Math.log(k));

    return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + " " + sizes[i];
  }

  updateStatus = () => {
    let shipmentId = this.props.shipmentData && this.props.shipmentData.id;

    let tracking_number = this.state.tracking_number;
    // const formData = new FormData();
    // formData.append("tracking_number",this.state.tracking_number)

    if (this.state.tracking_number == "Pending") {
      this.props.warningStatusMessage();
    } else if (this.state.tracking_number == "") {
      this.props.warningStatusMessage();
    } else {
      this.props
        .updateShipmentStatus(
          tracking_number,
          shipmentId,
          this.props.sorttype,
          this.props.mode,
          this.props.pageNumber,
          this.props.isFiltered,
          this.props.filteredData
        )
        .then(() => {
          if (
            this.props.shipments &&
            this.props.shipments.shipmentStatusUpdateSuccess
          ) {
            this.props.shipmentUpdateMessage();
            this.props.toggleShipmentAddModal();
          } else {
            if (
              this.props.shipments &&
              this.props.shipments.shipmentStatusUpdateError
            ) {
              this.props.validationMessage(
                this.props.shipments.shipmentStatusUpdateError
              );
            } else {
              this.props.warningMessage();
            }
          }
        });
    }
  };

  addShipmethodMethod = () => {
    if (this.state.selectedLocation && this.state.contents) {
      if (
        this.state.selectedLocation &&
        this.state.selectedLocation.value === "customlocation"
      ) {
        if (this.state.customLocation) {
          let sendData = {};
          const formData = new FormData();
          formData.append(
            "tracking_number",
            this.state.tracking_number ? this.state.tracking_number : ""
          );
          formData.append("contents", this.state.contents);
          formData.append(
            "location",
            this.state.customLocation && this.state.customLocation.value
          );
          // sendData.tracking_number = this.state.tracking_number ? this.state.tracking_number : ""
          // sendData.contents = this.state.contents
          // sendData.location = this.state.customLocation && this.state.customLocation.value
          if (
            this.state.customLocation.__isNew__ &&
            this.state.customLocation.__isNew__ === true
          ) {
            formData.append("new_location_status", 1);
            // sendData.new_location_status = 1
          }
          if (this.state.selectedFile.length > 0) {
            for (let i = 0; i < this.state.selectedFile.length; i++) {
              formData.append("uploads[]", this.state.selectedFile[i]);
            }
          }

          this.props
            .addShipment(
              formData,
              this.props.isFiltered,
              this.props.filteredData
            )
            .then(() => {
              if (
                this.props.shipments &&
                this.props.shipments.shipmentAddedSuccess
              ) {
                this.props.shipmentAddedMessage();
                this.props.toggleShipmentAddModal();
                if (
                  this.state.customLocation.__isNew__ &&
                  this.state.customLocation.__isNew__ === true
                ) {
                  this.props.getShipmentLocation(true);
                }
              } else {
                if (
                  this.props.shipments &&
                  this.props.shipments.shipmentAddedError
                ) {
                  this.props.validationMessage(
                    this.props.shipments.shipmentAddedError
                  );
                } else {
                  this.props.warningMessage();
                }
              }
            });
        } else {
          this.props.requiredFieldMessage();
        }
      } else {
        const formData = new FormData();
        formData.append(
          "carrier",
          this.state.selectedcarrier?.value
        );
        formData.append(
          "tracking_number",
          this.state.tracking_number ? this.state.tracking_number : ""
        );
        formData.append("contents", this.state.contents);
        formData.append(
          "location",
          this.state.selectedLocation && this.state.selectedLocation.value
        );
        if (this.state.selectedFile.length > 0) {
          for (let i = 0; i < this.state.selectedFile.length; i++) {
            formData.append("uploads[]", this.state.selectedFile[i]);
          }
        }
        // this.state.selectedFile.forEach(file=>{ formData.append("file", file); });
        // let sendData = {}
        // sendData.tracking_number = this.state.tracking_number ? this.state.tracking_number : ""
        // sendData.contents = this.state.contents
        // sendData.location = this.state.selectedLocation && this.state.selectedLocation.value
        this.props
          .addShipment(formData, this.props.isFiltered, this.props.filteredData)
          .then(() => {
            if (
              this.props.shipments &&
              this.props.shipments.shipmentAddedSuccess
            ) {
              this.props.shipmentAddedMessage();
              this.props.toggleShipmentAddModal();
            } else {
              if (
                this.props.shipments &&
                this.props.shipments.shipmentAddedError
              ) {
                this.props.validationMessage(
                  this.props.shipments.shipmentAddedError
                );
              } else {
                this.props.warningMessage();
              }
            }
          });
      }
    } else {
      this.props.requiredFieldMessage();
    }
  };

  updateShipmethodMethod = () => {
    if (this.state.selectedLocation && this.state.contents) {
      if (
        this.state.selectedLocation &&
        this.state.selectedLocation.value === "customlocation"
      ) {
        if (this.state.customLocation) {
          let shipmentId =
            this.props.shipmentData && this.props.shipmentData.id;
          const formData = new FormData();
          if (
            this.state.tracking_number !==
            ("pending" && this.props.shipmentData.tracking_number)
          ) {
            formData.append("tracking_number", this.state.tracking_number);
          } else {
            formData.append("tracking_number", "");
          }
          // sendData.tracking_number = this.state.tracking_number!== ('pending' || this.props.shipmentData.tracking_number) ? this.state.tracking_number : ""
          formData.append("contents", this.state.contents);
          formData.append(
            "location",
            this.state.customLocation && this.state.customLocation.value
          );
          formData.append("ticket_id", this.state.ticket_id);
          if (
            this.state.customLocation.__isNew__ &&
            this.state.customLocation.__isNew__ === true
          ) {
            formData.append("new_location_status", 1);
          }
          if (this.state.selectedFile.length > 0) {
            for (let i = 0; i < this.state.selectedFile.length; i++) {
              formData.append("uploads[]", this.state.selectedFile[i]);
            }
          }
          if (this.state.deletedFile.length > 0) {
            let delfile = "";
            for (let i = 0; i < this.state.deletedFile.length; i++) {
              delfile = delfile + "," + this.state.deletedFile[i].name;
            }
            formData.append("deleted_files", delfile);
            // formData.append("deleted_files ", JSON.stringify( this.state.deletedFile));
          }
          this.props
            .updateShipment(
              formData,
              shipmentId,
              this.props.sorttype,
              this.props.mode,
              this.props.pageNumber,
              this.props.isFiltered,
              this.props.filteredData
            )
            .then(() => {
              if (
                this.props.shipments &&
                this.props.shipments.shipmentUpdateSuccess
              ) {
                this.props.shipmentUpdateMessage();
                this.props.toggleShipmentAddModal();
                if (
                  this.state.customLocation.__isNew__ &&
                  this.state.customLocation.__isNew__ === true
                ) {
                  this.props.getShipmentLocation(true);
                }
              } else {
                if (
                  this.props.shipments &&
                  this.props.shipments.shipmentUpdatedError
                ) {
                  this.props.validationMessage(
                    this.props.shipments.shipmentUpdatedError
                  );
                } else {
                  this.props.warningMessage();
                }
              }
            });
        } else {
          this.props.requiredFieldMessage();
        }
      } else {
        let shipmentId = this.props.shipmentData && this.props.shipmentData.id;
        const formData = new FormData();
        if (
          this.state.tracking_number !==
          ("pending" && this.props.shipmentData.tracking_number)
        ) {
          formData.append("tracking_number", this.state.tracking_number);
        } else {
          formData.append("tracking_number", "");
        }
        formData.append("contents", this.state.contents);
        formData.append("carrier", this.state.selectedcarrier?.value);
        formData.append(
          "location",
          this.state.selectedLocation && this.state.selectedLocation.value
        );
        formData.append("ticket_id", this.state.ticket_id);
        if (this.state.selectedFile.length > 0) {
          for (let i = 0; i < this.state.selectedFile.length; i++) {
            formData.append("uploads[]", this.state.selectedFile[i]);
          }
        }
        if (this.state.deletedFile.length > 0) {
          let delfile = "";
          for (let i = 0; i < this.state.deletedFile.length; i++) {
            delfile = delfile + "," + this.state.deletedFile[i].name;
          }
          formData.append("deleted_files", delfile);
        }
        this.props
          .updateShipment(
            formData,
            shipmentId,
            this.props.sorttype,
            this.props.mode,
            this.props.pageNumber,
            this.props.isFiltered,
            this.props.filteredData
          )
          .then(() => {
            if (
              this.props.shipments &&
              this.props.shipments.shipmentUpdateSuccess
            ) {
              this.props.shipmentUpdateMessage();
              this.props.toggleShipmentAddModal();
            } else {
              this.props.warningMessage();
            }
          });
      }
    } else {
      this.props.requiredFieldMessage();
    }
  };

  gotoFile = (url) => {
    window.open(url, "_blank");
  };

  render() {
    // console.log(this.state.selectedFile, 'file')
    const {
      tracking_number,
      selectedLocation,
      contents,
      locationDataArray,
      confirm_delivered,
      carrierDataArray,
      selectedcarrier,
      ticket_id,
      customLocation,
      customLocEnable,
      selectedFile,
      editedFile,
    } = this.state;
    const { shipmentData } = this.props;
    const help_block = {
      display: "block",
      marginTop: "5px",
      marginBottom: "10px",
      color: "#737373",
    };
    return (
      <Fragment>
        <Modal
          isOpen={this.props.toggleAddModal}
          toggle={this.toggleModal}
          className="modal-dialog-centered modal-lg"
        >
          <ModalHeader toggle={() => this.toggleModal()} className="bg-primary">
            {shipmentData ? "Edit Shipment" : "Add Shipment"}
          </ModalHeader>
          <ModalBody>
            <Form>
              <FormGroup row>
                <Col md="4">
                  <span>Tracking Number</span>
                </Col>
                <Col md="8">
                  <Input
                    type="text"
                    name="tracking_number"
                    id="tracking_number"
                    placeholder="Tracking Number"
                    autoComplete="off"
                    value={tracking_number || ""}
                    onChange={(e) =>
                      this.setState({ tracking_number: e.target.value })
                    }
                  />
                  <span style={help_block}>(Optional; can be added later)</span>
                </Col>
              </FormGroup>

              {shipmentData && (
                <FormGroup row>
                  <Col md="4">
                    <span>Ticket ID</span>
                  </Col>
                  <Col md="8">
                    <Input
                      type="text"
                      name="ticket_id"
                      id="ticket_id"
                      placeholder="Ticket ID"
                      autoComplete="off"
                      value={ticket_id || ""}
                      onChange={(e) =>
                        this.setState({ ticket_id: e.target.value })
                      }
                    />
                  </Col>
                </FormGroup>
              )}

              <FormGroup row>
                <Col md="4">
                  <span>
                    Location <span style={{ color: "red" }}>*</span>
                  </span>
                </Col>
                <Col md="8">
                  <Select
                    styles={{
                      // Fixes the overlapping problem of the component
                      menu: (provided) => ({ ...provided, zIndex: 9999 }),
                    }}
                    value={selectedLocation}
                    onChange={this.handleChange}
                    options={locationDataArray}
                  />
                </Col>
              </FormGroup>

              {customLocEnable && (
                <FormGroup row>
                  <Col md="4">
                    <span>
                      Custom Location <span style={{ color: "red" }}>*</span>
                    </span>
                  </Col>
                  <Col md="8">
                    <CreatableSelect
                      styles={{
                        // Fixes the overlapping problem of the component
                        menu: (provided) => ({ ...provided, zIndex: 9999 }),
                      }}
                      isClearable={false}
                      value={customLocation}
                      onChange={this.handleCustomChange}
                      options={this.getCustomLocation(
                        this.props.shipments &&
                          this.props.shipments.allData &&
                          this.props.shipments.allData.shipmentNewLocations
                      )}
                    />
                  </Col>
                </FormGroup>
              )}
              <FormGroup row>
                <Col md="4">
                  <span>
                    Carriers 
                  </span>
                </Col>
                <Col md="8">
                  <Select
                    styles={{
                      // Fixes the overlapping problem of the component
                      menu: (provided) => ({ ...provided, zIndex: 9999 }),
                    }}
                    value={selectedcarrier}
                    onChange={this.handleCarrierchange}
                    options={carrierDataArray}
                  />
                </Col>
              </FormGroup>
              <FormGroup row>
                <Col md="4">
                  <span>
                    Contents <span style={{ color: "red" }}>*</span>
                  </span>
                </Col>
                <Col md="8">
                  <Input
                    type="textarea"
                    name="contents"
                    rows={4}
                    id="contents"
                    placeholder="Contents"
                    value={contents || ""}
                    onChange={(e) => {
                      this.setState({ contents: e.target.value });
                    }}
                  />
                </Col>
              </FormGroup>
              <FormGroup row>
                <Col md="4">
                  <span>
                    Attachments 
                    {/* <span style={{ color: "red" }}>*</span> */}
                  </span>
                </Col>
                <Col md="8">
                  <CustomInput
                    type="file"
                    id="exampleCustomFileBrowser"
                    name="customFile"
                    accept=".txt,.doc,.docx,.xls,.xlsx,.csv,.pdf"
                    onChange={this.handleFile}
                    multiple
                  />
                </Col>
                <Col md="12">
                  {this.state.showfile &&
                    selectedFile.map((f, index) => {
                      const ext = f.name.substr(f.name.lastIndexOf(".") + 1);
                      return (
                        <Card
                          key={index}
                          style={{ backgroundColor: "#e0e1f7" }}
                          className="mt-1 mb-0 border"
                        >
                          <div className="p-1">
                            <Row className="align-items-center">
                              <Col className="col-auto">
                                <div className="avatar-sm">
                                  <span className="avatar-title rounded">
                                    .{ext}
                                  </span>
                                </div>
                              </Col>
                              <Col className="pl-0">
                                <Link to="#" className="font-weight-bold">
                                  {f.name}
                                </Link>
                                <p className="mb-0">
                                  {this.formatBytes(f.size)}
                                </p>
                              </Col>
                              <Col className="col-auto">
                                {/* <Link
                                                                to="#"
                                                                id="btn-download"
                                                                className="btn btn-link text-muted btn-lg p-0 mr-1">

                                                                <BootstrapTooltip title="Download" placement="top">
                                                                    <DownloadCloud style={{ color: "#727cf5" }} size={20}></DownloadCloud>
                                                                </BootstrapTooltip>
                                                            </Link> */}

                                <Link
                                  to="#"
                                  id="btn-Delete"
                                  className="btn btn-link text-danger btn-lg p-0"
                                >
                                  <BootstrapTooltip
                                    title="Cancel"
                                    placement="top"
                                  >
                                    <X
                                      size={20}
                                      onClick={() => this.cancelFile(index)}
                                    ></X>
                                  </BootstrapTooltip>
                                </Link>
                              </Col>
                            </Row>
                          </div>
                        </Card>
                      );
                    })}

                  {/* update */}

                  {shipmentData &&
                    editedFile.map((f, index) => {
                      const ext = f.name.substr(f.name.lastIndexOf(".") + 1);
                      return (
                        <Card
                          key={index}
                          style={{ backgroundColor: "#e0e1f7" }}
                          className="mt-1 mb-0 border"
                        >
                          <div className="p-1">
                            <Row className="align-items-center">
                              <Col className="col-auto">
                                <div className="avatar-sm">
                                  <span className="avatar-title rounded">
                                    .{ext}
                                  </span>
                                </div>
                              </Col>
                              <Col className="pl-0">
                                <Link
                                  to="#"
                                  className="font-weight-bold"
                                  onClick={() => this.gotoFile(f.url)}
                                >
                                  {f.name}
                                </Link>
                                {/* <p className="mb-0">{this.formatBytes(f.size)}</p> */}
                              </Col>
                              <Col className="col-auto">
                                <Link
                                  to="#"
                                  id="btn-download"
                                  className="btn btn-link text-muted btn-lg p-0 mr-1"
                                >
                                  <BootstrapTooltip
                                    title="Open File"
                                    placement="top"
                                  >
                                    {/* <Button color="primary" size='sm' href={f.url} target="_blank"> */}
                                    <LogIn
                                      style={{ color: "#727cf5" }}
                                      size={15}
                                      onClick={() => this.gotoFile(f.url)}
                                    ></LogIn>
                                    {/* </Button> */}
                                  </BootstrapTooltip>
                                </Link>

                                <Link
                                  to="#"
                                  id="btn-Delete"
                                  className="btn btn-link text-danger btn-lg p-0"
                                >
                                  <BootstrapTooltip
                                    title="Cancel"
                                    placement="top"
                                  >
                                    <X
                                      size={20}
                                      onClick={() => this.deleteFile(index)}
                                    ></X>
                                  </BootstrapTooltip>
                                </Link>
                              </Col>
                            </Row>
                          </div>
                        </Card>
                      );
                    })}
                </Col>
              </FormGroup>
            </Form>
          </ModalBody>
          <ModalFooter>
            {shipmentData &&
              shipmentData.status === "-" &&
              (confirm_delivered ? (
                <Button
                  className="mr-auto"
                  color="success"
                  onClick={this.updateStatus}
                >
                  Confirm Delivered ?
                </Button>
              ) : (
                <Button
                  className="mr-auto"
                  color="success"
                  onClick={() => this.setState({ confirm_delivered: true })}
                >
                  Delivered
                </Button>
              ))}
            <Button color="danger" onClick={this.toggleModal}>
              Cancel
            </Button>
            {shipmentData ? (
              <Button color="primary" onClick={this.updateShipmethodMethod}>
                Update
              </Button>
            ) : (
              <Button color="primary" onClick={this.addShipmethodMethod}>
                Add
              </Button>
            )}
          </ModalFooter>
        </Modal>
      </Fragment>
    );
  }
}
const mapStateToProps = (state) => {


  return {
    locationData: state.dataList.allData,
    shipments: state.IpwatchShipmentData,
  };
};

export default connect(mapStateToProps, {
  getInitialData,
  updateShipment,
  updateShipmentStatus,
  addShipment,
  getShipmentLocation,
  getShipmentCarrier,
})(IpwatchShipmentAddModal);
