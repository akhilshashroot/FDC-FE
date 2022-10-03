import React, { Fragment } from 'react'
import {
    Button,
    Modal,
    ModalHeader,
    ModalBody,
    ModalFooter
} from "reactstrap"

class SwitchDelete extends React.PureComponent {

    toggleModal = () => {
        this.props.toggleSwitchDeleteModal()
    }

    // componentDidUpdate(prevProps, prevState){
    //     if(this.props.switchDetails && this.props.switchDetails.switchDeleted ){
    //         if(prevProps.switchDetails.switchDeleted !== this.props.switchDetails.switchDeleted){
    //             this.props.records.splice(this.props.index,1)
    //             this.props.departmentDeletedSuccess()
    //             this.toggleModal()
    //         }
    //     }
    // }

    deleteSwitch = () => {
        this.props.deleteSwitch(this.props.switchId).then(() => {
            if (this.props.switchDetails && this.props.switchDetails.switchDeleted) {
                if (this.props.location_all) {
                    this.props.getSwitchesData(this.props.currentPage, false);
                  } else {
                    this.props.GetLocationSwitchesView(this.props.sel_loc_id)
                }
                this.props.switchDeletedSuccess()
                this.props.toggleSwitchDeleteModal()
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
                        Delete Switch
                    </ModalHeader>
                    <ModalBody>
                        <h5>Are you sure to delete this Switch?</h5>
                    </ModalBody>
                    <ModalFooter>
                        <Button color="danger" onClick={this.toggleModal}>
                            Cancel
                        </Button>
                        <Button color="primary" onClick={this.deleteSwitch}>
                            Delete
                        </Button>
                    </ModalFooter>
                </Modal>
            </Fragment>
        )
    }
}

export default SwitchDelete