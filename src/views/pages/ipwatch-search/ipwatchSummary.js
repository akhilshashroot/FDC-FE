import React, {  Fragment } from "react"
import {
    Card, CardBody, CardTitle, Modal,
    ModalHeader, Button, ModalFooter,
    ModalBody, FormGroup, Row, Col, Label
} from "reactstrap"
import { Check, X } from "react-feather"
import Select from 'react-select';
import { connect } from "react-redux"
import { ToastContainer } from "react-toastify"
import "react-toastify/dist/ReactToastify.css"
import "../../../assets/scss/plugins/extensions/toastr.scss"
import "../../../assets/scss/plugins/forms/react-select/_react-select.scss"
import Spinner from "../../../components/@vuexy/spinner/Loading-spinner"
import { GetDevices, GetVlan, GetStatus } from "../../../redux/actions/ip-watch/"
import { Table } from "reactstrap"
import Tooltip from "@material-ui/core/Tooltip"
import { makeStyles } from "@material-ui/core/styles";

const useStylesBootstrap = makeStyles((theme) => ({
    arrow: {
      color: theme.palette.common.black
    },
    tooltip: {
      backgroundColor: theme.palette.common.black,
      fontSize: 15
    }
  }));
  
  function BootstrapTooltip(props) {
    const classes = useStylesBootstrap();
  
    return <Tooltip arrow classes={classes} {...props} />;
  }

class IpWatchSummary extends React.PureComponent {

    state = {
        modal: false,
        selectedDevice: null,
        selectedVlan: null,
        isLoading: false,
        subnet: null,
        data: null,
        device: null,
        subnetLoading: false
    }
    subnets = [
         {"label": "All", "value": "all"},
         {"label": "IPv4 Subnets", "value": "ipv4"},
         {"label": "IPv6 Subnets", "value": "ipv6"},
    ]

    toggleModal = () => {
        this.setState(prevState => ({
            modal: !prevState.modal
        }), () => this.props.closeModal());
    }
    componentDidMount() {
        this.props.toggleSummaryModal && this.setState({ modal: true })
        this.props.GetDevices(this.props.value.location,true).then(() => {
            // if(this.props.deviceList && this.props.deviceList.length >0){
                this.getDevice()
            // }
            this.props.GetVlan(this.props.value.device,this.props.value.location,true).then(() => {
            if((this.props.IPSearchList && this.props.IPSearchList.ipVlanError === 'The provided device IP could not be mapped to an active device (or no VLANs are routed to it).')
            || (this.props.IPSearchList && this.props.IPSearchList.ipVlanError === 'invalid location info')){
                this.props.noVlans()
            }
                if(this.props.value){
                    if(this.props.IPSearchList && this.props.IPSearchList.ipVlan && this.props.IPSearchList.ipVlan.length > 0){
                        let vlan = this.props.IPSearchList.ipVlan.find((value) => (value.sid === this.props.value.vlan) )
                        this.handleVlanChange({ "label": "VLAN " + vlan.subnet_long + " (" + vlan.des + ")", "value": vlan.sid })
                    }
                    // this.props.GetStatus(this.props.value.device,this.props.value.vlan,this.props.value.location,true).then(() => {
                    // this.handleSubnetChange({"label": "All", "value": "all"})
                    // this.setState({subnetLoading: true})
                    // })
                }
            })
        })
    }
    getDevice = () => {
        let devices = Object.keys(this.props.IPSearchList && this.props.IPSearchList.ipDevices)
        let devicelist = []
        for (let i = 0; i<devices.length; i++){
            let devicedata = this.props.IPSearchList.ipDevices[devices[i]]
            devicelist.push({ "label": devices[i] + " ( " + devicedata.host + " )", "value": devicedata.host})
        }
        this.setState({device: devicelist})
        let def_device = devicelist.find((value) => (value.value === this.props.value.device) )
        this.setState({
            selectedDevice: def_device
        })
        // this.handleDeviceChange(def_device)
    }
    filter = () => {
            var ipv4data = []
            var ipv6data = []
            var alldata = []
            if(this.props.IPSearchList && this.props.IPSearchList.summary.ipv4){
                this.props.IPSearchList.summary.ipv4.forEach((value) => {
                    ipv4data.push({"subnet": value.subnet, "gateway": value.gateway, "usable": value.usable, "status": value.status, "lastseen":  value.lastseen})
                })
            }
            if(this.props.IPSearchList && this.props.IPSearchList.summary.ipv6){
                this.props.IPSearchList.summary.ipv6.forEach((value) => {
                    ipv6data.push({"subnet": value.subnet, "gateway": value.gateway, "usable": value.usable, "status": value.status, "lastseen":  value.lastseen})
                })
            }
            alldata = ipv4data.concat(ipv6data)
            if(this.state.subnet.value === "all"){
                this.setState({ data: alldata})
            }
            else if (this.state.subnet.value === "ipv4"){
                this.setState({ data: ipv4data})
            }
            else if(this.state.subnet.value === "ipv6"){
                this.setState({ data: ipv6data})
            }
        
    }

    handleDeviceChange = selectedDevice => {
        this.setState(() => ({
            isLoading: false ,
            selectedDevice: selectedDevice
        }));
        // if(selectedDevice.value !== this.props.value.device){
            this.props.GetVlan(selectedDevice.value,this.props.value.location,true).then(() => {
                this.setState({ 
                    isLoading: true,
                    selectedVlan: null,
                    subnet: null,
                    subnetLoading: false
                 })
            })
        // }
    }

    handleVlanChange = selectedVlan => {
        this.setState(() => ({
            selectedVlan: selectedVlan,
            isLoading: true
        }), () => 
            this.props.GetStatus(this.state.selectedDevice.value,this.state.selectedVlan.value,this.props.value.location,true).then(() => {
            this.handleSubnetChange({"label": "All", "value": "all"})
            this.setState({subnetLoading : true})
            }));
    }

    handleSubnetChange = subnet => {
        this.setState(() => ({
            subnet: subnet
        }), () => this.filter());
    }

    convertDevice = data => {
        var deviceData = []
        data.forEach((value) => {
            deviceData.push({ "label": value.label, "value": value.value })
        })
        return deviceData
    }

    convertVlan = (data) => {
        var vlanData = []
        data.forEach((value) => {
            vlanData.push({ "label": "VLAN " + value.subnet_long + " (" + value.des + ")", "value": value.sid })
        })
        return vlanData
    }

    render() {
        // const cardheaderstyle = {
        //     backgroundColor: "#c7c4ec",
        //     paddingTop: "13px",
        //     paddingBottom: "7px",
        // }
        const cardbody = {
            paddingTop: "0px",
            paddingBottom: "15px"
        }
        const nodatastyle = {
            backgroundColor: "#ff3b30",
            paddingTop: "13px",
            paddingBottom: "7px",
            fontSize: "10px"
        }
        const { selectedDevice, selectedVlan, subnet, device } = this.state
        return (
            <Fragment>
                <Modal
                    isOpen={this.props.toggleSummaryModal}
                    toggle={this.toggleModal}
                    className="modal-xl"
                >
                    <ModalHeader toggle={this.toggleModal} className="bg-primary">
                        IP Summary
                    </ModalHeader>
                    <ModalBody >
                        {this.state.isLoading === false
                            ? (
                                // <Spinner color="primary" className="reload-spinner" />
                                <></>
                            ) : (
                                <Row>
                                    <Col sm="12">
                                        <Card>
                                            <CardBody style={cardbody}>
                                                <Row>
                                                    {device &&
                                                        <Col lg="3" md="6" sm="12">
                                                        <FormGroup className="mb-0">
                                                            <Label for="tech_location">Device<span style={{ color: "red" }}>*</span></Label>
                                                            <Select
                                                                value={selectedDevice}
                                                                onChange={this.handleDeviceChange}
                                                                options={device}
                                                                //   isMulti={true}
                                                                isSearchable={true}
                                                            />
                                                        </FormGroup>
                                                        </Col>                                                    
                                                    }

                                                    {this.props.IPSearchList && this.props.IPSearchList.ipVlan && this.props.IPSearchList.ipVlan.length > 0 &&
                                                        <Col lg="3" md="6" sm="12">
                                                            <FormGroup className="mb-0">
                                                                <Label for="value">VLAN<span style={{ color: "red" }}>*</span></Label>
                                                                <Select
                                                                    value={selectedVlan}
                                                                    onChange={this.handleVlanChange}
                                                                    options={this.convertVlan(this.props.IPSearchList && this.props.IPSearchList.ipVlan)}
                                                                    //   isMulti={true}
                                                                    isSearchable={true}
                                                                />
                                                            </FormGroup>
                                                        </Col>                                                    
                                                    }
                                                    <Col lg="3" md="6" sm="12">
                                                        <FormGroup className="mb-0">
                                                        <Label for="subnets">Subnets<span style={{ color: "red" }}>*</span></Label>
                                                        <Select
                                                                value={subnet}
                                                                onChange={this.handleSubnetChange}
                                                                options={this.subnets}
                                                                //   isMulti={true}
                                                                isSearchable={true}
                                                            />
                                                        </FormGroup>
                                                    </Col>
                                                </Row>
                                            </CardBody>
                                        </Card>
                                    </Col>
                                </Row>
                            )}
                            <Row>
                            <Col sm="12">
                                {(this.props.IPSearchList && this.props.IPSearchList.isLoading ) ? (
                                    <Spinner color="primary" className="reload-spinner"/>
                                ) : (
                                        <Fragment>
                                            { this.state.subnetLoading === true && this.props.IPSearchList && this.props.IPSearchList.summary && this.props.IPSearchList.summary.length !== 0 &&
                                                <Card >
                                                    <CardBody>
                                                            <Table striped responsive>
                                                                <thead>
                                                                    <tr>
                                                                        <th>Subnet</th>
                                                                        <th>Gateway</th>
                                                                        <th>Usable</th>
                                                                        <th>Available</th>
                                                                    </tr>
                                                                </thead>
                                                                <tbody className="unpadding striped hover">
                                                                    {(this.props.IPSearchList && this.props.IPSearchList.summary && this.state.data !== null) &&
                                                                        this.state.data.map((value, index) =>
                                                                            <tr key={index}>
                                                                                <td>{value.subnet}</td>
                                                                                <td>{value.gateway}</td>
                                                                                <td>{value.usable}</td>
                                                                                <td><span style={{ color: "blue" }}>{value.status === "Available" ?
                                                                                    <BootstrapTooltip title={value.lastseen ? "Available - Last Activity: "+value.lastseen : "No Details"} placement="top">
                                                                                        <Button size="sm" color="success">
                                                                                            <Check size={14} />
                                                                                        </Button>
                                                                                    </BootstrapTooltip>
                                                                                    :
                                                                                    <BootstrapTooltip title={value.lastseen ? "Not Available - Last Activity: "+value.status : "No Details"} placement="top">
                                                                                        <Button size="sm" color="danger">
                                                                                            <X size={14} />
                                                                                        </Button>
                                                                                    </BootstrapTooltip>
                                                                                }</span></td>
                                                                            </tr>
                                                                        )
                                                                    }
                                                                </tbody>
                                                            </Table>
                                                    </CardBody>
                                                </Card>
                                            }
                                            {this.props.IPSearchList && this.props.IPSearchList.summary && this.props.IPSearchList.summary.length === 0 &&
                                                <Card>
                                                    <CardBody style={nodatastyle}>
                                                        <CardTitle style={{ fontSize: "1.1rem" }}>No Results Found!</CardTitle>
                                                    </CardBody>
                                                </Card>
                                            }
                                        </Fragment>
                                    )}
                            </Col>
                        </Row>
                    </ModalBody>
                    <ModalFooter>
                        <Button className="add-new-btn" color="primary" onClick={this.toggleModal}>
                            <span className="align-middle">Close</span>
                        </Button>
                    </ModalFooter>
                </Modal>
                <ToastContainer />
            </Fragment>
        )
    }
}

const mapStateToProps = state => {
    return {
        IPSearchList: state.IPSearchList
    }
}

export default connect(mapStateToProps, {
    GetDevices,
    GetVlan,
    GetStatus
})(IpWatchSummary)
