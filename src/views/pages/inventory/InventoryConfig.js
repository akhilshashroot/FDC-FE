import React, { Fragment } from "react"
import { Button, Label, FormGroup, Row, Col, Form } from "reactstrap"
import Select from 'react-select';
import AccordionView from './AccordionView'
import { Plus, Eye, } from "react-feather"
import { connect } from "react-redux"
import { getInitialData } from "../../../redux/actions/data-list"
import { getInventaryProducts } from "../../../redux/actions/inventory"
import Sidebar from "./InventorySidebar"
import { toast, Zoom } from "react-toastify"
import "react-toastify/dist/ReactToastify.css"
import "../../../assets/scss/plugins/extensions/toastr.scss"
import classnames from "classnames"
import Inventorylogconfig from "./LogConfig"
import Spinner from "../../../components/@vuexy/spinner/Loading-spinner"

const CustomHeader = props => {
    return (
        <div style={{ marginBottom: "15px" }}>
            <Form>
                <Row>
                    <Col md="4" sm="12">
                        <FormGroup style={{ width: "fitContent" }}>
                            <Label className="label" for="tech_location">Locations</Label>
                            <Select
                                placeholder="Select"
                                value={props.makeLocationSelect ? props.makeLocationSelect : props.selectedOption}
                                onChange={props.handleChange}
                                options={props.convertLocation(props.locationData)}
                                isSearchable={true}
                            />
                        </FormGroup>
                    </Col>
                    {props.showBtns === false &&
                        <Col md="6" sm="12">
                            <Fragment>
                                <p style={{ marginTop: "27px", color: "red" }}>* Please Select a Location</p>
                            </Fragment>
                        </Col>
                    }
                    {props.showBtns &&
                        <Col md="6" sm="12">
                            <Fragment>
                                <Button
                                    className=""
                                    style={{ marginTop: "15px" }}
                                    color="primary"
                                    onClick={() => props.handleSidebar(true, true)}
                                    outline>
                                    <Plus size={15} style={{ marginRight: "5px" }} />
                                    <span className="align-middle">Add New</span>
                                </Button>
                                <Button
                                    className="add-new-btn inventory-button"
                                    style={{ marginLeft: "15px", marginTop: "15px" }}
                                    color="primary"
                                    onClick={() => props.toggleLogModal()}
                                    outline>
                                    <Eye size={15} style={{ marginRight: "5px" }} />
                                    <span className="align-middle">View Log</span>
                                </Button>
                            </Fragment>
                        </Col>
                    }
                </Row>
            </Form>
        </div>
    )
}

// const notifyInfo = () => toast.info("Inventory Updated Successfully", { transition: Zoom })
const notifyWarning = () => toast.warning("Please fill mandatory fields!.", { transition: Zoom })
const notifyAdded = () => toast.success("Inventory Product Added Successfully", { transition: Zoom })
const notifyError = () => toast.warning("Something went wrong.Please try again..", { transition: Zoom })
const notifyAlreadyExist = () => toast.warning("Inventory product already exist", { transition: Zoom })

class InventoryConfig extends React.PureComponent {
    state = {
        modal: false,
        toggleInvLog: false,
        data: [],
        totalPages: 0,
        currentPage: 0,
        allData: [],
        value: "",
        rowsPerPage: 4,
        sidebar: false,
        currentData: null,
        selected: [],
        totalRecords: 0,
        sortIndex: [],
        addNew: "",
        showBtns: JSON.parse(localStorage.getItem('loc_data')) ? true : false,
        selectedOption: JSON.parse(localStorage.getItem('loc_data')) && JSON.parse(localStorage.getItem('loc_data'))
    }

    componentDidMount() {
        if (this.props.dataList && this.props.dataList.allData && this.props.dataList.allData.length === 0) {
            this.props.getInitialData();
        }
        // if (this.state.showBtns && this.props.inventoryList && this.props.inventoryList.inventoryData) {
        //     let locObj = JSON.parse(localStorage.getItem('loc_data'));
        //     locObj && this.props.getInventaryProducts(locObj.value, false)
        // }else{
        //     let locObj = JSON.parse(localStorage.getItem('loc_data'));
        //     locObj && this.props.getInventaryProducts(locObj.value, true)
        // }

        let locObj = JSON.parse(localStorage.getItem('loc_data'));
        locObj && this.props.getInventaryProducts(locObj.value, true);
    }

    handleChange = selectedOption => {
        // localStorage.setItem("loc_id", selectedOption.value)
        // localStorage.setItem("loc_name", selectedOption.label)
        localStorage.setItem('loc_data', JSON.stringify(selectedOption));
        localStorage.removeItem("l_s");
        localStorage.removeItem("tab");
        this.props.getInventaryProducts(selectedOption.value, true)
        this.setState({ selectedOption: selectedOption, showBtns: true });
    };

    convertLocation = data => {
        var locationData = []
        data && data.forEach((value) => {
            locationData.push({ "label": value.location, "value": value.id })
        })
        return locationData
    }

    handleSidebar = (boolean, addNew = false) => {
        this.setState({ sidebar: boolean })
        if (addNew === true) { this.setState({ currentData: null, addNew: true }) }
    }


    handleCurrentData = obj => {
        this.setState({ currentData: obj })
        this.handleSidebar(true)
    }


    toggleLogModal = () => {
        this.setState({ toggleInvLog: !this.state.toggleInvLog })
    }


    checkLocationExist = () => {
        var locObj = JSON.parse(localStorage.getItem('loc_data'));
        if (locObj) {
            // let label = localStorage.getItem('loc_name') || null
            // let value = localStorage.getItem('loc_id') || null
            let selected_location = locObj
            return selected_location
        }
    }


    render() {
        let {
            rowsPerPage,
            currentData,
            sidebar,
            totalRecords,
            sortIndex,
            selectedOption,
            showBtns,
            toggleInvLog
        } = this.state

        if (this.props.inventoryList && this.props.inventoryList.isInventoryLoading) {
            return <Spinner />
        } else {
            return (
                <div className={`data-list list-view`}>
                    {/*  Header Module */}
                    <CustomHeader
                        handleSidebar={this.handleSidebar}
                        rowsPerPage={rowsPerPage}
                        total={totalRecords}
                        index={sortIndex}
                        handleChange={this.handleChange}
                        convertLocation={this.convertLocation}
                        locationData={this.props.dataList && this.props.dataList.allData}
                        showBtns={showBtns}
                        toggleLogModal={this.toggleLogModal}
                        makeLocationSelect={this.checkLocationExist()}
                    />

                    {/* Inventory List Module */}
                    {showBtns &&
                        <AccordionView selectedOption={selectedOption} />
                    }

                    {/* Inventory Add Module */}
                    {sidebar &&
                        <Sidebar
                            show={sidebar}
                            data={currentData}
                            handleSidebar={this.handleSidebar}
                            addNew={this.state.addNew}
                            AddMessage={notifyAdded}
                            inCompleteData={notifyWarning}
                            selectedOption={selectedOption}
                            notifyError={notifyError}
                            notifyAlreadyExist={notifyAlreadyExist}
                        />
                    }

                    {/* Log Module */}
                    {toggleInvLog &&

                        <Inventorylogconfig
                            toggleInvLog={toggleInvLog}
                            toggleLogModal={this.toggleLogModal}
                            selectedLocation={this.state.selectedOption && this.state.selectedOption.value}
                            location={this.state.selectedOption && this.state.selectedOption.label}
                        />
                    }
                    <div
                        className={classnames("data-list-overlay", {
                            show: sidebar
                        })}
                        onClick={() => this.handleSidebar(false, true)}
                    />
                </div>
            )
        }
    }
}

const mapStateToProps = state => {
    return {
        dataList: state.dataList,
        inventoryList: state.inventoryList
    }
}

export default connect(mapStateToProps, {
    getInitialData,
    getInventaryProducts
})(InventoryConfig)