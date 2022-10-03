import React, { Component, Fragment } from "react";
import { Button ,Form, Row, Col, FormGroup } from "reactstrap";
import classnames from "classnames";
import { Plus, Settings } from "react-feather";
import { connect } from "react-redux";
import { addPDUAction, getPDUData } from "../../../redux/actions/pdu";
import { getInitialData } from "../../../redux/actions/data-list";
import Sidebar from "./PduListSidebar";
import "../../../assets/scss/plugins/extensions/react-paginate.scss";
import "../../../assets/scss/pages/data-list.scss"
import { toast, ToastContainer, Zoom } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "../../../assets/scss/plugins/extensions/toastr.scss";
import PduDetails from './PduDetails';
import Select from 'react-select';

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
const notifyInfo = () => toast.info("PDU Updated Successfully", { transition: Zoom });
const notifyBounce = () => toast.success("PDU Added Successfully", { transition: Zoom });
const notifyWarning = () => toast.warning("Please fill every fields", { transition: Zoom });
const notifyError = () => toast.warning("Something went wrong.Please try again..", { transition: Zoom });
const samePduError = () => toast.warning("Given rack is taken.Please enter another.", { transition: Zoom });

const ActionComponent = (props) => {
  return (
    <>
      <Settings className="cursor-pointer ml-1" size={17} onClick={(e) => props.viewPdu(e, props.row)} />
    </>
  )
}

class PduListConfig extends Component {

  state = {
    data: [],
    totalPages: 0,
    currentPage: 0,
    columns: [
      {
        name: "#",
        selector: "index",
        sortable: true,
        maxWidth: "80px",
        minWidth: "40px",
      },
      {
        name: "Location",
        selector: "location",
        sortable: true,
        minWidth: "370px"
      },
      {
        name: "PDUs",
        selector: "pdu_count",
        sortable: true,
        minWidth: "100px",
        maxwidth: "100px"
      },
      {
        name: "Action",
        cell: row => (
          <ActionComponent
            row={row}
            viewPdu={this.viewPdu} />
        )
      },
      {
        name: "",
        selector: "",
        sortable: true,
      },
      {
        name: "",
        selector: "",
        sortable: true,
      },
    ],
    allData: [],
    value: "",
    rowsPerPage: 4,
    sidebar: false,
    currentData: null,
    selected: [],
    totalRecords: 0,
    sortIndex: [],
    addNew: "",
    row: "",
    sel_loc_id: "all",
    selectedLocation: { "label": "All", "value": "all" },
    setPageToOne: false
  }

  thumbView = this.props.thumbView

  componentDidMount() {
    if (this.props.dataList && this.props.dataList.allData && !this.props.dataList.allData.length > 0) {
      this.props.getInitialData()
    }
    let locObj = JSON.parse(localStorage.getItem('loc_data'));
    if(locObj){
      this.setState({ sel_loc_id: locObj.value, selectedLocation: locObj });
    }
   
  }

  handleSidebar = (boolean, addNew = false) => {
    this.setState({ sidebar: boolean })
    if (addNew === true) this.setState({ currentData: null, addNew: true })
  }

  viewPdu = (e, row = false) => {
    if (row) {
      this.setState({ row: row });
    } else {
      this.setState({ row: "" });
    }

  }

  handleLocationChange = selectedLocation => {
    this.setState({ sel_loc_id: selectedLocation.value, selectedLocation: selectedLocation });
  };

  setPage = () => {
    this.setState({
      setPageToOne: !this.state.setPageToOne
    })
  }

  convertLocation = data => {
    var locationData = []
    locationData.push({ "label": "All", "value": "all" })
    data && data.forEach((value) => {
      locationData.push({ "label": value.location, "value": value.id })
    })
    return locationData
  }
  render() {
    let {
      currentData,
      sidebar,
      row,
      sel_loc_id,
      selectedLocation,
      setPageToOne
    } = this.state
    return (
      <div
        className={`data-list ${this.props.thumbView ? "thumb-view" : "list-view"
          }`}>
        <CustomHeader
          handleSidebar={this.handleSidebar}
          handleChangeLocation={this.handleLocationChange}
          convertLocation={this.convertLocation}
          locationData={this.props.dataList && this.props.dataList.allData}
          selectedLocation={selectedLocation}
        />
        <PduDetails
          pdu={row}
          backToPdu={this.viewPdu}
          sel_loc_id={sel_loc_id}
          setPageToOne={setPageToOne} />
        {sidebar &&
          <Fragment>
            <Sidebar
              show={sidebar}
              data={currentData}
              updateData={this.props.updateData}
              addData={this.props.addData}
              handleSidebar={this.handleSidebar}
              thumbView={this.props.thumbView}
              getInitialData={this.props.getInitialData}
              getPduData={this.props.getPDUData}
              dataParams={this.props.parsedFilter}
              addNew={this.state.addNew}
              locationData={this.props.dataList && this.props.dataList.allData}
              AddMessage={notifyBounce}
              UpdateMessage={notifyInfo}
              ErrorMessage={notifyError}
              inCompleteData={notifyWarning}
              samePduError={samePduError}
              sel_loc_id={sel_loc_id}
              setPage={this.setPage}
            />
            <div
              className={classnames("data-list-overlay", {
                show: sidebar
              })}
              onClick={() => this.handleSidebar(false, true)}
            />
          </Fragment>
        }
        <ToastContainer />
      </div>
    )
  }
}

const mapStateToProps = state => {
  return {
    pduList: state.pduList,
    dataList: state.dataList
  }
}

export default connect(mapStateToProps, {
  addPDUAction, getPDUData, getInitialData
})(PduListConfig)