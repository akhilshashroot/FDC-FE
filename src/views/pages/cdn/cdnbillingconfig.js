import React from 'react';
import {
    Card, CardBody, CardHeader, CardTitle, FormGroup, Label, Badge, Row, Col, Button, UncontrolledTooltip
} from "reactstrap"
import { User, MoreVertical, AlignRight, Calendar } from "react-feather"
import Select from 'react-select';
import Flatpickr from "react-flatpickr";
import "flatpickr/dist/themes/light.css";
import "../../../assets/scss/plugins/forms/flatpickr/flatpickr.scss"
import { connect } from "react-redux"
import { getCDNUserList, getCDNUserUpdateList, getCDNBillList } from "../../../redux/actions/cdn-billing"
import Spinner from "../../../components/@vuexy/spinner/Loading-spinner"
import './style.scss'
import moment from 'moment'
import { toast, ToastContainer, Zoom } from "react-toastify"
import "react-toastify/dist/ReactToastify.css"
import "../../../assets/scss/plugins/extensions/toastr.scss"


const wentWrong = () => toast.warning("Something Went Wrong", { transition: Zoom })

class CDNBillingConfig extends React.Component {

    state = {
        selectedUser: null,
        from: new Date(),
        to: new Date(),
        isLoading: false,
        billLoading: true

    }


    componentDidMount = () => {
        if (this.props.CDNList && !this.props.CDNList.cdnUserList) {
            this.props.getCDNUserList().then(() => {
                var defvalue = this.props.CDNList && this.props.CDNList.cdnUserList && this.props.CDNList.cdnUserList.users[0]
                this.setState({
                    isLoading: true,
                    selectedUser: { "label": defvalue.val, "value": defvalue.key },
                    to: new Date(),
                    from: [moment().subtract(30, "days").format("MM-DD-YYYY HH:mm:ss")]
                })
                localStorage.setItem('cdnuser', JSON.stringify({ "label": defvalue.val, "value": defvalue.key }))
            })
        }
        else {
            var cdnuser = JSON.parse(localStorage.getItem('cdnuser'));
            var cdnfrom = JSON.parse(localStorage.getItem('cdnfrom'));
            var cdnto = JSON.parse(localStorage.getItem('cdnto'));
            this.setState({
                isLoading: true,
                selectedUser: cdnuser,
                from: cdnfrom,
                to: cdnto
            })
        }
    }

    updateUserList = () => {
        this.setState({
            isLoading: false,
        })
        this.props.getCDNUserUpdateList().then(() => {
            var defvalue = this.props.CDNList && this.props.CDNList.cdnUserList && this.props.CDNList.cdnUserList.users[0]
            this.setState({
                isLoading: true,
                selectedUser: { "label": defvalue.val, "value": defvalue.key },
            })
        })
    }

    convertLocation = data => {
        var userData = []
        data && data.forEach((value) => {
            userData.push({ "label": value.val, "value": value.key })
        })
        return userData
    }

    handleUserChange = selectedUser => {
        this.setState(() => ({
            selectedUser: selectedUser
        }))
        localStorage.setItem('cdnuser', JSON.stringify(selectedUser))
    }

    Calculate = () => {
        localStorage.setItem('cdnfrom', JSON.stringify(this.state.from))
        localStorage.setItem('cdnto', JSON.stringify(this.state.to))
        this.setState({billLoading : false})
        var data = {}
        var user = this.state.selectedUser.value.split("_")
        data.start = moment(this.state.from[0]).format('YYYY-MM-DD+HH:mm:ss')
        data.end = moment(this.state.to[0]).format('YYYY-MM-DD+HH:mm:ss')
        data.user = user[0]
        data.crm = user[1]
        data.username = this.state.selectedUser.label
        data.start_new_disp = moment(this.state.from[0]).format('MM-DD-YYYY HH:mm:ss')
        data.end_new_disp = moment(this.state.to[0]).format('M-DD-YYYY HH:mm:ss')
        this.props.getCDNBillList(data).then(() => {
            this.setState({billLoading : true})
            if(this.props.CDNList && this.props.CDNList.cdnBillListError){
                wentWrong()
            }
        })

    }

    render() {
        const { selectedUser, from, to } = this.state
        const cardheader = {
            paddingTop: "10px",
            paddingBottom: "10px",
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

        const resultcard = {
            border: "1px solid #e6e6e6",
            borderRadius: "2px",
            background: "rgba(236, 236, 236, 0.35)",
            width: "100%",
            padding: "10px",
            borderRadius: "5px"
        }

        const resultbody = {
            border: "1px solid #e6e6e6",
            padding: "10px",
            borderRadius: "0 0 0 0",
            borderTop: "0px",
            width: "100%",
        }


        return (
            <>
                <Row>
                    <Col sm="12">
                        {this.props.CDNList && this.props.CDNList.isCDNUserListLoading  ? (
                            <Spinner color="primary" className="reload-spinner" />
                        ) : (
                                <Card>
                                    <CardHeader style={cardheader}>
                                        <CardTitle>CDN Users Billing Statistics</CardTitle>
                                    </CardHeader>
                                    <CardBody style={cardbody}>
                                        <Row>
                                            <Col lg="6" md="6" sm="12">
                                                <FormGroup>
                                                    <Label for="tech_location">Select User<span style={{ color: "red" }}> *</span>
                                                    </Label>
                                                    <span id="refresh" onClick={() => this.updateUserList()} className="refresh">
                                                        Refresh List
                                                    </span>
                                                    <UncontrolledTooltip placement="top" target="refresh">
                                                        Refresh User List
                                                    </UncontrolledTooltip>
                                                    <Select
                                                        value={selectedUser}
                                                        onChange={this.handleUserChange}
                                                        options={this.convertLocation(this.props.CDNList && this.props.CDNList.cdnUserList && this.props.CDNList.cdnUserList.users)}
                                                        isSearchable={true}
                                                    />
                                                </FormGroup>
                                            </Col>
                                            <Col lg="2" md="6" sm="12">
                                                <FormGroup className="mb-0">
                                                    <Label for="value">From<span style={{ color: "red" }}> *</span></Label>
                                                    <Flatpickr
                                                        className="form-control"
                                                        data-enable-time
                                                        value={from}
                                                        options={{
                                                            enableTime: true,
                                                            dateFormat: "m-d-Y H:i:s",
                                                            enableSeconds: true,
                                                            time_24hr: true,
                                                        }}
                                                        onChange={date => {
                                                            this.setState({ from: date });
                                                        }}
                                                    />
                                                </FormGroup>
                                            </Col>
                                            <Col lg="2" md="6" sm="12">
                                                <FormGroup className="mb-0">
                                                    <Label for="value">To<span style={{ color: "red" }}> *</span></Label>
                                                    <Flatpickr
                                                        className="form-control"
                                                        data-enable-time
                                                        value={to}
                                                        options={{
                                                            enableTime: true,
                                                            dateFormat: "m-d-Y H:i:s",
                                                            enableSeconds: true,
                                                            time_24hr: true,
                                                            minDate: `${this.state.from}`
                                                        }}
                                                        onChange={date => {
                                                            this.setState({ to: date });
                                                        }}
                                                    />
                                                </FormGroup>
                                            </Col>
                                            <Col lg="2" md="6" sm="12">
                                                <Button
                                                    className=""
                                                    style={buttonstyle}
                                                    color="primary"
                                                    onClick={() => this.Calculate()}
                                                    outline>
                                                    <span className="align-middle">Calculate</span>
                                                </Button>
                                            </Col>
                                        </Row>
                                        {this.props.CDNList && this.props.CDNList.isCDNBillListLoading ? (
                                            <Spinner color="primary" className="reload-spinner" />
                                        ) : (
                                            <>
                                            {this.props.CDNList && this.props.CDNList.cdnBillList && 
                                                <Card>
                                                    <CardHeader>
                                                    {this.props.CDNList && this.props.CDNList.cdnBillList && this.props.CDNList.cdnBillList.calculated && 
                                                        <Row style={resultcard}>
                                                            <Col lg="4" md="6" sm="12">
                                                                <User size={17} style={{ marginRight: "5px", color: "#23a9f6" }} />
                                                                {this.props.CDNList && this.props.CDNList.cdnBillList && 
                                                                this.props.CDNList.cdnBillList.calculated && this.props.CDNList.cdnBillList.calculated.username}
          	  	                                            </Col>
                                                            <Col lg="5" md="6" sm="12">
                                                                <b style={{ color: "#23a9f6" }}>FROM </b>
                                                                {this.props.CDNList && this.props.CDNList.cdnBillList && 
                                                                this.props.CDNList.cdnBillList.calculated && this.props.CDNList.cdnBillList.calculated.start_new_disp}
                                                             <span><MoreVertical size={15} /></span>
                                                                <b style={{ color: "#23a9f6" }}> TO </b>
                                                                {this.props.CDNList && this.props.CDNList.cdnBillList && 
                                                                this.props.CDNList.cdnBillList.calculated && this.props.CDNList.cdnBillList.calculated.end_new_disp}
          	  	                                            </Col>
                                                            <Col lg="3" md="6" sm="12" style={{ textAlign: "right" }}>
                                                                ${this.props.CDNList && this.props.CDNList.cdnBillList && 
                                                                this.props.CDNList.cdnBillList.calculated && this.props.CDNList.cdnBillList.calculated.amount}
          	  	                                            </Col>
                                                        </Row>
                                                    }
                                                    {this.props.CDNList && this.props.CDNList.cdnBillList && this.props.CDNList.cdnBillList.clients && this.props.CDNList.cdnBillList.clients.length > 0 ?
                                                        this.props.CDNList.cdnBillList.clients.map((value, index) => (
                                                        <Row style={resultbody} key={index}>
                                                            <Col lg="8" md="6" sm="12">
                                                                <span>
                                                                    <AlignRight size={17} style={{ marginRight: "5px" }} />
                                                                    <a target="_blank" href={`${value.service_packid_href}`}>
                                                                        #{value.service_packid}
                                                                    </a>
                                                                    <span><MoreVertical size={15} /></span>
                                                                    {value.service_desserv}
                                                                    </span>
                                                            </Col>
                                                            <Col lg="4" md="6" sm="12">
                                                                <span style={{ float: "right" }}>
                                                                    <Badge color={`${value.status === "Active"
                                                                            ? "success"
                                                                            : value.status === "Suspended"
                                                                                ? "warning"
                                                                                : value.status === "Canceled"
                                                                                    ? "danger"
                                                                                : "info"
                                                                            }`}>
                                                                        {value.status}
                                                                    </Badge>
                                                                    <MoreVertical size={15} style={{ marginRight: "5px" }} />
                                                                    <Calendar size={15} style={{ marginRight: "5px" }} />
                                                                    Last Renewal {value.last_renewal}
                                                                </span>
                                                            </Col>
                                                        </Row>
                                                        )) :
                                                        <Row style={resultbody}>
                                                        <Col lg="12" md="12" sm="12">
                                                            <span style={{textAlign:"center"}}>
                                                                <p>There are no records to display</p>
                                                            </span>
                                                        </Col>
                                                    </Row>
                                                    }
                                                    </CardHeader>
                                                </Card>
                                            }
                                            </>
                                        )}
                                    </CardBody>
                                </Card>
                            )}
                    </Col>
                </Row>
                <ToastContainer />
            </>
        )
    }
}

const mapStateToProps = state => {
    return {
        CDNList: state.CDNList
    }
}

export default connect(mapStateToProps, {
    getCDNUserList,
    getCDNUserUpdateList,
    getCDNBillList
})(CDNBillingConfig)