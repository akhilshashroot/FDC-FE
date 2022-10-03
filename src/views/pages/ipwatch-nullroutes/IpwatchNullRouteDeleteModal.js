import React, { Fragment } from 'react'
import {
    Button,
    Modal,
    ModalHeader,
    ModalBody,
    ModalFooter
} from "reactstrap"

class IpwatchNullRouteDeleteModal extends React.PureComponent {

    toggleModal = () => {
        this.props.closeDeleteModal()
    }

    deleteNullRouteData = () => {
        this.props.deleteNullRoute(this.props.nullRouteId).then(() => {
            if (this.props.nullRoutes && this.props.nullRoutes.nullRouteDeleteSuccess) {
                this.props.nullRouteDeletedSuccess(this.props.nullRoutes.nullRouteDeleteSuccess)
            } else {
                this.props.nullRouteDeletedSuccess("The null route ID provided is already pending deletion.")
            }

            this.props.closeDeleteModal()
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
                        Delete Null Route
                    </ModalHeader>
                    <ModalBody>
                        <h5>Are you sure you want to delete this Null Route?</h5>
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

export default IpwatchNullRouteDeleteModal