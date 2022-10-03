import React, { Fragment } from 'react';
import { performRequest } from '../../../services/index';
import { Card, CardBody, CardHeader, CardTitle, Table, Collapse, Row, Col, } from "reactstrap";
import Spinner from "../../../components/@vuexy/spinner/Loading-spinner";
import { ChevronDown, ExternalLink } from "react-feather";

class PetersmithTicketsList extends React.PureComponent {
    intervalID = 0;

    state = {
        loading: false,
        tickets: "",
        orders: "",
        collapseID: "",
        collapseOrderID: "",
        ticketData: false,
        orderData: false,
        tickets_updated_at: "",
        orders_updated_at: ""
    }

    componentDidMount() {
        sessionStorage.setItem("oder_count", 0);
        const userName = sessionStorage.getItem("userName") || null;
        if (userName) {
            this.callTicketsOrderApi(true)
            this.intervalID = setInterval(this.callTicketsOrderApi, 30000);
        }
    }

    componentWillUnmount() {
        clearInterval(this.intervalID);
    }

    componentDidUpdate(prevProps, prevState) {
        if (prevState.tickets !== this.state.tickets) {
            if (this.state.tickets) {
                let ticketIndex = this.state.tickets.findIndex(val => val.ticketcount > 0)
                ticketIndex !== -1 ? this.setState({ ticketData: true }) : this.setState({ ticketData: false })
            }
        }

        if (prevState.orders !== this.state.orders) {
            if (this.state.orders) {
                let orderIndex = this.state.orders.findIndex(val => val.ordercount > 0)
                orderIndex !== -1 ? this.setState({ orderData: true }) : this.setState({ orderData: false })
            }
        }
    }

    callTicketsOrderApi = (setvalue = false) => {
        const userName = sessionStorage.getItem("userName") || null;
        const orderCount = sessionStorage.getItem("oder_count") || 0;
        const token_value = localStorage.getItem('token') || null;
        const headers = {
            'Accept': 'application/json',
            'Authorization': `Bearer ${token_value}`
        };
        let url = `/api/ps/crm_status/${userName}/${orderCount}`;
        setvalue && this.setState({ loading: true });
        performRequest('get', url, headers)
            .then((response) => {
                if (response.status === 200) {
                    if (response.data.response_code === 200 && response.data && response.data.data) {
                        let ticketArray = response.data.data.ticket_list && response.data.data.ticket_list.length ? response.data.data.ticket_list : [];
                        let validTickets = ticketArray.filter(val => val.ticketcount);
                        let finalTickets = [];
                        validTickets.forEach(val => {
                            let openTickets = val.tickets.filter(value => value.ticket_status === "Open");
                            let holdTickets = val.tickets.filter(value => value.ticket_status === "On Hold");

                            if (openTickets && openTickets.length) {
                                finalTickets.push({
                                    "name_en_US": val.name_en_US,
                                    "q_id": val.q_id,
                                    "ticketcount": openTickets.length,
                                    "tickets": openTickets
                                })
                            }

                            if (holdTickets && holdTickets.length) {
                                finalTickets.push({
                                    "name_en_US": val.name_en_US,
                                    "q_id": val.q_id,
                                    "ticketcount": holdTickets.length,
                                    "tickets": holdTickets
                                })
                            }
                        })

                        if (true) {
                            this.setState({
                                tickets: finalTickets,
                                loading: false, orders: response.data.data.order_list,
                                tickets_updated_at: response.data.data.tickets_updated_at,
                                orders_updated_at: response.data.data.orders_updated_at
                            });
                        }
                        sessionStorage.setItem("oder_count", response.data.data.order_total);
                    }
                }
            })
            .catch((error) => this.setState({ loading: false }))
    }

    toggleMenu = (collapseID) => {
        this.setState(prevState => ({
            collapseID: prevState.collapseID !== collapseID ? collapseID : ""
        }))

    }

    toggleOrdersMenu = (collapseOrderID) => {
        this.setState(prevState => ({
            collapseOrderID: prevState.collapseOrderID !== collapseOrderID ? collapseOrderID : ""
        }))

    }


    handleTicketsclick = (e, val) => {
        e.stopPropagation();
        let type = 2;
        if (val.tickets.some(value => value.ticket_status === "Open")) {
            type = 1;
        } else {
            type = 2;
        }
        window.open(`https://crm.fdcservers.net/admin/supportmgr/ticket_list.php?queue=${val.q_id}&type=${type}&assign=All`)
    }

    handleOrderclick = (e, id) => {
        e.stopPropagation();
        window.open(`https://crm.fdcservers.net/admin/ordermgr/order_list.php?order_step_id=${id}`)
    }

    handleTicketName = (name, tickets) => {
        let open = tickets.some(val => val.ticket_status === "Open")
        if (open) {
            return (name + " Open")
        } else {
            return (name + " on Hold")
        }

    }

    checkStyle = (tickets) => {
        let open = tickets.some(val => val.ticket_status === "Open");
        if (open) {
            return true
        } else {
            return false
        }
    }

    render() {
        const { tickets, orders, loading, collapseID, collapseOrderID, ticketData, orderData, tickets_updated_at, orders_updated_at } = this.state
        const titleStyle = { textDecoration: "none", color: "rgb(109 109 109)" }
        const externallink = { color: "#7367f0", marginRight: "5px", paddingBottom: "2px", }
        const iconStyle = { color: "rgb(109 109 109)" }
        const bodystyle = { paddingTop: "10px", paddingBottom: "0px", fontSize: "smaller" }
        const headerstyle = { paddingTop: "3px", paddingBottom: "5px", backgroundImage: "linear-gradient(30deg, #ece8e8, rgb(249 248 248))", height: "23px", paddingLeft: "10px" }
        const cardspace = { marginBottom: "10px" }
        const headerTextStyle = { fontWeight: "500", color: "#636363", marginBottom: "0.4rem", marginTop: "-0.8rem" }
        const ticketStyle = { fontWeight: "500" }
        const cardtitle = { fontSize: "small" }
        const ticketNumber = { color: "rgb(109 109 109)" }
        const headerstyleOpen = { paddingTop: "3px", paddingBottom: "5px", backgroundImage: "linear-gradient(30deg, rgb(255 141 141), rgb(249 248 248))", height: "23px", paddingLeft: "10px" }
        const itemstyle = { backgroundImage: "linear-gradient(30deg, rgb(241 241 24), rgb(249, 248, 248))" }
        return (
            <Fragment>
                {loading ?

                    <Spinner />
                    :

                    <>
                        <Row>
                            {
                                tickets && tickets.length ?

                                    <Col md="6" sm="12">
                                        <Card>
                                            <CardHeader style={{ background: "#dcdbdb" }}>
                                                <h5 style={headerTextStyle}>Support</h5>
                                                <h6 style={headerTextStyle}>Last Updated : {tickets_updated_at} </h6>
                                            </CardHeader>
                                            <CardBody>
                                                {ticketData ?
                                                    tickets.map((val, index) =>
                                                        val.ticketcount ?
                                                            <Card style={cardspace} key={index} onClick={() => this.toggleMenu(index)}>
                                                                <CardHeader style={this.checkStyle(val.tickets) ? headerstyleOpen : headerstyle}>
                                                                    <CardTitle style={cardtitle} >
                                                                        <a><ExternalLink size={15} style={externallink} href="#" onClick={(e) => this.handleTicketsclick(e, val)} target="Ubersmith DE 2.3.0 - Support Manager"></ExternalLink></a>
                                                                        <a style={titleStyle}>
                                                                            {/* {val.name_en_US} */}
                                                                            {this.handleTicketName(val.name_en_US, val.tickets)}
                                                                        </a>
                                                                        <span style={ticketNumber} className="crm_tickets"> - {val.ticketcount ? val.ticketcount : 0}</span>
                                                                    </CardTitle>
                                                                    <ChevronDown
                                                                        style={iconStyle}
                                                                        className="collapse-icon"
                                                                        size={15}
                                                                    // onClick={() => this.toggleMenu(val.q_id)}
                                                                    />
                                                                </CardHeader>
                                                                <Collapse isOpen={index === collapseID}>
                                                                    <CardBody style={bodystyle}>
                                                                        <Table striped responsive>
                                                                            <tbody>
                                                                                {val.tickets && val.tickets.length ?
                                                                                    val.tickets.map((data, index) =>
                                                                                        <tr key={index} >
                                                                                            <td style={data.ticket_status === "Open" ? itemstyle : {}}>
                                                                                                <span onClick={() => this.toggleMenu(val.q_id)} style={{ fontWeight: "bold" }}>
                                                                                                    <a style={ticketStyle} target="Ubersmith DE 2.3.0 - Support Manager" href={data.tlink}>{`#${data.ticket_id}`}</a> :
                                                                                        </span> {data.subject}
                                                                                            </td>
                                                                                        </tr>
                                                                                    )

                                                                                    :
                                                                                    <tr>
                                                                                        <td>No Data.</td>
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
                                                }
                                            </CardBody>
                                        </Card>
                                    </Col>
                                    :
                                    <Col md="6" sm="12">
                                        <Card>
                                            <CardHeader style={{ background: "#dcdbdb" }}>
                                                <h5 style={headerTextStyle}>Tickets</h5>
                                                <h6 style={headerTextStyle}>Last Updated : {tickets_updated_at} </h6>
                                            </CardHeader>
                                            <CardBody>
                                                <h5>There are no records to display</h5>
                                            </CardBody>
                                        </Card>
                                    </Col>
                            }

                            {/* Orders List */}
                            {
                                orders && orders.length ?

                                    <Col md="6" sm="12">
                                        <Card>
                                            <CardHeader style={{ background: "#dcdbdb" }}>
                                                <h5 style={headerTextStyle}>Orders</h5>
                                                <h6 style={headerTextStyle}>Last Updated : {orders_updated_at} </h6>
                                            </CardHeader>
                                            <CardBody>
                                                {orderData
                                                    ?
                                                    orders.map((val, index) =>
                                                        val.ordercount
                                                            ?
                                                            <Card style={cardspace} key={index} onClick={() => this.toggleOrdersMenu(val.order_queue_id)}>
                                                                <CardHeader className="bg-gradient-warning" style={headerstyle}>
                                                                    <CardTitle style={cardtitle}>
                                                                        <a><ExternalLink size={15} style={externallink} href="#" onClick={(e) => this.handleOrderclick(e, val.locationq)} target="Ubersmith DE 2.3.0 - Support Manager"></ExternalLink></a>
                                                                        <a style={titleStyle} >
                                                                            {val.name}
                                                                        </a>
                                                                        <span style={ticketNumber} className="crm_tickets"> - {val.ordercount ? val.ordercount : 0}</span>

                                                                    </CardTitle>
                                                                    <ChevronDown
                                                                        style={iconStyle}
                                                                        className="collapse-icon"
                                                                        size={15}
                                                                    // onClick={() => this.toggleOrdersMenu(val.order_queue_id)}
                                                                    />
                                                                </CardHeader>
                                                                <Collapse isOpen={val.order_queue_id === collapseOrderID}>
                                                                    <CardBody style={bodystyle}>
                                                                        <Table striped responsive>
                                                                            <tbody>
                                                                                {val.orders && val.orders.length ?
                                                                                    val.orders.map((data, index) =>
                                                                                        <tr key={index}>
                                                                                            <td>
                                                                                                <span onClick={() => this.toggleOrdersMenu(val.order_queue_id)} style={{ fontWeight: "bold" }}>
                                                                                                    <a style={ticketStyle} target="Ubersmith DE 2.3.0 - Support Manager" href={data.tlink}>{`#${data.order_id}`}</a> :
                                                                                        </span> {data.hash}
                                                                                            </td>
                                                                                        </tr>
                                                                                    )

                                                                                    :
                                                                                    <tr>
                                                                                        <td>No Data.</td>
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
                                                }
                                            </CardBody>
                                        </Card>
                                    </Col>
                                    :

                                    <Col md="6" sm="12">
                                        <Card>
                                            <CardHeader style={{ background: "#dcdbdb" }}>
                                                <h5 style={headerTextStyle}>Orders</h5>
                                                <h6 style={headerTextStyle}>Last Updated : {orders_updated_at} </h6>
                                            </CardHeader>
                                            <CardBody>
                                                <h5>There are no records to display</h5>
                                            </CardBody>
                                        </Card>
                                    </Col>
                            }
                        </Row>
                    </>
                }
            </Fragment>
        )
    }
}

export default PetersmithTicketsList