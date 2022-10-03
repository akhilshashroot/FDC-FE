import React, { Fragment } from "react"
import {
    Col, Button, Form, FormGroup, Input,
    Modal,
    ModalBody,
    ModalFooter,
    ModalHeader,
    Alert
} from "reactstrap"
import Select from 'react-select';
import Spinner from "../../../components/@vuexy/spinner/Loading-spinner"
import Flatpickr from "react-flatpickr";
import "flatpickr/dist/themes/light.css";
import "../../../assets/scss/plugins/forms/flatpickr/flatpickr.scss"
import { performRequest } from '../../../services/index';

class WebfinderAddShoppingModal extends React.PureComponent {
    state = {
        firstRender: true,
        selectedLocation: null,
        isLoading: false,
        service_id: null,
        date: null,
        notes: null,
        isValid: null,
        locationMessage: "",
        isSIDValid: false
    }

    componentDidMount() {
        if (this.props.toggleAddModal) {
            
            if (this.props.CancelListLocations && this.props.CancelListLocations.allData && !this.props.CancelListLocations.allData.length > 0) {
              
                this.props.GetCancelListLocations().then(() => {
                    this.setState({ isLoading: true })
                    if (this.props.data == null) {
                
                        this.setState({
                            // selectedLocation: { "label": this.props.CancelListLocations.allData[0].location, "value": this.props.CancelListLocations.allData[0].loc_short },
                        })
                    }

                    else if (this.props.data !== null) {
                     
                        var loc = this.props.CancelListLocations.allData.find((value) => value.loc_short === this.props.data.location) 
                        // var loc = {}                      
                        // loc.loc_short = this.props.data.location 
                        // console.log(this.props.CancelListLocations.allData.find((value) => value.loc_short === this.props.data.location))
                                                
                        if (loc)  {
                            var location = { "label": loc.location, "value": loc.loc_short }  
                            var date = new Date(this.props.data.date)
                            this.setState({
                                selectedLocation: location,
                                service_id: this.props.data.sid,
                                date: date,
                                notes: this.props.data.notes
                            })
                           }  
                    }
                })
            }
            else {
                this.setState({ isLoading: true })
                if (this.props.data == null) {
                    this.setState({
                        // selectedLocation: { "label": this.props.CancelListLocations.allData[0].location, "value": this.props.CancelListLocations.allData[0].loc_short },
                    })
                }
                else if (this.props.data !== null) {
                    var loc = this.props.CancelListLocations.allData.find((value) => value.loc_short === this.props.data.location) 
                    // var loc = {}                      
                    // loc.loc_short = this.props.data.location 
                    // console.log(this.props.CancelListLocations.allData.find((value) => value.loc_short === this.props.data.location))
                           if (loc)  {
                            var location = { "label": loc.location, "value": loc.loc_short }  
                            var date = new Date(this.props.data.date)
                            this.setState({
                                selectedLocation: location,
                                service_id: this.props.data.sid,
                                date: date,
                                notes: this.props.data.notes
                            })
                           }               
                    
                }
            }
        }
    }


    toggleModal = () => {
        this.props.closeAddModal()
    }

    handleLocationChange = selectedLocation => {
        this.setState(() => ({
            selectedLocation: selectedLocation
        }), () => this.locationValidation());
    }

    locationValidation = () => {
        if (this.state.selectedLocation.value === "") {
            this.setState({
                isValid: true,
                locationMessage: "Please select a valid location!"
            })
        }
        else {
            this.setState({
                isValid: false,
                locationMessage: ""
            })
        }
    }

    converLocation = data => {
        var locationData = []
        data && data.forEach((value) => {
            locationData.push({ "label": value.location, "value": value.loc_short })
        })
        return locationData
    }

    formatDate(date) {
        var d = new Date(date),
            month = '' + (d.getMonth() + 1),
            day = '' + d.getDate(),
            year = d.getFullYear();
        if (month.length < 2) month = '0' + month;
        if (day.length < 2) day = '0' + day;

        var date = [year, month, day].join('-');
        return date
    }

    ChangeServiceID = () => {
        this.setState({
            isSIDValid: false
        })
        if (this.props.data === null) {
            const token_value = localStorage.getItem('token') || null;
            const headers = {
                'Accept': 'application/json',
                'Authorization': `Bearer ${token_value}`
            };
            let url = `/api/iw/cancel/sid/${this.state.service_id}`;
            this.setState({ loading: true })
            performRequest('get', url, headers)
                .then((response) => {
                    if (response.status === 200) {
                        if (response.data.response_code === 200) {
                            if (true) {
                                var location = null
                                var date = null
                                if (response.data.data.location !== null) {
                                    var loc = this.props.CancelListLocations.allData.find((value) => value.loc_short === response.data.data.location)
                                    location = { "label": loc.location, "value": loc.loc_short }
                                    // var loc = {}
                                    // loc.loc_short = this.props.data.location
                                    // var location = { "label": loc.loc_short, "value": loc.loc_short }
                                }
                                if (response.data.data.location !== "") {
                                    date = new Date(response.data.data.date)
                                }
                                this.setState({
                                    selectedLocation: location,
                                    date: date,
                                    notes: response.data.data.notes
                                })
                            }
                        } else {
                            this.setState({ isSIDValid: true })
                        }
                    }
                })
                .catch((error) => {
                    // this.setState({ isSIDValid: true })
                })
        }
    }



    submitCancelItem = () => {
        if (this.props.data !== null) {
            let data = {};
            if (this.state.selectedLocation !== null) {
                data.location = this.state.selectedLocation.value;
            }
            data.sid = this.state.service_id;
            if (Array.isArray(this.state.date)) {
                data.date = this.formatDate(this.state.date[0]);
            }
            else {
                data.date = this.formatDate(this.state.date);
            }
            data.notes = this.state.notes;
            if ((data.location === "" || data.sid === "" || this.state.date === "") || (data.location === null || data.sid === null || this.state.date === null)) {
                this.props.emptyAllFields()
            }
            else {
                this.props.updateCancelItem(this.props.data.id, data, this.props.pageno).then(() => {
                    if (this.props.CancelList && this.props.CancelList.cancelItemUpdateError) {
                        if (this.props.CancelList.cancelItemUpdateError.data && this.props.CancelList.cancelItemUpdateError.data.errors &&
                            this.props.CancelList.cancelItemUpdateError.data.errors.sid) {
                            this.props.CancelList.cancelItemUpdateError.data.errors.sid && this.props.CancelList.cancelItemUpdateError.data.errors.sid[0] === "The sid has already been taken." && this.props.siddup();
                            this.props.CancelList.cancelItemUpdateError.data.errors.sid && this.props.CancelList.cancelItemUpdateError.data.errors.sid[0] === "The sid field is required." && this.props.emptyServiceIdField();
                        }
                        else {
                            this.props.wentWrong()
                        }
                    }
                    else if (this.props.CancelList && this.props.CancelList.cancelItemUpdate) {
                        this.props.cancelItemUpdated()
                        this.props.closeAddModal()
                    }
                })
            }
        }
        else {
            let data = {};
            if (this.state.selectedLocation !== null) {
                data.location = this.state.selectedLocation.value;
            }
            data.sid = this.state.service_id;
            if (Array.isArray(this.state.date)) {
                data.date = this.formatDate(this.state.date[0]);
            }
            else {
                data.date = this.formatDate(this.state.date);
            }
            data.notes = this.state.notes;
            if ((this.state.selectedLocation === "" || data.sid === "" || this.state.date === "") || (this.state.selectedLocation === null || data.sid === null || this.state.date === null)) {
                this.props.emptyAllFields()
            }
            else {
                if (this.state.isSIDValid === false) {
                    this.props.addCancelItem(data, this.props.pageno).then(() => {
                        if (this.props.CancelList && this.props.CancelList.cancelItemAddError) {
                            if (this.props.CancelList.cancelItemAddError.sid || this.props.CancelList.cancelItemAddError.location ||
                                this.props.CancelList.cancelItemAddError.date) {
                                this.props.CancelList.cancelItemAddError.sid && this.props.CancelList.cancelItemAddError.sid[0] === "The sid has already been taken." && this.props.siddup();
                                this.props.CancelList.cancelItemAddError.sid && this.props.CancelList.cancelItemAddError.sid[0] === "The sid field is required." && this.props.emptyServiceIdField();
                            }
                            else {
                                this.props.wentWrong()
                            }
                        }
                        else if (this.props.CancelList && this.props.CancelList.cancelItemAdd) {
                            this.props.cancelAddedSucsess()
                            this.props.closeAddModal()
                        }
                        else {
                            this.props.wentWrong()
                        }
                    })
                }
                else {
                    this.props.invalidSID()
                }
            }
        }

    }

    render() {
        const customStyles = {
            control: (base, state) => ({
                ...base,
                // state.isFocused can display different borderColor if you need it
                borderColor: state.selectProps.invalid ? "#ea5455" : "#d9d9d9",
                // overwrittes hover style
                '&:hover': {
                    borderColor: state.selectProps.invalid ? "#ea5455" : "#d9d9d9"
                }
            })
        }
        const { selectedLocation, service_id, date, notes, isValid, locationMessage, isSIDValid } = this.state
        const { data } = this.props
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
                        {data !== null ? "Update Canceled Service" : "Add Canceled Service"}
                    </ModalHeader>
                    <ModalBody>
                        {this.state.isLoading === false
                            ? (
                                <Spinner color="primary" className="reload-spinner" />
                            ) : (
                                <Form>
                                    <FormGroup row>
                                        <Col md="3">
                                            <span><b>Service ID</b> <span style={{ color: "red" }}>*</span></span>
                                        </Col>
                                        <Col md="9">
                                            <Input
                                                type="text"
                                                name="service_id"
                                                id="service_id"
                                                placeholder="Service ID"
                                                value={service_id || ""}
                                                onChange={(e) => { this.setState({ service_id: e.target.value }) }}
                                                onBlur={() => this.ChangeServiceID()}
                                            />
                                            {isSIDValid === true &&
                                                <Alert className="mt-1 mb-0" color='danger'>
                                                    <div className='alert-body'>
                                                        The provided service ID is not active.
                                                </div>
                                                </Alert>
                                            }
                                        </Col>
                                    </FormGroup>
                                    <FormGroup row>
                                        <Col md="3">
                                            <span><b>Location </b><span style={{ color: "red" }}>*</span></span>
                                        </Col>
                                        <Col md="9">
                                            <Select
                                                value={selectedLocation}
                                                onChange={this.handleLocationChange}
                                                options={this.converLocation(this.props.CancelListLocations && this.props.CancelListLocations.allData)}
                                                isSearchable={true}
                                                invalid={isValid}
                                                styles={customStyles}
                                            />
                                            {locationMessage && <span style={{ color: "red" }}> {locationMessage}</span>}
                                        </Col>
                                    </FormGroup>

                                    <FormGroup row>
                                        <Col md="3">
                                            <span><b>Date </b><span style={{ color: "red" }}>*</span></span>
                                        </Col>
                                        <Col md="9">
                                            <Flatpickr
                                                className="form-control"
                                                value={date}
                                                onChange={date => {
                                                    this.setState({ date: date });
                                                }}
                                            />
                                        </Col>
                                    </FormGroup>

                                    <FormGroup row>
                                        <Col md="3">
                                            <span><b>Notes </b><span style={{ color: "#737373" }}> (Optional)</span></span>
                                        </Col>
                                        <Col md="9">
                                            <Input
                                                type="textarea"
                                                name="notes"
                                                id="notes"
                                                placeholder="Notes"
                                                value={notes || ""}
                                                onChange={(e) => this.setState({ notes: e.target.value })}
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
                        <Button color="primary" onClick={this.submitCancelItem}>
                            {data !== null ? "Update" : "Submit"}
                        </Button>
                    </ModalFooter>
                </Modal>
            </Fragment>
        )
    }
}
export default WebfinderAddShoppingModal