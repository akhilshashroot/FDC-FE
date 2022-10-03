import React, { Fragment } from "react"
import {
    Button,
    Modal,
    ModalHeader,
    ModalBody,
    ModalFooter,
} from "reactstrap"

class ServerResourceModal extends React.Component {

    state = {
        modal: false
    }

    toggleModal = () => {
        this.setState(prevState => ({
            modal: !prevState.modal
        }))
    }

    DeleteResource = (value, type) => {
        this.props.DeleteServerResource(value.id, type).then(() => {
            if (this.props.serverList && this.props.serverList.deletedServerResource) {
                this.props.closeModal()
                this.props.serverList && this.props.serverList.deletedServerResource === "cpu" && this.props.deletedCpu();
                this.props.serverList && this.props.serverList.deletedServerResource === "ram" && this.props.deletedRam();
                this.props.serverList && this.props.serverList.deletedServerResource === "hdd" && this.props.deletedHdd();

            } else {
                this.props.errorMessage()
            }
        })
    }

    render() {
        return (
            <Fragment>
                <Modal
                    isOpen={this.props.toggleDeleteModal}
                    toggle={this.props.closeModal}
                    className={this.props.className}
                >
                    <ModalHeader toggle={this.props.closeModal}>
                        Delete Resource
                    </ModalHeader>
                    <ModalBody>
                        <h5>Are you sure you want to delete this Resource?</h5>
                    </ModalBody>
                    <ModalFooter>
                        <Button color="primary" onClick={(e) => this.DeleteResource(this.props.resourceValue, this.props.resourceType)}>
                            Delete
                        </Button>{" "}
                    </ModalFooter>
                </Modal>
            </Fragment>
        )
    }
}
export default ServerResourceModal