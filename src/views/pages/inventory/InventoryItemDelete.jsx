import React, { Fragment } from "react"
import {
    Button,
    Modal,
    ModalHeader,
    ModalBody,
    ModalFooter,
} from "reactstrap"

class InventoryItemDeleteModal extends React.Component {

    state = {
        modal: false
    }

    componentDidMount() {
        this.props.toggleDeleteModal && this.setState({ modal: true })
    }

    toggleModal = () => {
        this.setState(prevState => ({
            modal: !prevState.modal
        }), () => this.props.closeModal())
    }

    DeleteItemInventory = (row) => {
        this.props.DeleteInventoryItem(row.item_id).then(() => {
            if (this.props.inventoryList && this.props.inventoryList.deletedItemSuccess) {
                this.toggleModal()
                this.props.notifyDeleted();
                this.props.handleSidebar()
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
                    isOpen={this.props.toggleDeleteModal}
                    toggle={this.toggleModal}
                    className={this.props.className}
                >
                    <ModalHeader toggle={this.toggleModal}>
                        Delete Inventory Item
                    </ModalHeader>
                    <ModalBody>
                        <h5>Are you sure you want to delete this Inventory Item?</h5>
                    </ModalBody>
                    <ModalFooter>
                        <Button color="primary" onClick={(e) => this.DeleteItemInventory(this.props.invObj)}>
                            Delete
                        </Button>{" "}
                    </ModalFooter>
                </Modal>
            </Fragment>
        )
    }
}
export default InventoryItemDeleteModal
