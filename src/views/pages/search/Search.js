import React, { Component, Fragment } from "react";
import {
  Card, CardBody, CardHeader, CardTitle, FormGroup, Label, Input, Row, Col, Button,
  UncontrolledButtonDropdown,
  DropdownMenu,
  DropdownItem,
  DropdownToggle
} from "reactstrap";
import { Search, Info, Server, Trash, ChevronLeft, ChevronRight, Settings } from "react-feather";
import "../../../assets/scss/plugins/tables/_agGridStyleOverride.scss";
import "../../../assets/scss/pages/users.scss";
import Select from 'react-select';
import { connect } from "react-redux";
import { getSearchLocation } from "../../../redux/actions/data-list/";
import DataTable from "react-data-table-component";
import Tooltip from "@material-ui/core/Tooltip";
import "../../../assets/scss/pages/data-list.scss";
import Sidebar from './SearchSidebar';
import { SearchServer } from "../../../redux/actions/search";
import SearchInfo from "./SearchInfo";
import ServerDeleteModal from './ServerDeleteModal';
import { toast, ToastContainer, Zoom } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "../../../assets/scss/plugins/extensions/toastr.scss";
import { DeleteServer } from "../../../redux/actions/servers";
import "../../../assets/scss/plugins/extensions/react-paginate.scss";
import ReactPaginate from "react-paginate";
import Spinner from "../../../components/@vuexy/spinner/Loading-spinner";
import { getPaginateData } from '../../../redux/actions/pagination';

const actionstyle = {
  paddingTop: "0px",
  paddingBottom: "0px",
  paddingLeft: "0px",
  paddingRight: "0px"
}

const dropdownstyle = {
  left: "22px"
}

const ActionsComponent = props => {
  return (
    <div style={dropdownstyle} className="dropdown">
      <UncontrolledButtonDropdown>
        <DropdownToggle
          color="white"
          size="sm"
          className="btn-round dropdown-toggle"
          style={actionstyle}
        >
          <Settings
            size={15}
            style={{
              left: 0
            }}
          />
        </DropdownToggle>
        <DropdownMenu right>
          <DropdownItem tag="a" onClick={() => { return props.toggleModal(props.row) }}>
            <Info size={15} />
            <span className="align-middle ml-50">Info</span>
          </DropdownItem>
          <DropdownItem tag="a" onClick={() => { return props.currentData(props.row) }}>
            <Server size={15} />
            <span className="align-middle ml-50">Edit Server</span>
          </DropdownItem>
          <DropdownItem tag="a" onClick={() => { props.deleteRow(props.row) }}>
            <Trash size={15} />
            <span className="align-middle ml-50">Delete Server</span>
          </DropdownItem>
        </DropdownMenu>
      </UncontrolledButtonDropdown>
    </div>
  )
}

const notifyServerDeleted = () => toast.success("Server deleted Succesfully", { transition: Zoom })
const notifyWarning = () => toast.warning("Something went wrong.Please try again..", { transition: Zoom })
const notifyIncomplete = () => toast.warning("Please fill mandatory fields !.", { transition: Zoom })
const labelSameWarning = () => toast.warning("The label has already been taken.", { transition: Zoom })
const notifyInfo = () => toast.info("Server Updated Successfully", { transition: Zoom })
const valueWarning = () => toast.warning("Please enter a search value", { transition: Zoom })
const typeWarning = () => toast.warning("Please select a search type", { transition: Zoom })
const ipmiIpSameWarning = () => toast.warning("The Ipmi Ip has already been taken", { transition: Zoom })
const noLocationWarning = () => toast.warning("Location cannot be empty", { transition: Zoom })

class SearchView extends Component {
  state = {
    selectedOption: null,
    selectedServer: null,
    value: "",
    addNew: "",
    sidebar: false,
    infodata: "",
    columns: [
      {
        name: "Location",
        selector: "loc_name",
        minWidth: "7%",
        maxWidth: "7%",
        cell: row => (<span>{row.loc_name}</span>)
      },
      {
        name: "Switch",
        selector: "switch_label",
        minWidth: "6%",
        maxWidth: "6%",
        cell: row => (<span>{row.switch_label ? row.switch_label : "No Switch"}</span>)
      },
      {
        name: "Port",
        selector: "port_no",
        minWidth: "4%",
        maxWidth: "4%",
        cell: row => (<span style={{ color: "blue" }}>{row.port_no ? <Tooltip title={row.switch_label ? row.switch_label : "No Switch"} placement="top"><span className="cursor-pointer">{row.port_no}</span></Tooltip> : "N/A"}</span>)
      },
      {
        name: "ip",
        selector: "ip",
        minWidth: "7%",
        maxWidth: "7%",
        cell: row => (<span>{row.ip ? row.ip : "N/A"}</span>)
      },
      {
        name: "Server",
        selector: "server",
        minWidth: "32%",
        maxWidth: "32%",
        cell: row => (
          <span>
            {!row.server && <span style={{ color: "#D8000C" }}>N/A SERVER TYPE,</span>}
            {!row.cpu && <span style={{ color: "#D8000C" }}>N/A CPU,</span>}
            {!row.ram && <span style={{ color: "#D8000C" }}>N/A RAM,</span>}
            {!row.hdd && <span style={{ color: "#D8000C" }}>N/A HDD</span>}
            {row.server && row.server}
            {row.server && row.cpu && ', '}{row.cpu}
            {row.cpu && row.ram && ', '}{row.ram && `${row.ram}GB RAM`}
            {row.ram && row.hdd && ', '}{row.hdd && `${row.hdd}`}
          </span>
        )
      },
      {
        name: "Label",
        selector: "label",
        minWidth: "10%",
        maxWidth: "10%",
        cell: row => (<span>{row.label}</span>)
      },
      {
        name: "IPMI IP",
        selector: "ipmi_ip",
        minWidth: "8%",
        maxWidth: "8%",
        cell: row => (
          <span>
            {!row.ipmi_ip && <span style={{ color: "#D8000C" }}>NO IPMI IP!</span>}
            {row.ipmi_ip && <a href={`http://${row.ipmi_ip}/`} target="_blank" rel='noopener noreferrer'>{row.ipmi_ip}</a>}
          </span>
        )
      },
      {
        name: "PDU(s)",
        selector: "pdu_port",
        minWidth: "9%",
        maxWidth: "9%",
        cell: row => (
          <span>
            {!row.pdu_port && <span style={{ color: "#D8000C" }}>NO PORTS!</span>}
            {row.pdu_port}
          </span>
        )
      },
      {
        name: "Info",
        selector: "server_info",
        minWidth: "7%",
        maxWidth: "7%",
        cell: row => (<span>{row.server_info}</span>)
      },
      {
        name: "Status",
        selector: "status",
        minWidth: "5%",
        maxWidth: "5%",
        cell: row => (<span>{row.status}</span>)
      },
      {
        name: "Actions",
        minWidth: "5%",
        maxWidth: "5%",
        cell: row => (
          <ActionsComponent
            row={row}
            toggleModal={this.handleinfo}
            currentData={this.handleCurrentData}
            deleteRow={this.handleDelete}
          />
        )
      },
    ],
    typeSearchedColumn: [
      {
        name: "Location",
        selector: "loc_name",
        minWidth: "8%",
        maxWidth: "8%",
        cell: row => (<span>{row.loc_name}</span>)
      },
      {
        name: "Switch",
        selector: "switch_label",
        minWidth: "6%",
        maxWidth: "6%",
        cell: row => (<span>{row.switch_label ? row.switch_label : "No Switch"}</span>)
      },
      {
        name: "Port",
        selector: "port_no",
        minWidth: "4%",
        maxWidth: "4%",
        cell: row => (<span style={{ color: "blue" }}>{row.port_no ? <Tooltip title={row.switch_label ? row.switch_label : "No Switch"} placement="top"><span className="cursor-pointer">{row.port_no}</span></Tooltip> : "N/A"}</span>)
      },
      {
        name: "ip",
        selector: "ip",
        minWidth: "7%",
        maxWidth: "7%",
        cell: row => (<span>{row.ip ? row.ip : "N/A"}</span>)
      },
      {
        name: "Vlan",
        selector: "vlan",
        minWidth: "5%",
        maxWidth: "5%",
        cell: row => (<span>{row.vlan ? row.vlan : "N/A"}</span>)
      },
      {
        name: "Server",
        selector: "server",
        minWidth: "25%",
        maxWidth: "25%",
        cell: row => (
          <span>
            {!row.server && <span style={{ color: "#D8000C" }}>N/A SERVER TYPE,</span>}
            {!row.cpu && <span style={{ color: "#D8000C" }}>N/A CPU,</span>}
            {!row.ram && <span style={{ color: "#D8000C" }}>N/A RAM,</span>}
            {!row.hdd && <span style={{ color: "#D8000C" }}>N/A HDD</span>}
            {row.server && row.server}
            {row.server && row.cpu && ', '}{row.cpu}
            {row.cpu && row.ram && ', '}{row.ram && `${row.ram}GB RAM`}
            {row.ram && row.hdd && ', '}{row.hdd && `${row.hdd}`}
          </span>
        )
      },
      {
        name: "Label",
        selector: "label",
        minWidth: "9%",
        maxWidth: "9%",
        cell: row => (<span>{row.label}</span>)
      },
      {
        name: "IPMI IP",
        selector: "ipmi_ip",
        minWidth: "8%",
        maxWidth: "8%",
        cell: row => (
          <span>
            {!row.ipmi_ip && <span style={{ color: "#D8000C" }}>NO IPMI IP!</span>}
            {row.ipmi_ip && <a href={`http://${row.ipmi_ip}/`} target="_blank" rel='noopener noreferrer'>{row.ipmi_ip}</a>}
          </span>
        )
      },
      {
        name: "PDU(s)",
        selector: "pdu_port",
        minWidth: "8%",
        maxWidth: "8%",
        cell: row => (
          <span>
            {!row.pdu_port && <span style={{ color: "#D8000C" }}>NO PORTS!</span>}
            {row.pdu_port}
          </span>
        )
      },
      {
        name: "Info",
        selector: "server_info",
        minWidth: "8%",
        maxWidth: "8%",
        cell: row => (<span>{row.server_info}</span>)
      },
      {
        name: "Status",
        selector: "status",
        minWidth: "5%",
        maxWidth: "5%",
        cell: row => (<span>{row.status}</span>)
      },
      {
        name: "Actions",
        minWidth: "5%",
        maxWidth: "5%",
        cell: row => (
          <ActionsComponent
            row={row}
            toggleModal={this.handleinfo}
            currentData={this.handleCurrentData}
            deleteRow={this.handleDelete}
          />
        )
      },
    ],
    serverObj: "",
    delType: "",
    toggleDeleteModal: false,
    pageNumber: 1,
    selectedType: "",
    isTypeSearch: false,
    perPageData: 30
  }
  info = React.createRef()

  componentDidMount() {
    this.props.getPaginateData().then(() => {
      if (this.props.paginateData && this.props.paginateData.perPageCount) {
        this.setState({ perPageData: this.props.paginateData.perPageCount })
      }
    });

    var user_role = localStorage.getItem("user_role")
    if (this.props.dataList && this.props.dataList.allData.length === 0) {
      this.props.getSearchLocation(true).then(() => {
        var defaultLocation = []
        var searchbody = {}
        if (user_role !== 'Remote') {
          defaultLocation.push({ "label": "All", "value": "all" })
          searchbody = { "loc_ids": "all", "servers_type": "all" }
        }
        else {
          if (this.props.dataList && this.props.dataList.allData && this.props.dataList.allData[0]) {
            defaultLocation.push({ "label": this.props.dataList.allData[0].location, "value": this.props.dataList.allData[0].id })
            searchbody = { "loc_ids": this.props.dataList.allData[0].id, "servers_type": "all" }
          }
        }
        const defaultServer = { "label": "All Servers", "value": "all" }
        localStorage.setItem('search_loc', JSON.stringify(defaultLocation));
        localStorage.setItem('search_server', JSON.stringify(defaultServer));
        localStorage.setItem('search_type', JSON.stringify(""));
        localStorage.setItem('search_value', JSON.stringify(""));
        this.setState({ selectedOption: defaultLocation })
        this.setState({ selectedServer: defaultServer })
        if (this.props.searchList && !this.props.searchList.searchServer) {
          this.props.SearchServer(searchbody, 1, true)
        }
      })
    }
    else if ((this.props.dataList && this.props.dataList.allData.length !== 0) && (this.props.searchList && !this.props.searchList.searchServer)) {
      var defaultLocation = []
      var searchbody = {}
      if (user_role !== 'Remote') {
        defaultLocation.push({ "label": "All", "value": "all" })
        searchbody = { "loc_ids": "all", "servers_type": "all" }
      }
      else {
        if (this.props.dataList && this.props.dataList.allData && this.props.dataList.allData[0]) {
          defaultLocation.push({ "label": this.props.dataList.allData[0].location, "value": this.props.dataList.allData[0].id })
          searchbody = { "loc_ids": this.props.dataList.allData[0].id, "servers_type": "all" }
        }
      }
      const defaultServer = { "label": "All Servers", "value": "all" }
      localStorage.setItem('search_loc', JSON.stringify(defaultLocation));
      localStorage.setItem('search_server', JSON.stringify(defaultServer));
      localStorage.setItem('search_type', JSON.stringify(""));
      localStorage.setItem('search_value', JSON.stringify(""));
      this.setState({ selectedOption: defaultLocation })
      this.setState({ selectedServer: defaultServer })
      if (this.props.searchList && !this.props.searchList.searchServer) {
        this.props.SearchServer(searchbody, 1, true)
      }
    }
    else {
      var location = JSON.parse(localStorage.getItem("search_loc"));
      var server = JSON.parse(localStorage.getItem("search_server"));
      var type = JSON.parse(localStorage.getItem("search_type"));
      var value = JSON.parse(localStorage.getItem("search_value"));
      this.setState({ selectedOption: location })
      this.setState({ selectedServer: server })
      if (type !== null) {
        this.setState({ selectedType: type })
      }
      if (value !== null) {
        this.setState({ value: value })
      }
    }

  }


  handleChange = selectedOption => {
    this.setState({ selectedOption });
    localStorage.setItem('search_loc', JSON.stringify(selectedOption));
  };
  handleChangeServer = selectedServer => {
    this.setState({ selectedServer })
    localStorage.setItem('search_server', JSON.stringify(selectedServer));
  }
  handleChangeType = (selectedType) => {
    if (selectedType && selectedType.value) {
      this.setState({ selectedType: selectedType })
      localStorage.setItem('search_type', JSON.stringify(selectedType));
    } else {
      this.setState({ selectedType: selectedType, value: "" })
      localStorage.setItem('search_type', JSON.stringify(selectedType));
    }

  }
  handleinfo = data => {
    this.setState({ infodata: data })
    this.setState(() => this.info.current.toggleModal());
  }
  convertLocation = data => {
    var user_role = localStorage.getItem("user_role")
    var locationData = []
    if (user_role !== 'Remote') {
      locationData = [{ "label": "All", "value": "all" }]
    }
    data.forEach((value) => {
      locationData.push({ "label": value.location, "value": value.id })
    })
    return locationData
  }

  handleCurrentData = obj => {
    this.setState({ currentData: obj })
    this.handleSidebar(true)
  }

  handleSidebar = (boolean, addNew = false) => {
    this.setState({ sidebar: boolean })
    if (addNew === true) this.setState({ currentData: null, addNew: true })
  }
  handleDelete = row => {
    this.setState({ serverObj: row, delType: "server", toggleDeleteModal: !this.state.toggleDeleteModal });

  }

  closeModal = () => {
    this.setState({ toggleDeleteModal: false })
    const searchbody = { "loc_ids": "all", "servers_type": "all" }
    this.props.SearchServer(searchbody, 1, true)
  }
  Search() {
    var loc_id_values = ""
    var location_ids = []
    var selected_type = ""
    var sel_value = ""
    if (this.state.selectedOption && this.state.selectedOption.length > 0) {
      if (this.state.selectedOption && this.state.selectedOption.length > 0) {
        this.state.selectedOption.forEach((value) => {
          location_ids.push(value.value)
        })
        loc_id_values = location_ids.toString()
      } else {
        loc_id_values = "all"
      }
      if (this.state.selectedType && this.state.selectedType.value) {
        selected_type = this.state.selectedType.value
        sel_value = this.state.value.trim()

      }
      const searchbody = { "loc_ids": loc_id_values, "servers_type": this.state.selectedServer.value, "type": selected_type, "value": sel_value }
      localStorage.setItem('search_value', JSON.stringify(sel_value));
      if ((this.state.selectedType && this.state.selectedType.value) || this.state.value.trim()) {
        if (this.state.selectedType.value && this.state.value.trim()) {
          !this.state.isTypeSearch && this.setState({ isTypeSearch: true })
          this.props.SearchServer(searchbody, 1, true)

        } else {
          !this.state.selectedType.value && typeWarning()
          !this.state.value.trim() && valueWarning()
        }
      } else {
        this.state.isTypeSearch && this.setState({ isTypeSearch: false })
        this.props.SearchServer(searchbody, 1, true)
      }
    } else {
      noLocationWarning()
    }
  }

  onSearchPageChange = (currentPage) => {
    let page_number = currentPage.selected + 1
    var loc_id_values = ""
    var location_ids = []
    var selected_type = ""
    var sel_value = ""
    if (this.state.selectedOption && this.state.selectedOption.length > 0) {
      this.state.selectedOption.forEach((value) => {
        location_ids.push(value.value)
      })
      loc_id_values = location_ids.toString()
    } else {
      loc_id_values = "all"
    }
    if (this.state.selectedType && this.state.selectedType.value) {
      selected_type = this.state.selectedType.value
      sel_value = this.state.value.trim()
      !this.state.isTypeSearch && this.setState({ isTypeSearch: false })
    } else {
      this.state.isTypeSearch && this.setState({ isTypeSearch: false })
    }
    const searchbody = { "loc_ids": loc_id_values, "servers_type": this.state.selectedServer.value, "type": selected_type, "value": sel_value }
    this.setState({ pageNumber: page_number })
    this.props.SearchServer(searchbody, page_number, true)

  }

  countToatalPages = (totalData) => {
    if (parseInt(totalData)) {
      var pageCount = Math.ceil(parseInt(totalData) / this.state.perPageData);
      return pageCount;
    }
  }

  // Search on "Enter" key 
  handleSearchKeyDown = (e) => {
    if (e.keyCode === 13) {
      e.preventDefault()
      this.Search()
    }

  }

  render() {

    const { selectedOption, selectedServer, value, sidebar, currentData, columns, pageNumber, selectedType, isTypeSearch, typeSearchedColumn } = this.state
    const serverOptions = [
      { "label": "All Servers", "value": "all" },
      { "label": "Disconnected Servers", "value": "disconnected" },
      { "label": "Free Servers", "value": "free" },
      { "label": "Online Servers", "value": "online" },
      { "label": "Reserved Servers", "value": "reserved" },
      { "label": "Moving Servers", "value": "moving" }

    ]
    const cardheader = {
      paddingTop: "10px",
      paddingBottom: "10px"
    }
    const cardbody = {
      paddingTop: "0px",
      paddingBottom: "15px"
    }
    const tablebody = {
      paddingTop: "0px",
      paddingLeft: "0px",
      paddingRight: "0px",
      paddingBottom: "0px"
    }
    const selectstyles = {
      option: (provided, state) => ({
        ...provided,
        fontSize: 12,
      }),
    }
    const buttonstyle = {
      paddingTop: "11px",
      paddingBottom: "11px",
      marginTop: "18px"
    }
    const searchOptions = [
      { label: "None", value: "" },
      { label: "IP", value: "ports.ip" },
      { label: "Server", value: "server" },
      { label: "Label", value: "servers.label" },
      { label: "IPMI IP", value: "ipmi_ip" },
      { label: "CPU", value: "cpu" },
      { label: "HDD/SSDs", value: "hdd" },
    ]
    return (
      <Fragment>
        <div className={`server-list ${this.props.thumbView ? "thumb-view" : "list-view"
          }`}>
          {(this.props.dataList && this.props.dataList.isLoading) ? (
            <Spinner color="primary" className="reload-spinner" />
          ) : (
              <Row>
                <Col sm="12">
                  <Card>
                    <CardHeader style={cardheader}>
                      <CardTitle>Filters</CardTitle>
                    </CardHeader>
                    <CardBody style={cardbody}>
                      <Row>
                        <Col lg="3" md="6" sm="12">
                          <FormGroup className="mb-0">
                            <Label for="tech_location">Locations<span style={{ color: "red" }}>*</span></Label>
                            <Select
                              value={selectedOption}
                              onChange={this.handleChange}
                              options={this.convertLocation(this.props.dataList && this.props.dataList.allData)}
                              isMulti={true}
                              isSearchable={true}
                            />
                          </FormGroup>
                        </Col>
                        <Col lg="2" md="6" sm="12">
                          <FormGroup className="mb-0">
                            <Label for="exampleSelect">Server Status<span style={{ color: "red" }}>*</span></Label>
                            <Select
                              value={selectedServer}
                              onChange={this.handleChangeServer}
                              options={serverOptions}
                              placeholder="Select"
                              isSearchable={true}
                              styles={selectstyles}
                            />
                          </FormGroup>
                        </Col>
                        <Col lg="2" md="6" sm="12">
                          <FormGroup className="mb-0">
                            <Label for="searchType">Type</Label>
                            <Select
                              value={selectedType}
                              onChange={this.handleChangeType}
                              options={searchOptions}
                              placeholder="Select"
                              isSearchable={true}
                              styles={selectstyles}
                            />
                          </FormGroup>
                        </Col>
                        <Col lg="3" md="6" sm="12">
                          <FormGroup className="mb-0">
                            <Label for="value">Value</Label>
                            <Input
                              type="text"
                              id="value"
                              value={value}
                              onChange={e => this.setState({ value: e.target.value })}
                              onKeyDown={this.handleSearchKeyDown}
                            />
                          </FormGroup>
                        </Col>
                        <Col lg="2" md="6" sm="12">
                          <Button
                            className=""
                            style={buttonstyle}
                            color="primary"
                            onClick={() => this.Search()}
                            outline>
                            <Search size={15} style={{ marginRight: "5px" }} />
                            <span className="align-middle">Search</span>
                          </Button>
                        </Col>
                      </Row>
                    </CardBody>
                  </Card>
                </Col>
              </Row>
            )}
          {(this.props.searchList && this.props.searchList.isLoading) ? (
            <Spinner color="primary" className="reload-spinner" />
          ) : (
              <Row>
                <Col sm="12">
                  <Card>
                    <CardBody style={tablebody}>

                      <DataTable style={{ minHeight: "150px" }}
                        data={this.props.searchList && this.props.searchList.searchServer && this.props.searchList.searchServer.data && this.props.searchList.searchServer.data.data ? this.props.searchList.searchServer.data.data : []}
                        columns={isTypeSearch ? typeSearchedColumn : columns}
                        noHeader
                      />
                      <ReactPaginate
                        previousLabel={<ChevronLeft size={15} />}
                        nextLabel={<ChevronRight size={15} />}
                        breakLabel={"..."}
                        breakClassName={"break-me"}
                        pageCount={this.props.searchList && this.props.searchList.searchServer ? this.props.searchList.searchServer.data && this.props.searchList.searchServer.data.total && this.countToatalPages(this.props.searchList.searchServer.data.total) : 0}
                        marginPagesDisplayed={2}
                        pageRangeDisplayed={3}
                        containerClassName={
                          "vx-pagination icon-pagination pagination-end mt-2"
                        }
                        activeClassName={"active"}
                        onPageChange={this.onSearchPageChange}
                        forcePage={pageNumber - 1}
                      />
                    </CardBody>
                  </Card>
                </Col>
              </Row>
            )}
          {sidebar &&
            <Sidebar
              show={sidebar}
              data={currentData}
              handleSidebar={this.handleSidebar}
              addNew={this.state.addNew}
              locationData={this.props.dataList && this.props.dataList.allData}
              UpdateMessage={notifyInfo}
              ErrorMessage={notifyWarning}
              inCompleteData={notifyIncomplete}
              labelSameWarning={labelSameWarning}
              ipmiIpSameWarning={ipmiIpSameWarning}
              pageNumber={pageNumber}
              selectedOption={selectedOption}
              selectedServer={selectedServer}
              value={value}
              SearchServer={this.props.SearchServer}

            />
          }
          <SearchInfo ref={this.info} data={this.state.infodata} {...this.props} />
          {this.state.toggleDeleteModal &&
            <ServerDeleteModal
              closeModal={this.closeModal}
              toggleDeleteModal={this.state.toggleDeleteModal}
              serverObj={this.state.serverObj}
              delType={this.state.delType}
              notifyServerDeleted={notifyServerDeleted}
              notifyError={notifyWarning}
              DeleteServer={this.props.DeleteServer}
              serverList={this.props.serverList}
              SearchServer={SearchServer}
            />
          }
          <ToastContainer />
        </div>
      </Fragment>
    )
  }
}
const mapStateToProps = state => {
  return {
    dataList: state.dataList,
    searchList: state.SearchList,
    serverList: state.ServerList,
    paginateData: state.paginateData
  }
}
export default connect(mapStateToProps, {
  getSearchLocation,
  SearchServer,
  DeleteServer,
  getPaginateData
})(SearchView)