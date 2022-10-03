import React from 'react';
import {
    Button, Modal, ModalHeader, ModalBody, ModalFooter, Input,
    Form, FormGroup, Col, Label
} from 'reactstrap';
import { connect } from 'react-redux';
import { pduDelete, updatePdu } from "../../../redux/actions/pdu";
import { toast, Zoom } from "react-toastify";
// import { useSelector } from 'react-redux';


class PduAction extends React.Component {
    state = {
        port: ""
    }
    componentDidMount() {
        if (this.props.type === "update" && this.props.pduData && this.props.pduData.port) {
            this.setState({ port: this.props.pduData.port });
        }
    }

    pduAction = () => {
        if (this.props.pduData && this.props.pduData.id) {
            if (this.props.type === "update") {
                if (this.state.port) {
                    this.props.updatePdu(this.props.pduData.id, this.state.port, this.props.sel_loc_id, this.props.pageNumber)
                        .then(() => {
                            if (this.props.pduUpdated) {
                                this.props.toggleDeleteModal();
                                toast.success("PDU Updated Successfully", { transition: Zoom });
                            } else {
                                if (this.props.pduUpdatedError) {
                                    toast.warning(this.props.pduUpdatedError, { transition: Zoom })
                                    // if (this.props.pduUpdatedError.message && this.props.pduUpdatedError.errors) {
                                    //     let errors = this.props.pduUpdatedError.errors;
                                    //     for (let i in errors) {
                                    //         toast.warning(errors[i][0], { transition: Zoom })
                                    //     }
                                    // }
                                } else {
                                    toast.error("Something Went Wrong. Please Try Again Later", { transition: Zoom })
                                }
                            }
                        });
                } else {
                    toast.warning("The Field Is Required.", { transition: Zoom });
                }

            } else {
                this.props.pduDelete(this.props.pduData.id, this.props.sel_loc_id, this.props.pageNumber).then(() => {
                    this.props.toggleDeleteModal();
                    toast.success("PDU Deleted Successfully", { transition: Zoom });
                })
            }


        }
    }
    render() {
        const { deletModal, toggleDeleteModal, type } = this.props;
        const { port } = this.state;
        return (
            <>
                <Modal
                    isOpen={deletModal}
                    toggle={toggleDeleteModal}
                    className="modal-md"
                >
                    <ModalHeader
                        className="bg-primary"
                    >
                        {type === "update" ? "Update PDU" : "Delete PDU"}
                    </ModalHeader>
                    <ModalBody>
                        {
                            type === "update" ?
                                <Form>
                                    <FormGroup row>
                                        <Label for="Port" sm={2}>Port</Label>
                                        <Col sm={10}>
                                            <Input
                                                type="text"
                                                name="port"
                                                id="port"
                                                placeholder="Port"
                                                value={port ? port : ""}
                                                onChange={(e) => this.setState({ port: e.target.value })} />
                                        </Col>
                                    </FormGroup>
                                </Form>
                                :
                                <h5>Are you sure you want to delete this PDU ?</h5>
                        }

                    </ModalBody>
                    <ModalFooter>
                        <Button color="danger" onClick={toggleDeleteModal}>
                            Cancel
                        </Button>
                        <Button color="primary" onClick={this.pduAction}>
                            {type === "update" ? "Update" : "Delete"}
                        </Button>
                    </ModalFooter>
                </Modal>
            </>
        )
    }

}

const mapStateToProps = state => {
    const { isPduUpdating, pduUpdated, pduUpdatedError, isPduDelete, pduDeleted, pduDeletedError } = state.pduList;
    return {
        isPduUpdating,
        pduUpdated,
        pduUpdatedError,
        isPduDelete,
        pduDeleted,
        pduDeletedError
    }
}

export default connect(mapStateToProps, { pduDelete, updatePdu })(PduAction)