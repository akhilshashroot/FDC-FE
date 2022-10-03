import React, { Fragment } from 'react'
import {
    Button,
    Modal,
    ModalHeader,
    ModalBody,
    ModalFooter
} from "reactstrap"

class NonPayDeleteModal extends React.PureComponent {

    toggleModal = () => {
        this.props.toggleShipmentDeleteModal()
    }

    deleteNonPaymentData = () => {
        this.props.deleteNonPayment(this.props.shipmentId, this.props.pageNumber).then(() => {
            if (this.props.nonPay && this.props.nonPay.nonPaymentDeleted) {
                this.props.shipmentDeletedSuccess()
                this.props.toggleShipmentDeleteModal()
            } else {
                this.props.warningMessage()
            }

        })
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
                        Delete NonPayment
                    </ModalHeader>
                    <ModalBody>
                        <h5>Are you sure you want to delete this NonPayment?</h5>
                    </ModalBody>
                    <ModalFooter>
                        <Button color="danger" onClick={this.toggleModal}>
                            Cancel
                        </Button>
                        <Button color="primary" onClick={this.deleteNonPaymentData}>
                            Delete
                        </Button>
                    </ModalFooter>
                </Modal>
            </Fragment>
        )
    }
}

export default NonPayDeleteModal