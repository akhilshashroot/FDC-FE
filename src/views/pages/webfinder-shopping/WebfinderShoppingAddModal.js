import React, { Fragment } from "react"
import {
    Col, Button, Form, FormGroup, Input,
    Modal,
    ModalBody,
    ModalFooter,
    ModalHeader,
} from "reactstrap"
import Select from 'react-select';
import Spinner from "../../../components/@vuexy/spinner/Loading-spinner"


class WebfinderAddShoppingModal extends React.PureComponent {
    state = {
        firstRender: true,
        selectedLocation: null,
        isLoading: false,
        what: "",
        qty: "",
        url: "",
        isValid: null,
        locationMessage: "",
    }
  
    componentDidMount() {
        if (this.props.toggleAddModal) {
            if (this.props.IpwatchShoppingList && !this.props.IpwatchShoppingList.shoppingLocation) {
                this.props.GetShoppingLocations().then(() => {
                    this.setState({ isLoading: true })
                    if (this.props.data !== null) {
                        let locdata = this.props.IpwatchShoppingList && this.props.IpwatchShoppingList.shoppingLocation
                        var eulocation = []
                        var asplocation = []
                        var uslocation = []
                        let selectedLocation = {}
                        eulocation = locdata[0].eu
                        asplocation = locdata[1].asp
                        uslocation = locdata[2].us
                        for (let i = 0; i < locdata.length; i++) {
                            if (i === 0) {
                                if (eulocation.find((value) => value.id === this.props.data.loc_id)) {
                                    selectedLocation = eulocation.find((value) => value.id === this.props.data.loc_id)
                                }
                            }
                            else if (i === 1) {
                                if (asplocation.find((value) => value.id === this.props.data.loc_id)) {
                                    selectedLocation = asplocation.find((value) => value.id === this.props.data.loc_id)
                                }
                            }
                            else if (i === 2) {
                                if (uslocation.find((value) => value.id === this.props.data.loc_id)) {
                                    selectedLocation = uslocation.find((value) => value.id === this.props.data.loc_id)
                                }
                            }
                        }
                        this.setState({
                            selectedLocation: { "label": selectedLocation.location, "value": selectedLocation.id },
                            what: this.props.data.what,
                            qty: this.props.data.quantity,
                            url: this.props.data.url
                        })
                    }
                })
            }
            else {
                this.setState({ isLoading: true })
                if (this.props.data !== null) {
                    let locdata = this.props.IpwatchShoppingList && this.props.IpwatchShoppingList.shoppingLocation
                    var eulocation = []
                    var asplocation = []
                    var uslocation = []
                    let selectedLocation = {}
                    eulocation = locdata[0].eu
                    asplocation = locdata[1].asp
                    uslocation = locdata[2].us
                    for (let i = 0; i < locdata.length; i++) {
                        if (i === 0) {
                            if (eulocation.find((value) => value.id === this.props.data.loc_id)) {
                                selectedLocation = eulocation.find((value) => value.id === this.props.data.loc_id)
                            }
                        }
                        else if (i === 1) {
                            if (asplocation.find((value) => value.id === this.props.data.loc_id)) {
                                selectedLocation = asplocation.find((value) => value.id === this.props.data.loc_id)
                            }
                        }
                        else if (i === 2) {
                            if (uslocation.find((value) => value.id === this.props.data.loc_id)) {
                                selectedLocation = uslocation.find((value) => value.id === this.props.data.loc_id)
                            }
                        }
                    }
                    this.setState({
                        selectedLocation: { "label": selectedLocation.location, "value": selectedLocation.id },
                        what: this.props.data.what,
                        qty: this.props.data.quantity,
                        url: this.props.data.url
                    })
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
        var eulocation = []
        var asplocation = []
        var uslocation = []
        eulocation = data[0].eu
        asplocation = data[1].asp
        uslocation = data[2].us
        for (let i = 0; i < data.length; i++) {
           
            if (i === 0) {
                if (Array.isArray(eulocation) && eulocation.length != 0) {
                locationData.push({ "label": <strong>Europe (EU)</strong>, "value": "" })
               
                    eulocation.forEach((value) => {
                        locationData.push({ "label": <span style={{paddingLeft:'1rem'}}> {value.location}</span>, "value": value.id })
                    })
                }
               
            }
            else if (i === 1) {
                if (Array.isArray(asplocation) && asplocation.length != 0){
                    locationData.push({ "label": <strong>Asia Pacific (APAC)</strong>, "value": "" })                
                    asplocation.forEach((value) => {
                        locationData.push({ "label": <span style={{paddingLeft:'1rem'}}> {value.location}</span>, "value": value.id })
                    })
                }
               
            }
            else if (i === 2) {
                if (Array.isArray(uslocation) && uslocation.length != 0){
                    locationData.push({ "label": <strong>United States (US)</strong>, "value": "" })
                    uslocation.forEach((value) => {
                        locationData.push({ "label": <span style={{paddingLeft:'1rem'}}> {value.location}</span>, "value": value.id  })
                    })
                }
               
            }
        }
        return locationData
    }

    submitShoppingItem = () => {
        if (this.props.data !== null) {
            let data = {};
            if (this.state.selectedLocation !== null) {
                data.loc_id = this.state.selectedLocation.value;
            }
            data.what = this.state.what;
            data.quantity = this.state.qty;
            data.url = this.state.url;
            if (data.loc_id === "" || data.what === "" || data.quantity === "" || data.url === "") {
                this.props.emptyAllFields()
            }
            else {
                this.props.updateShoppingItem(this.props.data.id, data).then(() => {
                    if (this.props.IpwatchShoppingList && this.props.IpwatchShoppingList.shoppingItemUpdateError) {
                        this.props.wentWrong()
                    }
                    else if (this.props.IpwatchShoppingList && this.props.IpwatchShoppingList.shoppingItemUpdate) {
                        this.props.shoppingItemUpdated()
                        this.props.closeAddModal()
                    }
                })
            }
        }
        else {
            let data = {};
            if (this.state.selectedLocation !== null) {
                data.loc_id = this.state.selectedLocation.value;
            }
            data.what = this.state.what;
            data.quantity = this.state.qty;
            data.url = this.state.url;
            this.props.addShoppingItem(data).then(() => {
                if (this.props.IpwatchShoppingList && this.props.IpwatchShoppingList.shoppingItemAddError) {
                    if (this.props.IpwatchShoppingList.shoppingItemAddError.url && this.props.IpwatchShoppingList.shoppingItemAddError.loc_id &&
                        this.props.IpwatchShoppingList.shoppingItemAddError.what && this.props.IpwatchShoppingList.shoppingItemAddError.quantity) {
                        this.props.emptyAllFields()
                    }
                    else {
                        this.props.IpwatchShoppingList.shoppingItemAddError.loc_id && this.props.emptyLocationField();
                        this.props.IpwatchShoppingList.shoppingItemAddError.what && this.props.emptyWhatField();
                        this.props.IpwatchShoppingList.shoppingItemAddError.quantity && this.props.emptyQtyField();
                        this.props.IpwatchShoppingList.shoppingItemAddError.url && this.props.emptyUrlField();
                    }
                }
                else if (this.props.IpwatchShoppingList && this.props.IpwatchShoppingList.shoppingItemAdd) {
                    this.props.shoppingAddedSucsess()
                    this.props.closeAddModal()
                }
                else {
                    this.props.wentWrong()
                }
            })
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
        const boldlocation = {
            fontWeight: "bold"
          }
        
    
        const { selectedLocation, what, qty, url, isValid, locationMessage } = this.state
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
                        {data !== null ? "Update Shopping Item" : "Add New Shopping Item"}
                    </ModalHeader>
                    <ModalBody>
                        {this.state.isLoading === false
                            ? (
                                <Spinner color="primary" className="reload-spinner" />
                            ) : (
                                <Form>
                                    <FormGroup row>
                                        <Col md="4">
                                            <span>Location <span style={{ color: "red" }}>*</span></span>
                                        </Col>
                                        <Col md="8">
                                            <Select
                                    
                                                value={selectedLocation}
                                                onChange={this.handleLocationChange}
                                                options={this.converLocation(this.props.IpwatchShoppingList && this.props.IpwatchShoppingList.shoppingLocation)}
                                                isSearchable={true}
                                                invalid={isValid}
                                                styles={customStyles}
                                            />
                                            {locationMessage && <span style={{ color: "red" }}> {locationMessage}</span>}
                                        </Col>
                                    </FormGroup>

                                    <FormGroup row>
                                        <Col md="4">
                                            <span><b>Your Name</b> - What to buy <span style={{ color: "red" }}>*</span></span>
                                        </Col>
                                        <Col md="8">
                                            <Input
                                                type="textarea"
                                                name="what"
                                                id="what"
                                                placeholder="Your Name - What to buy"
                                                value={what || ""}
                                                onChange={(e) => { this.setState({ what: e.target.value }) }}
                                            />
                                        </Col>
                                    </FormGroup>

                                    <FormGroup row>
                                        <Col md="4">
                                            <span>Quantity <span style={{ color: "red" }}>*</span></span>
                                        </Col>
                                        <Col md="8">
                                            <Input
                                                type="text"
                                                name="qty"
                                                id="qty"
                                                placeholder="Quantity"
                                                value={qty || ""}
                                                onChange={(e) => this.setState({ qty: e.target.value })}
                                            />
                                        </Col>
                                    </FormGroup>

                                    <FormGroup row>
                                        <Col md="4">
                                            <span>URL <span style={{ color: "red" }}>*</span></span>
                                        </Col>
                                        <Col md="8">
                                            <Input
                                                type="textarea"
                                                name="url"
                                                id="url"
                                                placeholder="URL"
                                                value={url || ""}
                                                onChange={(e) => { this.setState({ url: e.target.value }) }}
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
                        <Button color="primary" onClick={this.submitShoppingItem}>
                            {data !== null ? "Update" : "Submit"}
                        </Button>
                    </ModalFooter>
                </Modal>
            </Fragment>
        )
    }
}
export default WebfinderAddShoppingModal