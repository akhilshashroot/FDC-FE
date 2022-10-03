import React, { Fragment } from 'react'
import {
    Button,
    Modal,
    ModalHeader,
    ModalBody,
    ModalFooter
  } from "reactstrap"

class WebfinderShopingDeleteModal extends React.PureComponent {

    toggleModal = () => {
        this.props.closeDeleteModal()
    }

    deleteShoppingData = () => {
        this.props.deleteShoppingItem(this.props.deleteitemid).then(()=>{
            if(this.props.IpwatchShoppingList && this.props.IpwatchShoppingList.shoppingItemDeleteError){
                this.props.wentWrong()
            }
            else {
                this.props.shoppingDeletedSuccess()
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
                        Delete Shopping Item
                    </ModalHeader>
                    <ModalBody>
                        <h5>Are you sure you want to delete this Item?</h5>
                    </ModalBody>
                    <ModalFooter>
                        <Button color="danger" onClick={this.toggleModal}>
                            Cancel
                        </Button>
                        <Button color="primary" onClick={this.deleteShoppingData}>
                            Delete
                        </Button>
                    </ModalFooter>
                </Modal>
            </Fragment>
        )
    }
}

export default WebfinderShopingDeleteModal