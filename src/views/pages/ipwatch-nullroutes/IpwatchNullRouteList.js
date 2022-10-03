import React, { Fragment } from 'react'
import { Trash, Plus, Search, FileText, AlignJustify, ChevronLeft, ChevronRight } from "react-feather"
import {
    Button, Card, CardBody, Form, Row, Col, FormGroup, InputGroup, CardHeader, CardTitle,
    InputGroupAddon,
    Input,
} from "reactstrap"
// import DataTable from "react-data-table-component"
import { Table } from "reactstrap"
import {
    getNullRoutes,
    getNullRoutesActivityLog,
    getSearchedNullRoute,
    addNullRoute,
    deleteNullRoute
} from "../../../redux/actions/ipwatch-nullroutes"
import { connect } from 'react-redux'
import "../../../assets/scss/plugins/extensions/react-paginate.scss"
import ReactPaginate from "react-paginate"
import IpwatchNullRouteAddModal from './IpwatchNullRouteAddModal'
import IpwatchNullRouteDeleteModal from './IpwatchNullRouteDeleteModal'
import { toast, ToastContainer, Zoom } from "react-toastify"
import "react-toastify/dist/ReactToastify.css"
import "../../../assets/scss/plugins/extensions/toastr.scss"
import Tooltip from "@material-ui/core/Tooltip"
import { makeStyles } from "@material-ui/core/styles";
import Spinner from "../../../components/@vuexy/spinner/Loading-spinner";
import { getPaginateData } from '../../../redux/actions/pagination';


const marginStyle = { marginLeft: "10px" }
const deletIconstyle = { paddingLeft: "26px" }
const datastyle = {
    backgroundColor: "#c7c4ec",
    paddingTop: "13px",
    paddingBottom: "7px",
    fontSize: "10px"
}

const addStyle = {
    backgroundColor: "#4cd964",
    color: "#fff",
    paddingLeft: "1em",
    paddingRight: "1em",
    borderRadius: ".25em",
    fontWeight: "500",
    paddingTop: "5px",
    paddingBottom: "5px"
}
const expStyle = {
    backgroundColor: "#ffcc00",
    color: "#fff",
    paddingLeft: "1em",
    paddingRight: "1em",
    borderRadius: ".25em",
    fontWeight: "500",
    paddingTop: "5px",
    paddingBottom: "5px"
}
const delStyle = {
    backgroundColor: "#ff3b30",
    color: "#fff",
    paddingLeft: "1em",
    paddingRight: "1em",
    borderRadius: ".25em",
    fontWeight: "500",
    paddingTop: "5px",
    paddingBottom: "5px"
}

const useStylesBootstrap = makeStyles((theme) => ({
    arrow: {
        color: theme.palette.common.black
    },
    tooltip: {
        backgroundColor: theme.palette.common.black,
        fontSize: 15
    }
}));

function BootstrapTooltip(props) {
    const classes = useStylesBootstrap();

    return <Tooltip arrow classes={classes} {...props} />;
}

const CustomHeader = props => {
    return (
        <Fragment>
            <Form>
                <Row>
                    <Col sm="4">
                        <FormGroup>
                            <InputGroup>
                                <Input placeholder="Search Null Routes" onChange={props.handleSearchNullRouteChange} value={props.searchValue} onKeyDown={props.handleSearchKeyDown} />
                                <InputGroupAddon addonType="append">
                                    <Button.Ripple color="primary" onClick={() => props.handleSearchNullRouteClick(props.searchValue)}><Search size={15} /></Button.Ripple>
                                </InputGroupAddon>
                            </InputGroup>
                        </FormGroup>
                        {/* <FormGroup>
                            <Select
                                value={null}
                                onChange={null}
                                options={[]}
                                placeholder="Select a Location"
                                isSearchable={true}
                            />
                        </FormGroup> */}
                    </Col>
                    <Col sm="8">
                        <div className="data-list-header d-flex justify-content-between flex-wrap" style={{ float: "right" }}>
                            <div className="actions-left d-flex flex-wrap">
                                <Button
                                    className="add-new-btn"
                                    color="primary"
                                    onClick={() => props.handleActivityLogView()}
                                    outline>
                                    {props.toggleListView
                                        ?
                                        <Fragment>
                                            <AlignJustify size={15} />
                                            <span className="align-middle">List Null Routes</span>
                                        </Fragment>
                                        :
                                        <Fragment>
                                            <FileText size={15} />
                                            <span className="align-middle">Activity Log</span>
                                        </Fragment>
                                    }



                                </Button>
                                <Button
                                    className="add-new-btn"
                                    color="primary"
                                    onClick={() => props.handleAddModal()}
                                    style={marginStyle}
                                    outline>
                                    <Plus size={15}
                                    />
                                    <span className="align-middle">Add Null Route</span>
                                </Button>
                            </div>
                        </div>
                    </Col>

                </Row>
            </Form>
        </Fragment>
    )
}

const nullRouteAddedSucsess = () => toast.success("Null Route Added Successfully", { transition: Zoom })
const nullRouteDeletedSuccess = (msg) => toast.success(msg, { transition: Zoom })
const emptySearchWarning = () => toast.warning("Please Enter a valid IP Address", { transition: Zoom })
const warningMessage = () => toast.warning("Something went wrong.Please try again later.", { transition: Zoom })
const fillDataWarning = () => toast.warning("Please fill required fields", { transition: Zoom })
const validationMessage = (msg) => toast.warning(msg, { transition: Zoom })

class IpwatchNullRouteList extends React.PureComponent {
    state = {
        toggleListView: false,
        toggleAddModal: false,
        pageNumber: 1,
        searchValue: "",
        nullRouteId: "",
        perPageData: 30
    }

    componentDidMount() {
        this.props.getPaginateData().then(() => {
            if (this.props.paginateData && this.props.paginateData.perPageCount) {
                this.setState({ perPageData: this.props.paginateData.perPageCount })
            }
        })
        if (this.props.nullRoutes && !this.props.nullRoutes.allNullRoutes) {
            this.props.getNullRoutes()
        }

    }

    // null route and null route log toggle
    handleActivityLogView = () => {
        this.state.toggleListView
            ?
            // this.props.nullRoutes && !this.props.nullRoutes.allNullRoutes && this.props.getNullRoutes() :
            this.props.getNullRoutes(false)
            :
            this.props.getNullRoutesActivityLog(this.state.pageNumber);

        this.setState({ toggleListView: !this.state.toggleListView, searchValue: "" });
    }

    // add null route
    handleAddModal = () => {
        this.setState({ toggleAddModal: true, searchValue: "" })
    }

    closeAddModal = () => {
        this.setState({ toggleAddModal: false })
    }

    // pagination null route log
    onNullRouteLogPageChange = (currentPage) => {
        let page_number = currentPage.selected + 1
        this.props.getNullRoutesActivityLog(page_number, false).then(() => {
            window.scrollTo(0, 0)
        })
        this.setState({ pageNumber: page_number })
    }

    countTotalPages = (totalData) => {
        if (parseInt(totalData)) {
            var pageCount = Math.ceil(parseInt(totalData) / this.state.perPageData);
            return pageCount;
        }
    }

    // search null route

    handleSearchNullRouteChange = (e) => {
        this.setState({ searchValue: e.target.value })
    }

    handleSearchNullRouteClick = (clickedValue = "") => {
        if (clickedValue) {
            this.props.getSearchedNullRoute(clickedValue)
            this.setState({ searchValue: clickedValue, toggleListView: true })
        } else {
            emptySearchWarning()
        }
    }

    // Search on "Enter" key 
    handleSearchKeyDown = (e) => {
        if (e.keyCode === 13) {
            e.preventDefault()
            let searchedValue = this.state.searchValue
            this.handleSearchNullRouteClick(searchedValue)
        }
    }

    // delete null route

    deleteNullRoute = (id) => {
        this.setState({ toggleDeleteModal: true, nullRouteId: id })
    }

    closeDeleteModal = () => {
        this.setState({ toggleDeleteModal: false, nullRouteId: "" })
    }

    // convert log timestamp
    convertTimeStamp = (value) => {
        if (value) {
            var dateValue = new Date(value);
            var newValue = dateValue.toLocaleString().split(',')
            let d_value = newValue[0].split('/').reverse().join('-')
            let t_value = newValue[1]
            if (d_value && t_value) {
                return (`${d_value}${t_value}`)
            }
        } else {
            return value
        }

    }

    // time difference
    dateDiffToString = (a, b) => {

        var diff = Math.abs(a - b);

        var ms = diff % 1000;
        diff = (diff - ms) / 1000
        var ss = diff % 60;
        diff = (diff - ss) / 60
        var mm = diff % 60;
        diff = (diff - mm) / 60
        var hh = diff % 24;
        var days = (diff - hh) / 24

        return (`${days ? days + "d" : ""} ${hh}h ${mm}m ${ss}s`)

    }

    timeDiff = (first_seen) => {
        var today = new Date()
        var yest = new Date(first_seen)
        if (first_seen) {
            return this.dateDiffToString(yest, today)
        }
    }

    timeStyle = (label) => {
        var timeStyle = {
            backgroundColor: "#ff3b30",
            color: "#fff",
            paddingLeft: "1em",
            paddingRight: "1em",
            borderRadius: ".25em",
            fontWeight: "normal",
            paddingTop: "0.1em",
            paddingBottom: "0.1em"
        }

        if (label) {
            label === "success" && (timeStyle["backgroundColor"] = "#4cd964")
            label === "warning" && (timeStyle["backgroundColor"] = "#ffcc00")
        }
        return timeStyle
    }

    // Capitalize the first letter
    capitalizeFirstLetter = (str) => {
        return str.charAt(0).toUpperCase() + str.slice(1);
    }
    render() {
        const { toggleListView, pageNumber, searchValue, toggleAddModal, toggleDeleteModal, nullRouteId } = this.state;
        const { nullRoutes } = this.props;

        return (
            <Fragment>
                <CustomHeader
                    handleActivityLogView={this.handleActivityLogView}
                    handleSearchNullRouteClick={this.handleSearchNullRouteClick}
                    handleSearchNullRouteChange={this.handleSearchNullRouteChange}
                    handleAddModal={this.handleAddModal}
                    toggleListView={toggleListView}
                    searchValue={searchValue}
                    handleSearchKeyDown={this.handleSearchKeyDown}
                />
                {nullRoutes && (nullRoutes.isNullRouteLoading || nullRoutes.isLogLoading) ?
                    <Spinner />
                    :
                    <Card>
                        <CardHeader style={datastyle}>
                            <CardTitle style={{ fontSize: "1.1rem" }}>
                                {toggleListView ? searchValue ? `Null Route Activity Log (${searchValue})` : "Null Route Activity Log" : "Null Routes"}
                            </CardTitle>
                        </CardHeader>
                        <CardBody>
                            {toggleListView
                                ?
                                <Fragment>
                                    <Table striped responsive>
                                        <thead>
                                            <tr>
                                                <th>#</th>
                                                <th>Timestamp</th>
                                                <th>Modified By</th>
                                                <th>Null Route IP</th>
                                                <th>Tag</th>
                                                <th>Action</th>
                                            </tr>
                                        </thead>
                                        <tbody className="unpadding striped hover">
                                            {nullRoutes && nullRoutes.nullRouteLog && nullRoutes.nullRouteLog.data.length > 0 ?
                                                nullRoutes.nullRouteLog.data.map((value, index) => (
                                                    <tr key={index}>
                                                        <td>{searchValue ? index + 1 : value.index}</td>
                                                        {/* <td>{this.convertTimeStamp(value.created_at)}</td> */}
                                                        <td>{value.timestamp}</td>
                                                        <td>{value.modifiedby ? this.capitalizeFirstLetter(value.modifiedby) : null}</td>
                                                        <td><span onClick={() => this.handleSearchNullRouteClick(value.ip)} style={{ color: "blue", cursor: 'pointer' }}>{value.ip}</span></td>
                                                        <td>{value.tag}</td>
                                                        <td >
                                                            {
                                                                value.action_type === "ADD" ? <span style={addStyle}>{value.action_type}</span> :
                                                                    value.action_type === "EXP" ? <span style={expStyle}>{value.action_type}</span> : <span style={delStyle}>{value.action_type}</span>}
                                                            {`  ${value.action}`}
                                                        </td>
                                                    </tr>
                                                )) :
                                                <tr>
                                                    <td>There are no records to display</td>
                                                    <td></td>
                                                    <td></td>
                                                    <td></td>
                                                    <td></td>
                                                    <td></td>
                                                </tr>
                                            }
                                        </tbody>
                                    </Table>
                                    <ReactPaginate
                                        previousLabel={<ChevronLeft size={15} />}
                                        nextLabel={<ChevronRight size={15} />}
                                        breakLabel={"..."}
                                        breakClassName={"break-me"}
                                        pageCount={nullRoutes && nullRoutes.nullRouteLog && nullRoutes.nullRouteLog.total && this.countTotalPages(nullRoutes.nullRouteLog.total)}
                                        marginPagesDisplayed={2}
                                        pageRangeDisplayed={3}
                                        containerClassName={
                                            "vx-pagination icon-pagination pagination-end mt-2"
                                        }
                                        activeClassName={"active"}
                                        onPageChange={this.onNullRouteLogPageChange}
                                        forcePage={pageNumber - 1}
                                    />
                                </Fragment>

                                :

                                <Table striped style={{ width: "100%", tableLayout: "fixed" }}>
                                    <thead>
                                        <tr>
                                            <th style={{ width: "5%" }}>#</th>
                                            <th style={{ width: "15%" }}>IP Address</th>
                                            <th style={{ width: "20%" }}>First Seen</th>
                                            <th style={{ width: "15%" }}>Expires</th>
                                            <th style={{ width: "35%" }}>Notes</th>
                                            <th style={{ width: "10%" }}>Actions</th>
                                        </tr>
                                    </thead>
                                    <tbody className="unpadding striped hover">
                                        {nullRoutes && nullRoutes.allNullRoutes && nullRoutes.allNullRoutes.map((value, index) => (
                                            <tr key={index}>
                                                <td>{index + 1}</td>
                                                <td><span onClick={() => this.handleSearchNullRouteClick(value.ip)} style={{ color: "blue", cursor: 'pointer' }}>{value.ip}</span></td>
                                                <td>
                                                    <span style={this.timeStyle(value.label)}>
                                                        <BootstrapTooltip title={value.firstseen ? value.firstseen : ""} placement="top">
                                                            <span className="cursor-pointer">
                                                                {/* {this.timeDiff(value.firstseen)} */}
                                                                {/* {value.time_diff && value.time_diff} */}
                                                                {value.time_diff ? value.time_diff : "1s"}
                                                            </span>
                                                        </BootstrapTooltip>
                                                    </span>
                                                </td>
                                                <td>{value.expire === "0000-00-00 00:00:00" || value.expire === null ? "Never" :
                                                    <BootstrapTooltip title={value.expire ? value.expire : ""} placement="top">
                                                        {/* <span className="cursor-pointer">{this.timeDiff(value.expire)}</span> */}
                                                        <span className="cursor-pointer">{value.expiry}</span>
                                                    </BootstrapTooltip>
                                                }</td>
                                                <td>{value.pending === "TRUE" && <span style={this.timeStyle("warning")}>Pending</span>} {value.notes}</td>
                                                <td style={deletIconstyle}>
                                                    <span>
                                                        <Trash className="cursor-pointer mr-1" size={15} onClick={() => { (value.pending !== "TRUE") && this.deleteNullRoute(value.id) }} />
                                                    </span>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </Table>
                            }
                        </CardBody>
                    </Card>

                }
                {toggleAddModal &&
                    <IpwatchNullRouteAddModal
                        toggleAddModal={toggleAddModal}
                        closeAddModal={this.closeAddModal}
                        addNullRoute={this.props.addNullRoute}
                        nullRoutes={this.props.nullRoutes}
                        nullRouteAddedSucsess={nullRouteAddedSucsess}
                        warningMessage={warningMessage}
                        fillDataWarning={fillDataWarning}
                        validationMessage={validationMessage}
                    />
                }

                {toggleDeleteModal &&
                    <IpwatchNullRouteDeleteModal
                        toggleDeleteModal={toggleDeleteModal}
                        nullRouteId={nullRouteId}
                        closeDeleteModal={this.closeDeleteModal}
                        deleteNullRoute={this.props.deleteNullRoute}
                        nullRouteDeletedSuccess={nullRouteDeletedSuccess}
                        nullRoutes={nullRoutes} />
                }

                <ToastContainer />

            </Fragment>
        )


    }
}

const mapStateToProps = state => {
    return {
        nullRoutes: state.IpwatchNullRoute,
        paginateData: state.paginateData
    }
}

export default connect(mapStateToProps,
    {
        getNullRoutes,
        getNullRoutesActivityLog,
        getSearchedNullRoute,
        addNullRoute,
        deleteNullRoute,
        getPaginateData
    })(IpwatchNullRouteList)