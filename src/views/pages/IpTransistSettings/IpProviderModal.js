import React, { Fragment } from "react";
import {
    Col, Button, Form, FormGroup, Input,
    Modal,
    ModalBody,
    ModalFooter,
    ModalHeader,
} from "reactstrap";
import Spinner from "../../../components/@vuexy/spinner/Loading-spinner";
import { toast, Zoom } from "react-toastify";

const providerAddSuccess = () => toast.success("Provider Added Successfully", { transition: Zoom });

const providerUpdatedSuccess = () => toast.info("Provider Updated Successfully", { transition: Zoom });
const emptyAllFields = () => toast.warning("Please Fill Required Field", { transition: Zoom });
const wentWrong = () => toast.warning("Something Went Wrong", { transition: Zoom });

class IpProviderModal extends React.PureComponent {
    state = {
        providerName: ""
    }

    componentDidMount() {
        if (this.props.data && this.props.data.name) {
            this.setState({ providerName: this.props.data.name });
        }
    }

    toggleModal = () => {
        this.props.handleToggleModal();
    }

    handleProviderSubmit = () => {
        if (this.state.providerName) {
            let sendData = {};
            sendData.name = this.state.providerName;

            if (this.props.data) {
                let id = this.props.data.id;
                this.props.updateIpTransitItem(id, sendData).then(() => {
                    if (this.props.ipTransitProviderUpdate && this.props.ipTransitProviderUpdate.response_code && this.props.ipTransitProviderUpdate.response_code === 200) {
                        this.toggleModal();
                        providerUpdatedSuccess();
                    } else {
                        wentWrong();
                    }
                })
            } else {
                this.props.addIpTransistProvider(sendData)
                    .then(() => {
                        if (this.props.ipTransitProviderAdd && this.props.ipTransitProviderAdd.response_code && this.props.ipTransitProviderAdd.response_code === 200) {
                            this.toggleModal();
                            providerAddSuccess();
                        } else {
                            wentWrong();
                        }
                    })
            }
        } else {
            emptyAllFields();
        }
    }

    render() {
        const { providerName } = this.state
        const { data } = this.props
        return (
            <Fragment>
                <Modal
                    isOpen={this.props.toggleModal}
                    toggle={this.toggleModal}
                    className="modal-dialog-centered modal-md"
                >
                    <ModalHeader
                        toggle={() => this.toggleModal()}
                        className="bg-primary"
                    >
                        {data ? "Update Provider" : "Add Provider"}
                    </ModalHeader>
                    <ModalBody>
                        {this.state.isLoading === false
                            ? (
                                <Spinner color="primary" className="reload-spinner" />
                            ) : (
                                <Form>
                                    <FormGroup row>
                                        <Col md="3">
                                            <span><b>Provider Name</b> <span style={{ color: "red" }}>*</span></span>
                                        </Col>
                                        <Col md="9">
                                            <Input
                                                type="text"
                                                name="providerName"
                                                id="providerName"
                                                placeholder="Provider Name"
                                                onChange={(e) => this.setState({ providerName: e.target.value })}
                                                value={providerName}
                                            />
                                        </Col>
                                    </FormGroup>

                                </Form>
                            )}
                    </ModalBody>
                    <ModalFooter>
                        <Button color="danger" onClick={this.toggleModal}>
                            Cancel
                        </Button>
                        <Button color="primary" onClick={this.handleProviderSubmit}>
                            {data ? "Update" : "Submit"}
                        </Button>
                    </ModalFooter>
                </Modal>
            </Fragment>
        )
    }
}
export default IpProviderModal