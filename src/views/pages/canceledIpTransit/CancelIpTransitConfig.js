import React, { Fragment } from 'react';
import { Card, CardBody, CardHeader, CardTitle, FormGroup, Form, Row, Col, Button, Badge } from "reactstrap"
import { Plus, Trash, Edit, ChevronLeft, ChevronRight, Check, X } from "react-feather"
import { connect } from "react-redux"
import { getInitialData } from "../../../redux/actions/data-list"
import { getIpTransistProviders } from "../../../redux/actions/ip-transist-settings";
import { getIpTransitActiveList, getIpTransitCancelList, addIpTransitItem, updateIpTransitItem, deleteIpTransitItem } from "../../../redux/actions/ip-transit"
import Spinner from "../../../components/@vuexy/spinner/Loading-spinner"
import { toast, ToastContainer, Zoom } from "react-toastify"
import "react-toastify/dist/ReactToastify.css"
import "../../../assets/scss/plugins/extensions/toastr.scss"
import CancelListAddEditModal from "./CancelIpTransitAddEdit"
import CancelListDeleteModal from "./CancelIpTransitDelete"
import Export from "./export"
import { getPaginateData } from '../../../redux/actions/pagination';
import ReactPaginate from "react-paginate";
import DataTable from "react-data-table-component";
import "../../../assets/scss/plugins/extensions/react-paginate.scss";
import "../../../assets/scss/pages/data-list.scss";
import { TransitData } from "./data"

const actionrow = { width: "8%" }
const datastyle = {
    backgroundColor: "#c7c4ec",
    paddingTop: "13px",
    paddingBottom: "7px",
    fontSize: "10px"
}

const selectedStyle = {
    innerWidth: "100%",
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

const cancelAddedSucsess = () => toast.success("Cancel IP Transit Added Successfully", { transition: Zoom })
const cancelDeletedSuccess = () => toast.success("Cancel IP Transit Deleted Successfully", { transition: Zoom })
const cancelItemUpdated = () => toast.info("Cancel IP Transit Updated Successfully", { transition: Zoom })
const emptyAllFields = () => toast.warning("Please Fill All Mandatory Fields", { transition: Zoom })
const emptyLocationField = () => toast.warning("The location field is required", { transition: Zoom })
const emptyServiceIdField = () => toast.warning("The Service ID field is required", { transition: Zoom })
const emptyDateField = () => toast.warning("The Date field is required", { transition: Zoom })
const invalidSID = () => toast.warning("The provided service ID is not active.", { transition: Zoom })
const siddup = () => toast.warning("The sid has already been taken", { transition: Zoom })
const wentWrong = () => toast.warning("Something Went Wrong", { transition: Zoom })


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
                    return props.updateItem(props.row)
                }}
            />
            <Trash
                className="cursor-pointer ml-1"
                size={15}
                onClick={() => {
                    return props.deleteItem(props.row)
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
                    <Col sm="4">
                        <FormGroup>
                            <Button.Ripple color="primary" onClick={() => props.handleAddModal()} outline>
                                <Plus size={15} style={{ marginRight: "5px" }} />
                                <span className="align-middle">Add New</span>
                            </Button.Ripple>
                        </FormGroup>
                    </Col>
                    <Col sm="8" >
                        <FormGroup style={{ float: "right" }}>
                            <Button.Ripple color="primary" onClick={() => props.handleExportModal()} outline>
                                {/* <Plus size={15} style={{ marginRight: "5px" }} /> */}
                                <span className="align-middle">Export</span>
                            </Button.Ripple>
                        </FormGroup>
                    </Col>
                </Row>
            </Form>
        </Fragment>
    )
}
class CancelIpTransitConfig extends React.PureComponent {
    state = {
        toggleAddModal: false,
        toggleDeleteModal: false,
        data: null,
        deleteitemid: "",
        isLoading: false,
        totalPages: 0,
        currentPage: 0,
        columns: [
            {
                name: "#",
                selector: "index",
                minWidth: "3%",
                maxWidth: "3%",
            },
            {
                name: "Provider",
                selector: "provider",
                sortable: true,
                minWidth: "6%",
                maxWidth: "6%",

                cell: row => (<span>{row.provider}</span>)
            },
            {
                name: "Client Id",
                selector: "client_id",
                sortable: true,
                minWidth: "5%",
                maxWidth: "5%",
                cell: row => (<span>#{row.client_id}</span>)
            },
            {
                name: "Service Id",
                selector: "sid",
                sortable: true,
                minWidth: "5%",
                maxWidth: "5%",
                cell: row => (
                    <a href={`https://crm.fdcservers.net/admin/clientmgr/client_service_details.php?packid=${row.sid}`} target="_blank" rel='noopener noreferrer'>
                        #{row.sid}</a>
                )
            },
            {
                name: "Circuit Id",
                selector: "circuit_id",
                sortable: true,
                minWidth: "5%",
                maxWidth: "5%",
                cell: row => (
                    <a href={`https://ecogent.cogentco.com/orders/=${row.circuit_id}`} target="_blank" rel='noopener noreferrer'>
                        #{row.circuit_id}</a>
                )
            },
            {
                name: "Circuit Type",
                selector: "circuit_type",
                sortable: true,
                minWidth: "5%",
                maxWidth: "5%",

                cell: row => (<span>{row.circuit_type}</span>)
            },
            {
                name: "Circuit Country",
                selector: "circuit_country",
                sortable: true,
                minWidth: "8%",
                maxWidth: "8%",

                cell: row => (<span>{row.circuit_country}</span>)
            },
            {
                name: "Circuit City",
                selector: "circuit_city",
                sortable: true,
                minWidth: "7%",
                maxWidth: "7%",

                cell: row => (<span>{row.circuit_city}</span>)
            },
            {
                name: "Port Capacity",
                selector: "port_capacity",
                sortable: true,
                minWidth: "7%",
                maxWidth: "7%",

                cell: row => (<span>{row.port_capacity}</span>)
            },
            {
                name: "Bandwidth Commit",
                selector: "bandwidth",
                sortable: true,
                minWidth: "7%",
                maxWidth: "7%",

                cell: row => (<span>{row.bandwidth}</span>)
            },
            {
                name: "Activation Date",
                selector: "activation_date",
                sortable: true,
                minWidth: "7%",
                maxWidth: "7%",

                cell: row => (<span>{row.activation_date}</span>)
            },
            {
                name: "Expiration Date",
                selector: "expiration_date",
                sortable: true,
                minWidth: "7%",
                maxWidth: "7%",

                cell: row => (<span>{row.expiration_date}</span>)
            },
            {
                name: "Metered Charge",
                selector: "metered_charge",
                sortable: true,
                minWidth: "5%",
                maxWidth: "5%",

                cell: row => (<span className="ml-1">
                    <Badge color={`${row.metered_charge === "true"
                        ? "success"
                        : "danger"
                        }`}>
                        {row.metered_charge === "true"
                            ? <Check size={12} className='align-middle' />
                            : <X size={12} className='align-middle' />
                        }
                    </Badge>
                </span>)
            },
            {
                name: "Status",
                selector: "status",
                sortable: true,
                minWidth: "5%",
                maxWidth: "5%",

                cell: row => (<span>
                    <Badge color={`${row.status === "active"
                        ? "success"
                        : row.status === "Suspended"
                            ? "warning"
                            : row.status === "cancelled"
                                ? "danger"
                                : "info"
                        }`}>
                        {row.status}
                    </Badge>
                </span>)
            },
            {
                name: "Notes",
                selector: "notes",
                sortable: true,
                minWidth: "8%",
                maxWidth: "8%",
                cell: row => (<span>{row.notes}</span>)
            },
            {
                name: "Actions",
                minWidth: "5%",
                maxWidth: "5%",
                cell: row => (
                    <ActionsComponent
                        row={row}
                        updateItem={this.updateItem}
                        deleteItem={this.deleteItem}
                    />
                )
            }
        ],
        value: "",
        rowsPerPage: 4,
        pageNumber: 1,
        selected: [],
        sortIndex: [],
        perPageData: 30,
        dataToExport: [],
        value: "",
        modal: false,
        fileName: "",
        fileFormat: "xlsx",

    }

    componentDidMount() {
        if (this.props.paginateData && this.props.paginateData.perPageCount) {
            this.setState({
                perPageData: this.props.paginateData.perPageCount,
            })
        } else {
            this.props.getPaginateData().then(() => {
                if (this.props.paginateData && this.props.paginateData.perPageCount) {
                    this.setState({ perPageData: this.props.paginateData.perPageCount })
                }
            })
        }

        if (this.props.IpTransitList && !this.props.IpTransitList.ipTransitCancelList) {
            this.props.getIpTransitCancelList(this.state.pageNumber).then(() => {
                this.setState({ isLoading: true })
            })
        }
        else {
            this.setState({
                isLoading: true,
                pageNumber: this.props.IpTransitList && this.props.IpTransitList.ipTransitCancelList && this.props.IpTransitList.ipTransitCancelList.current_page
            })
        }
    }

    onSwitchPageChange = (currentPage) => {
        let page_number = currentPage.selected + 1
        this.props.getCancelList(page_number)
        this.setState({ pageNumber: page_number })

    }

    countToatalPages = (totalData) => {
        if (parseInt(totalData)) {
            let pageCount = Math.ceil(parseInt(totalData) / this.state.perPageData);
            return pageCount;
        }
    }

    // Add Shopping Item
    handleAddModal = () => {
        this.setState({ toggleAddModal: true, data: null })
    }

    closeAddModal = () => {
        this.setState({ toggleAddModal: false })
    }

    // Update Shopping Item
    updateItem = (obj) => {
        this.setState({
            data: obj,
            toggleAddModal: true
        })
    }

    // delete null route

    deleteItem = (value) => {
        this.setState({ toggleDeleteModal: true, deleteitemid: value.id, data: value })
    }

    closeDeleteModal = () => {
        this.setState({ toggleDeleteModal: false, deleteitemid: "", data: null })
    }


    // Export 
    handleExportModal = () => {
        if (this.state.dataToExport.length == 0) {
            this.setState({ modal: true })
            if (this.props.IpTransitList && this.props.IpTransitList.ipTransitCancelList && this.props.IpTransitList.ipTransitCancelList.data && this.props.IpTransitList.ipTransitCancelList.data.length !== 0) {
                this.setState({
                    dataToExport: this.props.IpTransitList && this.props.IpTransitList.ipTransitCancelList && this.props.IpTransitList.ipTransitCancelList.data
                })
            }
        }
        else {
            let sortarray = this.state.dataToExport.sort((a, b) => a.id - b.id)
            this.setState({ modal: true, dataToExport: sortarray })
        }
    }

    closeExportModal = () => {
        this.setState({ modal: false })
    }

    formatDate(date) {
        var d = new Date(date),
            month = '' + (d.getMonth() + 1),
            day = '' + d.getDate(),
            year = d.getFullYear();
        if (month.length < 2) month = '0' + month;
        if (day.length < 2) day = '0' + day;

        var date = [year, month, day].join('-');
        return date
    }

    handleChange = (state) => {
        this.setState({ dataToExport: state.selectedRows })
    };



    render() {
        // let IconTag = this.state.selectedRows.length !== this.state.data.length && this.state.selectedRows.length ? Minus : Check
        const { IpTransitList } = this.props
        const { toggleAddModal, toggleDeleteModal, data, deleteitemid, columns, modal } = this.state
        let cardbody = {
            paddingTop: '0px'
        }
        return (
            <React.Fragment>
                <CustomHeader
                    handleAddModal={this.handleAddModal}
                    handleExportModal={this.handleExportModal}
                />
                {this.state.isLoading === false ? (
                    <Spinner color="primary" className="reload-spinner" />
                ) : (
                    <Fragment>
                        {IpTransitList && IpTransitList.ipTransitCancelList && IpTransitList.ipTransitCancelList.data && IpTransitList.ipTransitCancelList.data.length !== 0 &&
                            <Card className={`data-list ${this.props.thumbView ? "thumb-view" : "list-view"
                                }`}>
                                <CardHeader style={datastyle}>
                                    <CardTitle style={{ fontSize: "1.1rem" }}>
                                    Cancelled IP Transit List
                                </CardTitle>
                                </CardHeader>
                                <CardBody style={cardbody}>
                                    <DataTable
                                        innerRef={el => (this.tableRef = el)}
                                        columns={columns}
                                        // data={TransitData}
                                        responsive
                                        data={IpTransitList && IpTransitList.ipTransitCancelList && IpTransitList.ipTransitCancelList.data && Array.isArray(IpTransitList.ipTransitCancelList.data) ? IpTransitList.ipTransitCancelList.data : []}
                                        noHeader
                                        selectableRows={true}
                                        Clicked
                                        onSelectedRowsChange={this.handleChange}
                                        customStyles={selectedStyle}
                                    />
                                    <ReactPaginate
                                        previousLabel={<ChevronLeft size={15} />}
                                        nextLabel={<ChevronRight size={15} />}
                                        breakLabel={"..."}
                                        breakClassName={"break-me"}
                                        pageCount={IpTransitList && IpTransitList.ipTransitCancelList && IpTransitList.ipTransitCancelList.total && this.countToatalPages(IpTransitList.ipTransitCancelList.total)}
                                        marginPagesDisplayed={2}
                                        pageRangeDisplayed={3}
                                        containerClassName={
                                            "vx-pagination icon-pagination pagination-end mt-2"
                                        }
                                        activeClassName={"active"}
                                        onPageChange={this.onSwitchPageChange}
                                        forcePage={this.state.pageNumber - 1}
                                    />
                                </CardBody>
                            </Card>
                        }
                        {IpTransitList && IpTransitList.ipTransitCancelList && IpTransitList.ipTransitCancelList.data && IpTransitList.ipTransitCancelList.data.length === 0 &&
                            <Card>
                                <CardBody style={datastyle}>
                                    <CardTitle style={{ fontSize: "1.1rem", textAlign: "center" }}>There is No Results Found!</CardTitle>
                                </CardBody>
                            </Card>
                        }
                    </Fragment>
                )}
                {toggleAddModal &&
                    <CancelListAddEditModal toggleAddModal={toggleAddModal} closeAddModal={this.closeAddModal}
                        GetCancelListLocations={this.props.getInitialData} CancelListLocations={this.props.dataList}
                        IpTransitList={this.props.IpTransitList} getIpTransistProviders={this.props.getIpTransistProviders}
                        providers={this.props.providers}
                        addIpTransitItem={this.props.addIpTransitItem} updateIpTransitItem={this.props.updateIpTransitItem}
                        data={data} cancelItemUpdated={cancelItemUpdated} cancelAddedSucsess={cancelAddedSucsess}
                        emptyAllFields={emptyAllFields} emptyLocationField={emptyLocationField} invalidSID={invalidSID}
                        emptyServiceIdField={emptyServiceIdField} emptyDateField={emptyDateField}
                        wentWrong={wentWrong} pageno={this.state.pageNumber} siddup={siddup} />
                }

                {toggleDeleteModal &&
                    <CancelListDeleteModal toggleDeleteModal={toggleDeleteModal} deleteitemid={deleteitemid}
                        data={data}
                        closeDeleteModal={this.closeDeleteModal} deleteIpTransitItem={this.props.deleteIpTransitItem}
                        cancelDeletedSuccess={cancelDeletedSuccess} wentWrong={wentWrong} pageno={this.state.pageNumber} />
                }

                {modal &&
                    <Export
                        modal={modal} data={this.state.dataToExport} close={this.closeExportModal}
                    />
                }
                <ToastContainer />
            </React.Fragment>
        )
    }
}

const mapStateToProps = state => {
    return {
        dataList: state.dataList,
        IpTransitList: state.IpTransitList,
        paginateData: state.paginateData,
        providers: state.IpTransistProvider
    }
}

export default connect(mapStateToProps, {
    getIpTransitCancelList,
    getIpTransitActiveList,
    addIpTransitItem,
    updateIpTransitItem,
    deleteIpTransitItem,
    getInitialData,
    getPaginateData,
    getIpTransistProviders
})(CancelIpTransitConfig)