import React, { Fragment } from "react"
import {
    Button,
    Modal,
    ModalHeader,
    ModalBody,
    ModalFooter,
} from "reactstrap"

class UserDeleteModal extends React.Component {

    state = {
        modal: false
    }

    toggleModal = () => {
        this.setState(prevState => ({
            modal: !prevState.modal
        }))
    }

    DeleteUser = (row) => {
        this.props.DeleteUser(row.id).then(() => {
            if (this.props.userList && this.props.userList.deletedSuccess) {
                this.toggleModal()
                this.props.notifyDeleted();
                this.props.getUserData(false, this.props.pageNumber);
            } else {
                this.props.notifyError()
            }
        })
    }

    render() {
        return (
            <Fragment>
                <Modal
                    isOpen={this.state.modal}
                    toggle={this.toggleModal}
                    className={this.props.className}
                >
                    <ModalHeader toggle={this.toggleModal} className="bg-primary">
                        Delete User
                    </ModalHeader>
                    <ModalBody>
                        <h5>Are you sure you want to delete this user?</h5>
                    </ModalBody>
                    <ModalFooter>
                        <Button color="danger" onClick={(e) => this.toggleModal()}>
                            Cancel
                        </Button>{" "}
                        <Button color="primary" onClick={(e) => this.DeleteUser(this.props.userObj)}>
                            Delete
                        </Button>{" "}
                    </ModalFooter>
                </Modal>
            </Fragment>
        )
    }
}
export default UserDeleteModal
