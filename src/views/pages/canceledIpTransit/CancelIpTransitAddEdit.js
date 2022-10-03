import React, { Fragment } from "react"
import {
    Col, Button, Form, FormGroup, Input, Label,
    Modal,
    ModalBody,
    ModalFooter,
    ModalHeader,
    Alert,
} from "reactstrap"
import Select from 'react-select';
import Spinner from "../../../components/@vuexy/spinner/Loading-spinner"
import Flatpickr from "react-flatpickr";
import "flatpickr/dist/themes/light.css";
import "../../../assets/scss/plugins/forms/flatpickr/flatpickr.scss"
import { performRequest } from '../../../services/index';
import Checkbox from "../../../components/@vuexy/checkbox/CheckboxesVuexy"
import { Check } from "react-feather"

const statuslist = [
    { "label": "Active", "value": "active" },
    { "label": "Cancelled", "value": "cancelled" }
]

class CancelIpTransitAddEdit extends React.PureComponent {
    state = {
        firstRender: true,
        selectedLocation: null,
        isLoading: false,
        service_id: null,
        provider: null,
        circuit_id: null,
        circuit_type: null,
        client_id: null,
        status: { "label": "Cancelled", "value": "cancelled" },
        circuit_country: null,
        circuit_city: null,
        port_capacity: null,
        bandwidth_commit: null,
        activation_date: null,
        expiration_date: null,
        metered_charge: false,
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
                    if (this.props.providers && !this.props.providers.ipTransitProviderList) {
                        this.props.getIpTransistProviders().then(() => {
                            this.setState({ isLoading: true })
                            if (this.props.data == null) {
                                this.setState({
                                    // selectedLocation: { "label": this.props.CancelListLocations.allData[0].location, "value": this.props.CancelListLocations.allData[0].loc_short },
                                })
                            }
                            else if (this.props.data !== null) {
                                var sid = this.props.data.sid
                                var prov = this.props.providers.ipTransitProviderList.find((value) => value.name === this.props.data.provider)
                                var provider = { "label": prov.name, "value": prov.name }
                                var client_id = this.props.data.client_id
                                var stat = statuslist.find((value) => value.value === this.props.data.status)
                                var circuit_id = this.props.data.circuit_id
                                var circuit_type = this.props.data.circuit_type
                                var loc = this.props.CancelListLocations.allData.find((value) => value.location === this.props.data.circuit_country)
                                var circuit_country = { "label": loc.location, "value": loc.location }
                                var circuit_city = this.props.data.circuit_city
                                var port_capacity = this.props.data.port_capacity
                                var bandwidth = this.props.data.bandwidth
                                var activation_date = new Date(this.props.data.activation_date)
                                var expiration_date = new Date(this.props.data.expiration_date)
                                var notes = this.props.data.notes
                                var metered_charge = this.props.data.metered_charge
                                this.setState({
                                    service_id: sid,
                                    provider: provider,
                                    circuit_id: circuit_id,
                                    circuit_type: circuit_type,
                                    client_id: client_id,
                                    status: stat,
                                    circuit_country: circuit_country,
                                    circuit_city: circuit_city,
                                    port_capacity: port_capacity,
                                    bandwidth_commit: bandwidth,
                                    activation_date: activation_date,
                                    expiration_date: expiration_date,
                                    metered_charge: JSON.parse(metered_charge),
                                    notes: notes
                                })
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
                            var sid = this.props.data.sid
                            var prov = this.props.providers.ipTransitProviderList.find((value) => value.name === this.props.data.provider)
                            var provider = { "label": prov.name, "value": prov.name }
                            var client_id = this.props.data.client_id
                            var stat = statuslist.find((value) => value.value === this.props.data.status)
                            var circuit_id = this.props.data.circuit_id
                            var circuit_type = this.props.data.circuit_type
                            var loc = this.props.CancelListLocations.allData.find((value) => value.location === this.props.data.circuit_country)
                            var circuit_country = { "label": loc.location, "value": loc.location }
                            var circuit_city = this.props.data.circuit_city
                            var port_capacity = this.props.data.port_capacity
                            var bandwidth = this.props.data.bandwidth
                            var activation_date = new Date(this.props.data.activation_date)
                            var expiration_date = new Date(this.props.data.expiration_date)
                            var notes = this.props.data.notes
                            var metered_charge = this.props.data.metered_charge
                            this.setState({
                                service_id: sid,
                                provider: provider,
                                circuit_id: circuit_id,
                                circuit_type: circuit_type,
                                client_id: client_id,
                                status: stat,
                                circuit_country: circuit_country,
                                circuit_city: circuit_city,
                                port_capacity: port_capacity,
                                bandwidth_commit: bandwidth,
                                activation_date: activation_date,
                                expiration_date: expiration_date,
                                metered_charge: JSON.parse(metered_charge),
                                notes: notes
                            })
                        }
                    }
                })
            }
            else {
                if (this.props.providers && !this.props.providers.ipTransitProviderList) {
                    this.props.getIpTransistProviders().then(() => {
                        this.setState({ isLoading: true })
                        if (this.props.data == null) {
                            this.setState({
                                // selectedLocation: { "label": this.props.CancelListLocations.allData[0].location, "value": this.props.CancelListLocations.allData[0].loc_short },
                            })
                        }
                        else if (this.props.data !== null) {
                            var sid = this.props.data.sid
                            var prov = this.props.providers.ipTransitProviderList.find((value) => value.name === this.props.data.provider)
                            var provider = { "label": prov.name, "value": prov.name }
                            var client_id = this.props.data.client_id
                            var stat = statuslist.find((value) => value.value === this.props.data.status)
                            var circuit_id = this.props.data.circuit_id
                            var circuit_type = this.props.data.circuit_type
                            var loc = this.props.CancelListLocations.allData.find((value) => value.location === this.props.data.circuit_country)
                            var circuit_country = { "label": loc.location, "value": loc.location }
                            var circuit_city = this.props.data.circuit_city
                            var port_capacity = this.props.data.port_capacity
                            var bandwidth = this.props.data.bandwidth
                            var activation_date = new Date(this.props.data.activation_date)
                            var expiration_date = new Date(this.props.data.expiration_date)
                            var notes = this.props.data.notes
                            var metered_charge = this.props.data.metered_charge
                            this.setState({
                                service_id: sid,
                                provider: provider,
                                circuit_id: circuit_id,
                                circuit_type: circuit_type,
                                client_id: client_id,
                                status: stat,
                                circuit_country: circuit_country,
                                circuit_city: circuit_city,
                                port_capacity: port_capacity,
                                bandwidth_commit: bandwidth,
                                activation_date: activation_date,
                                expiration_date: expiration_date,
                                metered_charge: JSON.parse(metered_charge),
                                notes: notes
                            })
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
                        var sid = this.props.data.sid
                        var prov = this.props.providers.ipTransitProviderList.find((value) => value.name === this.props.data.provider)
                        var provider = { "label": prov.name, "value": prov.name }
                        var client_id = this.props.data.client_id
                        var stat = statuslist.find((value) => value.value === this.props.data.status)
                        var circuit_id = this.props.data.circuit_id
                        var circuit_type = this.props.data.circuit_type
                        var loc = this.props.CancelListLocations.allData.find((value) => value.location === this.props.data.circuit_country)
                        var circuit_country = { "label": loc.location, "value": loc.location }
                        var circuit_city = this.props.data.circuit_city
                        var port_capacity = this.props.data.port_capacity
                        var bandwidth = this.props.data.bandwidth
                        var activation_date = new Date(this.props.data.activation_date)
                        var expiration_date = new Date(this.props.data.expiration_date)
                        var notes = this.props.data.notes
                        var metered_charge = this.props.data.metered_charge
                        this.setState({
                            service_id: sid,
                            provider: provider,
                            circuit_id: circuit_id,
                            circuit_type: circuit_type,
                            client_id: client_id,
                            status: stat,
                            circuit_country: circuit_country,
                            circuit_city: circuit_city,
                            port_capacity: port_capacity,
                            bandwidth_commit: bandwidth,
                            activation_date: activation_date,
                            expiration_date: expiration_date,
                            metered_charge: JSON.parse(metered_charge),
                            notes: notes
                        })
                    }
                }
            }
        }
    }


    toggleModal = () => {
        this.props.closeAddModal()
    }

    handleLocationChange = circuit_country => {
        this.setState(() => ({
            circuit_country: circuit_country
        }));
    }

    handleProviderChange = provider => {
        this.setState(() => ({
            provider: provider
        }));
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
            locationData.push({ "label": value.location, "value": value.location })
        })
        return locationData
    }

    converProvider = data => {
        var providerData = []
        data && data.forEach((value) => {
            providerData.push({ "label": value.name, "value": value.name })
        })
        return providerData
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

    handleMatteredChange = (e) => {
        let isChecked = e.target.checked;
        this.setState(() => ({
            metered_charge: isChecked
        }))
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
            let url = `/api/iptransit/sid/${this.state.service_id}`;
            this.setState({ loading: true })
            performRequest('get', url, headers)
                .then((response) => {
                    if (response.status === 200) {
                        if (response.data.response_code === 200) {
                            if (true) {
                                var status = null
                                var clientid = null
                                if (response.data.data.status === "active") {
                                    status = { "label": "Active", "value": "active" }
                                }
                                if (response.data.data.status === "cancelled") {
                                    status = { "label": "Cancelled", "value": "cancelled" }
                                }
                                if (response.data.data.clientid !== "") {
                                    clientid = response.data.data.clientid
                                }
                                this.setState({
                                    status: status,
                                    client_id: clientid,
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
            if (this.state.provider !== null) {
                data.provider = this.state.provider.value;
            }
            data.sid = this.state.service_id;
            data.circuit_type = this.state.circuit_type;
            data.circuit_id = this.state.circuit_id;
            data.client_id = this.state.client_id;
            if (this.state.status !== null) {
                data.status = this.state.status.value;
            }
            data.circuit_city = this.state.circuit_city;
            if (this.state.circuit_country !== null) {
                data.circuit_country = this.state.circuit_country.value;
            }
            data.port_capacity = this.state.port_capacity;
            data.bandwidth = this.state.bandwidth_commit;
            if (Array.isArray(this.state.activation_date)) {
                data.activation_date = this.formatDate(this.state.activation_date[0]);
            }
            else {
                data.activation_date = this.formatDate(this.state.activation_date);
            }

            if (Array.isArray(this.state.expiration_date)) {
                data.expiration_date = this.formatDate(this.state.expiration_date[0]);
            }
            else {
                data.expiration_date = this.formatDate(this.state.expiration_date);
            }
            data.notes = this.state.notes;
            data.metered_charge = this.state.metered_charge.toString();
            if ((this.state.provider === "" || data.sid === "" || this.state.client_id === ""
                || this.state.status === "" || this.state.circuit_id === "" || this.state.circuit_type === ""
                || this.state.circuit_country === "" || this.state.circuit_city === ""
                || this.state.port_capacity === "" || this.state.bandwidth_commit === ""
                || this.state.activation_date === "" || this.state.expiration_date === "")
                || (this.state.provider === null || data.sid === null || this.state.client_id === null
                    || this.state.status === null || this.state.circuit_id === null
                    || this.state.circuit_type === null || this.state.circuit_country === null
                    || this.state.circuit_city === null || this.state.port_capacity === null
                    || this.state.bandwidth_commit === null || this.state.activation_date === null
                    || this.state.expiration_date === null)) {
                this.props.emptyAllFields()
            }
            else {
                this.props.updateIpTransitItem(this.props.data.id, data, this.props.pageno, data.status).then(() => {
                    if (this.props.IpTransitList && this.props.IpTransitList.ipTransitItemUpdateError) {
                        if (this.props.IpTransitList.ipTransitItemUpdateError.data.errors.sid || this.props.IpTransitList.ipTransitItemUpdateError.data.errors.location ||
                            this.props.IpTransitList.ipTransitItemUpdateError.data.errors.date) {
                            this.props.IpTransitList.ipTransitItemUpdateError.data.errors.sid && this.props.IpTransitList.ipTransitItemUpdateError.data.errors.sid[0] === "The sid has already been taken." && this.props.siddup();
                            this.props.IpTransitList.ipTransitItemUpdateError.sid && this.props.IpTransitList.ipTransitItemUpdateError.sid[0] === "The sid field is required." && this.props.emptyServiceIdField();
                        }
                        else {
                            this.props.wentWrong()
                        }
                    }
                    else if (this.props.IpTransitList && this.props.IpTransitList.ipTransitItemUpdate) {
                        this.props.cancelItemUpdated()
                        this.props.closeAddModal()
                    }
                })
            }
        }
        else {
            let data = {};
            if (this.state.provider !== null) {
                data.provider = this.state.provider.value;
            }
            data.sid = this.state.service_id;
            data.circuit_type = this.state.circuit_type;
            data.circuit_id = this.state.circuit_id;
            data.client_id = this.state.client_id;
            if (this.state.status !== null) {
                data.status = this.state.status.value;
            }
            data.circuit_city = this.state.circuit_city;
            if (this.state.circuit_country !== null) {
                data.circuit_country = this.state.circuit_country.value;
            }
            data.port_capacity = this.state.port_capacity;
            data.bandwidth = this.state.bandwidth_commit;
            if (Array.isArray(this.state.activation_date)) {
                data.activation_date = this.formatDate(this.state.activation_date[0]);
            }
            else {
                data.activation_date = this.formatDate(this.state.activation_date);
            }

            if (Array.isArray(this.state.expiration_date)) {
                data.expiration_date = this.formatDate(this.state.expiration_date[0]);
            }
            else {
                data.expiration_date = this.formatDate(this.state.expiration_date);
            }
            data.notes = this.state.notes;
            data.metered_charge = this.state.metered_charge.toString();
            if ((this.state.provider === "" || data.sid === "" || this.state.client_id === ""
                || this.state.status === "" || this.state.circuit_id === "" || this.state.circuit_type === ""
                || this.state.circuit_country === "" || this.state.circuit_city === ""
                || this.state.port_capacity === "" || this.state.bandwidth_commit === ""
                || this.state.activation_date === "" || this.state.expiration_date === "")
                || (this.state.provider === null || data.sid === null || this.state.client_id === null
                    || this.state.status === null || this.state.circuit_id === null
                    || this.state.circuit_type === null || this.state.circuit_country === null
                    || this.state.circuit_city === null || this.state.port_capacity === null
                    || this.state.bandwidth_commit === null || this.state.activation_date === null
                    || this.state.expiration_date === null)) {
                this.props.emptyAllFields()
            }
            else {
                if (this.state.isSIDValid === false) {
                    this.props.addIpTransitItem(data, this.props.pageno, data.status).then(() => {
                        if (this.props.IpTransitList && this.props.IpTransitList.ipTransitItemAddError) {
                            if (this.props.IpTransitList.ipTransitItemAddError.sid || this.props.IpTransitList.ipTransitItemAddError.location ||
                                this.props.IpTransitList.ipTransitItemAddError.date) {
                                this.props.IpTransitList.ipTransitItemAddError.sid && this.props.IpTransitList.ipTransitItemAddError.sid[0] === "The sid has already been taken." && this.props.siddup();
                                this.props.IpTransitList.ipTransitItemAddError.sid && this.props.IpTransitList.ipTransitItemAddError.sid[0] === "The sid field is required." && this.props.emptyServiceIdField();
                            }
                            else {
                                this.props.wentWrong()
                            }
                        }
                        else if (this.props.IpTransitList && this.props.IpTransitList.ipTransitItemAdd) {
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
        const { selectedLocation, service_id, date, notes, isValid, locationMessage, isSIDValid,
            provider, circuit_id, circuit_type, client_id, circuit_city, circuit_country, port_capacity,
            bandwidth_commit, activation_date, expiration_date, metered_charge, status
        } = this.state
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
                        {data !== null ? "Update Cancelled IP Transit" : "Add Cancelled IP Transit"}
                    </ModalHeader>
                    <ModalBody className="pb-0">
                        {this.state.isLoading === false
                            ? (
                                <Spinner color="primary" className="reload-spinner" />
                            ) : (
                                <Form>
                                    <FormGroup row>
                                        <Col md="6">
                                            <Label><b>Service ID</b> <span style={{ color: "red" }}>*</span></Label>
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
                                        <Col md="6">
                                            <Label><b>Provider</b> <span style={{ color: "red" }}>*</span></Label>
                                            <Select
                                                value={provider}
                                                onChange={this.handleProviderChange}
                                                options={this.converProvider(this.props.providers && this.props.providers.ipTransitProviderList)}
                                                isSearchable={true}
                                                invalid={isValid}
                                                styles={customStyles}
                                            />
                                        </Col>
                                    </FormGroup>

                                    <FormGroup row>
                                        <Col md="6">
                                            <Label><b>Client ID/Name</b> <span style={{ color: "red" }}>*</span></Label>
                                            <Input
                                                type="text"
                                                name="client_id"
                                                id="client_id"
                                                placeholder="Client ID/Name"
                                                value={client_id || ""}
                                                onChange={(e) => this.setState({ client_id: e.target.value })}
                                            />
                                        </Col>
                                        <Col md="6">
                                            <Label><b>Status</b> <span style={{ color: "red" }}>*</span></Label>
                                            <Select
                                                type="select"
                                                id="status"
                                                name="status"
                                                // isDisabled={true}
                                                value={status}
                                                options={statuslist}
                                                onChange={selectedOption => this.setState({ status: selectedOption })}>
                                            </Select>
                                        </Col>
                                    </FormGroup>

                                    <FormGroup row>
                                        <Col md="6">
                                            <Label><b>Circuit ID</b> <span style={{ color: "red" }}>*</span></Label>
                                            <Input
                                                type="text"
                                                name="circuit_id"
                                                id="circuit_id"
                                                placeholder="Circuit ID"
                                                value={circuit_id || ""}
                                                onChange={(e) => this.setState({ circuit_id: e.target.value })}
                                            />
                                        </Col>
                                        <Col md="6">
                                            <Label><b>Circuit Type</b> <span style={{ color: "red" }}>*</span></Label>
                                            <Input
                                                type="text"
                                                name="circuit_type"
                                                id="circuit_type"
                                                placeholder="Circuit Type"
                                                value={circuit_type || ""}
                                                onChange={(e) => this.setState({ circuit_type: e.target.value })}
                                            />
                                        </Col>
                                    </FormGroup>

                                    <FormGroup row>
                                        <Col md="6">
                                            <Label><b>Circuit Country</b> <span style={{ color: "red" }}>*</span></Label>
                                            <Select
                                                value={circuit_country}
                                                onChange={this.handleLocationChange}
                                                options={this.converLocation(this.props.CancelListLocations && this.props.CancelListLocations.allData)}
                                                isSearchable={true}
                                                invalid={isValid}
                                                styles={customStyles}
                                            />
                                        </Col>
                                        <Col md="6">
                                            <Label><b>Circuit City</b> <span style={{ color: "red" }}>*</span></Label>
                                            <Input
                                                type="text"
                                                name="circuit_city"
                                                id="circuit_city"
                                                placeholder="Circuit City"
                                                value={circuit_city || ""}
                                                onChange={(e) => this.setState({ circuit_city: e.target.value })}
                                            />
                                        </Col>
                                    </FormGroup>

                                    <FormGroup row>
                                        <Col md="6">
                                            <Label><b>Port Capacity</b> <span style={{ color: "red" }}>*</span></Label>
                                            <Input
                                                type="text"
                                                name="port_capacity"
                                                id="port_capacity"
                                                placeholder="Port Capacity"
                                                value={port_capacity || ""}
                                                onChange={(e) => this.setState({ port_capacity: e.target.value })}
                                            />
                                        </Col>
                                        <Col md="6">
                                            <Label><b>Bandwidth Commit</b> <span style={{ color: "red" }}>*</span></Label>
                                            <Input
                                                type="text"
                                                name="bandwidth_commit"
                                                id="bandwidth_commit"
                                                placeholder="Bandwidth Commit"
                                                value={bandwidth_commit || ""}
                                                onChange={(e) => this.setState({ bandwidth_commit: e.target.value })}
                                            />
                                        </Col>
                                    </FormGroup>

                                    <FormGroup row>
                                        <Col md="6">
                                            <Label><b>Activation Date</b> <span style={{ color: "red" }}>*</span></Label>
                                            <Flatpickr
                                                className="form-control"
                                                value={activation_date}
                                                placeholder="Activation Date"
                                                onChange={date => {
                                                    this.setState({ activation_date: date });
                                                }}
                                            />
                                        </Col>
                                        <Col md="6">
                                            <Label><b>Expiration  Date</b> <span style={{ color: "red" }}>*</span></Label>
                                            <Flatpickr
                                                className="form-control"
                                                value={expiration_date}
                                                placeholder="Expiration Date"
                                                onChange={date => {
                                                    this.setState({ expiration_date: date });
                                                }}
                                            />
                                        </Col>
                                    </FormGroup>

                                    <FormGroup row>
                                        <Col md="6">
                                            <Label><b>Notes</b> </Label>
                                            <Input
                                                type="textarea"
                                                name="notes"
                                                id="notes"
                                                placeholder="Notes"
                                                value={notes || ""}
                                                onChange={(e) => this.setState({ notes: e.target.value })}
                                            />
                                        </Col>
                                        <Col md="6" className="mt-1">
                                            <Checkbox
                                                color="primary"
                                                icon={<Check className="vx-icon" size={16} />}
                                                label="Metered Charge"
                                                defaultChecked={metered_charge}
                                                onChange={e => this.handleMatteredChange(e)}
                                            />
                                        </Col>

                                    </FormGroup>
                                </Form>
                            )}
                    </ModalBody>
                    <ModalFooter className="pt-0">
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
export default CancelIpTransitAddEdit