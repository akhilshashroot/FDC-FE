import React, { Fragment } from 'react'
import Select from 'react-select';
import {
    Card, CardBody, Form, Row, Col, FormGroup, Label, Table, Input
} from "reactstrap"
import { connect } from 'react-redux';
import { performRequest } from '../../../services/index';
import { toast, ToastContainer, Zoom } from "react-toastify";
import Radio from "../../../components/@vuexy/radio/RadioVuexy";
import "react-toastify/dist/ReactToastify.css";
import "../../../assets/scss/plugins/extensions/toastr.scss";
import Spinner from "../../../components/@vuexy/spinner/Loading-spinner";
import Toggle from "react-toggle";
import "../../../assets/scss/plugins/forms/switch/react-toggle.scss";
import "react-toggle/style.css";


const settingsUpdated = (msg) => toast.success(`${msg} Updated Successfully`, { transition: Zoom });
const warningMessage = () => toast.warning("Something went wrong.Please try again later.", { transition: Zoom })
const toggleStyle = {
    fontSize: "large",
    fontWeight: "bold",
    paddingRight: "5px"
}

const CustomHeader = props => {
    return (
        <Fragment>
            <Form>
                <Row>
                    {/* <Col sm="4">
                        <FormGroup>
                            <Label for="exampleSelect">Locations</Label>
                            <Select
                                value={props.selectedLoc}
                                onChange={props.handleChangeLocation}
                                options={props.locationOptions}
                                defaultValue={props.locationOptions[0]}
                                placeholder="Select a Location"
                                isSearchable={true}
                            />
                        </FormGroup>
                    </Col> */}
                    <Col>
                        <FormGroup>
                            <div className="d-flex align-items-center justify-content-start">
                            <label className="react-toggle-wrapper w-20" >
                                <span className="label-text" style={toggleStyle}>Sound</span>
                                <Toggle
                                    defaultChecked={props.sound ? true : false}
                              
                                    className="switch-danger"
                                    onChange={(e) => props.handleUpdateApi("Sound", e.target.checked)}
                                />
                   
                            </label>
                            <div className="d-flex align-items-center justify-content-around w-30">
                            {/* <Radio
                            className="mr-1"
                      label="High"
                      color="primary"
                      checked="true"
                      name="high"                    
                    />
                            <Radio
                      label="Low"
                      color="primary"
                      checked=""
                      name="low"
                    
                    /> */}
                            </div>
                            
                            </div>
                    
                      


                        </FormGroup>
                    </Col>

                </Row>
            </Form>
        </Fragment>
    )
}

const locations = [
    { value: "remote", label: "Remote" },
    { value: "denver", label: "Denver" },
    { value: "chicago", label: "Chicago" }
]

const headerStyle = {
    fontSize: "14px"
}



class PetersmithSettingsList extends React.PureComponent {
    state = {
        selectedLocation: { value: "remote", label: "Remote" },
        allSettingsData: "",
        listValues: "",
        displaysound:"d-none",
        loading: false,
    }

    componentDidMount() {
        const userName = sessionStorage.getItem("userName") || null;
        if (userName) {
            const token_value = localStorage.getItem('token') || null;
            const headers = {
                'Accept': 'application/json',
                'Authorization': `Bearer ${token_value}`
            };

            let url = `/api/ps/settings/${userName}`;
            this.setState({ loading: true })
            performRequest('get', url, headers)
                .then((response) => {
                    if (response.status === 200) {
                        if (response.data.response_code === 200) {
                            this.setState({ allSettingsData: response.data.data, loading: false })
                        } else {
                            warningMessage();
                            this.setState({ loading: false, allSettingsData: "" })
                        }

                    }
                })
                .catch((error) => {
                    warningMessage();
                    this.setState({ loading: false, allSettingsData: "" })
                })
        }
    }

    componentDidUpdate(prevProps, prevState) {
        var settingsArr = [];
        var loc = { value: "remote", label: "Remote" }
        if (prevState.allSettingsData !== this.state.allSettingsData) {
            if (this.state.allSettingsData && this.state.allSettingsData.Location) {
                loc = locations.find((val) => val.value === this.state.allSettingsData.Location);
            }
            var settingsData = {};
            settingsData = { ...this.state.allSettingsData }
            if (settingsData) {
                delete settingsData["user"];
                delete settingsData["Location"];
                delete settingsData["id"];
            }
            for (var i in settingsData) {
                if (i !== "user" && i !== "Location" && i !== "id") {
                    let obj = []
                    obj.label = i;
                    obj.value = settingsData[i]
                    let data = Object.keys(settingsData[i])
                    let value = Object.values(settingsData[i]);
                    for (i = 0; i < data.length; i++) {
                        obj.push({ "label": data[i], "value": value[i] })
                    }
                    settingsArr.push(obj)
                }
            }
            if (settingsArr) {
                this.setState({ listValues: settingsArr, selectedLocation: loc })
            }

        }
    }

    handleChangeLocation = (value) => {
      
        this.setState({ selectedLocation: value })
        this.handleUpdateApi("Location", value.value)
    }

    handleChange = (e, type, index) => {
        var tempArr = [];
        let tempdata = [...this.state.listValues]
        for (let i = 0; i < tempdata.length; i++) {
            tempdata[i].forEach((value) => { tempArr.push(value) })
        }
        // tempArr = [...this.state.listValues]

        let indexValue = tempArr.findIndex((val) => val.label === e.target.value)
        if (e.target.checked) {
            tempArr[indexValue].value = 1
        } else {
            tempArr[indexValue].value = ""
        }
        this.handleUpdateApi(e.target.value, tempArr[indexValue].value)
        tempdata[type][index].value = tempArr[indexValue].value
        this.setState({ listValues: tempdata })
    }

    handleUpdateApi = (setting_key, setting_val) => {
  
        console.log(setting_key,setting_val)
      

        const token_value = localStorage.getItem('token') || null;
        const headers = {
            'Accept': 'application/json',
            'Authorization': `Bearer ${token_value}`
        };
        const userName = sessionStorage.getItem("userName") || null;
        let url = `/api/ps/settings`;
        let sendData = {};
        sendData.setting_key = setting_key;
        sendData.setting_val = setting_val == true ? "1" : "0";
        sendData.user = userName;
        console.log(sendData);
        performRequest('post', url, headers, sendData)
            .then((response) => {
                if (response.status === 200) {
                    if (response.data.response_code === 200) {
                        settingsUpdated(setting_key)
                    }
                }

            })
            .catch((error) => {
                warningMessage()
            })
    }

    render() {
        const { allSettingsData, selectedLocation, listValues, loading } = this.state;
        return (
            <Fragment>
                {loading ?

                    <Spinner />
                    :
                    <>
                        {allSettingsData
                            ?
                            <>
                                <CustomHeader
                                    locationOptions={locations}
                                    handleChangeLocation={this.handleChangeLocation}
                                    selectedLoc={selectedLocation}
                                    handleUpdateApi={this.handleUpdateApi}
                                    sound={allSettingsData && allSettingsData.settings && allSettingsData.settings.sound}

                                />

                                <Card>
                                    <CardBody>
                                        <Row>
                                            <Col lg="6" md="12">
                                                <h3 style={{ textAlign: "center" }} className="mb-1">Orders</h3>
                                                <Table striped responsive>
                                                    <thead className="thead-dark unpaddingTh">
                                                        <tr>
                                                            <th style={headerStyle}>#</th>
                                                            <th style={headerStyle}>Settings</th>
                                                            <th style={headerStyle}>Action</th>
                                                        </tr>
                                                    </thead>
                                                    <tbody className="unpaddingtd hover">
                                                        {listValues && listValues.length ?
                                                            listValues[1].map((value, key) =>
                                                                <tr key={key}>
                                                                    <td>{key + 1}</td>
                                                                    <td>{value.label}</td>
                                                                    <td>
                                                                        <Form>
                                                                            <FormGroup check inline>
                                                                                <Label check>
                                                                                    <Input type="checkbox" value={value.label} checked={value.value} onChange={(e) => this.handleChange(e, 1, key)} />
                                                                                </Label>
                                                                            </FormGroup>
                                                                        </Form>
                                                                    </td>
                                                                </tr>
                                                            )
                                                            :
                                                            null
                                                        }
                                                    </tbody>
                                                </Table>
                                            </Col>
                                            <Col lg="6" md="12">
                                                <h4 style={{ textAlign: "center" }} className="mb-1">Support</h4>
                                                <Table striped responsive>
                                                    <thead className="thead-dark unpaddingTh">
                                                        <tr>
                                                            <th style={headerStyle}>#</th>
                                                            <th style={headerStyle}>Settings</th>
                                                            <th style={headerStyle}>Action</th>
                                                        </tr>
                                                    </thead>
                                                    <tbody className="unpaddingtd hover">
                                                        {listValues && listValues.length ?
                                                            listValues[2].map((value, key) =>
                                                                <tr key={key}>
                                                                    <th scope="row">{key + 1}</th>
                                                                    <td>{value.label}</td>
                                                                    <td>
                                                                        <Form>
                                                                            <FormGroup check inline>
                                                                                <Label check>
                                                                                    <Input type="checkbox" value={value.label} checked={value.value} onChange={(e) => this.handleChange(e, 2, key)} />
                                                                                </Label>
                                                                            </FormGroup>
                                                                        </Form>
                                                                    </td>
                                                                </tr>
                                                            ) :
                                                            null
                                                        }
                                                    </tbody>
                                                </Table>
                                            </Col>
                                        </Row>
                                    </CardBody>
                                </Card>
                            </>
                            :
                            null
                        }
                    </>
                }
                <ToastContainer />
            </Fragment>
        )
    }
}

export default connect(null, null)(PetersmithSettingsList)