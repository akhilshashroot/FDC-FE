import React, { Fragment } from "react"
import {
    Button,
    Modal,
    ModalHeader,
    ModalBody,
    ModalFooter,
} from "reactstrap"

class ServerDeleteModal extends React.Component {

    state = {
        modal: false,
        childSwitch: ""
    }

    componentDidMount() {
        this.props.toggleDeleteModal && this.setState({ modal: true })
        if (this.props.selectedSwitch) {
            this.setState({ childSwitch: { "label": this.props.selectedSwitch.label, "value": this.props.selectedSwitch.id } })
        }
    }



    toggleModal = () => {
        this.setState(prevState => ({
            modal: !prevState.modal
        }), () => this.props.closeModal());
    }

    DeleteServerData = (row) => {
        var childSwitchId = this.state.childSwitch && this.state.childSwitch.value;
        if (this.props.delType === "port") {
            this.props.DeletePort(row.port_id, childSwitchId).then(() => {
                if (this.props.serverList && this.props.serverList.deletedPortSuccess) {
                    this.toggleModal()
                    this.props.notifyPortDeleted();
                } else {
                    this.props.notifyError()
                }
            })
        } else {
            var server_ID = row.server_id
            var pageNumber = this.props.pageNumber
            var location_ID = this.props.selectedLocation ? this.props.selectedLocation.value : ""
            this.props.DeleteServer(server_ID, childSwitchId, this.props.tab_selection, location_ID, pageNumber).then(() => {
                if (this.props.serverList && this.props.serverList.deletedServerSuccess) {
                    this.toggleModal()
                    this.props.notifyServerDeleted();
                } else {
                    this.props.notifyError()
                }
            })
        }

    }

    render() {
        return (
            <Fragment>
                <Modal
                    isOpen={this.props.toggleDeleteModal}
                    toggle={this.toggleModal}
                    className={this.props.className}
                >
                    <ModalHeader className="bg-primary" toggle={this.toggleModal}>
                        {this.props.delType === "port" ? "Delete Port" : "Delete Server"}
                    </ModalHeader>
                    <ModalBody>
                        {this.props.delType === "port" ?
                            <h5>Are you sure you want to delete this Port?</h5>
                            :
                            <h5>Are you sure you want to delete this Server?</h5>
                        }

                    </ModalBody>
                    <ModalFooter>
                        <Button color="danger" onClick={() => this.toggleModal()}>
                            Cancel
                    </Button>{" "}
                        <Button color="primary" onClick={(e) => this.DeleteServerData(this.props.serverObj)}>
                            Delete
                        </Button>{" "}
                    </ModalFooter>
                </Modal>
            </Fragment>
        )
    }
}
export default ServerDeleteModal
