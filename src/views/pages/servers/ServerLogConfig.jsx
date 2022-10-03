import React, { Component, Fragment } from "react"
import DataTable from "react-data-table-component"
import {
    Card, CardBody, CardHeader, CardTitle, Modal,
    ModalHeader, Button, ModalFooter,
    ModalBody, FormGroup
} from "reactstrap"
import { connect } from "react-redux"
import "../../../assets/scss/plugins/extensions/react-paginate.scss"
import "../../../assets/scss/pages/data-list.scss"
import { ToastContainer } from "react-toastify"
import "react-toastify/dist/ReactToastify.css"
import "../../../assets/scss/plugins/extensions/toastr.scss"
import "../../../assets/scss/plugins/forms/react-select/_react-select.scss"
import { fetchServerLogs, clearFetchServerLogData } from "../../../redux/actions/servers/"
import Spinner from "../../../components/@vuexy/spinner/Loading-spinner"

class ServerLogConfig extends Component {

    state = {
        modal: false,
        data: [],
        totalPages: 0,
        currentPage: 0,
        columns: [
            {
                name: "TIMESTAMP",
                selector: "logged_at",
                sortable: true,
                minWidth: "200px",
                maxWidth: "200px"
            },
            {
                name: "User",
                selector: "user_name",
                sortable: true,
                minWidth: "250px",
                maxWidth: "250px"
            },
            {
                name: "Server",
                selector: "label",
                sortable: true,
                minWidth: "200px",
                maxWidth: "200px"
            },
            {
                name: "Changes",
                selector: "action",
                sortable: true,
                Width: "500px",
                cell: row => (<span>{row.action} {row.variable} {row.old_record} <Fragment>{(row.old_record !== "") && <React.Fragment>to</React.Fragment>}</Fragment> {row.new_record}</span>)
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
        addNew: ""
    }

    thumbView = this.props.thumbView
    toggleModal = () => {
        this.setState(prevState => ({
            modal: !prevState.modal
        }), () => this.props.closeModal());
    }
    componentDidMount() {
        this.props.selectedSwitch ? this.props.fetchServerLogs(this.props.selectedSwitch) : this.props.clearFetchServerLogData()
    }

    locationdata = this.props.dataList
    render() {
        const cardheaderstyle = {
            backgroundColor: "#c7c4ec",
            paddingTop: "13px",
            paddingBottom: "7px",
        }
        const cardbodystyle = {
            paddingTop: "0px",
        }
        let {
            columns,
        } = this.state
        return (
            <Fragment>
                <Modal
                    isOpen={this.props.toggleLogModal}
                    toggle={this.toggleModal}
                    selectedvalue={this.props.selectedPort}
                    className="modal-xl"
                >
                    <ModalHeader toggle={this.toggleModal} className="bg-primary">
                        Server Log : {this.props.selectedLocation && this.props.selectedLocation.label} / {this.props.selectedPort && this.props.selectedPort.switch_label ? this.props.selectedPort.switch_label : this.props.selectedServer && this.props.selectedServer.label} / {this.props.selectedPort && this.props.selectedPort.label}
                    </ModalHeader>
                    <ModalBody >
                        {(this.props.serverlogList && this.props.serverlogList.isLoading) ? (
                            <Spinner color="primary" className="reload-spinner" />
                        ) : (
                                <FormGroup>
                                    <Card>
                                        <CardHeader style={cardheaderstyle}>
                                            <CardTitle className="mx-auto flex-column">Current Server Time: {this.props.serverlogList && this.props.serverlogList.fetchLogSucces && this.props.serverlogList.fetchLogSucces.data && this.props.serverlogList.fetchLogSucces.data.timestamp ? this.props.serverlogList.fetchLogSucces.data.timestamp : "N/A"}</CardTitle>
                                        </CardHeader>
                                        <CardBody style={cardbodystyle}>
                                            <div className={`server-list ${
                                                this.props.thumbView ? "thumb-view" : "list-view"
                                                }`}>
                                                <DataTable
                                                    data={(this.props.serverlogList && this.props.serverlogList.fetchLogSucces && this.props.serverlogList.fetchLogSucces.data && this.props.serverlogList.fetchLogSucces.data.server_info.server_log_models && this.props.serverlogList.fetchLogSucces.data.server_info.server_log_models.length > 0) ?
                                                        this.props.serverlogList.fetchLogSucces.data.server_info.server_log_models : []}
                                                    columns={columns}
                                                    noHeader />
                                            </div>
                                        </CardBody>
                                    </Card>
                                </FormGroup>
                            )}
                    </ModalBody>
                    <ModalFooter>
                        <Button className="add-new-btn" color="primary" onClick={this.toggleModal}>
                            <span className="align-middle">Close</span>
                        </Button>
                    </ModalFooter>
                </Modal>
                <ToastContainer />
            </Fragment>
        )
    }
}

const mapStateToProps = state => {
    return {
        serverlogList: state.ServerList
    }
}

export default connect(mapStateToProps, {
    fetchServerLogs,
    clearFetchServerLogData
})(ServerLogConfig)
