import React  from 'react';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import { connect } from 'react-redux';
import { deleteLocation } from '../../../redux/actions/data-list/index';
import { toast, Zoom } from "react-toastify";


const LocationDelete = (props) => {

    const deleteLocation = () => {
        if (props.location && props.location.id) {
            props.deleteLocation(props.location.id).then(() => {
                props.toggleDeleteModal();
                toast.success("Location Deleted Successfully", { transition: Zoom });
            })

        }
    }

    return (
        <>
            <Modal
                isOpen={props.deletModal}
                toggle={props.toggleDeleteModal}
                className="modal-md"
            >
                <ModalHeader
                    toggle={props.toggleDeleteModal}
                    className="bg-primary"
                >
                    Delete Location
                    </ModalHeader>
                <ModalBody>
                    <h5>Are you sure you want to delete all this Location ?</h5>
                </ModalBody>
                <ModalFooter>
                    <Button color="danger" onClick={props.toggleDeleteModal}>
                        Cancel
                        </Button>
                    <Button color="primary" onClick={deleteLocation}>
                        Delete
                        </Button>
                </ModalFooter>
            </Modal>
        </>
    )
}

const mapStateToProps = state => {
    const { deleteLocationSuccess } = state.dataList;
    return {
        deleteLocationSuccess
    }
}

export default connect(mapStateToProps, { deleteLocation })(LocationDelete)