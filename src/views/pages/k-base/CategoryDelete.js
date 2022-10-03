import React, { Fragment } from 'react'
import {
    Button,
    Modal,
    ModalHeader,
    ModalBody,
    ModalFooter
} from "reactstrap"

class CategoryDelete extends React.PureComponent {

    toggleModal = () => {
        this.props.toggleArticleDeleteModal()
    }

    deleteCategory = () => {
        this.props.Delete()
    }

    render() {
        let warningstyle = {
            fontWeight: "normal",
            fontSize: "small",
            lineHeight: "30px",
            padding: "8px 0" 
        }
        return (
            <Fragment>
                <Modal
                    isOpen={this.props.toggleDeleteModal}
                    toggle={this.toggleModal}
                    className="modal-dialog-centered"
                >
                    <ModalHeader
                        toggle={this.toggleModal}
                        className="bg-primary"
                    >
                        Category Article
                    </ModalHeader>
                    <ModalBody>
                        <span style={warningstyle}>Deleting this category will delete all the articles under this category. Do you want to continue?</span>
                    </ModalBody>
                    <ModalFooter>
                        <Button color="danger" onClick={this.toggleModal}>
                            Cancel
                        </Button>
                        <Button color="primary" onClick={this.deleteCategory}>
                            Delete
                        </Button>
                    </ModalFooter>
                </Modal>
            </Fragment>
        )
    }
}

export default CategoryDelete