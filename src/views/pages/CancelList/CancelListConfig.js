import React, { Fragment } from 'react';
import { Card, CardBody, CardHeader, CardTitle, FormGroup, Form, Row, Col, Button } from "reactstrap"
import { Plus, Trash, Edit, ChevronLeft, ChevronRight } from "react-feather"
import { connect } from "react-redux"
import { getInitialData } from "../../../redux/actions/data-list"
import { getCancelList, addCancelItem, updateCancelItem, deleteCancelItem } from "../../../redux/actions/cancel-list"
import Spinner from "../../../components/@vuexy/spinner/Loading-spinner"
import { toast, ToastContainer, Zoom } from "react-toastify"
import "react-toastify/dist/ReactToastify.css"
import "../../../assets/scss/plugins/extensions/toastr.scss"
import CancelListAddEditModal from "./CancelListAddModal"
import CancelListDeleteModal from "./CancelListDelete"
import { getPaginateData } from '../../../redux/actions/pagination';
import ReactPaginate from "react-paginate";
import DataTable from "react-data-table-component";
import "../../../assets/scss/plugins/extensions/react-paginate.scss";
import "../../../assets/scss/pages/data-list.scss";

const actionrow = { width: "8%" }
const datastyle = {
    backgroundColor: "#c7c4ec",
    paddingTop: "13px",
    paddingBottom: "7px",
    fontSize: "10px"
}

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

const cancelAddedSucsess = () => toast.success("Cancel Item Added Successfully", { transition: Zoom })
const cancelDeletedSuccess = () => toast.success("Cancel Item Deleted Successfully", { transition: Zoom })
const cancelItemUpdated = () => toast.info("Cancel Item Updated Successfully", { transition: Zoom })
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
                </Row>
            </Form>
        </Fragment>
    )
}
class CancelListConfig extends React.PureComponent {

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
                minWidth: "8%",
                maxWidth: "8%"
            },
            {
                name: "Location",
                selector: "location",
                minWidth: "10%",
                maxWidth: "10%",
                cell: row => (<span>{row.location}</span>)
            },
            {
                name: "Cancel Date",
                selector: "date",
                minWidth: "21%",
                maxWidth: "21%",
                sortable: true
            },
            {
                name: "Service Id",
                selector: "sid",
                sortable: true,
                minWidth: "21%",
                maxWidth: "21%",
                cell: row => (
                    <a href={`https://crm.fdcservers.net/admin/clientmgr/client_service_details.php?packid=${row.sid}`} target="_blank" rel='noopener noreferrer'>
                        #{row.sid}</a>
                )
            },
            {
                name: "Notes",
                selector: "notes",
                minWidth: "32%",
                maxWidth: "32%",
                cell: row => (<span>{row.notes}</span>)
            },
            {
                name: "Actions",
                minWidth: "8%",
                maxWidth: "8%",
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
    }

    componentDidMount() {
        if (this.props.paginateData && this.props.paginateData.perPageCount) {
          this.setState({ perPageData: this.props.paginateData.perPageCount,
        })
        } else {
          this.props.getPaginateData().then(() => {
            if (this.props.paginateData && this.props.paginateData.perPageCount) {
              this.setState({ perPageData: this.props.paginateData.perPageCount })
            }
          })
        }
    
        if (this.props.CancelList && !this.props.CancelList.cancelList) {
            this.props.getCancelList(this.state.pageNumber).then(() => {
                this.setState({ isLoading: true })
            })
        }
        else {
            this.setState({ 
                isLoading: true ,
                pageNumber: this.props.CancelList && this.props.CancelList.cancelList && this.props.CancelList.cancelList.current_page
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
        this.setState({ toggleDeleteModal: true, deleteitemid: value.id })
    }

    closeDeleteModal = () => {
        this.setState({ toggleDeleteModal: false, deleteitemid: "" })
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

    render() {
        const { CancelList } = this.props
        const { toggleAddModal, toggleDeleteModal, data, deleteitemid, columns } = this.state
        let cardbody = {
            paddingTop: '0px'
        }
        return (
            <React.Fragment>
                <CustomHeader
                    handleAddModal={this.handleAddModal}
                />
                {this.state.isLoading === false ? (
                    <Spinner color="primary" className="reload-spinner" />
                ) : (
                        <Fragment>
                            {CancelList && CancelList.cancelList && CancelList.cancelList.data && CancelList.cancelList.data.length !== 0 &&
                                <Card className={`data-list ${this.props.thumbView ? "thumb-view" : "list-view"
                            }`}>
                                    <CardHeader style={datastyle}>
                                        <CardTitle style={{ fontSize: "1.1rem" }}>
                                            Cancel List
                                </CardTitle>
                                    </CardHeader>
                                    <CardBody style={cardbody}>
                                        <DataTable
                                            columns={columns}
                                            data={CancelList && CancelList.cancelList && CancelList.cancelList.data && Array.isArray(CancelList.cancelList.data) ? CancelList.cancelList.data : []}
                                            noHeader
                                            customStyles={selectedStyle}
                                        />
                                        <ReactPaginate
                                            previousLabel={<ChevronLeft size={15} />}
                                            nextLabel={<ChevronRight size={15} />}
                                            breakLabel={"..."}
                                            breakClassName={"break-me"}
                                            pageCount={CancelList && CancelList.cancelList && CancelList.cancelList.total && this.countToatalPages(CancelList.cancelList.total)}
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
                            {CancelList && CancelList.cancelList && CancelList.cancelList.length === 0 &&
                                <Card>
                                    <CardBody style={datastyle}>
                                        <CardTitle style={{ fontSize: "1.1rem" }}>There is No Results Found!</CardTitle>
                                    </CardBody>
                                </Card>
                            }
                        </Fragment>
                    )}
                {toggleAddModal &&
                    <CancelListAddEditModal toggleAddModal={toggleAddModal} closeAddModal={this.closeAddModal}
                        GetCancelListLocations={this.props.getInitialData} CancelListLocations={this.props.dataList}
                        CancelList={this.props.CancelList}
                        addCancelItem={this.props.addCancelItem} updateCancelItem={this.props.updateCancelItem}
                        data={data} cancelItemUpdated={cancelItemUpdated} cancelAddedSucsess={cancelAddedSucsess}
                        emptyAllFields={emptyAllFields} emptyLocationField={emptyLocationField} invalidSID={invalidSID}
                        emptyServiceIdField={emptyServiceIdField} emptyDateField={emptyDateField}
                        wentWrong={wentWrong} pageno={this.state.pageNumber} siddup={siddup}/>
                }

                {toggleDeleteModal &&
                    <CancelListDeleteModal toggleDeleteModal={toggleDeleteModal} deleteitemid={deleteitemid}
                        closeDeleteModal={this.closeDeleteModal} deleteCancelItem={this.props.deleteCancelItem}
                        cancelDeletedSuccess={cancelDeletedSuccess} wentWrong={wentWrong} pageno={this.state.pageNumber}/>
                }
                <ToastContainer />
            </React.Fragment>
        )
    }
}

const mapStateToProps = state => {
    return {
        dataList: state.dataList,
        CancelList: state.CancelList,
        paginateData: state.paginateData
    }
}

export default connect(mapStateToProps, {
    getCancelList,
    addCancelItem,
    updateCancelItem,
    deleteCancelItem,
    getInitialData,
    getPaginateData
})(CancelListConfig)