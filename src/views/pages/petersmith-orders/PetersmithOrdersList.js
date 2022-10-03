import React, { Fragment } from 'react';
import { connect } from 'react-redux'
import { performRequest } from '../../../services/index';
import { Card, CardBody, CardHeader, CardTitle, Collapse, Table } from "reactstrap";
import Spinner from "../../../components/@vuexy/spinner/Loading-spinner"
import { ChevronDown } from "react-feather";

class PetersmithOrdersList extends React.PureComponent {

    intervalID = 0;

    state = {
        loading: false,
        orderData: "",
        orders: "",
        collapseOrderID: ""
    }


    componentDidMount() {
        const userName = sessionStorage.getItem("userName") || null;
        if (userName) {
            this.callOrderManagerApi(true)
            this.intervalID = setInterval(this.callOrderManagerApi, 30000);
        }
    }

    componentWillUnmount() {
        clearInterval(this.intervalID);
    }

    componentDidUpdate(prevProps, prevState) {
        if (prevState.orders !== this.state.orders) {
            let orderIndex = this.state.orders.findIndex(val => val.order_info && val.order_info.length)
            orderIndex !== -1 ? this.setState({ orderData: true }) : this.setState({ orderData: false })
        }
    }


    toggleOrdersMenu = (collapseOrderID) => {
        this.setState(prevState => ({
            collapseOrderID: prevState.collapseOrderID !== collapseOrderID ? collapseOrderID : ""
        }))
    }

    callOrderManagerApi = (setvalue = false) => {
        const token_value = localStorage.getItem('token') || null;
        const headers = {
            'Accept': 'application/json',
            'Authorization': `Bearer ${token_value}`
        };
        const userName = sessionStorage.getItem("userName") || null;
        let url = `/api/ps/order_manager/${userName}`;
        setvalue && this.setState({ loading: true })
        performRequest('get', url, headers)
            .then((response) => {
                if (response.status === 200) {
                    if (response.data.response_code === 200) {
                        if (true) {
                            this.setState({ orders: response.data.data, loading: false })
                        }
                    } else {
                        this.setState({ orders: "", loading: false })
                    }
                }
            })
            .catch((error) => {
                this.setState({ loading: false })
            })
    }

    render() {
        const { orders, loading, collapseOrderID, orderData } = this.state
        const iconStyle = { color: "rgb(109 109 109)" }
        const bodystyle = { paddingTop: "10px", paddingBottom: "0px", fontSize: "smaller" }
        const headerstyle = { paddingTop: "3px", paddingBottom: "5px", backgroundImage: "linear-gradient(30deg, #ece8e8, rgb(249 248 248))", height: "23px", paddingLeft: "10px" }
        const cardspace = { marginBottom: "10px" }
        const headerTextStyle = { fontWeight: "500", color: "#636363", marginBottom: "0.4rem", marginTop: "-0.8rem" }
        const ticketStyle = { fontWeight: "500" }
        const cardtitle = { fontSize: "small", color: "rgb(109 109 109)" }
        const ticketNumber = { color: "rgb(109 109 109)" }
        return (
            <Fragment>
                {loading ?

                    <Spinner />
                    :
                    <>
                        <Card>
                            <CardHeader style={{ background: "#dcdbdb" }}>
                                <h5 style={headerTextStyle}>Orders</h5>
                            </CardHeader>
                            <CardBody>
                                {orderData ?
                                    orders && orders.length ?
                                        orders.map((val, index) =>
                                            val.order_info && val.order_info.length
                                                ?
                                                <Card style={cardspace} key={index} onClick={() => this.toggleOrdersMenu(index)}>
                                                    <CardHeader style={headerstyle}>
                                                        <CardTitle style={cardtitle}>
                                                            {val.order_name}
                                                            <span style={ticketNumber} className="crm_tickets"> - {val.order_info ? val.order_info.length : 0}</span>
                                                        </CardTitle>
                                                        <ChevronDown
                                                            style={iconStyle}
                                                            className="collapse-icon"
                                                            size={15}
                                                        // onClick={() => this.toggleOrdersMenu(index)}
                                                        />
                                                    </CardHeader>
                                                    <Collapse isOpen={index === collapseOrderID}>
                                                        <CardBody style={bodystyle}>
                                                            <Table striped responsive>
                                                                <thead>
                                                                    <tr>
                                                                        <th>#</th>
                                                                        <th>OID</th>
                                                                        <th>CID</th>
                                                                        <th>SID</th>
                                                                        <th>Timestamp</th>
                                                                        <th>User</th>
                                                                        <th>Description</th>
                                                                    </tr>
                                                                </thead>
                                                                <tbody>
                                                                    {val.order_info && val.order_info.length ?
                                                                        val.order_info.map((data, index) =>
                                                                            <tr key={index}>
                                                                                <td>{index + 1}</td>
                                                                                <td>
                                                                                    <a onClick={() => this.toggleOrdersMenu(index)} style={ticketStyle} href={`https://crm.fdcservers.net/admin/ordermgr/order_view.php?order_id=${data.order_id}`} target="_blank" rel='noopener noreferrer'>
                                                                                        {data.order_id}
                                                                                    </a>
                                                                                </td>
                                                                                <td>
                                                                                    <a onClick={() => this.toggleOrdersMenu(index)} style={ticketStyle} href={`https://crm.fdcservers.net/admin/clientmgr/client_profile.php?clientid=${data.client_id}`} target="_blank" rel='noopener noreferrer'>
                                                                                        {data.client_id}
                                                                                    </a>
                                                                                </td>
                                                                                <td>{data.service_id}</td>
                                                                                <td>{data.ts}</td>
                                                                                <td>{data.founduser}</td>
                                                                                <td>{data.description}</td>
                                                                            </tr>
                                                                        )
                                                                        :
                                                                        <tr>
                                                                            <td><h4>No Data</h4></td>
                                                                            <td></td>
                                                                            <td></td>
                                                                            <td></td>
                                                                            <td></td>
                                                                            <td></td>
                                                                            <td></td>
                                                                        </tr>
                                                                    }
                                                                </tbody>
                                                            </Table>
                                                        </CardBody>
                                                    </Collapse>
                                                </Card>
                                                :
                                                null
                                        )
                                        :
                                        <h5>There are no records to display</h5>
                                    :
                                    <h5>There are no records to display</h5>
                                }
                            </CardBody>
                        </Card>
                    </>
                }
            </Fragment>
        )
    }
}

const mapStateToProps = state => {
    return {
        userDetails: state.auth.userProfile
    }
}

export default connect(mapStateToProps, {})(PetersmithOrdersList)