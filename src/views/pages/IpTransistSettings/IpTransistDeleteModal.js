import React, { Fragment } from 'react'
import {
    Button,
    Modal,
    ModalHeader,
    ModalBody,
    ModalFooter
} from "reactstrap";
import { toast, Zoom } from "react-toastify";


const providerDeletedSuccess = () => toast.success("Provider Deleted Successfully", { transition: Zoom });
const wentWrong = () => toast.warning("Something Went Wrong", { transition: Zoom })

class IpTransistDeleteModal extends React.PureComponent {

    toggleModal = () => {
        this.props.handleDeleteModal()
    }

    handleProviderDelete = () => {
        if (this.props.data && this.props.data.id) {
            this.props.deleteIpTransitItem(this.props.data.id).then(() => {
                this.toggleModal();
                providerDeletedSuccess();
            })
        }
    }

    render() {
        return (
            <Fragment>
                <Modal
                    isOpen={this.props.toggleDeleteModal}
                    toggle={this.toggleModal}
                >
                    <ModalHeader
                        toggle={this.toggleModal}
                        className="bg-primary"
                    >
                        Delete Provider
                    </ModalHeader>
                    <ModalBody>
                        <h5>Are you sure you want to delete this provider?</h5>
                    </ModalBody>
                    <ModalFooter>
                        <Button color="danger" onClick={this.toggleModal}>
                            Cancel
                        </Button>
                        <Button color="primary" onClick={this.handleProviderDelete}>
                            Delete
                        </Button>
                    </ModalFooter>
                </Modal>
            </Fragment>
        )
    }
}

export default IpTransistDeleteModal