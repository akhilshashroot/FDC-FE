import React, { Fragment } from 'react'
import {
    Button,
    Modal,
    ModalHeader,
    ModalBody,
    ModalFooter
} from "reactstrap"

class IpwatchShipmentDeleteModal extends React.PureComponent {

    toggleModal = () => {
        this.props.toggleShipmentDeleteModal()
    }

    deleteNullRouteData = () => {
        this.props.deleteShipment(this.props.shipmentId, this.props.sorttype, this.props.mode, this.props.pageNumber).then(() => {
            if (this.props.shipments && this.props.shipments.shipmentDeleted) {
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
                        Delete Shipment
                    </ModalHeader>
                    <ModalBody>
                        <h5>Are you sure you want to delete this Shipment?</h5>
                    </ModalBody>
                    <ModalFooter>
                        <Button color="danger" onClick={this.toggleModal}>
                            Cancel
                        </Button>
                        <Button color="primary" onClick={this.deleteNullRouteData}>
                            Delete
                        </Button>
                    </ModalFooter>
                </Modal>
            </Fragment>
        )
    }
}

export default IpwatchShipmentDeleteModal