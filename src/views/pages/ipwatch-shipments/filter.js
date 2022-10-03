import React, { Fragment } from 'react'
import {
    Card, CardBody, CardHeader, CardTitle, FormGroup, Label, Input, Row, Col, Button,
} from "reactstrap"
import Select from 'react-select';
import Flatpickr from "react-flatpickr";
import "flatpickr/dist/themes/light.css";
import "../../../assets/scss/plugins/forms/flatpickr/flatpickr.scss"
import { Search } from "react-feather";
import { toast, ToastContainer, Zoom } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "../../../assets/scss/plugins/extensions/toastr.scss";

const notifyIncomplete = () => toast.warning("Please fill mandatory fields !.", { transition: Zoom })
class SearchFilter extends React.PureComponent {

    state = {
        type: null,
        location: null,
        contents: null,
        startdate: null,
        enddate: null,
        trackingnumber: null
    }

    componentDidMount = data => {
        this.handleChange({ "label": "All", "value": "all" })
        this.handleChangeType({ "label": "Location", "value": "location" })
    }

    handleChangeType = (type) => {
        this.setState({ type })
        localStorage.setItem('shipment_search_type', JSON.stringify(type));
        if(type.value === 'none'){
            this.props.getAllShipments(this.props.sorttype,this.props.mode,this.props.pageNumber)
            this.props.filtered(null)
        }
    }

    handleChange = location => {
        this.setState({ location });
        localStorage.setItem('shipment_search_loc', JSON.stringify(location));
    };

    convertLocation = () => {
        var user_role = localStorage.getItem("user_role")
        var locationData = []
        if (user_role !== 'Remote') {
            locationData = [{ "label": "All", "value": "all" }]
        }
        // data.userLoc.forEach((value) => {
        //     locationData.push({ "label": value.location, "value": value.id })
        // })
        // return locationData

        if (this.props.dataList.allData) {
            this.props.dataList.allData.userLoc.forEach((data) => {
                let locValue = data.loc_short.toUpperCase()
                let locLabel = data.location
                // let locLabel = `${data.location}`
                locationData.push({ value: locValue, label: locLabel })
            })
            if(this.props.dataList.allData.shipmentNewLocations){
                this.props.dataList.allData.shipmentNewLocations.forEach((data) => {
                    let locValue = data.location
                    let locLabel = data.location
                    // let locLabel = `${data.location}`
                    locationData.push({ value: locValue, label: locLabel })
                })
            }
            return locationData

        } else {
            return locationData
        }
    }

    // Search on "Enter" key 
    handleSearchKeyDown = (e) => {
        if (e.keyCode === 13) {
            e.preventDefault()
            this.Search()
        }
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

    Search = () => {
        if(this.state.type.value === 'location'){
            if(this.state.location === "" || this.state.location === null){
                notifyIncomplete()
            }
            else {
                if(Array.isArray(this.state.location)){
                    var temp = ""
                    this.state.location.forEach((data) => {
                        temp = temp + "," + data.value
                    })
                    var sendData = {}
                    sendData.type = "location"
                    sendData.location = temp.substring(1)
                    this.props.getFilteredShipments(1,sendData)
                    this.props.filtered(sendData)
                }
                else{
                    var sendData = {}
                    sendData.type = "location"
                    sendData.location = this.state.location.value
                    this.props.getFilteredShipments(1,sendData)
                    this.props.filtered(sendData)
                }
            }
        }

        if(this.state.type.value === 'content'){
            if(this.state.contents === "" || this.state.contents === null){
                notifyIncomplete()
            }
            else{
                var sendData = {}
                sendData.type = "contents"
                sendData.contents = this.state.contents
                this.props.getFilteredShipments(1,sendData)
                this.props.filtered(sendData)
            }
        }
        if(this.state.type.value === 'date'){
            if((this.state.startdate === "" || this.state.enddate === "") || (this.state.startdate === null || this.state.enddate === null)){
                notifyIncomplete()
            }
            else {
                var sendData = {}
                sendData.type = "date"
                sendData.start_date = this.formatDate(this.state.startdate[0])
                sendData.end_date = this.formatDate(this.state.enddate[0])
                this.props.getFilteredShipments(1,sendData)
                this.props.filtered(sendData)
            }
        }
        if(this.state.type.value === 'trackingnumber'){
            if(this.state.trackingnumber === "" || this.state.trackingnumber === null){
                notifyIncomplete()
            }
            else{
                var sendData = {}
                sendData.type = "trackingnumber"
                sendData.trackingnumber = this.state.trackingnumber
                this.props.getFilteredShipments(1,sendData)
                this.props.filtered(sendData)
            }
        }

    }


    render() {
        const { type, location, contents, startdate, enddate, trackingnumber } = this.state
        const cardheader = {
            paddingTop: "10px",
            paddingBottom: "10px"
        }
        const cardbody = {
            paddingTop: "0px",
            paddingBottom: "15px"
        }
        const buttonstyle = {
            paddingTop: "11px",
            paddingBottom: "11px",
            marginTop: "18px"
        }
        const selectstyles = {
            option: (provided, state) => ({
                ...provided,
                fontSize: 12,
            }),
        }

        const typeOptions = [
            { "label": "None", "value": "none" },
            { "label": "Location", "value": "location" },
            { "label": "Content", "value": "content" },
            { "label": "Date", "value": "date" },
            { "label": "Tracking Number", "value": "trackingnumber" }

        ]
        return (
            <Fragment>
                <Row>
                    <Col sm="12">
                        <Card>
                            <CardHeader style={cardheader}>
                                <CardTitle>Filters</CardTitle>
                            </CardHeader>
                            <CardBody style={cardbody}>
                                <Row>
                                    <Col lg="2" md="6" sm="12">
                                        <FormGroup className="mb-0">
                                            <Label for="exampleSelect">Type<span style={{ color: "red" }}>*</span></Label>
                                            <Select
                                                value={type}
                                                onChange={this.handleChangeType}
                                                options={typeOptions}
                                                placeholder="Select"
                                                isSearchable={true}
                                                styles={selectstyles}
                                            />
                                        </FormGroup>
                                    </Col>
                                    {type && type.value === 'location' &&
                                        <Col lg="3" md="6" sm="12">
                                            <FormGroup className="mb-0">
                                                <Label for="tech_location">Locations<span style={{ color: "red" }}>*</span></Label>
                                                <Select
                                                    value={location}
                                                    onChange={this.handleChange}
                                                    options={this.convertLocation(this.props.dataList)}
                                                    isMulti={true}
                                                    isSearchable={true}
                                                />
                                            </FormGroup>
                                        </Col>
                                    }
                                    {type && type.value === 'content' &&
                                        <Col lg="6" md="6" sm="12">
                                            <FormGroup className="mb-0">
                                                <Label for="contents">Contents<span style={{ color: "red" }}>*</span></Label>
                                                <Input
                                                    type="text"
                                                    id="contents"
                                                    value={contents}
                                                    onChange={e => this.setState({ contents: e.target.value })}
                                                    onKeyDown={this.handleSearchKeyDown}
                                                />
                                            </FormGroup>
                                        </Col>
                                    }

                                    {type && type.value === 'date' &&
                                        <>
                                            <Col lg="3" md="6" sm="12">
                                                <FormGroup className="mb-0">
                                                    <Label for="contents">Start Date<span style={{ color: "red" }}>*</span></Label>
                                                    <Flatpickr
                                                        className="form-control"
                                                        value={startdate}
                                                        onChange={date => {
                                                            this.setState({ startdate: date });
                                                        }}
                                                    />
                                                </FormGroup>
                                            </Col>
                                            <Col lg="3" md="6" sm="12">
                                                <FormGroup className="mb-0">
                                                    <Label for="contents">End Date<span style={{ color: "red" }}>*</span></Label>
                                                    <Flatpickr
                                                        className="form-control"
                                                        value={enddate}
                                                        onChange={date => {
                                                            this.setState({ enddate: date });
                                                        }}
                                                    />
                                                </FormGroup>
                                            </Col>
                                        </>
                                    }
                                        {type && type.value === 'trackingnumber' &&
                                        <Col lg="6" md="6" sm="12">
                                            <FormGroup className="mb-0">
                                                <Label for="trackingnumber">Tracking Number<span style={{ color: "red" }}>*</span></Label>
                                                <Input
                                                    type="text"
                                                    id="trackingnumber"
                                                    value={trackingnumber}
                                                    onChange={e => this.setState({ trackingnumber: e.target.value })}
                                                    onKeyDown={this.handleSearchKeyDown}
                                                />
                                            </FormGroup>
                                        </Col>
                                    }
                                    {/* {type && ((type.value === 'content') || (type.value === 'date')) && */}
                                    {type   &&
                                        <Col lg="2" md="6" sm="12">
                                            <Button
                                                className=""
                                                style={buttonstyle}
                                                color="primary"
                                                onClick={() => this.Search()}
                                                outline>
                                                <Search size={15} style={{ marginRight: "5px" }} />
                                                <span className="align-middle">Search</span>
                                            </Button>
                                        </Col>
                                    }

                                </Row>
                            </CardBody>
                        </Card>
                    </Col>
                </Row>
                <ToastContainer />
            </Fragment>
        )
    }
}

export default SearchFilter