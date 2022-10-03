import React, { Fragment } from 'react';
import { Card, CardBody, CardHeader, CardTitle, FormGroup, Label, Input, Row, Col, Button } from "reactstrap"
import { Search, HelpCircle, Check, X } from "react-feather"
import Select from 'react-select';
import { connect } from "react-redux"
import SearchHelp from "./SearchHelp"
import { getSearchIp, getSearchSubnet, getIwLocation, GetDevices } from "../../../redux/actions/ip-watch/"
import { Table } from "reactstrap"
import Chip from "../../../components/@vuexy/chips/ChipComponent"
import Tooltip from "@material-ui/core/Tooltip"
import Spinner from "../../../components/@vuexy/spinner/Loading-spinner"
import { toast, ToastContainer, Zoom } from "react-toastify"
import "react-toastify/dist/ReactToastify.css"
import "../../../assets/scss/plugins/extensions/toastr.scss"
import Summary from "./ipwatchSummary"
import { makeStyles } from "@material-ui/core/styles";

const locationWarning = () => toast.warning("Please Select a Location", { transition: Zoom })
const ipWarning = () => toast.warning("Please Enter a valid IP Address", { transition: Zoom })
const wentWrong = () => toast.warning("Something went wrong.Please try again..", { transition: Zoom })
const noVlans = () => toast.warning("The provided device IP could not be mapped to an active device (or no VLANs are routed to it)", { transition: Zoom })

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

class IpwatchSearchView extends React.PureComponent {

    state = {
        selectedOption: null,
        value: "",
        thumbView: false,
        toggleSearchHelpModal: false,
        toggleSummaryModal: false,
        ipSearch: false,
        ipv: false,
        device: "",
        vlan: "",
        summaryloc: null
    }
    componentDidMount() {
        if ((this.props.IPSearchList && this.props.IPSearchList.iwLocation === undefined)) {
            this.props.getIwLocation(true).then(() => {
                this.handleChange({ "label": "All", "value": "all" })
            })
        }
        else {
            var search_location = JSON.parse(localStorage.getItem("search_location"))
            if ((this.props.IPSearchList && this.props.IPSearchList.searchIp) || (this.props.IPSearchList && this.props.IPSearchList.searchIpError)) {
                var value = JSON.parse(localStorage.getItem("search_ip"))
                var tempvalue = value.split("/")
                var prefix = tempvalue[1]
                if (prefix === undefined) {
                    this.setState({ ipv: false })
                }
                else {
                    this.setState({ ipv: true })
                }
            }
            this.setState({
                selectedOption: search_location,
                value: value,
                ipSearch: true,
            })
        }

    }

    // Change Location

    handleChange = selectedOption => {
        localStorage.setItem('search_location', JSON.stringify(selectedOption));
        // this.props.GetDevices(selectedOption.value, true)
        this.setState(() => ({ selectedOption }),
            () => this.handleChangeSearch());
    };

    handleChangeSearch = () => {
        if (this.state.value !== "") {
            this.Search()
        }
    }

    convertLocation = data => {
        var locationData = [{ "label": "All", "value": "all" }]
        data && data.forEach((value) => {
            locationData.push({ "label": value.name, "value": value.id })
        })
        return locationData
    }

    // Search Modal

    handleSearchHelp = () => {
        this.setState({ toggleSearchHelpModal: !this.state.toggleSearchHelpModal });
    }

    // Summary Modal

    handleSummary = (device, vlan, loc) => {
        if (this.state.selectedOption.value === "all") {
            this.setState({
                toggleSummaryModal: !this.state.toggleSummaryModal,
                device: device,
                vlan: vlan,
                summaryloc: loc
            });
        }
        else {
            this.setState({
                toggleSummaryModal: !this.state.toggleSummaryModal,
                device: device,
                vlan: vlan,
                summaryloc: this.state.selectedOption.value
            });
        }

    }
    closeSearchModal = () => {
        this.setState({ toggleSearchHelpModal: false })
    }
    closeSummaryModal = () => {
        this.setState({ toggleSummaryModal: false })
    }

    // time difference
    dateDiffToString = (a, b) => {

        var diff = Math.abs(a - b);

        var ms = diff % 1000;
        diff = (diff - ms) / 1000
        var ss = diff % 60;
        diff = (diff - ss) / 60
        var mm = diff % 60;
        diff = (diff - mm) / 60
        var hh = diff % 24;
        var days = (diff - hh) / 24

        return (`${days ? days + "d" : ""} ${hh}h ${mm}m ${ss}s`)

    }

    timeDiff = (first_seen) => {
        var today = new Date()
        var yest = new Date(first_seen)
        if (first_seen) {
            return this.dateDiffToString(yest, today)
        }
    }

    // IP Search

    Search = () => {
        if (this.state.selectedOption.value !== null) {
            if ((this.state.value !== "") && (this.state.value !== undefined)) {
                localStorage.setItem('search_ip', JSON.stringify(this.state.value));
                this.setState({ ipSearch: true })
                var tempvalue = this.state.value.split("/")
                var subnet = tempvalue[0]
                var prefix = tempvalue[1]
                if (prefix === undefined) {
                    this.setState({ ipv: false })
                    this.props.getSearchIp(this.state.value, this.state.selectedOption.value, true).then(() => {
                        if (this.props.IPSearchList && this.props.IPSearchList.searchIpError && this.props.IPSearchList.searchIpError === "The query was not a valid IP or MAC address") {
                            ipWarning()
                        }
                        else if (this.props.IPSearchList && this.props.IPSearchList.searchIpError && this.props.IPSearchList.searchIpError !== "No results") {
                            wentWrong()
                        }
                    })
                }
                else {
                    this.setState({ ipv: true })
                    this.props.getSearchSubnet(subnet, prefix, this.state.selectedOption.value, true).then(() => {
                        if (this.props.IPSearchList && this.props.IPSearchList.searchIpError && this.props.IPSearchList.searchIpError === "The query was not a valid IP") {
                            ipWarning()
                        }
                        else if (this.props.IPSearchList && this.props.IPSearchList.searchIpError && this.props.IPSearchList.searchIpError !== "No results") {
                            wentWrong()
                        }
                    })
                }
            }
            else {
                ipWarning()
            }
        }
        else {
            locationWarning()
        }
    }

    // On KeyDown
    handleKeyDown = (e) => {
        if (e.key === 'Enter') {
            this.Search()
        }
    }

    // MacSearch

    macSearch = (ip) => {
        this.setState(() => ({
            value: ip,
        }), () => this.Search());
    }

    // IPV Search

    IpvSearch = () => {
        var ip = JSON.parse(localStorage.getItem("search_ip"))
        this.setState(() => ({
            value: ip,
        }), () => this.Search());
        this.closeSearchModal()
    }

    render() {
        const { selectedOption, value } = this.state
        const cardheader = {
            paddingTop: "10px",
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
        const datastyle = {
            backgroundColor: "#c7c4ec",
            paddingTop: "13px",
            paddingBottom: "7px",
            fontSize: "10px"
        }
        const nodatastyle = {
            backgroundColor: "#ff3b30",
            paddingTop: "13px",
            paddingBottom: "7px",
            fontSize: "10px"
        }

        return (
            <React.Fragment>
                {(this.props.IPSearchList && this.props.IPSearchList.locationLoading === true) ? (
                    <Spinner color="primary" className="reload-spinner" />
                ) : (

                        // Search Header
                        <Row>
                            <Col sm="12">
                                <Card>
                                    <CardHeader style={cardheader}>
                                        <CardTitle>Search</CardTitle>
                                        <Button className="mb-1" color="info" size="sm" onClick={this.handleSearchHelp}>
                                            <HelpCircle size={15} style={{ marginRight: "5px" }} />
                                            <span className="align-middle">Search Help</span>
                                        </Button>
                                    </CardHeader>
                                    <CardBody style={cardbody}>
                                        <Row>
                                            {this.props.IPSearchList && this.props.IPSearchList.iwLocation &&
                                                <Col lg="6" md="6" sm="12">
                                                    <FormGroup className="mb-0">
                                                        <Label for="tech_location">Locations<span style={{ color: "red" }}>*</span></Label>
                                                        <Select
                                                            value={selectedOption}
                                                            onChange={this.handleChange}
                                                            options={this.convertLocation(this.props.IPSearchList && this.props.IPSearchList.iwLocation)}
                                                            //   isMulti={true}
                                                            isSearchable={true}
                                                            onKeyDown={this.handleKeyDown}
                                                        />
                                                    </FormGroup>
                                                </Col>
                                            }
                                            <Col lg="3" md="6" sm="12">
                                                <FormGroup className="mb-0">
                                                    <Label for="value">IP/MAC <span style={{ color: "red" }}>*</span></Label>
                                                    <Input
                                                        type="text"
                                                        id="value"
                                                        value={value || ""}
                                                        onChange={e => this.setState({ value: e.target.value.trim() })}
                                                        onKeyDown={this.handleKeyDown}
                                                    />
                                                </FormGroup>
                                            </Col>
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
                                        </Row>
                                    </CardBody>
                                </Card>
                            </Col>
                        </Row>
                    )}

                {/* Search Help Modal */}
                {this.state.toggleSearchHelpModal &&
                    <SearchHelp
                        closeModal={this.closeSearchModal}
                        toggleSearchHelpModal={this.state.toggleSearchHelpModal}
                        IpvSearch={this.IpvSearch}
                    />
                }

                {/* Search Summary Modal */}
                {this.state.toggleSummaryModal &&
                    <Summary
                        closeModal={this.closeSummaryModal}
                        toggleSummaryModal={this.state.toggleSummaryModal}
                        value={{ "vlan": this.state.vlan, "device": this.state.device, "location": this.state.summaryloc }}
                        noVlans={noVlans}
                    // deviceList={this.props.IPSearchList && this.props.IPSearchList.ipDevices}
                    />
                }

                {/* Data Table */}
                {this.state.ipSearch &&

                    <Row>
                        <Col sm="12">
                            {(this.props.IPSearchList && this.props.IPSearchList.searchIpLoading) ? (
                                <Spinner color="primary" className="reload-spinner" />
                            ) : (
                                    <Fragment>
                                        {this.props.IPSearchList && this.props.IPSearchList.searchIp &&
                                            <Card>
                                                {this.state.ipv === false && this.props.IPSearchList && this.props.IPSearchList.searchIp && this.props.IPSearchList.searchIp.vlan && this.props.IPSearchList.searchIp.vlan.length > 0 &&

                                                    <CardHeader style={datastyle}>
                                                        <CardTitle style={{ fontSize: "1.1rem" }}>
                                                            The IP address is currently routed to <span>
                                                                <span className="cursor-pointer" style={{ color: "blue" }}
                                                                    onClick={() => this.handleSummary(this.props.IPSearchList.searchIp.vlan[0].device, this.props.IPSearchList.searchIp.vlan[0].vlan_id, this.props.IPSearchList.searchIp.vlan[0].location)}>
                                                                    VLAN {this.props.IPSearchList.searchIp.vlan[0].vlan_id}
                                                                </span> </span>
                                                        on <span>
                                                                <span className="cursor-pointer" style={{ color: "blue" }}
                                                                    onClick={() => this.handleSummary(this.props.IPSearchList.searchIp.vlan[0].device, this.props.IPSearchList.searchIp.vlan[0].vlan_id, this.props.IPSearchList.searchIp.vlan[0].location)}>
                                                                    {this.props.IPSearchList.searchIp.vlan[0].device}
                                                                </span> </span>
                                                        </CardTitle>
                                                    </CardHeader>
                                                }
                                                <CardBody>

                                                    {/* Normal Ip search table */}
                                                    {this.state.ipv === false &&
                                                        <Table striped responsive>
                                                            <thead>
                                                                <tr>
                                                                    <th>IP Address</th>
                                                                    <th>MAC Address</th>
                                                                    {selectedOption && selectedOption.value === 'all' &&
                                                                        <th>Location</th>
                                                                    }
                                                                    <th>First Seen</th>
                                                                    <th>Last Seen</th>
                                                                    <th>Switch/Port</th>
                                                                </tr>
                                                            </thead>
                                                            <tbody className="unpadding striped hover">
                                                                {(this.props.IPSearchList && this.props.IPSearchList.searchIp && this.props.IPSearchList.searchIp.results && this.props.IPSearchList.searchIp.results.length > 0) &&
                                                                    this.props.IPSearchList.searchIp.results.map((value, index) =>
                                                                        <tr key={index}>
                                                                            <td><span onClick={() => this.macSearch(value.ip)} style={{ color: "blue" }}>{value.ip ? <span className="cursor-pointer">{value.ip}</span> : "N/A"}</span></td>
                                                                            <td><span onClick={() => this.macSearch(value.mac)} style={{ color: "blue" }}>{value.mac ? <BootstrapTooltip title={value.vendor ? value.vendor : "No Details"}
                                                                                placement="top"><span className="cursor-pointer">{value.mac}</span></BootstrapTooltip> : "N/A"}</span></td>
                                                                            {selectedOption && selectedOption.value === 'all' &&
                                                                                <td>{value.location}</td>
                                                                            }
                                                                            <td>
                                                                                <span>
                                                                                    {value.firstseen ?
                                                                                        <BootstrapTooltip
                                                                                            title={value.firstseen ? value.firstseen : "No Details"}
                                                                                            placement="top">
                                                                                            {/* <span className="cursor-pointer">{this.timeDiff(value.firstseen)}</span> */}
                                                                                            <span className="cursor-pointer">{value.time_diff_firstseen}</span>
                                                                                        </BootstrapTooltip>
                                                                                        :
                                                                                        "N/A"}
                                                                                </span>
                                                                            </td>
                                                                            <td><span>{value.lastseen ? <BootstrapTooltip title={value.lastseen ? value.lastseen : "No Details"}
                                                                                placement="top">
                                                                                <span className="cursor-pointer">
                                                                                    {/* <Chip
                                                                                        className="m-0"
                                                                                        color="success"
                                                                                        text={this.timeDiff(value.lastseen)}
                                                                                    /> */}
                                                                                    <Chip
                                                                                        className="m-0"
                                                                                        color="success"
                                                                                        text={value.time_diff_lastseen}
                                                                                    />
                                                                                </span>
                                                                            </BootstrapTooltip> : "N/A"}
                                                                            </span></td>
                                                                            <td><span>{value.switch_port ? value.switch_port : "Unknown"}</span></td>
                                                                        </tr>
                                                                    )
                                                                }
                                                            </tbody>
                                                        </Table>
                                                    }

                                                    {/* ipv search table */}
                                                    {this.state.ipv === true &&
                                                        <Table striped responsive>
                                                            <thead>
                                                                <tr>
                                                                    <th>Device</th>
                                                                    <th>VLAN</th>
                                                                    {selectedOption && selectedOption.value === 'all' &&
                                                                        <th>Location</th>
                                                                    }
                                                                    <th>Subnet</th>
                                                                    <th>Gateway</th>
                                                                    <th>Usable</th>
                                                                    <th>Available</th>
                                                                </tr>
                                                            </thead>
                                                            <tbody className="unpadding striped hover">
                                                                {(this.props.IPSearchList && this.props.IPSearchList.searchIp && this.props.IPSearchList.searchIp.length > 0) &&
                                                                    this.props.IPSearchList.searchIp.map((value, index) =>
                                                                        <tr key={index}>
                                                                            <td><span onClick={() => this.handleSummary(value.device, value.vlan, value.location)} style={{ color: "blue" }}>{value.device ? <BootstrapTooltip title={value.deviceId ? value.deviceId : "No Details"}
                                                                                placement="top"><span className="cursor-pointer">{value.device}</span></BootstrapTooltip> : "N/A"}</span></td>
                                                                            <td><span onClick={() => this.handleSummary(value.device, value.vlan, value.location)} style={{ color: "blue" }}>{value.vlan ? <span className="cursor-pointer">{value.vlan}</span> : "N/A"}</span></td>
                                                                            {selectedOption && selectedOption.value === 'all' &&
                                                                                <td>{value.location}</td>
                                                                            }
                                                                            <td>{value.subnet}</td>
                                                                            <td>{value.gateway}</td>
                                                                            <td>{value.max}</td>
                                                                            <td><span style={{ color: "blue" }}>{value.label === "success" ?
                                                                                <BootstrapTooltip title={value.text ? value.text + " - Last Activity: " + value.lastseen : "No Details"} placement="top">
                                                                                    <Button size="sm" color="success">
                                                                                        <Check size={14} />
                                                                                    </Button>
                                                                                </BootstrapTooltip>
                                                                                :
                                                                                <BootstrapTooltip title={value.text ? value.text + " - Last Activity: " + value.lastseen : "No Details"} placement="top">
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
                                                    }
                                                </CardBody>
                                            </Card>
                                        }

                                        {/* no result body */}
                                        {this.props.IPSearchList && this.props.IPSearchList.searchIpError && this.props.IPSearchList.searchIpError === "No results" &&
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
                }
                <ToastContainer />
            </React.Fragment>
        )
    }
}

const mapStateToProps = state => {
    return {
        IPSearchList: state.IPSearchList
    }
}

export default connect(mapStateToProps, {
    getIwLocation,
    getSearchIp,
    getSearchSubnet,
    GetDevices
})(IpwatchSearchView)