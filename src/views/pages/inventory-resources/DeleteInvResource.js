import React, { Fragment } from "react"
import {
    Button,
    Modal,
    ModalHeader,
    ModalBody,
    ModalFooter,
} from "reactstrap"

class ServerInvResource extends React.Component {

    state = {
        modal: false
    }

    toggleModal = () => {
        this.setState(prevState => ({
            modal: !prevState.modal
        }))
    }

    DeleteResource = (value, type) => {
        if (type === "hardware") {
            this.props.DeleteHardware(value.id, type).then(() => {
                if (this.props.inventoryList && this.props.inventoryList.deletedHardwareSuccess) {
                    this.props.deletedHardware()
                    this.props.closeModal()

                } else if (this.props.inventoryList && this.props.inventoryList.deletedHardwareCopyError) {
                    this.props.usedHardware()
                }
                else {
                    this.props.errorMessage()
                }
            })
        }
        else if (type === "manufacture") {
            this.props.DeleteManufacture(value.id, type).then(() => {
                if (this.props.inventoryList && this.props.inventoryList.deletedManufactureSuccess) {
                    this.props.deletedManufacture()
                    this.props.closeModal()

                } else if (this.props.inventoryList && this.props.inventoryList.deletedManufactureCopyError) {
                    this.props.usedManufacture()
                }
                else {
                    this.props.errorMessage()
                }
            })
        }
        else if (type === "brand") {
            this.props.DeleteBrand(value.id, type).then(() => {
                if (this.props.inventoryList && this.props.inventoryList.deletedBrandSuccess) {
                    this.props.deletedBrand()
                    this.props.closeModal()

                } else {
                    this.props.errorMessage()
                }
            })
        }
        else if (type === "model") {
            this.props.DeleteModel(value.id, type).then(() => {
                if (this.props.inventoryList && this.props.inventoryList.deletedModelSuccess) {
                    this.props.deletedModel()
                    this.props.closeModal()

                } else {
                    this.props.errorMessage()
                }
            })
        }
        else if (type === "size") {
            this.props.DeleteSize(value.id, type).then(() => {
                if (this.props.inventoryList && this.props.inventoryList.deletedSizeSuccess) {
                    this.props.deletedSize()
                    this.props.closeModal()

                } else {
                    this.props.errorMessage()
                }
            })
        }

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
export default ServerInvResource