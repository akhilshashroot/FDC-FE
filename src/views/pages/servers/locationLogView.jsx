import React, { Fragment } from "react"
import {
    Row, Col, Card, CardBody, Button,
    Modal,
    ModalBody,
    ModalFooter,
    CardHeader,
    CardTitle,
} from "reactstrap"
import DataTable from "react-data-table-component"
// import "../../../assets/scss/pages/data-list.scss"
import Spinner from "../../../components/@vuexy/spinner/Loading-spinner"
import { ChevronsDown } from "react-feather"

class LocationLogView extends React.Component {
    state = {
        modal: false,
        firstRender: true,
        columns: [
            {
                name: "TIMESTAMP",
                selector: "logged_at",
                sortable: true,
                minWidth: "25%",
                maxWidth: "25%"
            },
            {
                name: "User",
                selector: "user_name",
                sortable: true,
                minWidth: "20%",
                maxWidth: "20%"
            },
            {
                name: "Server",
                selector: "label",
                sortable: true,
                minWidth: "15%",
                maxWidth: "15%"
            },
            {
                name: "Changes",
                selector: "action",
                sortable: true,
                minWidth: "40%",
                maxWidth: "40%",
                cell: row => (<span>
                    {(row.action === "created") && `Created new server ${row.label}.`}
                    {(row.action === "changed") && <Fragment>Changed <b>{row.variable}</b> {(row.old_record !== "") && ` from ${row.old_record} `}
                        {(row.new_record !== "") && ` to ${row.new_record} `}</Fragment>
                    }
                    {(row.action === "moved") && <Fragment>Moved {(row.old_record !== "") && ` from ${row.old_record} `} {(row.new_record !== "") && ` to ${row.new_record} `}</Fragment>}
                    {(row.action === "updated") && <Fragment>Updated {(row.old_record !== "") ? ` from ${row.old_record} ` : ` from nothing `} {(row.new_record !== "") && ` to ${row.new_record} `}</Fragment>}
                {(row.action === "deleted") && <Fragment>Server {row.old_record} deleted.</Fragment>}
                </span>)
            },

        ],
        logData: [],
        totalPages: 0,
        startPage: 1,
        selectedPage: 0
    }

    componentDidMount() {
        if (this.props.showLocLog) {
            this.props.fetchLocationLog(this.props.selectedLocationId, this.state.startPage).then(() => {
                if (this.props.serverList && this.props.serverList.locationLogSuccess && this.props.serverList.locationLogSuccess.logs && this.props.serverList.locationLogSuccess.logs.data && this.props.serverList.locationLogSuccess.logs.data.length > 0) {
                    let pageCount = Math.ceil(parseInt(this.props.serverList.locationLogSuccess.logs.total) / (this.props.serverList.locationLogSuccess.logs.per_page));
                    this.setState(state => {
                        const logData = [...state.logData, ...this.props.serverList.locationLogSuccess.logs.data];
                        return { logData };
                    });
                    this.setState({ totalPages: pageCount, selectedPage: this.state.startPage })
                }
            })
            this.setState({ modal: true });
        }
    }

    onEditorStateChange = editorState => {
        this.setState({
            editorState
        })
    }

    toggleModal = () => {
        this.setState(prevState => ({
            modal: !prevState.modal
        }), () => this.props.closeLocationLogView())
    }

    loadMoreData = () => {
        let nextPageNumber = this.state.selectedPage + 1
        this.props.fetchLocationLog(this.props.selectedLocationId, nextPageNumber).then(() => {
            if (this.props.serverList && this.props.serverList.locationLogSuccess && this.props.serverList.locationLogSuccess.logs && this.props.serverList.locationLogSuccess.logs.data && this.props.serverList.locationLogSuccess.logs.data.length > 0) {
                this.setState(state => {
                    const logData = [...state.logData, ...this.props.serverList.locationLogSuccess.logs.data];
                    return { logData };
                });
                this.setState({ selectedPage: nextPageNumber })
            }
        })
    }


    render() {
        let { columns } = this.state
        const cardheaderstyle = {
            backgroundColor: "#c7c4ec",
            paddingTop: "13px",
            paddingBottom: "7px",
        }
        const cardbodystyle = {
            paddingTop: "0px",
        }
        return (
            <React.Fragment>
                <Modal
                    isOpen={this.props.showLocLog}
                    toggle={this.toggleModal}
                    className="modal-xl"
                >
                    {this.props.serverList && this.props.serverList.isLocationLogLoading ?
                        <Spinner />
                        :
                        <Fragment>
                            <ModalBody>

                                <Row>
                                    <Col sm="12">
                                        <Card>
                                            <CardHeader style={cardheaderstyle}>
                                                <Col sm="4">
                                                    <h4>Server Log : {this.props.location}</h4>
                                                </Col>
                                                <Col sm="8">
                                                    <CardTitle >Current Server Time: {this.props.serverList && this.props.serverList.locationLogSuccess && this.props.serverList.locationLogSuccess.timestamp}</CardTitle>
                                                </Col>
                                            </CardHeader>
                                            <CardBody className="text-center pt-0" style={cardbodystyle}>
                                                <div className={`server-list ${
                                                    this.props.thumbView ? "thumb-view" : "list-view"
                                                    }`}>
                                                    <DataTable
                                                        data={this.state.logData ? this.state.logData : []}
                                                        columns={columns}
                                                        noHeader />
                                                    {(this.state.selectedPage < this.state.totalPages) &&
                                                        <Button className="round mt-2" color="info" onClick={this.loadMoreData}>
                                                            <span className="align-middle">Load More</span>
                                                            <ChevronsDown size={15} style={{ marginRight: "5px" }}></ChevronsDown>
                                                        </Button>
                                                    }
                                                </div>
                                            </CardBody>
                                        </Card>
                                    </Col>
                                </Row>

                            </ModalBody>
                            <ModalFooter>
                                <Button className="add-new-btn" color="primary" onClick={this.toggleModal}>
                                    <span className="align-middle">Close</span>
                                </Button>
                            </ModalFooter>
                        </Fragment>
                    }
                </Modal>

            </React.Fragment>
        )
    }
}
export default LocationLogView