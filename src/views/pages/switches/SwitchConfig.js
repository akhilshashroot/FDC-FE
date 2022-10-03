import React, { Component, Fragment } from "react";
import { Button, Card, CardBody, Form, Row, Col, FormGroup } from "reactstrap";
import DataTable from "react-data-table-component";
import classnames from "classnames";
import { Edit, Plus, ChevronLeft, ChevronRight, Trash } from "react-feather";
import { connect } from "react-redux";
import { getInitialData } from "../../../redux/actions/data-list/";
import { getSwitchesData, GetLocationSwitchesView, deleteSwitch } from "../../../redux/actions/switches";
import Sidebar from "./SwitchSidebar";
import "../../../assets/scss/plugins/extensions/react-paginate.scss";
import "../../../assets/scss/pages/data-list.scss";
import { toast, ToastContainer, Zoom } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "../../../assets/scss/plugins/extensions/toastr.scss";
import ReactPaginate from "react-paginate";
import Select from 'react-select';
import SwitchDelete from './SwitchDelete';
import { getPaginateData } from '../../../redux/actions/pagination';

const selectedStyle = {
  rows: {
    selectedHighlighStyle: {
      backgroundColor: "rgba(115,103,240,.05)",
      color: "#7367F0 !important",
      boxShadow: "0 0 1px 0 #7367F0 !important",
      "&:hover": {
        transform: "translateY(0px) !important"
      }
    }
  }
}

const actionstyle = {
  paddingLeft: "0px"
}

const ActionsComponent = props => {
  return (
    <div style={actionstyle} className="data-list-action">
      <Edit
        className="cursor-pointer mr-0"
        size={15}
        onClick={() => {
          return props.currentData(props.row)
        }}
      />
      <Trash
        className="cursor-pointer ml-1"
        size={15}
        onClick={() => {
          return props.toggleSwitchDeleteModal(props.row)
        }}
      />
    </div>
  )
}

const CustomHeader = props => {
  return (
    <Fragment>
      <Form>
        <Row>
          <Col sm="3">
            <FormGroup>
              <Select
                value={props.selectedLocation}
                onChange={props.handleChangeLocation}
                options={props.convertLocation(props.locationData)}
                placeholder="Select a Location"
                isSearchable={true}
              />
            </FormGroup>
          </Col>
          <Col sm="9">
            <div className="data-list-header d-flex justify-content-between flex-wrap" style={{ float: "right" }}>
              <div className="actions-left d-flex flex-wrap">
                <Button
                  className="add-new-btn"
                  color="primary"
                  onClick={() => props.handleSidebar(true, true)}
                  outline>
                  <Plus size={15} />
                  <span className="align-middle">Add New</span>
                </Button>
              </div>
            </div>
          </Col>

        </Row>
      </Form>
    </Fragment>
  )
}
const notifyInfo = () => toast.info("Switch Updated Successfully", { transition: Zoom })
const notifyBounce = () => toast.success("Switch Added Successfully", { transition: Zoom })
const notifyError = () => toast.warning("Something went wrong.Please try again..", { transition: Zoom })
const notifyWarning = () => toast.warning("Please fill mandatory fields!.", { transition: Zoom })
const ipError = () => toast.warning("The ip has already been taken.", { transition: Zoom })
const labelError = () => toast.warning("The label has already been taken.", { transition: Zoom })
const labelShortError = () => toast.warning("The label short has already been taken.", { transition: Zoom })
const switchDeletedSuccess = () => toast.success("Switch Deleted Successfully.", { transition: Zoom })


class SwitchConfig extends Component {


  state = {
    data: [],
    totalPages: 0,
    currentPage: 0,
    columns: [
      {
        name: "#",
        selector: "index",
        sortable: true,
        minWidth: "8%",
        maxWidth: "8%"
      },
      {
        name: "Location",
        selector: "locaton_name",
        sortable: true,
        minWidth: "12%",
        maxWidth: "12%",
        cell: row => (<span>{row.locaton_name}</span>)
      },
      {
        name: "Switch",
        selector: "label",
        sortable: true,
        minWidth: "32%",
        maxWidth: "32%"
      },
      {
        name: "Short",
        selector: "switch",
        sortable: true,
        minWidth: "10%",
        maxWidth: "10%"
      },
      {
        name: "Pdu(s)",
        selector: "pdu",
        sortable: true,
        minWidth: "15%",
        maxWidth: "15%",
        cell: row => (<span>
          {(row.pdu_1_id === 0 && row.pdu_2_id === 0) && "N/A"}
          {(row.pdu_1_id !== 0 && row.pdu_2_id !== 0) && `${row.pdu_1_name} + ${row.pdu_2_name}`}
          {(row.pdu_1_id !== 0 && row.pdu_2_id === 0) && `${row.pdu_1_name}`}
          {(row.pdu_1_id === 0 && row.pdu_2_id !== 0) && `${row.pdu_2_name}`}
        </span>)
      },
      {
        name: "Ip",
        selector: "ip",
        sortable: true,
        minWidth: "14%",
        maxWidth: "14%"
      },
      {
        name: "Actions",
        sortable: true,
        minWidth: "8%",
        maxWidth: "8%",
        cell: row => (
          <ActionsComponent
            row={row}
            currentData={this.handleCurrentData}
            toggleSwitchDeleteModal={this.toggleSwitchDeleteModal}
          />
        )
      }
    ],
    allData: [],
    value: "",
    rowsPerPage: 4,
    sidebar: false,
    toggleDeleteModal: false,
    switchId: "",
    deleteIndex: null,
    currentData: null,
    pageNumber: 1,
    selected: [],
    sortIndex: [],
    addNew: "",
    location_all: true,
    sel_loc_id: "",
    perPageData: 30,
    selectedLocation: { "label": "All", "value": "all" }
  }

  thumbView = this.props.thumbView



  componentDidMount() {
    this.props.getPaginateData().then(() => {
      if (this.props.paginateData && this.props.paginateData.perPageCount) {
        this.setState({ perPageData: this.props.paginateData.perPageCount })
      }
    });
    let locObj = JSON.parse(localStorage.getItem('loc_data'));
    if (locObj) {
      this.setState({ location_all: false, sel_loc_id: locObj.value, selectedLocation: locObj })
      this.props.GetLocationSwitchesView(locObj.value);

    } else {
      this.setState({ location_all: true, sel_loc_id: "", selectedLocation: { "label": "All", "value": "all" } })
      if (this.props.switchDetails && !this.props.switchDetails.allData) {
        this.props.getSwitchesData(1, true);
      }
    }
    // if (this.props.switchDetails && !this.props.switchDetails.allData) {
    //   this.props.getSwitchesData(1, true);
    // }

    if (this.props.dataList && this.props.dataList.allData && !this.props.dataList.allData.length > 0) {
      this.props.getInitialData();
    }
  }
  componentWillUnmount() {
    this.props.getSwitchesData(1, false);
  }
  handleSidebar = (boolean, addNew = false) => {
    this.setState({ sidebar: boolean })
    if (addNew === true) this.setState({ currentData: null, addNew: true })
  }

  toggleSwitchDeleteModal = (row = false) => {
    if (row) {
      this.setState({ toggleDeleteModal: !this.state.toggleDeleteModal, switchId: row.id, deleteIndex: row.index })
    } else {
      this.setState({ toggleDeleteModal: !this.state.toggleDeleteModal, switchId: "", deleteIndex: null })
    }

  }


  handleCurrentData = obj => {
    this.setState({ currentData: obj })
    this.handleSidebar(true)
  }

  onSwitchPageChange = (currentPage) => {
    let page_number = currentPage.selected + 1
    this.props.getSwitchesData(page_number)
    this.setState({ pageNumber: page_number })

  }

  countToatalPages = (totalData) => {
    if (parseInt(totalData)) {
      let pageCount = Math.ceil(parseInt(totalData) / this.state.perPageData);
      return pageCount;
    }
  }

  convertLocation = data => {
    var locationData = []
    locationData.push({ "label": "All", "value": "all" })
    data && data.forEach((value) => {
      locationData.push({ "label": value.location, "value": value.id })
    })
    return locationData
  }

  handleLocationChange = selectedLocation => {
    if (selectedLocation && selectedLocation.value === "all") {
      this.setState({ location_all: true, sel_loc_id: "" })
      this.props.getSwitchesData(1, false);
    } else {
      this.setState({ location_all: false, sel_loc_id: selectedLocation.value })
      this.props.GetLocationSwitchesView(selectedLocation.value);
    }
    this.setState({ selectedLocation: selectedLocation })

  };

  render() {
    let {
      columns,
      location_all,
      sel_loc_id,
      currentData,
      sidebar,
      pageNumber,
      switchId,
      toggleDeleteModal,
      deleteIndex,
      selectedLocation
    } = this.state
    let cardbody = {
      paddingTop: '0px'
    }
    return (
      <div
        className={`data-list ${this.props.thumbView ? "thumb-view" : "list-view"
          }`}>
        <CustomHeader
          handleSidebar={this.handleSidebar}
          locationOptions={this.locationOptions}
          handleChangeLocation={this.handleLocationChange}
          convertLocation={this.convertLocation}
          locationData={this.props.dataList && this.props.dataList.allData}
          selectedLocation={selectedLocation}
        />
        <Card>
          <CardBody style={cardbody}>
            <DataTable
              columns={columns}
              data={this.props.switchDetails && this.props.switchDetails.allData && location_all ? (this.props.switchDetails.allData.data) : (this.props.switchDetails.allData && Array.isArray(this.props.switchDetails.allData) ? this.props.switchDetails.allData : [])}
              noHeader
              customStyles={selectedStyle}
            />
            {location_all &&
              <ReactPaginate
                previousLabel={<ChevronLeft size={15} />}
                nextLabel={<ChevronRight size={15} />}
                breakLabel={"..."}
                breakClassName={"break-me"}
                pageCount={this.props.switchDetails && this.props.switchDetails.allData && this.props.switchDetails.allData.total && this.countToatalPages(this.props.switchDetails.allData.total)}
                marginPagesDisplayed={2}
                pageRangeDisplayed={3}
                containerClassName={
                  "vx-pagination icon-pagination pagination-end mt-2"
                }
                activeClassName={"active"}
                onPageChange={this.onSwitchPageChange}
              />
            }
          </CardBody>
        </Card>
        <Sidebar
          show={sidebar}
          data={currentData}
          handleSidebar={this.handleSidebar}
          thumbView={this.props.thumbView}
          getSwitchesData={this.props.getSwitchesData}
          dataParams={this.props.parsedFilter}
          addNew={this.state.addNew}
          AddMessage={notifyBounce}
          UpdateMessage={notifyInfo}
          ErrorMessage={notifyError}
          locationData={this.props.dataList && this.props.dataList.allData}
          switchData={this.props.switchDetails && this.props.switchDetails.allData && this.props.switchDetails.allData.data}
          inCompleteData={notifyWarning}
          ipError={ipError}
          labelError={labelError}
          labelShortError={labelShortError}
          currentPage={pageNumber}
          location_all={location_all}
          sel_loc_id={sel_loc_id}
          GetLocationSwitchesView={this.props.GetLocationSwitchesView}

        />
        <div
          className={classnames("data-list-overlay", {
            show: sidebar
          })}
          onClick={() => this.handleSidebar(false, true)}
        />
        {toggleDeleteModal &&
          <SwitchDelete
            toggleDeleteModal={toggleDeleteModal}
            toggleSwitchDeleteModal={this.toggleSwitchDeleteModal}
            switchId={switchId}
            deleteSwitch={this.props.deleteSwitch}
            switchDeletedSuccess={switchDeletedSuccess}
            deleteIndex={deleteIndex}
            data={this.props.switchDetails && this.props.switchDetails.allData && location_all ? (this.props.switchDetails.allData.data) : (this.props.switchDetails.allData && Array.isArray(this.props.switchDetails.allData) ? this.props.switchDetails.allData : [])}
            switchDetails={this.props.switchDetails}
            warningMessage={notifyError}
            location_all={location_all}
            getSwitchesData={this.props.getSwitchesData}
            currentPage={pageNumber}
            GetLocationSwitchesView={this.props.GetLocationSwitchesView}
            sel_loc_id={sel_loc_id}
          />
        }
        <ToastContainer />
      </div>
    )
  }
}

const mapStateToProps = state => {
  return {
    dataList: state.dataList,
    switchDetails: state.SwitchList,
    paginateData: state.paginateData
  }
}

export default connect(mapStateToProps,
  { getInitialData, getSwitchesData, GetLocationSwitchesView, deleteSwitch, getPaginateData })(SwitchConfig)