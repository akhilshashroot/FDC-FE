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
        modal: false
    }

    componentDidMount() {
        this.props.toggleDeleteModal && this.setState({ modal: true })
    }



    toggleModal = () => {
        this.setState(prevState => ({
            modal: !prevState.modal
        }), () => this.props.closeModal());
    }

    DeleteServerData = (row) => {
        var server_ID = row.server_id
        this.props.DeleteServer(server_ID, false, false, false, false, false).then(() => {
            if (this.props.serverList && this.props.serverList.deletedServerSuccess) {
                this.toggleModal()
                this.props.notifyServerDeleted();

            } else {
                this.props.notifyError()
            }
        })
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
