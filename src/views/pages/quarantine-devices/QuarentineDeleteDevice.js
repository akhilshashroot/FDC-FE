import React, { Fragment } from 'react'
import {
    Button,
    Modal,
    ModalHeader,
    ModalBody,
    ModalFooter
} from "reactstrap"

class QuarentineDeleteDevice extends React.PureComponent {

    toggleModal = () => {
        this.props.closeDeleteModal()
    }

    deleteDeviceData = () => {
        if (this.props.deleteAll) {
            this.props.deleteAllDeviceData()
                .then(() => {
                    if (this.props.QarentineDevices && this.props.QarentineDevices.allDeviceDeleteError) {
                        this.props.wentWrong()
                    }
                    else if (this.props.QarentineDevices && this.props.QarentineDevices.allDeviceDeleteError && this.props.QarentineDevices.allDeviceDeleteError.data === "Device not active.") {
                        this.props.deleteError()
                    }
                    else {
                        this.props.allDeviceDeletedSuccess()
                        this.props.closeDeleteModal()
                    }
                })
        } else {
            this.props.deleteDevice(this.props.deletedeviceid).then(() => {
                if (this.props.QarentineDevices && this.props.QarentineDevices.deviceDeleteError) {
                    this.props.wentWrong()
                }
                else if (this.props.QarentineDevices && this.props.QarentineDevices.deviceDeleteError && this.props.QarentineDevices.deviceDeleteError.data === "Device not active.") {
                    this.props.deleteError()
                }
                else {
                    this.props.data.splice(this.props.deleteindex, 1)
                    this.props.deviceDeletedSuccess()
                    this.props.closeDeleteModal()
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
                >
                    <ModalHeader
                        toggle={this.toggleModal}
                        className="bg-primary"
                    >
                        {this.props.deleteAll ? "Delete All Shopping Items" : "Delete Shopping Item"}
                    </ModalHeader>
                    <ModalBody>
                        <h5>{this.props.deleteAll ? "Are you sure you want to delete all this Devices ?" : "Are you sure you want to delete this Device ?"}</h5>
                    </ModalBody>
                    <ModalFooter>
                        <Button color="danger" onClick={this.toggleModal}>
                            Cancel
                        </Button>
                        <Button color="primary" onClick={this.deleteDeviceData}>
                            Delete
                        </Button>
                    </ModalFooter>
                </Modal>
            </Fragment>
        )
    }
}

export default QuarentineDeleteDevice