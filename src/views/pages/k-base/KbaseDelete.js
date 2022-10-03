import React, { Fragment } from 'react'
import {
    Button,
    Modal,
    ModalHeader,
    ModalBody,
    ModalFooter
} from "reactstrap"

class KbaseDelete extends React.PureComponent {

    toggleModal = () => {
        this.props.toggleArticleDeleteModal()
    }

    deleteArticle = () => {
        this.props.deleteArticle(this.props.articleId).then(() => {
            if (this.props.kbaseList && this.props.kbaseList.articleDeleted) {
                this.props.UpdatedDetails()
                this.props.articleDeletedSuccess()
                this.props.toggleArticleDeleteModal()
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
                        Delete Article
                    </ModalHeader>
                    <ModalBody>
                        <h5>Are you sure to delete this Article?</h5>
                    </ModalBody>
                    <ModalFooter>
                        <Button color="danger" onClick={this.toggleModal}>
                            Cancel
                        </Button>
                        <Button color="primary" onClick={this.deleteArticle}>
                            Delete
                        </Button>
                    </ModalFooter>
                </Modal>
            </Fragment>
        )
    }
}

export default KbaseDelete