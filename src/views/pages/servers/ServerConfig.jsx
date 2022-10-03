import React, { Component, Fragment } from 'react';
import {
    Form, FormGroup, Label, Row, Col, Button,
    Card, CardBody, CardHeader, CardTitle, CardFooter,
    UncontrolledButtonDropdown,
    DropdownMenu,
    DropdownItem,
    DropdownToggle,
    Input, Table
} from 'reactstrap';
import { connect } from "react-redux";
import { getInitialData } from "../../../redux/actions/data-list";
import {
    GetLocationServer, GetAllServerDetails, GetLocationPdus, getServerData, fetchLocationLog,
    DeleteServer, getFDAServers, getInfoVpsDetails, DeletePort, updateInfoVpsData, getChildSwitches,
    UpdatePort,addPasswordLog
} from "../../../redux/actions/servers";
import Select from 'react-select';
import DataTable from "react-data-table-component";
import { Edit, Trash, Info, Eye, Server, XSquare, ChevronLeft, ChevronRight, Settings, Search, File, Check, X, EyeOff } from "react-feather";
import Sidebar from './ServerSidebar';
import PortSidebar from './PortSidebar';
import classnames from "classnames";
import "../../../assets/scss/pages/data-list.scss";
import { toast, ToastContainer, Zoom } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "../../../assets/scss/plugins/extensions/toastr.scss";
import ServerInfoModal from './ServerInfo';
import PasswordInfoModal from './PasswordInfo';
import ServerDeleteModal from './DeleteServerModal';
import Serverlogconfig from './ServerLogConfig';
import InfoEditor from './InfoEditor';
import LocationLogView from './locationLogView';
import Spinner from "../../../components/@vuexy/spinner/Loading-spinner";
import ReactPaginate from "react-paginate";
import SearchModal from './SearchModal';
import { getPaginateData } from '../../../redux/actions/pagination';
import Tooltip from "@material-ui/core/Tooltip";
import { objectOf } from 'prop-types';

const actionstyle = {
    paddingTop: "0px",
    paddingBottom: "0px",
    paddingLeft: "0px",
    paddingRight: "0px"
}

const dropdownstyle = {
    left: "22px"
}


var subTabArray = [
    // "Add Port",
    "FREE switch_short SERVERS",
    "DISCONNECTED switch_short SERVERS",
    "ALL switch_short SERVERS",
    "switch_short INFO"
]
const selectstyles = {
    option: (provided, state) => ({
        ...provided,
        fontSize: 12,
    }),
}

const freeStyle = {
    backgroundColor: '#90ee90',
    color: '#4F8A10 !important',
    padding: '0px'
}

const reservedStyle = {
    backgroundColor: '#FEEFB3',
    color: '#9F6000 !important',
    padding: '0px'
}



const CustomHeader = props => {
    return (
        <div>
            <Form>
                <Row>
                        <Col className="mb-1">
                            {props.showMain &&
                            <div className="data-list-header d-flex justify-content-between flex-wrap" style={{ float: "right", marginLeft:"10px" }}>
                                <div className="actions-left d-flex flex-wrap">
                                    <Button
                                        className="add-new-btn"
                                        color="primary"
                                        onClick={() => props.handlePortSidebar(true, true)}
                                        outline>
                                        {/* <Plus size={15} /> */}
                                        <span className="align-middle">Add Port</span>
                                    </Button>
                                </div>
                            </div>
                            }
                            {props.showServers &&
                            <div className="data-list-header d-flex justify-content-between flex-wrap" style={{ float: "right" }}>
                                <div className="actions-left d-flex flex-wrap">
                                    <Button
                                        className="add-new-btn"
                                        color="primary"
                                        onClick={() => props.handleSidebar(true, true)}
                                        outline>
                                        {/* <Plus size={15} /> */}
                                        <span className="align-middle">Add New Server</span>
                                    </Button>
                                </div>
                            </div>
                            }

                        </Col>
                </Row>
                <Row>
                    <Col sm="4">
                        <FormGroup>
                            <Label for="exampleSelect">Locations</Label>
                            <Select
                                value={props.selectedLocation}
                                onChange={props.handleChangeLocation}
                                options={props.convertLocation(props.locationData)}
                                placeholder="Select a Location"
                                isSearchable={true}
                            />
                        </FormGroup>
                    </Col>
                    {props.showServers &&
                        <Col sm="4">
                            <FormGroup>
                                <Label for="exampleSelect">Switches</Label>
                                <Select
                                    value={props.selectedServer}
                                    onChange={props.handleChangeServer}
                                    options={props.convertServers(props.serverData)}
                                    placeholder="Select a Switch"
                                    isSearchable={true}
                                    styles={selectstyles}
                                />
                            </FormGroup>
                        </Col>
                    }
                    {props.showMain &&
                        <Col sm="4">
                            <FormGroup>
                                <Label for="exampleSelect">Others</Label>
                                <Select
                                    value={props.selectedTab}
                                    onChange={props.handleChangeTab}
                                    options={props.convertTabs(props.tabData)}
                                    placeholder="Select"
                                    isSearchable={true}
                                    styles={selectstyles}
                                />
                            </FormGroup>
                        </Col>
                    }





                    {false &&
                        <Col sm="3">
                            <div className="data-list-header d-flex justify-content-between flex-wrap" style={{ float: "right" }}>
                                <div className="actions-left d-flex flex-wrap">
                                    <Button
                                        className="add-new-btn"
                                        color="primary"
                                        onClick={() => props.handleSearchModal(true, true)}
                                        outline>
                                        <Search size={15} />
                                        <span className="align-middle">Search</span>
                                    </Button>
                                </div>
                            </div>

                        </Col>
                    }
                </Row>
            </Form>

        </div>
    )
}

const PasswordComponent = props =>{
    return(
        <span>
        <b> **********</b>
        <Tooltip title="Show Password" placement="right">
        <Eye tag="a" className="ml-1" size={15} style={{cursor:'pointer'}} 
        onClick={() => {return props.PtoggleModal(props.row); } }/>
        </Tooltip>
         </span>
    )
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
                    {(props.row.server_id || props.row.id) &&
                        <DropdownItem tag="a" onClick={() => { return props.currentData(props.row) }}>
                            <Server size={15} />
                            <span className="align-middle ml-50">Edit Server</span>
                        </DropdownItem>
                    }
                    {!props.changeColumns &&
                        <DropdownItem tag="a" onClick={() => { return props.portcurrentData(props.row) }}>
                            <Edit size={15} />
                            <span className="align-middle ml-50">Edit Port</span>
                        </DropdownItem>
                    }
                    {(props.row.server_id || props.row.id) &&
                        <DropdownItem tag="a" onClick={() => { props.deleteRow(props.row) }}>
                            <Trash size={15} />
                            <span className="align-middle ml-50">Delete Server</span>
                        </DropdownItem>
                    }
                    {!props.changeColumns &&
                        <DropdownItem tag="a" onClick={() => { return props.deletePort(props.row) }}>
                            <XSquare size={15} />
                            <span className="align-middle ml-50">Delete Port</span>
                        </DropdownItem>
                    }
                </DropdownMenu>
            </UncontrolledButtonDropdown>
        </div>

    )
}


const isJson = (str) => {
    try {
        JSON.parse(str);
    } catch (e) {
        return false;
    }
    return true;
}
const InfoData = props => {
    if (props.row && props.row.info && isJson(props.row.info)) {
        return (
            <Fragment>
                {JSON.parse(props.row.info).blocks && JSON.parse(props.row.info).blocks.map((value, index) =>
                    <Fragment key={index}>{value.text}</Fragment>
                )}
            </Fragment>
        )
    } else {
        return <Fragment>N/A</Fragment>
    }
}

const notifyInfo = () => toast.info("Server Updated Successfully", { transition: Zoom })
const notifyBounce = () => toast.success("Server Added Successfully", { transition: Zoom })
const notifyWarning = () => toast.warning("Something went wrong.Please try again..", { transition: Zoom })
const notifyIncomplete = () => toast.warning("Please fill mandatory fields !.", { transition: Zoom })
const notifyPortInfo = () => toast.info("Server Port Updated Successfully", { transition: Zoom })
const notifyPortBounce = () => toast.success("Server Port Added Successfully", { transition: Zoom })
const notifyPortDeleted = () => toast.success("Server Port deleted Succesfully", { transition: Zoom })
const notifyServerDeleted = () => toast.success("Server deleted Succesfully", { transition: Zoom })
const notifyInfoUpdated = () => toast.info("Info Updated Successfully", { transition: Zoom })
const portInUseWarning = () => toast.warning("Port Number already in use. Please select another", { transition: Zoom })
const PduSameWarning = () => toast.warning("PDU ports should be different!..", { transition: Zoom })
const labelSameWarning = () => toast.warning("The label has already been taken.", { transition: Zoom })
const ipmiIpSameWarning = () => toast.warning("The Ipmi Ip has already been taken", { transition: Zoom })
const portNoWarning = () => toast.warning("Port Number Should Not Be Empty", { transition: Zoom })
const serviceIdWarning = () => toast.warning("The service id field is required when status is online.", { transition: Zoom })


var test = false
var colocode = [    {"name": "lightblue", "color": "#add8e6"},
                    {"name":"lightcyan", "color" : "#e0ffff"},
                    {"name":"paperblue", "color" : "#edf1fe"},
                    {"name":"tidalmist", "color" : "#e5e9e1"},
                    {"name":"softlavendar", "color" : "#f6e5f6"},                
                    {"name":"offwhite", "color" : "#ffffe4"},                
                    {"name":"lightgrey", "color" : "#d3d3d3"},            
                    {"name":"lightyellow", "color" : "#ffffe0"},
                    {"name":"darkyellow", "color" : "#ffec89"},
                    {"name":"soapblue", "color" : "#cec8ef"},
                    // {"name":"lightpink", "color" : "#ffb6c1"},
                    // {"name":"lightgreen", "color" : "#90ee90"},
                ]
class ServerConfig extends Component {

    state = {
        editCell: false,
        modal: false,
        logmodal: false,
        selectedPort: [],
        dimensions: null,
        selectedLocation: "",
        showServers: false,
        multipleband : [],
        updatesuccess: false,
        passmodalstatus : false,
        columns: [

            {
                name: "PORT",
                selector: "port_no",
                minWidth: "4%",
                maxWidth: "4%",
                left: "5px",
                cell: row => (<span>{row.port_no}</span>),

            },
            {
                name: "BW",
                selector: "bw",
                minWidth: "3%",
                maxWidth: "3%",
                cell: row => (<span>{row.bw}</span>)
            },
            {
                name: "VLAN",
                selector: "vlan",
                minWidth: "4%",
                maxWidth: "4%",
                cell: row => (<span>{row.vlan}</span>)
            },
            {
                name: "INFO",
                selector: "server_info",
                minWidth: "10%",
                maxWidth: "10%",
                cell: row => (
                    <span>{row.server_info && row.server_info} {row.server_info && row.port_info && '/'} {row.port_info && `${row.port_info}`}</span>
                )
            },
            {
                name: "IP",
                selector: "ip",
                minWidth: "6%",
                maxWidth: "6%",
                cell: row => (

                    // <span  data-tag="allowRowEvents">{row.ip}</span>
                    <span>{row.ip}</span>

                )
            },
            {
                name: "IPMI IP",
                selector: "ipmi_ip",
                minWidth: "6%",
                maxWidth: "6%",
                cell: row => (<a href={`http://${row.ipmi_ip}/`} target="_blank" rel='noopener noreferrer'>{row.ipmi_ip}</a>)
            },
            {
                name: "	IPMI PWD",
                selector: "ipmi_pwd",
                minWidth: "9%",
                maxWidth: "9%",
                cell: row => (<span>
                    {row.ipmi_pwd == "" || row.ipmi_pwd == null ? "" :
                        <PasswordComponent
                             row={row}
                             PtoggleModal={this.PtoggleModal}
                             currentData={this.handleCurrentData}
                             portcurrentData={this.handlePortCurrentData}/>}
                             </span>),
                omit: localStorage.getItem("user_role") && (localStorage.getItem("user_role") === "Sales" || localStorage.getItem("user_role") === "Senior Sales") ? true : false
            },
            {
                name: "LABEL",
                selector: "label",
                minWidth: "12%",
                maxWidth: "12%",
                cell: row => (<span>{row.label}</span>)
            },
            {
                name: "SERVER",
                selector: "server",
                minWidth: "23%",
                maxWidth: "23%",
                cell: row => (
                    <span>{row.cpu && row.cpu}{row.cpu && row.ram && ', '}{row.ram && `${row.ram} RAM`}{row.ram && row.hdd && ', '}{row.hdd && `${row.hdd}`}</span>
                )
            },
            {
                name: "PDU(S)",
                selector: "pdu_port",
                minWidth: "7%",
                maxWidth: "7%",
                cell: row => (<span>{row.pdu_port}</span>)
            },
            {
                name: "SID",
                selector: "service_id",
                minWidth: localStorage.getItem("user_role") && (localStorage.getItem("user_role") === "Sales" || localStorage.getItem("user_role") === "Senior Sales") ? "7%" : "4%",
                maxWidth: localStorage.getItem("user_role") && (localStorage.getItem("user_role") === "Sales" || localStorage.getItem("user_role") === "Senior Sales") ? "7%" : "4%",
                cell: row => (<span>{row.service_id === "nill" ? "N/A" : <a href={`https://crm.fdcservers.net/admin/clientmgr/client_service_details.php?packid=${row.service_id}`} target="_blank" rel='noopener noreferrer'>{row.service_id}</a>}</span>)
            },
            {
                name: "CRM STATUS",
                selector: "crm_status",
                minWidth: localStorage.getItem("user_role") && (localStorage.getItem("user_role") === "Sales" || localStorage.getItem("user_role") === "Senior Sales") ? "6%" : "4%",
                maxWidth: localStorage.getItem("user_role") && (localStorage.getItem("user_role") === "Sales" || localStorage.getItem("user_role") === "Senior Sales") ? "6%" : "4%",
                cell: row => (
                    <span>{row.service_id === "nill" ? "SID N/A" : <a href={`https://docsdev.fdcservers.net/olddoc/includes/crm_status.php?sid=${row.service_id}`} target="_blank" rel='noopener noreferrer'>CHECK</a>}
                    </span>

                )
            },
            {
                name: "STATUS",
                selector: "status",
                minWidth: localStorage.getItem("user_role") && (localStorage.getItem("user_role") === "Sales" || localStorage.getItem("user_role") === "Senior Sales") ? "6%" : "4%",
                maxWidth: localStorage.getItem("user_role") && (localStorage.getItem("user_role") === "Sales" || localStorage.getItem("user_role") === "Senior Sales") ? "6%" : "4%",
                cell: row => (row.status ? row.status : "no server"),
                conditionalCellStyles: [
                    {
                        when: row => row.status === "free",
                        style: {
                            backgroundColor: '#90ee90',
                            color: '#4F8A10 !important',
                        },
                    },
                    {
                        when: row => row.status === "reserved",
                        style: {
                            backgroundColor: '#FEEFB3',
                            color: '#9F6000 !important',
                        },
                    },
                ]
            },

            {
                name: "Actions",
                minWidth: "4%",
                maxWidth: "4%",
                cell: row => (
                    <ActionsComponent
                        row={row}
                        toggleModal={this.toggleModal}
                        currentData={this.handleCurrentData}
                        portcurrentData={this.handlePortCurrentData}
                        deleteRow={this.handleDelete}
                        deletePort={this.handleDeletePort}

                    />
                )
            }
        ],
        columnsFDA: [

            {
                name: "LABEL",
                selector: "label",
                minWidth: "17%",
                maxWidth: "17%",
                cell: row => (<span>{row.label}</span>)
            },
            {
                name: "INFO",
                selector: "server_info",
                minWidth: "10%",
                maxWidth: "10%",
                cell: row => (<span>{row.server_info && row.server_info}</span>)
            },
            {
                name: "IPMI IP",
                selector: "ipmi_ip",
                minWidth: "10%",
                maxWidth: "10%",
                cell: row => (<a href={`http://${row.ipmi_ip}/`} target="_blank" rel='noopener noreferrer'>{row.ipmi_ip}</a>)
            },
            {
                name: "	IPMI PWD",
                selector: "ipmi_pwd",
                minWidth: "13%",
                maxWidth: "13%",
                cell: row => (<span>
                    {row.ipmi_pwd == "" || row.ipmi_pwd == null ? "" :
                        <PasswordComponent
                             row={row}
                             PtoggleModal={this.PtoggleModal}
                             currentData={this.handleCurrentData}
                             portcurrentData={this.handlePortCurrentData}/>}
                             </span>),
                omit: localStorage.getItem("user_role") && (localStorage.getItem("user_role") === "Sales" || localStorage.getItem("user_role") === "Senior Sales") ? true : false
            },
            {
                name: "SERVER",
                selector: "server",
                minWidth: "27%",
                maxWidth: "27%",
                cell: row => (
                    <span>{row.cpu && row.cpu}{row.cpu && row.ram && ', '}{row.ram && `${row.ram} RAM`}{row.ram && row.hdd && ', '}{row.hdd && `${row.hdd}`}</span>
                )
            },
            {
                name: "PDU(S)",
                selector: "pdu_port",
                minWidth: "10%",
                maxWidth: "10%",
                cell: row => (<span>{row.pdu_port}</span>)
            },
            {
                name: "STATUS",
                selector: "status",
                minWidth: "8%",
                maxWidth: "8%",
                cell: row => (<span>{row.status}</span>)
            },
            {
                name: "Actions",
                minWidth: "5%",
                maxWidth: "5%",
                cell: row => (
                    <ActionsComponent
                        row={row}
                        toggleModal={this.toggleModal}
                        currentData={this.handleCurrentData}
                        portcurrentData={this.handlePortCurrentData}
                        deleteRow={this.handleDelete}
                        changeColumns={this.state.changeColumns}
                    />
                )
            }
        ],
        infoColumns: [
            {
                name: "INFO",
                selector: "info",
                minWidth: "fit-content",
                maxWidth: "fit-content",
                minHeight: "fit-content",
                maxHeight: "fit-content",
                left: "100%",
                cell: row => (
                    <InfoData row={row} />
                )
            },
        ],
        addNew: "",
        sidebar: false,
        portsidebar: false,
        currentData: null,
        showMain: false,
        selectedServer: "",
        selectedTab: "",
        server: "",
        toggleServerList: false,
        selectedSWitchId: "",
        serverObj: "",
        changeColumns: false,
        tab_selection: "",
        sale_selection: "",
        allServersColumns: false,
        showInfo: false,
        delType: "",
        showLocLog: false,
        toggleDeleteModal: false,
        toggleInfoEditor: false,
        toggleInfoModal: false,
        togglePassModal: false,
        toggleLogModal: false,
        pageNumber: 1,
        childSwitch: "",
        toggleSearchModal: false,
        perPageData: 30,
        cellToInput: false,
        cellType: "",
        rowIndex: "",
        portValue: "",
        runcolorcode:false,
        

    }
    child = React.createRef();
    editChild = React.createRef();
    logChild = React.createRef();


    toggleModal = obj => {
        this.setState({ selectedPort: obj, toggleInfoModal: !this.state.toggleInfoModal, togglePassModal: false  });
    }
    PtoggleModal = obj => {
        
        this.setState({ selectedPort: obj, toggleInfoModal: false, passmodalstatus:true,  togglePassModal: !this.state.togglePassModal,  });

            this.Updatepasslogdata(obj);
           
        
        
    }

    logtoggleModal = obj => {
        this.setState({ toggleLogModal: !this.state.toggleLogModal, toggleInfoModal: false,togglePassModal: false });
    }

    componentDidMount() {
        this.props.getPaginateData().then(() => {
            if (this.props.paginateData && this.props.paginateData.perPageCount) {
                this.setState({ perPageData: this.props.paginateData.perPageCount })
            }
        });
        if (this.props.serverList && !this.props.serverList.allServerDetails) {
            this.props.GetAllServerDetails();
        }
        var locObj = JSON.parse(localStorage.getItem('loc_data'));
        var switchObj = JSON.parse(localStorage.getItem('l_s'));
        var tabObj = JSON.parse(localStorage.getItem('tab'))
        if (locObj) {
            this.setState({ selectedLocation: locObj, selectedServer: "", showServers: true, showMain: false });
            this.props.GetLocationServer(locObj.value).then(()=> {this.colorcodeSetting()})

            if (switchObj) {
                !tabObj && this.props.serverList && !this.props.serverList.allData && this.props.getServerData(switchObj.value, true).then(()=> {this.colorcodeSetting()});
                this.props.serverList && !this.props.serverList.childSwitches && this.props.getChildSwitches(switchObj.value, true).then(()=> {this.colorcodeSetting()});
                this.setState({
                    server: switchObj, selectedServer: switchObj, selectedTab: { "label": switchObj.label, "value": switchObj.label },
                    showMain: true, toggleServerList: true, selectedSWitchId: switchObj.value, changeColumns: false, tab_selection: "", showInfo: false, showLocLog: false
                });

                if (tabObj) {
                    if (Number.isInteger(tabObj.value)) {
                        this.props.serverList && !this.props.serverList.allData && this.props.getServerData(tabObj.value, true).then(()=> {this.colorcodeSetting()})
                        this.setState({ toggleServerList: true, selectedTab: tabObj, showMain: true, changeColumns: false, tab_selection: "", showInfo: false, showLocLog: false })
                    } else {
                        if (tabObj.value.indexOf("FREE") !== -1) {
                            this.props.serverList && !this.props.serverList.allData && this.props.getFDAServers("free", locObj.value, true, this.state.pageNumber).then(()=> {this.colorcodeSetting()})
                            this.setState({ toggleServerList: false, selectedTab: tabObj, showMain: true, changeColumns: true, tab_selection: "free", allServersColumns: false, showInfo: false, showLocLog: false })
                        }
                        if (tabObj.value.indexOf("DISCONNECTED") !== -1) {
                            this.props.serverList && !this.props.serverList.allData && this.props.getFDAServers("disconnected", locObj.value, true, this.state.pageNumber).then(()=> {this.colorcodeSetting()})
                            this.setState({ toggleServerList: false, selectedTab: tabObj, showMain: true, changeColumns: true, tab_selection: "disconnected", allServersColumns: false, showInfo: false, showLocLog: false })
                        }
                        if (tabObj.value.indexOf("ALL") !== -1) {
                            this.props.serverList && !this.props.serverList.allData && this.props.getFDAServers("all", locObj.value, true, this.state.pageNumber).then(()=> {this.colorcodeSetting()})
                            this.setState({ toggleServerList: false, selectedTab: tabObj, showMain: true, changeColumns: true, tab_selection: "all", allServersColumns: true, showInfo: false, showLocLog: false })
                        }
                        if (tabObj.value.indexOf("INFO") !== -1) {
                            this.props.serverList && !this.props.serverList.allData && this.props.getInfoVpsDetails("info", locObj.value, true).then(()=> {this.colorcodeSetting()})
                            this.setState({ toggleServerList: false, selectedTab: tabObj, showMain: true, changeColumns: true, tab_selection: "info", showInfo: true })
                        }
                    }
                }
            }
        }

    }

    componentDidUpdate(prevProps, prevState) {
        
        
        var prevLocId = prevState.selectedLocation && prevState.selectedLocation.value
        var currLocId = this.state.selectedLocation && this.state.selectedLocation.value
        if (parseInt(prevLocId) !== parseInt(currLocId)) {
      
            if (currLocId) {
                this.props.serverList && !this.props.serverList.LocationServer && this.props.GetLocationServer(currLocId).then(()=> {this.colorcodeSetting()});
                this.props.serverList && !this.props.serverList.locationPdus && this.props.GetLocationPdus(currLocId);
            }
        }
        if ((prevState.allServersColumns !== this.state.allServersColumns) && this.state.allServersColumns && this.state.changeColumns) {
     
            let columnsFDA = [

                {
                    name: "LABEL",
                    selector: "label",
                    minWidth: "13%",
                    maxWidth: "13%",
                    cell: row => (<span>{row.label}</span>)
                },
                {
                    name: "PORT",
                    selector: "port_no",
                    minWidth: "19%",
                    maxWidth: "19%",
                    cell: row => (<span>{row.port_no}</span>)
                },
                {
                    name: "VLAN",
                    selector: "vlan",
                    minWidth: "5%",
                    maxWidth: "5%",
                    cell: row => (<span>{row.vlan}</span>)
                },
                {
                    name: "INFO",
                    selector: "server_info",
                    minWidth: "12%",
                    maxWidth: "12%",
                    cell: row => (<span>{row.server_info && row.server_info}</span>)
                },
                {
                    name: "IPMI IP",
                    selector: "ipmi_ip",
                    minWidth: "8%",
                    maxWidth: "8%",
                    cell: row => (<a href={`http://${row.ipmi_ip}/`} target="_blank" rel='noopener noreferrer'>{row.ipmi_ip}</a>)
                },
                {
                    name: "SERVER",
                    selector: "server",
                    minWidth: "28%",
                    maxWidth: "28%",
                    cell: row => (
                        <span>{row.cpu && row.cpu}{row.cpu && row.ram && ', '}{row.ram && `${row.ram} RAM`}{row.ram && row.hdd && ', '}{row.hdd && `${row.hdd}`}</span>
                    )
                },
                {
                    name: "STATUS",
                    selector: "status",
                    minWidth: "5%",
                    maxWidth: "5%",
                    cell: row => (<span>{row.status}</span>)
                },
                {
                    name: "SID",
                    selector: "service_id",
                    minWidth: "5%",
                    maxWidth: "5%",
                    cell: row => (<span>{row.service_id === "nill" ? "N/A" : <a href={`https://crm.fdcservers.net/admin/clientmgr/client_service_details.php?packid=${row.service_id}`} target="_blank" rel='noopener noreferrer'>{row.service_id}</a>}</span>)
                },
                {
                    name: "Actions",
                    minWidth: "5%",
                    maxWidth: "5%",
                    cell: row => (
                        <ActionsComponent
                            row={row}
                            toggleModal={this.toggleModal}
                            currentData={this.handleCurrentData}
                            portcurrentData={this.handlePortCurrentData}
                            deleteRow={this.handleDelete}
                            changeColumns={this.state.changeColumns}
                        />
                    )
                }
            ]
            this.setState({ columnsFDA })
        }
        if ((prevState.allServersColumns !== this.state.allServersColumns) && !this.state.allServersColumns && this.state.changeColumns) {
        
            let columnsFDA = [
                { name: "LABEL", selector: "label", minWidth: "17%", maxWidth: "17%", cell: row => (<span>{row.label}</span>) },
                { name: "INFO", selector: "info", minWidth: "10%", maxWidth: "10%", cell: row => (<span>{row.info}</span>) },
                { name: "IPMI IP", selector: "ipmi_ip", minWidth: "10%", maxWidth: "10%", cell: row => (<span>{row.ipmi_ip}</span>) },
                { name: "IPMI PWD", selector: "ipmi_pwd", minWidth: "13%", maxWidth: "13%", 
                cell: row => (<span>
                            {row.ipmi_pwd == "" || row.ipmi_pwd == null ? "" :
                                <PasswordComponent
                                     row={row}
                                     PtoggleModal={this.PtoggleModal}
                                     currentData={this.handleCurrentData}
                                     portcurrentData={this.handlePortCurrentData}/>}
                                     </span>), 
                omit: localStorage.getItem("user_role") && (localStorage.getItem("user_role") === "Sales" || localStorage.getItem("user_role") === "Senior Sales") ? true : false },
                { name: "SERVER", selector: "server", minWidth: "27%", maxWidth: "27%", cell: row => (<span>{row.server}</span>) },
                { name: "PDU(S)", selector: "pdu_port", minWidth: "10%", maxWidth: "10%", cell: row => (<span>{row.pdu_port}</span>) },
                { name: "STATUS", selector: "status", minWidth: "8%", maxWidth: "8%", cell: row => (<span>{row.status}</span>) },
                {
                    name: "Actions",
                    minWidth: "5%",
                    maxWidth: "5%",
                    cell: row => (
                        <ActionsComponent
                            row={row}
                            toggleModal={this.toggleModal}
                            currentData={this.handleCurrentData}
                            portcurrentData={this.handlePortCurrentData}
                            deleteRow={this.handleDelete}
                            changeColumns={this.state.changeColumns}
                        />
                    )
                }
            ]
            
            this.setState({ columnsFDA })
        }
       
        if( this.state.runcolorcode === false){
            this.colorcodeSetting()
        }  
        if ((this.props.serverList && this.props.serverList.PortUpdated) !== undefined){
            if (this.state.updatesuccess === true){
            
            setTimeout(() => { this.colorcodeSetting()}, 5000);
            
            this.setState({updatesuccess:false})
                
            }
        }

        

    }
  
   
    colorcodeSetting = () => {
                        // Setting Color Code
                        this.setState({runcolorcode: true})
                        if(this.props.serverList && this.props.serverList.allData && this.props.serverList.allData.data 
                            && this.props.serverList.allData.data.data){
                                let temp  = []
                                let newtemp = this.props.serverList.allData.data.data.filter((value) => value.vlan !== ""  )
                                for(let i=0; i<newtemp.length;i++){
                                    let tempvalue = newtemp.filter((value) => (value.vlan === newtemp[i].vlan) && (value.ip === newtemp[i].ip))
                                    if(tempvalue.length > 1){
                                        temp.push(tempvalue)
                                    }
                                }
                                var uniqueArray = [];
                                // uniqueArray.push(temp[0])
                                // for(let i = 1;i<temp.length;i++){
                                //     var a = JSON.stringify(temp[i])
                                //     for(let j=0;j<uniqueArray.length;j++){
                                //         var b = JSON.stringify(uniqueArray[j])
                                //         if(a !== b){
                                //             uniqueArray.push(temp[i])
                                //         }
                                //     }
                                // }
                                var temp1 = []
                                for(let i=0;i<temp.length;i++){
                                    temp1.push(JSON.stringify(temp[i]))
                                }

                                var temp2 = temp1.filter( function( item, index, inputArray ) {
                                    return inputArray.indexOf(item) == index;
                                });
                                for(let i=0;i<temp2.length;i++){
                                    uniqueArray.push(JSON.parse(temp2[i]))
                                }
                                var sameArray = []
                                if(uniqueArray.length>0){
                                    
                                    var color_index = 0
                                    for(let i=0; i<uniqueArray.length;i++){
                                        let newarray = uniqueArray[i]
                                        if(newarray !== undefined){
                                  
                                        for(let j=0;j<newarray.length;j++){
                                            let data = {"port" : newarray[j].port_no, "color": colocode[color_index].color}
                                       
                                            sameArray.push(data)
                                        }
                                        }
                                        color_index = color_index+1
                                    }
                                }
                                this.setState({multipleband : sameArray})
                
                        }
    }

    convertLocation = data => {
        var locationData = []
        data && data.forEach((value) => {
            locationData.push({ "label": value.location, "value": value.id })
        })
        return locationData
    }

    convertServers = data => {
        var serverData = []
        // if (!this.state.sidebar) {
        //     const addserver = { "label": "Add New Server", "value": "add_new_server" }
        //     serverData.push(addserver)
        // }
        data && data.forEach((value) => {
            value.main_or_not && serverData.push({ "label": value.label, "value": value.id })
        })
        return serverData
    }

    convertWholeServers = data => {
        var serverData = []
        // if (!this.state.sidebar) {
        //     const addserver = { "label": "Add New Server", "value": "add_new_server" }
        //     serverData.push(addserver)
        // }
        if (this.state.sidebar) {
            serverData.push({ "label": 'N/A', "value": "null" })
        }
        data && data.forEach((value) => {
            serverData.push({ "label": value.label, "value": value.id })
        })
        return serverData
    }

    convertTabs = data => {
        var tabData = []
        var newData = []
        // if (this.props.serverList && this.props.serverList.allServerDetails) {
        //     severSelected = this.props.serverList.allServerDetails.find((value) => value.id === this.state.selectedLocation.value)
        // }
        if (this.props.serverList && this.props.serverList.childSwitches && this.props.serverList.childSwitches.length > 0) {
            newData = this.props.serverList.childSwitches[0] && this.props.serverList.childSwitches[0].loc_short && data.map((value) => value.replace("switch_short", this.props.serverList.childSwitches[0].loc_short.toUpperCase()));
            newData && newData.forEach((value) => {
                tabData.push({ "label": value, "value": value })
            })

        }

        if (this.props.serverList && this.props.serverList.childSwitches && this.props.serverList.childSwitches.length > 0) {
            let childSwitchData = [...this.props.serverList.childSwitches]
            childSwitchData.reverse().forEach((value) => {
                tabData.unshift({ "label": value.label, "value": value.id })
            })
        } else {
            tabData.unshift(JSON.parse(localStorage.getItem('l_s')));
        }

        return tabData
    }

    handleLocationChange = selectedLocation => {
        selectedLocation && this.props.GetLocationServer(selectedLocation.value);
        this.setState({ selectedLocation: selectedLocation, selectedServer: "", showServers: true, showMain: false });
        localStorage.setItem('loc_data', JSON.stringify(selectedLocation));
        let keysToRemove = ["l_s", "tab"];
        keysToRemove.forEach(k => localStorage.removeItem(k))
        selectedLocation && this.props.GetLocationPdus(selectedLocation.value);

    };

    handleServerChange = selectedServer => {
        if (selectedServer.value === "add_new_server") {
            this.handleSidebar(true, true)
            this.setState({ selectedServer: selectedServer })
        } else {
            this.setState({
                server: selectedServer, selectedServer: selectedServer, selectedTab: { "label": selectedServer.label, "value": selectedServer.label },
                showMain: true, toggleServerList: true, selectedSWitchId: selectedServer.value, changeColumns: false, tab_selection: "", showInfo: false, showLocLog: false
            });
            localStorage.setItem('l_s', JSON.stringify(selectedServer));
            localStorage.setItem('tab', JSON.stringify(selectedServer));
            this.props.getServerData(selectedServer.value, true).then(()=> {this.colorcodeSetting()});
            this.props.getChildSwitches(selectedServer.value, true).then(()=> {this.colorcodeSetting()})
        }

    };

    //Update  log on password reveal
    Updatepasslogdata = (obj) => {

        let addPasslog={};

        //for main ports
         if (obj.switchIds || obj.switchIds == ""){
          
            let switchvalue = obj.switchIds;
            let portvalue = obj.port_ids;

            //for comma seperated switches
            if (switchvalue.indexOf(',') > -1) { 
            let commaswitch = switchvalue.split(',') 
            let swtichid = commaswitch[0]
            addPasslog.switch_id = swtichid;
             }else if (switchvalue=""){
                addPasslog.switch_id = null;
             }
             else {
            addPasslog.switch_id = obj.switchIds;
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
                addPasslog.port_id = obj.port_ids;
                 }
             addPasslog.user_id = localStorage.getItem("user_id");
             addPasslog.location_id = this.state.selectedLocation.value;
             addPasslog.server_label = obj.label;
          
             this.props.addPasswordLog(addPasslog)

         } 

         //for sub ports
         else if (obj.switch_ids || obj.switch_ids == "" ){

            let switchvalue = obj.switch_ids;
            let portvalue = obj.port_ids;

            //for comma seperated switches
            if (switchvalue.indexOf(',') > -1) { 
            let commaswitch = switchvalue.split(',') 
            let swtichid = commaswitch[0]
            addPasslog.switch_id = swtichid;
             } else if (switchvalue=""){
                addPasslog.switch_id = null;
             }
             else {
            addPasslog.switch_id = obj.switch_ids;
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
                addPasslog.port_id = obj.port_ids;
                 }
             addPasslog.user_id = localStorage.getItem("user_id");
             addPasslog.location_id = this.state.selectedLocation.value;
             addPasslog.server_label = obj.label; 
       
             this.props.addPasswordLog(addPasslog)

         }    
    }
 
    handleTabChange = selectedTab => {
        if (selectedTab.value === "Add Port") {
            this.handlePortSidebar(true, true)
            this.setState({ selectedTab: selectedTab, showMain: true })
        } else {
            if (Number.isInteger(selectedTab.value)) {
                localStorage.setItem('tab', JSON.stringify(selectedTab));
                this.props.getServerData(selectedTab.value, true).then(()=> {this.colorcodeSetting()});
                this.setState({ toggleServerList: true, selectedTab: selectedTab, showMain: true, changeColumns: false, tab_selection: "", showInfo: false, showLocLog: false })
            } else {
                localStorage.setItem('tab', JSON.stringify(selectedTab));
                if (selectedTab.value.indexOf("FREE") !== -1) {
                    this.props.getFDAServers("free", this.state.selectedLocation.value, true, 1).then(()=> {this.colorcodeSetting()});
                    this.setState({ toggleServerList: false, selectedTab: selectedTab, showMain: true, changeColumns: true, tab_selection: "free", allServersColumns: false, showInfo: false, showLocLog: false })
                }
                if (selectedTab.value.indexOf("DISCONNECTED") !== -1) {
                    this.props.getFDAServers("disconnected", this.state.selectedLocation.value, true, 1).then(()=> {this.colorcodeSetting()});
                    this.setState({ toggleServerList: false, selectedTab: selectedTab, showMain: true, changeColumns: true, tab_selection: "disconnected", allServersColumns: false, showInfo: false, showLocLog: false })
                }
                if (selectedTab.value.indexOf("ALL") !== -1) {
                    this.props.getFDAServers("all", this.state.selectedLocation.value, true, 1).then(()=> {this.colorcodeSetting()});
                    this.setState({ toggleServerList: false, selectedTab: selectedTab, showMain: true, changeColumns: true, tab_selection: "all", allServersColumns: true, showInfo: false, showLocLog: false })
                }
                if (selectedTab.value.indexOf("INFO") !== -1) {
                    this.props.getInfoVpsDetails("info", this.state.selectedLocation.value).then(()=> {this.colorcodeSetting()});
                    this.setState({ toggleServerList: false, selectedTab: selectedTab, showMain: true, changeColumns: true, tab_selection: "info", showInfo: true })
                }
                this.setState({ pageNumber: 1 })
            }
        }
    }

    handleSidebar = (boolean, addNew = false) => {
        this.setState({ sidebar: boolean })
        if (addNew === true) this.setState({ currentData: null, addNew: true })
    }

    handlePortSidebar = (boolean, addNew = false) => {
        this.setState({ portsidebar: boolean })
        if (addNew === true) this.setState({ currentData: null, addNew: true })
    }

    handleCurrentData = obj => {
        this.setState({ currentData: obj })
        this.handleSidebar(true)
    }
    handleInfoData = row => {
        if (row && row.info_vps_success && row.info_vps_success.length > 0) {
            this.setState({ serverObj: row.info_vps_success[0], toggleInfoEditor: !this.state.toggleInfoEditor });
        }
    }

    handleLocationLogView = () => {
        this.setState({ showLocLog: true });
    }

    closeLocationLogView = () => {
        this.setState({ showLocLog: false })
    }

    closeInfoEditorModal = () => {
        this.setState({ toggleInfoEditor: false })
    }

    handlePortCurrentData = obj => {
        this.setState({ currentData: obj })
        this.handlePortSidebar(true)
    }

    getSelectedLocationData = () => {
        var loc_selected = ""
        if (this.state.selectedLocation) {
            if (this.props.serverList && this.props.serverList.allServerDetails && this.props.serverList.allServerDetails.length > 0) {
                loc_selected = this.props.serverList.allServerDetails.find((value) => value.id === this.state.selectedLocation.value)
            }
        }
        return loc_selected
    }


    handleDelete = row => {
        this.setState({ serverObj: row, delType: "server", toggleDeleteModal: !this.state.toggleDeleteModal });

    }

    handleDeletePort = row => {
        this.setState({ serverObj: row, delType: "port", toggleDeleteModal: !this.state.toggleDeleteModal });
    }

    closeModal = () => {
        this.setState({ toggleDeleteModal: false })
    }
    closeInfoModal = () => {
        this.setState({ toggleInfoModal: false })
    }
    closePassModal = () => {
        this.setState({ togglePassModal: false })
    }
    closeLogModal = () => {
        this.setState({ toggleLogModal: false })
    }

    onServerPageChange = (currentPage) => {
        var locObj = JSON.parse(localStorage.getItem('loc_data'))
        var tabObj = JSON.parse(localStorage.getItem('tab'))
        let page_number = currentPage.selected + 1
        if (tabObj.value.indexOf("FREE") !== -1) {
            this.props.getFDAServers("free", locObj.value, false, page_number)
        }
        if (tabObj.value.indexOf("DISCONNECTED") !== -1) {
            this.props.getFDAServers("disconnected", locObj.value, false, page_number)
        }
        if (tabObj.value.indexOf("ALL") !== -1) {
            this.props.getFDAServers("all", locObj.value, false, page_number)
        }
        this.setState({ pageNumber: page_number })

    }


    countToatalPages = (totalData) => {
        if (parseInt(totalData)) {
            let pageCount = Math.ceil(parseInt(totalData) / this.state.perPageData);
            return pageCount;
        }
    }

    handleSearchModal = () => {
        this.setState({ toggleSearchModal: true })
    }
    closeSearchModal = () => {
        this.setState({ toggleSearchModal: false })
    }

    handlePortDataEdit = (row = false, type = "") => {
       
        if (row && row.index) {
            this.setState({ cellToInput: true, cellType: type, rowIndex: row.index, portValue: row[type] })
        
        } else {
            this.setState({ cellToInput: false, cellType: "", rowIndex: "", portValue: "" })
        }
    }

    updatePortData = (e, row) => {
        let type = "";
        let updateData = {};
        let tabObj = JSON.parse(localStorage.getItem('tab'));

        if (this.state.cellType === "port_info") {
            type = "info";
        } else {
            type = this.state.cellType;
        }

        updateData.loc_id = this.state.selectedLocation && this.state.selectedLocation.value;
        updateData.switch_id = tabObj && tabObj.value;
        updateData[type] = this.state.portValue;

        if (row[this.state.cellType] !== this.state.portValue) {
            if (this.state.cellType === "port_no" && !this.state.portValue) {
                portNoWarning();
            } else {
                this.props.UpdatePort(row.port_id, updateData, tabObj.value).then(() => {
                    if (this.props.serverList && this.props.serverList.PortUpdated) {                       
                        notifyPortInfo();
                     
                        this.setState({updatesuccess:true});
                     
                    } else {
                        if (this.props.serverList && this.props.serverList.portInUse) {
                            portInUseWarning();
                        } else {
                            notifyWarning();
                        }
                    }
                })
            }
        }
        this.handlePortDataEdit();
    }

     timeout(delay) {
        return new Promise( res => setTimeout(res, delay) );
    }

    getColorCode = (data) => {

        var port = this.state.multipleband.filter((value) => value.port === data)
        var color_code = ""
        if(port.length>0){
            color_code  = port[0].color
        }
        return color_code
    }
    render() {
        const cardheaderstyle = {
            backgroundColor: "#c7c4ec",
            paddingTop: "13px",
            paddingBottom: "7px",
            fontSize: "10px"
        }
        const cardbodystyle = {
            paddingTop: "0px",
            paddingLeft: "0px",
            paddingRight: "0px"
        }
        let { selectedLocation, showServers, columns, sidebar, portsidebar, currentData, selectedServer, showMain, selectedTab, selectedSWitchId, changeColumns, columnsFDA,
            tab_selection, showInfo, infoColumns, showLocLog, pageNumber, toggleSearchModal, cellToInput, rowIndex, portValue, cellType, multipleband } = this.state
        let { serverList } = this.props

        return (
            <Fragment>
                {(this.props.serverList && this.props.serverList.isLocationServerLoading) || (this.props.serverList && this.props.serverList.isFDALoading) || (this.props.serverList && this.props.serverList.isServerDataLoading) ?
                    <Spinner />
                    :
                    <div
                        className={`server-list ${this.props.thumbView ? "thumb-view" : "list-view"
                            }`}>
                        {/* Custom Header */}
                        <CustomHeader
                            handleSidebar={this.handleSidebar}
                            handleChangeLocation={this.handleLocationChange}
                            handleChangeServer={this.handleServerChange}
                            handlePortSidebar={this.handlePortSidebar}
                            handleChangeTab={this.handleTabChange}
                            selectedLocation={selectedLocation}
                            selectedServer={selectedServer}
                            selectedTab={selectedTab}
                            locationData={this.props.dataList && this.props.dataList.allData}
                            serverData={(this.props.serverList && this.props.serverList.isLocationServerLoading) ? [] : this.props.serverList.LocationServer}
                            tabData={subTabArray}
                            convertLocation={this.convertLocation}
                            convertServers={this.convertServers}
                            convertTabs={this.convertTabs}
                            showServers={showServers}
                            showMain={showMain}
                            tab_selection={tab_selection}
                            handleSearchModal={this.handleSearchModal}
                        />

                        {/* Table Comes Here */}
                        {showMain &&
                            <Card style={{ width: "101%" }}>
                                {!changeColumns &&
                                    <CardHeader style={cardheaderstyle}>
                                        <CardTitle style={{ fontSize: "1.1rem" }}><span style={{ fontWeight: "bolder" }}>{serverList && serverList.allData && serverList.allData.data && serverList.allData.data.switch_model && serverList.allData.data.switch_model.label} </span>
                                            <span style={{ marginLeft: "5px" }}>|</span> Loopback IP: <span style={{ fontWeight: "bolder" }}>{serverList && serverList.allData && serverList.allData.data && serverList.allData.data.switch_model && serverList.allData.data.switch_model.ip}</span>
                                            <span style={{ marginLeft: "5px" }}>|</span> PDU PORT(s): <span style={{ fontWeight: "bolder" }}>{serverList && serverList.allData && serverList.allData.data && serverList.allData.data.switch_model && serverList.allData.data.switch_model.pdu_ports_name ? serverList.allData.data.switch_model.pdu_ports_name : "N/A"}</span>
                                            {serverList && serverList.allData && serverList.allData.data && serverList.allData.data.switch_model && serverList.allData.data.switch_model.info && <span style={{ marginLeft: "5px" }}>| {serverList.allData.data.switch_model.info}</span>}
                                        </CardTitle>
                                    </CardHeader>
                                }

                                <CardBody style={cardbodystyle} >
                                    {showInfo ?
                                        <DataTable
                                            noHeader
                                            columns={infoColumns}
                                            data={(this.props.serverList && this.props.serverList.info_vps_success) ? this.props.serverList.info_vps_success : []}
                                        />
                                        :
                                        <Fragment>
                                            {
                                                !changeColumns ?

                                                    <Table size="sm" striped hover responsive style={{ width: "100%" }}>
                                                        <thead className="servertablehead">
                                                            <tr>
                                                                <th style={{ width: "4%", paddingLeft: "5px" }}>PORT</th>
                                                                <th style={{ width: "3%" }}>BW</th>
                                                                <th style={{ width: "4%" }}>VLAN</th>
                                                                <th style={{ width: "10%" }}>INFO</th>
                                                                <th style={{ width: "6%" }}>IP</th>
                                                                <th style={{ width: "6%" }}>IPMI IP</th>
                                                                {
                                                                    localStorage.getItem("user_role") && (localStorage.getItem("user_role") === "Sales" || localStorage.getItem("user_role") === "Senior Sales")
                                                                        ?
                                                                        null :
                                                                        <th style={{ width: "9%" }}>IPMI PWD</th>
                                                                }

                                                                <th style={{ width: "12%" }}>LABEL</th>
                                                                <th style={{ width: "23%" }}>SERVER</th>
                                                                <th style={{ width: "7%" }}>PDU(S)</th>
                                                                <th style={{ width: "4%" }}>SID</th>
                                                                <th style={{ width: "4%" }}>CRM STATUS</th>
                                                                <th style={{ width: "4%" }}>STATUS</th>
                                                                <th style={{ width: "4%" }}>ACTIONS</th>
                                                            </tr>
                                                        </thead>
                                                        <tbody className="servertable" >
                                                            {
                                                                this.props.serverList && this.props.serverList.allData && this.props.serverList.allData.data && this.props.serverList.allData.data.data ?
                                                                    this.props.serverList.allData.data.data.map((value, index) =>
                                                                        <tr key={index}>
                                                                            {
                                                                                cellToInput && (rowIndex === value.index) && (cellType === "port_no")
                                                                                    ?
                                                                                    <td>
                                                                                        <Input type="text" className="input" value={portValue} onChange={(e) => this.setState({ portValue: e.target.value })} />
                                                                                    </td>
                                                                                    :
                                                                                    <td className="tdedit" style={{ paddingLeft: "1%", backgroundColor: `${this.getColorCode(value.port_no)}` }} onClick={() => this.handlePortDataEdit(value, "port_no")}>{value.port_no}</td>
                                                                            }

                                                                            {
                                                                                cellToInput && (rowIndex === value.index) && (cellType === "bw")
                                                                                    ?
                                                                                    <td>
                                                                                        <Input type="text" className="input" value={portValue} onChange={(e) => this.setState({ portValue: e.target.value })} />
                                                                                    </td>
                                                                                    :
                                                                                    <td className="tdedit" style={{backgroundColor: `${this.getColorCode(value.port_no)}`}} onClick={() => this.handlePortDataEdit(value, "bw")}>{value.bw}</td>
                                                                            }

                                                                            {
                                                                                cellToInput && (rowIndex === value.index) && (cellType === "vlan")
                                                                                    ?
                                                                                    <td>
                                                                                        <Input type="text" className="input" value={portValue} onChange={(e) => this.setState({ portValue: e.target.value })} />
                                                                                    </td>
                                                                                    :
                                                                                    <td className="tdedit" style={{backgroundColor: `${this.getColorCode(value.port_no)}`}} onClick={() => this.handlePortDataEdit(value, "vlan")}>{value.vlan}</td>
                                                                            }

                                                                            {
                                                                                cellToInput && (rowIndex === value.index) && (cellType === "port_info")
                                                                                    ?
                                                                                    <td>
                                                                                        <Input type="text" className="input" value={portValue} onChange={(e) => this.setState({ portValue: e.target.value })} />
                                                                                    </td>
                                                                                    :
                                                                                    <td className="tdedit" onClick={() => this.handlePortDataEdit(value, "port_info")}><span>{value.server_info && value.server_info} {value.server_info && value.port_info && '/'} {value.port_info && `${value.port_info}`}</span></td>
                                                                            }

                                                                            {
                                                                                cellToInput && (rowIndex === value.index) && (cellType === "ip")
                                                                                    ?
                                                                                    <td>
                                                                                        <Input type="text" className="input" value={portValue} onChange={(e) => this.setState({ portValue: e.target.value.trim() })} />
                                                                                    </td>
                                                                                    :
                                                                                    <td className="tdedit" style={{backgroundColor: `${this.getColorCode(value.port_no)}`}} onClick={() => this.handlePortDataEdit(value, "ip")}><span>{value.ip}</span></td>
                                                                            }
                                                                            <td>
                                                                            <a href={`http://${value.ipmi_ip}/`} target="_blank" rel='noopener noreferrer'>{value.ipmi_ip}</a>
                                                                            </td>
                                                                            {
                                                                                localStorage.getItem("user_role") && (localStorage.getItem("user_role") === "Sales" || localStorage.getItem("user_role") === "Senior Sales") ?
                                                                                    null
                                                                                    :
                                                                                    <td>
                                                                                   
                                                                                    { value.ipmi_pwd === null ||  value.ipmi_pwd == "" ?
                                                                                        " " : <PasswordComponent
                                                                                        row={value}
                                                                                        PtoggleModal={this.PtoggleModal}
                                                                                        currentData={this.handleCurrentData}
                                                                                        portcurrentData={this.handlePortCurrentData}
                                                                                        
                                                                                        />
                                                                                         }
                                                                                
                                                                                    
                                                                         </td>
                                                                            }

                                                                            <td>{value.label}</td>
                                                                            <td><span>{value.cpu && value.cpu}{value.cpu && value.ram && ', '}{value.ram && `${value.ram} RAM`}{value.ram && value.hdd && ', '}{value.hdd && `${value.hdd}`}</span></td>
                                                                            <td>{value.pdu_port}</td>
                                                                            <td>
                                                                                <span>
                                                                                    {value.service_id === "nill" ?
                                                                                        "N/A" :
                                                                                        <a href={`https://crm.fdcservers.net/admin/clientmgr/client_service_details.php?packid=${value.service_id}`} target="_blank" rel='noopener noreferrer'>{value.service_id}</a>}
                                                                                </span>
                                                                            </td>
                                                                            <td>
                                                                                <span>
                                                                                    {value.service_id === "nill" ?
                                                                                        "SID N/A" :
                                                                                        <a href={`https://docsdev.fdcservers.net/olddoc/includes/crm_status.php?sid=${value.service_id}`} target="_blank" rel='noopener noreferrer'>CHECK</a>}
                                                                                </span>
                                                                            </td>
                                                                            <td style={value.status ? (value.status === "free" ? freeStyle : value.status === "reserved" ? reservedStyle : {}) : {}}>{value.status ? value.status : "no server"}</td>

                                                                            {
                                                                                cellToInput && rowIndex === value.index
                                                                                    ?
                                                                                    <td>
                                                                                        <X size={20} style={{ color: "red", cursor: "pointer" }} onClick={() => this.handlePortDataEdit()} />
                                                                                        <Check size={20} style={{ color: "Green", cursor: "pointer" }} onClick={(e) => this.updatePortData(e, value)} />
                                                                                    </td>
                                                                                    : <td><ActionsComponent
                                                                                        row={value}
                                                                                        
                                                                                        toggleModal={this.toggleModal}
                                                                                        currentData={this.handleCurrentData}
                                                                                        portcurrentData={this.handlePortCurrentData}
                                                                                        deleteRow={this.handleDelete}
                                                                                        deletePort={this.handleDeletePort}

                                                                                    /></td>
                                                                            }
                                                                        </tr>
                                                                    )
                                                                    :
                                                                    null
                                                            }

                                                        </tbody>
                                                    </Table>
                                                    :
                                                    <DataTable
                                                        noHeader
                                                        columns={changeColumns ? columnsFDA : columns}
                                                        data={changeColumns ? this.props.serverList && this.props.serverList.allData && this.props.serverList.allData.data : this.props.serverList && this.props.serverList.allData && this.props.serverList.allData.data && this.props.serverList.allData.data.data}
                                                    />
                                            }
                                            {changeColumns &&
                                                <ReactPaginate
                                                    previousLabel={<ChevronLeft size={15} />}
                                                    nextLabel={<ChevronRight size={15} />}
                                                    breakLabel={"..."}
                                                    breakClassName={"break-me"}
                                                    pageCount={this.props.serverList && this.props.serverList.allData && this.props.serverList.allData.total && this.countToatalPages(this.props.serverList.allData.total)}
                                                    marginPagesDisplayed={2}
                                                    pageRangeDisplayed={3}
                                                    containerClassName={
                                                        "vx-pagination icon-pagination pagination-end mt-2"
                                                    }
                                                    activeClassName={"active"}
                                                    onPageChange={this.onServerPageChange}
                                                />
                                            }
                                        </Fragment>
                                    }

                                </CardBody>
                                {showInfo &&
                                    <CardFooter>
                                        <Button className="add-new-btn" color="primary" onClick={this.handleLocationLogView}>
                                            <Eye size={15} style={{ marginRight: "5px" }} />
                                            <span className="align-middle">View Server Log</span>
                                        </Button>
                                        <Button className="add-new-btn" color="primary" style={{ marginLeft: "10px" }} onClick={() => this.handleInfoData(this.props.serverList)}>
                                            <Edit size={15} style={{ marginRight: "5px" }} />
                                            <span className="align-middle">Edit</span>
                                        </Button>
                                    </CardFooter>
                                }
                            </Card>
                        }

                        {/* Sidebar */}
                        {sidebar &&
                            <Sidebar
                                show={sidebar}
                                data={currentData}
                                updateData={this.props.updateData}
                                addData={this.props.addData}
                                handleSidebar={this.handleSidebar}
                                thumbView={this.props.thumbView}
                                getData={this.props.getData}
                                dataParams={this.props.parsedFilter}
                                addNew={this.state.addNew}
                                selectedServer={this.props.serverList && this.props.serverList.allData && this.props.serverList.allData.data && this.props.serverList.allData.data.switch_model}
                                selectedLocation={selectedLocation}
                                locationData={this.props.dataList && this.props.dataList.allData}
                                serverData={this.props.serverList && this.props.serverList.LocationServer && this.convertWholeServers(this.props.serverList.LocationServer)}
                                pduData={this.props.serverList && this.props.serverList.locationPdus}
                                allServerData={this.getSelectedLocationData()}
                                AddMessage={notifyBounce}
                                UpdateMessage={notifyInfo}
                                ErrorMessage={notifyWarning}
                                inCompleteData={notifyIncomplete}
                                PduSameWarning={PduSameWarning}
                                selectedSWitchId={selectedSWitchId}
                                changeColumns={changeColumns}
                                tab_selection={tab_selection}
                                labelSameWarning={labelSameWarning}
                                ipmiIpSameWarning={ipmiIpSameWarning}
                                serviceIdWarning={serviceIdWarning}
                                pageNumber={pageNumber}
                                {...this.props}
                            />
                        }
                        {portsidebar &&
                            <PortSidebar
                                show={portsidebar}
                                data={currentData}
                                updateData={this.props.updateData}
                                addData={this.props.addData}
                                handlePortSidebar={this.handlePortSidebar}
                                thumbView={this.props.thumbView}
                                getData={this.props.getData}
                                dataParams={this.props.parsedFilter}
                                addNew={this.state.addNew}
                                selectedLocation={selectedLocation}
                                selectedSwitch={this.props.serverList && this.props.serverList.allData && this.props.serverList.allData.data && this.props.serverList.allData.data.switch_model}
                                locationData={this.props.dataList && this.props.dataList.allData}
                                pduData={this.props.serverList && this.props.serverList.locationPdus}
                                allServerData={this.getSelectedLocationData()}
                                AddMessage={notifyPortBounce}
                                UpdateMessage={notifyPortInfo}
                                ErrorMessage={notifyWarning}
                                inCompleteData={notifyIncomplete}
                                portInUseWarning={portInUseWarning}
                                selectedTab={selectedTab}
                            />
                        }

                        <div
                            className={classnames("data-list-overlay", {
                                show: sidebar
                            })}
                            onClick={() => this.handleSidebar(false, true)}
                        />
                        <div
                            className={classnames("data-list-overlay", {
                                show: portsidebar
                            })}
                            onClick={() => this.handlePortSidebar(false, true)}
                        />
                        <ToastContainer />

                        {this.state.togglePassModal &&
                            <PasswordInfoModal
                                closeModal={this.closePassModal}
                                togglePassModal={this.state.togglePassModal}
                                selectedLocation={this.state.selectedLocation}
                                selectedTab={this.state.selectedTab}
                                selectedPort={this.state.selectedPort}
                                changeColumns={changeColumns}
                                logtoggleModal={this.logtoggleModal}
                    
                            />
                        }
                        {this.state.toggleInfoModal &&
                            <ServerInfoModal
                                closeModal={this.closeInfoModal}
                                toggleInfoModal={this.state.toggleInfoModal}
                                selectedLocation={this.state.selectedLocation}
                                selectedTab={this.state.selectedTab}
                                selectedPort={this.state.selectedPort}
                                changeColumns={changeColumns}
                                logtoggleModal={this.logtoggleModal}
                              
                            />
                        }
                        {this.state.toggleLogModal &&
                            <Serverlogconfig
                                selectedSwitch={this.state.selectedPort && this.state.selectedPort.server_id}
                                row={this.state.selectedPort}
                                selectedLocation={this.state.selectedLocation}
                                selectedPort={this.state.selectedPort}
                                selectedServer={this.state.selectedServer}
                                closeModal={this.closeLogModal}
                                toggleLogModal={this.state.toggleLogModal}
                            />
                        }
                        {this.state.toggleDeleteModal &&
                            <ServerDeleteModal
                                closeModal={this.closeModal}
                                toggleDeleteModal={this.state.toggleDeleteModal}
                                serverObj={this.state.serverObj}
                                delType={this.state.delType}
                                notifyPortDeleted={notifyPortDeleted}
                                notifyServerDeleted={notifyServerDeleted}
                                notifyError={notifyWarning}
                                selectedSWitchId={selectedSWitchId}
                                changeColumns={changeColumns}
                                tab_selection={tab_selection}
                                selectedLocation={selectedLocation}
                                DeletePort={this.props.DeletePort}
                                DeleteServer={this.props.DeleteServer}
                                serverList={this.props.serverList}
                                selectedSwitch={this.props.serverList && this.props.serverList.allData && this.props.serverList.allData.data && this.props.serverList.allData.data.switch_model}
                                pageNumber={pageNumber}
                            />
                        }
                        {this.state.toggleInfoEditor &&
                            <InfoEditor ref={this.editChild} closeInfoEditorModal={this.closeInfoEditorModal} toggleInfoEditor={this.state.toggleInfoEditor} serverObj={this.state.serverObj && this.state.serverObj.info} selectedLocation={selectedLocation} notifyInfoUpdated={notifyInfoUpdated} notifyError={notifyWarning}  {...this.props} />
                        }
                        {showLocLog &&
                            <LocationLogView showLocLog={showLocLog} closeLocationLogView={this.closeLocationLogView} location={selectedLocation && selectedLocation.label} selectedLocationId={selectedLocation && selectedLocation.value} fetchLocationLog={this.props.fetchLocationLog} serverList={this.props.serverList} />
                        }

                        {toggleSearchModal &&
                            <SearchModal toggleSearchModal={toggleSearchModal} closeSearchModal={this.closeSearchModal} serverList={this.props.serverList} />
                        }
                    </div>
                }
            </Fragment>
        )
    }
}


const mapStateToProps = state => {
    return {
        dataList: state.dataList,
        serverList: state.ServerList,
        paginateData: state.paginateData
    }
}

export default connect(mapStateToProps, {
    getInitialData,
    GetLocationServer,
    GetAllServerDetails,
    GetLocationPdus,
    getServerData,
    addPasswordLog,
    DeleteServer,
    getFDAServers,
    getInfoVpsDetails,
    DeletePort,
    updateInfoVpsData,
    fetchLocationLog,
    getChildSwitches,
    getPaginateData,
    UpdatePort
})(ServerConfig)