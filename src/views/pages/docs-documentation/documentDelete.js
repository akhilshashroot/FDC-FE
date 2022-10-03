import React, { Fragment } from 'react'
import {
    Button,
    Modal,
    ModalHeader,
    ModalBody,
    ModalFooter
} from "reactstrap"

class DocumentDelete extends React.PureComponent {

    toggleModal = () => {
        this.props.toggleDocDeleteModal()
    }


    deleteDocument = () => {
        this.props.deleteDocument(this.props.docId).then(() => {
            if (this.props.DocumentationList && this.props.DocumentationList.documentDeleted) {
                this.props.docsClick()
                this.props.DeletedSuccess()
                this.props.toggleDocDeleteModal()
            } else {
                this.props.Error()
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
                        Delete Document
                    </ModalHeader>
                    <ModalBody>
                        <h5>Are you sure to delete this Document?</h5>
                    </ModalBody>
                    <ModalFooter>
                        <Button color="danger" onClick={this.toggleModal}>
                            Cancel
                        </Button>
                        <Button color="primary" onClick={this.deleteDocument}>
                            Delete
                        </Button>
                    </ModalFooter>
                </Modal>
            </Fragment>
        )
    }
}

export default DocumentDelete