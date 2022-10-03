import React, { Fragment } from "react";
import {
    Col, Button, Form, FormGroup, Input,
    Modal,
    ModalBody,
    ModalFooter,
    ModalHeader,
    Alert
} from "reactstrap";
import Select from 'react-select';
import { getInitialData } from "../../../redux/actions/data-list";
import { addNonPayment, updateNonPayment } from '../../../redux/actions/nonPay';
import { connect } from 'react-redux';
import { performRequest } from '../../../services/index';
import Spinner from "../../../components/@vuexy/spinner/Loading-spinner"

class NonPayAddEditModal extends React.PureComponent {
    state = {
        tracking_number: "",
        selectedLocation: "",
        contents: "",
        locationDataArray: [],
        isSIDValid: false,
        serviceIdErrorMessage: "",
        isLoading: false
    }


    componentDidMount() {
        if (this.props.locationData && this.props.locationData.length === 0) {
            this.props.getInitialData().then(() => {
                let dat = this.getLocationdata()
                if (this.props.nonPaymentData && this.props.nonPaymentData.location) {
                    var found = dat && dat.find(element => element.value === this.props.nonPaymentData.location);
                    this.setState({ selectedLocation: found })
                }
                this.setState({ locationDataArray: dat })

            })
        } else {
            let dat = this.getLocationdata()
            if (this.props.nonPaymentData && this.props.nonPaymentData.location) {
                var found = dat && dat.find(element => element.value === this.props.nonPaymentData.location);
                this.setState({ selectedLocation: found })
            }
            this.setState({ locationDataArray: dat })
        }
        if (this.props.nonPaymentData) {
            if (this.props.nonPaymentData.sid) {
                this.setState({ tracking_number: this.props.nonPaymentData.sid })
            }
            if (this.props.nonPaymentData.notes) {
                this.setState({ contents: this.props.nonPaymentData.notes })
            }
        }
    }

    toggleModal = () => {
        this.props.toggleShipmentAddModal()
    }

    handleChange = selectedLocation => {
        this.setState({ selectedLocation });
    };

    getLocationdata = () => {
        var locationArray = []
        if (this.props.locationData) {
            this.props.locationData.forEach((data) => {
                let locValue = data.loc_short.toUpperCase()
                // let locLabel = `${data.location} (${data.iw_loc_desc}) (${data.loc_short.toUpperCase()})`
                let locLabel = `${data.location}`
                locationArray.push({ value: locValue, label: locLabel })
            })
            return locationArray

        } else {
            return locationArray
        }
    }

    addNonPayMethod = () => {
        if (this.state.selectedLocation && this.state.tracking_number) {
            let sendData = {}
            sendData.sid = this.state.tracking_number ? this.state.tracking_number : ""
            sendData.notes = this.state.contents.trim()
            sendData.location = this.state.selectedLocation && this.state.selectedLocation.value
            this.props.addNonPayment(sendData).then(() => {
                if (this.props.nonPay && this.props.nonPay.nonPaymentAddedSuccess) {
                    this.props.shipmentAddedMessage()
                    this.props.toggleShipmentAddModal()
                } else {
                    if (this.props.nonPay && this.props.nonPay.nonPaymentAddedError) {
                        if (this.props.nonPay.nonPaymentAddedError.sid) {
                            this.props.validationMessage(this.props.nonPay.nonPaymentAddedError.sid[0])
                        }

                    } else {
                        this.props.warningMessage()
                    }
                }
            })
        } else {
            this.props.requiredFieldMessage()
        }
    }

    updateNonPayMethod = () => {
        if (this.state.selectedLocation && this.state.tracking_number) {
            let shipmentId = this.props.nonPaymentData && this.props.nonPaymentData.id
            let sendData = {}
            this.props.nonPaymentData.sid !== this.state.tracking_number && (sendData.sid = this.state.tracking_number ? this.state.tracking_number : "")
            sendData.notes = this.state.contents.trim()
            sendData.location = this.state.selectedLocation && this.state.selectedLocation.value
            this.props.updateNonPayment(sendData, shipmentId, this.props.pageNumber).then(() => {
                if (this.props.nonPay && this.props.nonPay.nonPaymentUpdateSuccess) {
                    this.props.shipmentUpdateMessage()
                    this.props.toggleShipmentAddModal()
                } else {
                    if (this.props.nonPay && this.props.nonPay.nonPaymentUpdateError) {
                        if (this.props.nonPay.nonPaymentUpdateError.sid) {
                            this.props.validationMessage(this.props.nonPay.nonPaymentUpdateError.sid[0])
                        }

                    } else {
                        this.props.warningMessage()
                    }
                }
            })
        } else {
            this.props.requiredFieldMessage()
        }

    }

    ChangeServiceID = () => {
        this.setState({
            isSIDValid: false,
            serviceIdErrorMessage: "",
            isLoading: false
        })
        if (!this.props.nonPaymentData && this.state.tracking_number) {
            const token_value = localStorage.getItem('token') || null;
            const headers = {
                'Accept': 'application/json',
                'Authorization': `Bearer ${token_value}`
            };
            let url = `/api/iw/nonpay/sid/${this.state.tracking_number}`;
            this.setState({ isLoading: true })
            performRequest('get', url, headers)
                .then((response) => {
                    if (response.status === 200) {
                        this.setState({ isLoading: false });
                        if (response.data.response_code === 200) {
                            this.setState({ contents: response.data.data.notes });
                        } else {
                            if (response.data.response_code === 400) {
                                this.setState({ serviceIdErrorMessage: response.data.response_message, isSIDValid: true })
                            } else {
                                this.setState({ serviceIdErrorMessage: "Service Not Found.", isSIDValid: true })
                            }
                        }
                    }
                })
                .catch((error) => {
                    this.setState({ isLoading: false })
                    // this.setState({ isSIDValid: true })
                })
        }
    }

    render() {
        const { tracking_number, selectedLocation, contents, locationDataArray, isSIDValid, serviceIdErrorMessage, isLoading } = this.state
        const { nonPaymentData } = this.props
        const help_block = {
            display: "block",
            marginTop: "5px",
            marginBottom: "10px",
            color: "#737373"
        }
        return (
            <Fragment>
                <Modal
                    isOpen={this.props.toggleAddModal}
                    toggle={this.toggleModal}
                    className="modal-dialog-centered modal-lg"
                >
                    <ModalHeader
                        toggle={() => this.toggleModal()}
                        className="bg-primary"
                    >
                        {nonPaymentData ? "Edit NonPayment" : "Add NonPayment"}
                    </ModalHeader>
                    <ModalBody>
                        {
                            isLoading ?
                                <Spinner />
                                :
                                <Form>
                                    <FormGroup row>
                                        <Col md="4">
                                            <span>Service ID <span style={{ color: "red" }}>*</span> </span>
                                        </Col>
                                        <Col md="8">
                                            <Input
                                                type="number"
                                                name="tracking_number"
                                                id="tracking_number"
                                                placeholder="Service ID"
                                                autoComplete="off"
                                                value={tracking_number || ""}
                                                onChange={(e) => this.setState({ tracking_number: e.target.value })}
                                                onBlur={() => this.ChangeServiceID()}
                                            />
                                            {isSIDValid === true &&
                                                <Alert className="mt-1 mb-0" color='danger'>
                                                    <div className='alert-body'>
                                                        {serviceIdErrorMessage}
                                                    </div>
                                                </Alert>
                                            }

                                        </Col>

                                    </FormGroup>

                                    <FormGroup row>
                                        <Col md="4">
                                            <span>Location <span style={{ color: "red" }}>*</span></span>
                                        </Col>
                                        <Col md="8">
                                            <Select
                                                value={selectedLocation}
                                                onChange={this.handleChange}
                                                options={locationDataArray}
                                            />
                                        </Col>
                                    </FormGroup>

                                    <FormGroup row>
                                        <Col md="4">
                                            <span>Notes</span>
                                        </Col>
                                        <Col md="8">
                                            <Input
                                                type="textarea"
                                                name="contents"
                                                rows={4}
                                                id="contents"
                                                placeholder="Notes"
                                                value={contents || ""}
                                                onChange={(e) => { this.setState({ contents: e.target.value }) }}
                                            />
                                            <span style={help_block}>(Optional)</span>
                                        </Col>
                                    </FormGroup>


                                </Form>
                        }
                    </ModalBody>
                    <ModalFooter>
                        <Button color="danger" onClick={this.toggleModal}>
                            Cancel
                        </Button>
                        {nonPaymentData ?
                            <Button color="primary" onClick={this.updateNonPayMethod}>
                                Save
                            </Button>
                            :
                            <Button color="primary" onClick={this.addNonPayMethod} disabled={isLoading || isSIDValid}>
                                Add
                        </Button>
                        }
                    </ModalFooter>
                </Modal>
            </Fragment >
        )
    }
}
const mapStateToProps = state => {
    return {
        locationData: state.dataList.allData,
        nonPay: state.NonPay
    }
}

export default connect(mapStateToProps,
    {
        getInitialData,
        updateNonPayment,
        addNonPayment
    })(NonPayAddEditModal)