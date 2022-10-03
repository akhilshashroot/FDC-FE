import React, { Fragment } from "react"
import {
    Button,
    Modal,
    ModalHeader,
    ModalBody,
    ModalFooter,
} from "reactstrap"

class InventoryDeleteModal extends React.Component {



    toggleModal = () => {
        this.props.closeProductmodal()
    }

    DeleteInventory = (row) => {
        this.props.DeleteInventory(row.product_id).then(() => {
            if (this.props.inventoryList && this.props.inventoryList.deletedSuccess) {
                this.toggleModal()
                this.props.notifyDeleted();
                this.props.getInventaryProducts(this.props.selectedOption.value, false);
            } else {
                this.props.notifyError()
            }
        })
    }

    render() {
        return (
            <Fragment>
                <Modal
                    isOpen={this.props.toggleDeleteProductModal}
                    toggle={this.toggleModal}
                    className={this.props.className}
                >
                    <ModalHeader toggle={this.toggleModal}>
                        Delete Inventory Product
                    </ModalHeader>
                    <ModalBody>
                        <h5>Are you sure you want to delete this Inventory?</h5>
                    </ModalBody>
                    <ModalFooter>
                        <Button color="primary" onClick={(e) => this.DeleteInventory(this.props.invObj)}>
                            Delete
                        </Button>{" "}
                    </ModalFooter>
                </Modal>
            </Fragment>
        )
    }
}
export default InventoryDeleteModal
