import React, { Fragment } from "react";
import { connect } from "react-redux";
import {
  Trash,
  Plus,
  Edit,
  ChevronLeft,
  ChevronRight,
  ArrowDown,
  ArrowUp,
} from "react-feather";
import {
  Button,
  Card,
  CardBody,
  Form,
  Row,
  Col,
  FormGroup,
  CardHeader,
  CardTitle,
  Table,
} from "reactstrap";
import "../../../assets/scss/plugins/extensions/react-paginate.scss";
import ReactPaginate from "react-paginate";
import IpwatchShipmentAddEditModal from "./IpwatchShipmentAddEditModal";
import IpwatchShipmentDeleteModal from "./IpwatchShipmentDeleteModal";
import {
  getAllShipments,
  deleteShipment,
  getShipmentLocation,
  getFilteredShipments,
  getShipmentCarrier,
} from "../../../redux/actions/ipwatch-shipments";
import dhl from "../../../assets/img/shipments/dhl.png";
import dpd from "../../../assets/img/shipments/dpd.png";
import ontrac from "../../../assets/img/shipments/ontrac.png";
import ups from "../../../assets/img/shipments/ups.png";
import usps from "../../../assets/img/shipments/usps.png";
import fedex from "../../../assets/img/shipments/fedex.png";
import { toast, ToastContainer, Zoom } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "../../../assets/scss/plugins/extensions/toastr.scss";
import Spinner from "../../../components/@vuexy/spinner/Loading-spinner";
import { getPaginateData } from "../../../redux/actions/pagination";
import { getSearchLocation } from "../../../redux/actions/data-list/";
import Filter from "./filter";
import classnames from "classnames";

const CustomHeader = (props) => {
  return (
    <Fragment>
      <Form>
        <Row /*style={{ marginBottom: "1.5rem" }}*/>
          <Col sm="4">
            <FormGroup>
              <div className="data-list-header d-flex justify-content-between flex-wrap">
                <div className="actions-left d-flex flex-wrap">
                  <Button
                    className="add-new-btn"
                    color="primary"
                    onClick={() => props.toggleShipmentAddModal()}
                    outline
                  >
                    <Plus size={15} />
                    <span className="align-middle">Add Shipment</span>
                  </Button>
                </div>
              </div>
            </FormGroup>
          </Col>
          {/* <Col sm="8">
                        <FormGroup>
                            <div className="data-list-header d-flex justify-content-between flex-wrap" style={{ float: "right" }}>
                                <div className="actions-left d-flex flex-wrap">
                                    <Button
                                        className="add-new-btn"
                                        color="primary"
                                        onClick={() => props.toggleShipmentAddModal()}
                                        outline>
                                        <Plus size={15}
                                        />
                                        <span className="align-middle">Add Shipment</span>
                                    </Button>
                                </div>
                            </div>
                        </FormGroup>
                    </Col> */}
        </Row>
      </Form>
    </Fragment>
  );
};

const datastyle = {
  backgroundColor: "#c7c4ec",
  paddingTop: "13px",
  paddingBottom: "7px",
  fontSize: "10px",
};

const shipmentDeletedSuccess = () =>
  toast.success("Shipment Deleted Successfully.", { transition: Zoom });
const shipmentUpdateMessage = () =>
  toast.success("Shipment Updated Successfully.", { transition: Zoom });
const shipmentAddedMessage = () =>
  toast.success("Shipment Added Successfully.", { transition: Zoom });
const requiredFieldMessage = () =>
  toast.warning("Please fill the required fields.", { transition: Zoom });
const warningMessage = () =>
  toast.warning("Something went wrong.Please try again later.", {
    transition: Zoom,
  });
const warningStatusMessage = () =>
  toast.warning("Invalid Tracking Number", { transition: Zoom });
const validationMessage = (msg) => toast.warning(msg, { transition: Zoom });

class IpwatchShipmentList extends React.PureComponent {
  state = {
    toggleAddModal: false,
    shipment_data: "",
    toggleDeleteModal: false,
    shipmentId: "",
    pageNumber: 1,
    perPageData: 30,
    loading: false,
    trackingSort: "desc",
    updatedSort: "desc",
    statusSort: "desc",
    locationSort: "desc",
    sorttype: "timestamp",
    mode: "desc",
    isFiltered: false,
    filteredData: {},
  };

  componentDidMount() {
    this.setState({ loading: true });
    // if (this.props.dataList && this.props.dataList.allData.length === 0) {
    //     this.props.getSearchLocation(true).then(() => {
    //     })
    // }
    if (this.props.shipments && !this.props.shipments.carrierData) {
      this.props.getShipmentCarrier().then(() => {});
    }
    if (this.props.shipments && !this.props.shipments.allData) {
      this.props.getShipmentLocation(true).then(() => {});
    }
    this.props.getPaginateData().then(() => {
      if (this.props.paginateData && this.props.paginateData.perPageCount) {
        this.setState({ perPageData: this.props.paginateData.perPageCount });
      }
    });
    if (this.props.shipments && !this.props.shipments.allShipments) {
      this.props.getAllShipments(
        this.state.sorttype,
        this.state.mode,
        this.state.pageNumber
      );
    }
  }

  toggleShipmentAddModal = (showEditModal = false, value) => {
    if (showEditModal) {
      this.setState({
        toggleAddModal: !this.state.toggleAddModal,
        shipment_data: value,
      });
    } else {
      this.setState({
        toggleAddModal: !this.state.toggleAddModal,
        shipment_data: "",
      });
    }
  };

  toggleShipmentDeleteModal = (id = false) => {
    if (id) {
      this.setState({
        toggleDeleteModal: !this.state.toggleDeleteModal,
        shipmentId: id,
      });
    } else {
      this.setState({
        toggleDeleteModal: !this.state.toggleDeleteModal,
        shipmentId: "",
      });
    }
  };

  // Shipment pagination
  onShipmentPageChange = (currentPage) => {
    let page_number = currentPage.selected + 1;
    if (this.state.isFiltered === false) {
      this.props
        .getAllShipments(
          this.state.sorttype,
          this.state.mode,
          page_number,
          false
        )
        .then(() => {
          window.scrollTo(0, 0);
        });
    } else {
      this.props
        .getFilteredShipments(page_number, this.state.filteredData, false)
        .then(() => {
          window.scrollTo(0, 0);
        });
    }

    this.setState({ pageNumber: page_number });
  };

  filtered = (data) => {
    if (data === null) {
      this.setState({ isFiltered: false, filteredData: data });
    } else {
      this.setState({ isFiltered: true, filteredData: data });
    }
  };

  countToatalPages = (totalData) => {
    if (parseInt(totalData)) {
      var pageCount = Math.ceil(parseInt(totalData) / this.state.perPageData);
      return pageCount;
    }
  };

  handleContents = (content) => {
    var re1 = /Ticket #([0-9]*)/g;
    var re2 = /TICKET #([0-9]*)/g;
    var bold = /\*(.*?)\*/g;
    var str = content;
    if (str) {
      var t = str.replace(
        re1,
        `<a href="https://crm.fdcservers.net/admin/supportmgr/ticket_view.php?ticket=$1" target="_blank" rel='noopener noreferrer'>$&</a>`
      );
      t = t.replace(
        re2,
        `<a href="https://crm.fdcservers.net/admin/supportmgr/ticket_view.php?ticket=$1" target="_blank" rel='noopener noreferrer'>$&</a>`
      );
      t = t.replace(bold, "<b style='background:#f9f33f'>$&</b>");
      // t= t.replace(bold,"<b style='color:red'>$&</b>" )
      t = t.replaceAll("*", "");

      return {
        __html: t,
      };
    } else {
      return null;
    }
  };

  sortApi = (sorttype, mode) => {
    this.props.getAllShipments(sorttype, mode, this.state.pageNumber);
  };

  sort = (col, type) => {
    this.setState({ loading: true });
    if (col === "traking_no") {
      if (type === "asc") {
        this.setState({
          trackingSort: "desc",
          statusSort: "desc",
          updatedSort: "desc",
          locationSort: "desc",
          sorttype: "tracking_number",
          mode: "asc",
        });
        this.sortApi("tracking_number", "asc");
      } else if (type === "desc") {
        this.setState({
          trackingSort: "asc",
          statusSort: "desc",
          updatedSort: "desc",
          locationSort: "desc",
          sorttype: "tracking_number",
          mode: "desc",
        });
        this.sortApi("tracking_number", "desc");
      }
    } else if (col === "status") {
      if (type === "asc") {
        this.setState({
          statusSort: "desc",
          trackingSort: "desc",
          updatedSort: "desc",
          locationSort: "desc",
          sorttype: "status",
          mode: "asc",
        });
        this.sortApi("status", "asc");
      } else if (type === "desc") {
        this.setState({
          statusSort: "asc",
          trackingSort: "desc",
          updatedSort: "desc",
          locationSort: "desc",
          sorttype: "status",
          mode: "desc",
        });
        this.sortApi("status", "desc");
      }
    } else if (col === "updated") {
      if (type === "asc") {
        this.setState({
          updatedSort: "desc",
          trackingSort: "desc",
          statusSort: "desc",
          locationSort: "desc",
          sorttype: "timestamp",
          mode: "asc",
        });
        this.sortApi("timestamp", "asc");
      } else if (type === "desc") {
        this.setState({
          updatedSort: "asc",
          trackingSort: "desc",
          statusSort: "desc",
          locationSort: "desc",
          sorttype: "timestamp",
          mode: "desc",
        });
        this.sortApi("timestamp", "desc");
      }
    } else if (col === "location") {
      if (type === "asc") {
        this.setState({
          locationSort: "desc",
          trackingSort: "desc",
          statusSort: "desc",
          updatedSort: "desc",
          sorttype: "location",
          mode: "asc",
        });
        this.sortApi("location", "asc");
      } else if (type === "desc") {
        this.setState({
          locationSort: "asc",
          trackingSort: "desc",
          statusSort: "desc",
          updatedSort: "desc",
          sorttype: "location",
          mode: "desc",
        });
        this.sortApi("location", "desc");
      }
    }
  };
  getTrackingNumber = (data) => {
    if (data.courier === "FedEx" || data.courier === "100003") {
      return (
        <>
          <img
            src={fedex}
            alt="FedEx"
            title="FedEx"
            width="18px"
            height="18px"
          />
          <a
            style={{ paddingLeft: "0.5rem" }}
            href={`https://www.fedex.com/apps/fedextrack/?tracknumbers=${data.tracking_number}`}
            target="_blank"
            rel="noopener noreferrer"
          >
            {data.tracking_number}
          </a>
        </>
      );
    } 
    
    else if (data.courier === "USPS" || data.courier === "21051") {
      return (
        <>
          <img src={usps} alt="USPS" title="USPS" width="18px" height="18px" />
          <a
            style={{ paddingLeft: "0.5rem" }}
            href={`https://tools.usps.com/go/TrackConfirmAction_input?qtc_tLabels1=${data.tracking_number}`}
            target="_blank"
            rel="noopener noreferrer"
          >
            {data.tracking_number}
          </a>
        </>
      );
    
    } 
    
    else if (data.courier === "UPS" || data.courier === "100002") {
      return (
        <>
        <img src={ups} alt="UPS" title="UPS" width="18px" height="18px" />
        <a style={{ paddingLeft: "0.5rem" }} href={`https://wwwapps.ups.com/WebTracking/processInputRequest?sort_by=status&tracknums_displayed=1&TypeOfInquiryNumber=T&loc=en_us&InquiryNumber1=${data.tracking_number}&track.x=0&track.y=0&requester=ST/trackdetails`} target="_blank" rel='noopener noreferrer'>
            {data.tracking_number}
        </a>
    </>
      );
    } 
    
    else if (data.courier === "OnTrac" || data.courier === "100049") {
      return (
        <>
          <img
            src={ontrac}
            alt="OnTrac"
            title="OnTrac"
            width="18px"
            height="18px"
          />
          <a
            style={{ paddingLeft: "0.5rem" }}
            href={`http://www.ontrac.com/trackingres.asp?tracking_number=${data.tracking_number}`}
            target="_blank"
            rel="noopener noreferrer"
          >
            {data.tracking_number}
          </a>
        </>
      );
    } else if (data.courier === "DPD") {
      return (
        <>
          <img src={dpd} alt="DPD" title="DPD" width="18px" height="18px" />
          <a
            style={{ paddingLeft: "0.5rem" }}
            href={`https://tracking.dpd.de/parcelstatus?query=${data.tracking_number}`}
            target="_blank"
            rel="noopener noreferrer"
          >
            {data.tracking_number}
          </a>
        </>
      );
    } else if (data.courier === "DHL" || data.courier === "100001") {
      return (
        <>
          <img src={dhl} alt="DHL" title="DHL" width="18px" height="18px" />
          <a
            style={{ paddingLeft: "0.5rem" }}
            href={`http://www.dhl.com/en/express/tracking.html?AWB=${data.tracking_number}`}
            target="_blank"
            rel="noopener noreferrer"
          >
            {data.tracking_number}
          </a>
        </>
      );
    } else {
      return <>{data.tracking_number}</>;
    }
  };
  render() {
    const {
      toggleAddModal,
      shipment_data,
      toggleDeleteModal,
      shipmentId,
      pageNumber,
      loading,
      trackingSort,
      statusSort,
      updatedSort,
      locationSort,
    } = this.state;
    const { shipments } = this.props;
    const statusStyle = {
      color: "#ffffff",
      backgroundColor: "#4cd964",
      paddingLeft: "5px",
      paddingRight: "5px",
      fontWeight: "normal",
      paddingTop: "0.1em",
      paddingBottom: "0.1em",
      borderRadius: ".25em",
    };

    const sortUpStyle = {
      marginLeft: "15px",
      bottom: "10px",
      cursor: "pointer",
      fontSize: "larger",
      position: "relative",
    };

    const sortDownStyle = {
      transform: "rotate(180deg)",
    };
    return (
      <Fragment>
        <Filter
          dataList={this.props.shipments}
          getFilteredShipments={this.props.getFilteredShipments}
          pageNumber={pageNumber}
          filtered={this.filtered}
          sorttype={this.state.sorttype}
          mode={this.state.mode}
          getAllShipments={this.props.getAllShipments}
        />
        <CustomHeader toggleShipmentAddModal={this.toggleShipmentAddModal} />

        {shipments && shipments.isAllShipmentLoading ? (
          <Spinner />
        ) : (
          <Card>
            <CardHeader style={datastyle}>
              <CardTitle style={{ fontSize: "1.1rem" }}>
                <h3>
                  Shipments <small>(Updated Hourly)</small>
                </h3>
              </CardTitle>
            </CardHeader>
            <CardBody>
              <Fragment>
                <Table
                  responsive
                  striped
                  style={{ width: "100%", tableLayout: "fixed" }}
                >
                  <thead>
                    <tr>
                      <th style={{ width: "6%" }}>#</th>
                      <th>
                        Tracking Number
                        {trackingSort === "desc" && (
                          <span
                            className="sortStyle tracknumber"
                            onClick={() => this.sort("traking_no", "desc")}
                          >
                            ▲
                          </span>
                        )}
                        {trackingSort === "asc" && (
                          <span
                            className="sortStyle tracknumber down"
                            onClick={() => this.sort("traking_no", "asc")}
                          >
                            ▲
                          </span>
                        )}
                      </th>
                      <th>Ticket ID</th>
                      <th>
                        Status
                        {statusSort === "desc" && (
                          <span
                            className="sortStyle"
                            onClick={() => this.sort("status", "desc")}
                          >
                            ▲
                          </span>
                        )}
                        {statusSort === "asc" && (
                          <span
                            className="sortStyle down"
                            onClick={() => this.sort("status", "asc")}
                          >
                            ▲
                          </span>
                        )}
                      </th>
                      <th>
                        Updated
                        {updatedSort === "desc" && (
                          <span
                            className="sortStyle"
                            onClick={() => this.sort("updated", "desc")}
                          >
                            ▲
                          </span>
                        )}
                        {updatedSort === "asc" && (
                          <span
                            className="sortStyle down"
                            onClick={() => this.sort("updated", "asc")}
                          >
                            ▲
                          </span>
                        )}
                      </th>
                      <th>Location</th>
                      <th>
                        Destination
                        {locationSort === "desc" && (
                          <span
                            className="sortStyle"
                            onClick={() => this.sort("location", "desc")}
                          >
                            ▲
                          </span>
                        )}
                        {locationSort === "asc" && (
                          <span
                            className="sortStyle down"
                            onClick={() => this.sort("location", "asc")}
                          >
                            ▲
                          </span>
                        )}
                      </th>
                      <th>Contents</th>
                      <th>Actions</th>
                    </tr>
                  </thead>
                  <tbody className="unpadding striped hover ">
                    {shipments &&
                    shipments.allShipments &&
                    shipments.allShipments.length > 0 ? (
                      shipments.allShipments.map((value, index) => (
                        <tr key={index}>
                          <td>{value.index}</td>
                          <td>
                            <span>{value.tracking_number&& this.getTrackingNumber(value)}</span>
                          </td>
                          <td>
                            <a
                              href={value.ticket_crm_url}
                              target="_blank"
                              rel="noopener noreferrer"
                            >
                              {value.ticket_id}
                            </a>
                          </td>
                          <td>
                            {value.status !== "-" ? (
                              <span style={statusStyle}>{value.status}</span>
                            ) : (
                              <span>-</span>
                            )}
                          </td>
                          <td>{value.timestamp}</td>
                          <td>{value.current_location}</td>
                          <td>{value.location}</td>
                          <td id={`content_${value.index}`}>
                            <span
                              dangerouslySetInnerHTML={this.handleContents(
                                value.contents
                              )}
                            />
                            {/* {this.handleContents(value.index,value.contents)} */}
                          </td>
                          <td>
                            <Edit
                              className="cursor-pointer"
                              style={{ marginLeft: "0.5rem" }}
                              size={15}
                              onClick={() =>
                                this.toggleShipmentAddModal(true, value)
                              }
                            />
                            <Trash
                              className="cursor-pointer"
                              style={{ marginLeft: "0.5rem" }}
                              size={15}
                              onClick={() =>
                                this.toggleShipmentDeleteModal(value.id)
                              }
                            />
                          </td>
                        </tr>
                      ))
                    ) : (
                      <tr>
                        <td>There are no records to display</td>
                        <td></td>
                        <td></td>
                        <td></td>
                        <td></td>
                        <td></td>
                      </tr>
                    )}
                  </tbody>
                </Table>
                <ReactPaginate
                  previousLabel={<ChevronLeft size={15} />}
                  nextLabel={<ChevronRight size={15} />}
                  breakLabel={"..."}
                  breakClassName={"break-me"}
                  pageCount={
                    shipments &&
                    shipments.total_count &&
                    this.countToatalPages(shipments.total_count)
                  }
                  marginPagesDisplayed={2}
                  pageRangeDisplayed={3}
                  containerClassName={
                    "vx-pagination icon-pagination pagination-end mt-2"
                  }
                  activeClassName={"active"}
                  onPageChange={this.onShipmentPageChange}
                  forcePage={pageNumber - 1}
                />
              </Fragment>
            </CardBody>
          </Card>
        )}
        {toggleAddModal && (
          <IpwatchShipmentAddEditModal
            toggleAddModal={toggleAddModal}
            toggleShipmentAddModal={this.toggleShipmentAddModal}
            shipmentData={shipment_data}
            pageNumber={pageNumber}
            shipmentUpdateMessage={shipmentUpdateMessage}
            warningMessage={warningMessage}
            warningStatusMessage={warningStatusMessage}
            shipmentAddedMessage={shipmentAddedMessage}
            requiredFieldMessage={requiredFieldMessage}
            validationMessage={validationMessage}
            sorttype={this.state.sorttype}
            mode={this.state.mode}
            isFiltered={this.state.isFiltered}
            filteredData={this.state.filteredData}
          />
        )}

        {toggleDeleteModal && (
          <IpwatchShipmentDeleteModal
            toggleDeleteModal={toggleDeleteModal}
            toggleShipmentDeleteModal={this.toggleShipmentDeleteModal}
            shipmentId={shipmentId}
            deleteShipment={this.props.deleteShipment}
            shipmentDeletedSuccess={shipmentDeletedSuccess}
            warningMessage={warningMessage}
            shipments={shipments}
            pageNumber={pageNumber}
            sorttype={this.state.sorttype}
            mode={this.state.mode}
          />
        )}
        <ToastContainer />
      </Fragment>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    shipments: state.IpwatchShipmentData,
    paginateData: state.paginateData,
    dataList: state.dataList,
  };
};

export default connect(mapStateToProps, {
  getAllShipments,
  deleteShipment,
  getPaginateData,
  getSearchLocation,
  getShipmentLocation,
  getShipmentCarrier,
  getFilteredShipments,
})(IpwatchShipmentList);
