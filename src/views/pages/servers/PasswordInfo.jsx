import React from "react"
import {
    Modal,
    ModalHeader,
    ModalBody,
    FormGroup, Table, ModalFooter, Button
} from "reactstrap"
import { Eye } from "react-feather"
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css"
import "../../../assets/scss/plugins/extensions/editor.scss"

class PasswordInfo extends React.Component {
    state = {
        modal: false,
        logmodal: false,
    }
    PtoggleModal = () => {
        this.setState(prevState => ({
            modal: !prevState.modal
        }), () => this.props.closeModal());
    }
    

   
    render() {
        // console.log(this.props.selectedPort.ipmi_pwd,'pass')
        return (
            <React.Fragment>
                <Modal
                    isOpen={this.props.togglePassModal}
                    toggle={this.PtoggleModal}
                >
                    <ModalHeader toggle={this.PtoggleModal} className="bg-primary">
                    IPMI Password
                    </ModalHeader>
                    <ModalBody >
                        <FormGroup>
                            
                            
                                <div className="w-100 mt-3 d-flex justify-content-center">
                                {
                                        (localStorage.getItem("user_role") === "Sales") || (localStorage.getItem("user_role") === "Senior Sales")
                                            ?
                                            null
                                            :

                                            
                                                <h2>{this.props.selectedPort && this.props.selectedPort.ipmi_pwd}</h2>
                                            
                                    }

                                </div>
                          
                        </FormGroup>
                    </ModalBody>
                    {/* <ModalFooter>
                        <Button className="add-new-btn" color="info" onClick={this.goLogView}>
                            <Eye size={15} style={{ marginRight: "5px" }} />
                            <span className="align-middle">View Log</span>
                        </Button>
                    </ModalFooter> */}
                </Modal>

            </React.Fragment>
        )
    }
}

export default PasswordInfo
