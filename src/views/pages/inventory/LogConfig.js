import React, { Component, Fragment } from "react"
import DataTable from "react-data-table-component"
import { Card, CardBody, CardHeader, CardTitle, Col, Modal, ModalBody, ModalFooter, Button } from "reactstrap"
import { connect } from "react-redux"
import { fetchActivityLogs } from "../../../redux/actions/inventory/"
import Spinner from "../../../components/@vuexy/spinner/Loading-spinner"

class LogConfig extends Component {

    state = {
        columns: [
            {
                name: "TIMESTAMP",
                selector: "timestamp",
                sortable: true,
                minWidth: "20%",
                maxWidth: "20%"
            },
            {
                name: "User",
                selector: "name",
                sortable: true,
                minWidth: "20%",
                maxWidth: "20%"
            },
            {
                name: "Item",
                selector: "brand",
                sortable: true,
                minWidth: "40%",
                maxWidth: "40%",
                cell: row => (
                    <span>{row.manufacturer} {row.brand} {row.model} {row.size}</span>
                )
            },
            {
                name: "Changes",
                selector: "quantity",
                sortable: true,
                minWidth: "20%",
                maxWidth: "20%",
                cell: row => (<span>{row.old_quantity} <Fragment>{(row.old_quantity !== "") && <React.Fragment>to</React.Fragment>}</Fragment> {row.new_quantity}</span>)
            },

        ],
    }

    toggleModal = () => {
        this.props.toggleLogModal()
    }
    componentDidMount() {
        this.props.fetchActivityLogs(this.props.selectedLocation, true)
    }
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
                    isOpen={this.props.toggleInvLog}
                    toggle={this.toggleModal}
                    selectedvalue={this.state.selectedPort}
                    className="modal-xl"
                >
                    <ModalBody >
                        {(this.props.inventoryList && this.props.inventoryList.invLogLoading) ? (
                            <Spinner color="primary" className="reload-spinner" />
                        ) : (
                                <Card>
                                    <CardHeader style={cardheaderstyle}>
                                        <Col sm="4">
                                            <h4>Inventory Log : {this.props.location}</h4>
                                        </Col>
                                        <Col sm="8">
                                            <CardTitle >Current Server Time: {this.props.inventoryList && this.props.inventoryList.fetchLogSucces && this.props.inventoryList.fetchLogSucces.data && this.props.inventoryList.fetchLogSucces.data.timestamp}</CardTitle>
                                        </Col>
                                    </CardHeader>
                                    <CardBody style={cardbodystyle}>
                                        <div className="data-list">
                                            <DataTable
                                                data={this.props.inventoryList && this.props.inventoryList.fetchLogSucces && this.props.inventoryList.fetchLogSucces.data.logs}
                                                columns={columns}
                                                noHeader />
                                        </div>
                                    </CardBody>
                                </Card>
                            )}
                    </ModalBody>
                    <ModalFooter>
                        <Button className="add-new-btn" color="primary" onClick={this.toggleModal}>
                            <span className="align-middle">Close</span>
                        </Button>
                    </ModalFooter>
                </Modal>
            </Fragment>
        )
    }
}

const mapStateToProps = state => {
    return {
        inventoryList: state.inventoryList
    }
}

export default connect(mapStateToProps, {
    fetchActivityLogs
})(LogConfig)