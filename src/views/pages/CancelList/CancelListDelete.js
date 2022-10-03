import React, { Fragment } from 'react'
import {
    Button,
    Modal,
    ModalHeader,
    ModalBody,
    ModalFooter
  } from "reactstrap"

class CancelListDeleteModal extends React.PureComponent {

    toggleModal = () => {
        this.props.closeDeleteModal()
    }

    deleteCancelData = () => {
        this.props.deleteCancelItem(this.props.deleteitemid, this.props.pageno).then(()=>{
            if(this.props.CancelList && this.props.CancelList.cancelItemDeleteError){
                this.props.wentWrong()
            }
            else {
                this.props.cancelDeletedSuccess()
                this.props.closeDeleteModal()
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
                        Delete Cancel List Item
                    </ModalHeader>
                    <ModalBody>
                        <h5>Are you sure you want to delete this Item?</h5>
                    </ModalBody>
                    <ModalFooter>
                        <Button color="danger" onClick={this.toggleModal}>
                            Cancel
                        </Button>
                        <Button color="primary" onClick={this.deleteCancelData}>
                            Delete
                        </Button>
                    </ModalFooter>
                </Modal>
            </Fragment>
        )
    }
}

export default CancelListDeleteModal