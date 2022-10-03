import React from 'react';
import { Card, CardBody, CardHeader, Table, Row, Col, FormGroup, Form, Button, Badge } from 'reactstrap';
import { Search } from "react-feather";
import { performRequest } from '../../../services/index';
import { toast, ToastContainer, Zoom } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "../../../assets/scss/plugins/extensions/toastr.scss";
import Spinner from "../../../components/@vuexy/spinner/Loading-spinner";

const CustomHeader = props => {
    const scanbutton = {
        paddingBottom: "11px",
        paddingTop: "10px",
        paddingLeft: "10px",
        paddingRight: "10px"
    }
    const scanicon = {
        marginRight: "5px"
    }
    return (
        <>
            <Form>
                <Row>
                    {/* <Col lg="2" md="2" sm="6">
                        <FormGroup>
                            <Input
                                type="number"
                                placeholder="Enter Count"
                                value={props.value}
                                onChange={props.handleCountChange}
                                onKeyDown={props.handleSearchKeyDown}
                            />
                        </FormGroup>
                    </Col> */}
                    <Col lg="2" md="2" sm="6">
                        <FormGroup>
                            <Button.Ripple
                                color="primary"
                                style={scanbutton}
                                onClick={props.scanCount}>
                                <Search style={scanicon} size={15} />
                                <span className="align-middle">Start Scan</span>
                            </Button.Ripple>
                        </FormGroup>
                    </Col>

                </Row>
            </Form>
        </>
    )
}

const warningMessage = () => toast.warning("Something went wrong.Please try again later.", { transition: Zoom });
class PetersmithCpanelList extends React.Component {
    state = {
        result: "",
        count: "",
        loading: false
    }

    componentDidMount() {
        // this.scanCpanel()
    }

    handleCountChange = (e) => {
        this.setState({ count: e.target.value })
    }

    scanCount = () => {
        // let count = parseInt(this.state.count)
        // if (count > 0) {
            this.scanCpanel()
        // } else {
        //     countWarning()
        // }
    }

    // Search on "Enter" key 
    handleSearchKeyDown = (e) => {
        if (e.keyCode === 13) {
            e.preventDefault()
            this.scanCount();
        }
    }

    scanCpanel = () => {
        if (!process.env.NODE_ENV || process.env.NODE_ENV !== 'development') {
            // if (count && count > 0) {
                const token_value = localStorage.getItem('token') || null;
                const headers = {
                    'Accept': 'application/json',
                    'Authorization': `Bearer ${token_value}`
                };

                let url = `/api/ps/cpanel_audit`;
                this.setState({ loading: true })
                performRequest('get', url, headers)
                    .then((response) => {
                        if (response.status === 200) {
                            if (response.data.response_code === 200) {
                                this.setState({ result: response.data.data, loading: false })
                            } else {
                                warningMessage();
                                this.setState({ loading: false, result: "" })
                            }

                        }
                    })
                    .catch((error) => {
                        warningMessage();
                        this.setState({ loading: false, result: "" })
                    })
            // }

        } else {
            // if (count && count > 0) {
                let data = {
                    "cpanel_report_date": "10/29/2020 06:15:04 PM",
                    "license": [
                        {
                            "score": 0,
                            "ip": "50.7.66.18",
                            "id": "L50633003",
                            "creationdate": "09/12/2019 05:18:35 PM",
                            "hostname": "solinari.esotechnology.net",
                            "total": 0,
                            "expiry": "To Be Expired."
                        },
                        {
                            "score": 0,
                            "ip": "50.7.77.170",
                            "id": "L50633015",
                            "creationdate": "09/12/2019 05:18:35 PM",
                            "hostname": "mahal.bihira.com",
                            "total": 0,
                            "expiry": "To Be Expired."
                        },
                        {
                            "score": -6,
                            "ip": "192.240.108.114",
                            "id": "L50633035",
                            "creationdate": "09/12/2019 05:18:35 PM",
                            "hostname": "server.pantiescollection.net",
                            "total": 6,
                            "expiry": ""
                        },
                        {
                            "score": 0,
                            "ip": "23.237.156.178",
                            "id": "L50633043",
                            "creationdate": "09/12/2019 05:18:35 PM",
                            "hostname": "server.didaktron.lat",
                            "total": 0,
                            "expiry": ""
                        },
                        {
                            "score": 0,
                            "ip": "50.7.154.58",
                            "id": "L50633067",
                            "creationdate": "09/12/2019 05:18:36 PM",
                            "hostname": "host.2ali.com",
                            "total": 0,
                            "expiry": "To Be Expired."
                        }
                    ]
                }
                this.setState({ result: data })
            // }
        }
    }

    render() {
        const { result, count, loading } = this.state;
        const headerTextStyle1 = { fontWeight: "500", color: "#636363", marginBottom: "0.9rem", marginTop: "-0.8rem" };
        const headerTextStyle2 = { fontWeight: "500", color: "#636363", marginBottom: "0.4rem", marginTop: "-0.8rem" };
        const ticketStyle = { fontWeight: "500" }
        return (
            <>
                {loading ?
                    <Spinner />
                    :
                    <>
                        <CustomHeader
                            value={count}
                            handleCountChange={this.handleCountChange}
                            scanCount={this.scanCount}
                            handleSearchKeyDown={this.handleSearchKeyDown}
                        />

                        {result &&
                            <Card>
                                <CardHeader style={{ background: "#dcdbdb" }}>
                                    <h5 style={headerTextStyle1}><b>cPanel Report: </b>{result && result.cpanel_report_date ? result.cpanel_report_date : "N/A"} MST</h5>
                                    <span style={headerTextStyle2}><b>Parameters:</b> Testing the following ports: (2082, 2083, 2086, 2087, 2095, 2096). Checking for localhost as hostname.</span>
                                </CardHeader>
                                <CardBody >
                                    <Table striped responsive>
                                        <thead>
                                            <tr>
                                                <th>#</th>
                                                <th>IP</th>
                                                <th>Port Check</th>
                                                <th>ID</th>
                                                <th>Creation Date</th>
                                                <th>Hostname</th>
                                                <th>Score</th>
                                                <th>Expire Status</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {result && result.license && result.license.length ?
                                                result.license.map((data, index) =>
                                                    <tr key={index}>
                                                        <td>{index + 1}</td>
                                                        <td>
                                                            <a style={ticketStyle} href={`https://crm.fdcservers.net/admin/search_results.php?search_what=client&searchfor=${data.ip}`} target="_blank" rel='noopener noreferrer'>
                                                                {data.ip}
                                                            </a>
                                                        </td>
                                                        <td>
                                                            {`${data.total} out of the 6 cPanel ports are closed.`}
                                                        </td>
                                                        <td>
                                                            <a style={ticketStyle} href={`https://manage2.cpanel.net/lookup.cgi?type=ip&txt=${data.ip}`} target="_blank" rel='noopener noreferrer'>
                                                                {data.id}
                                                            </a>
                                                        </td>
                                                        <td>{data.creationdate}</td>
                                                        <td>{data.hostname}</td>
                                                        <td>{data.score}</td>
                                                        <td className="blink">{data.expiry ? <Badge pill color="danger">{data.expiry}</Badge> : null}</td>
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
                            </Card>
                        }
                        <ToastContainer />
                    </>
                }
            </>
        )
    }
}

export default PetersmithCpanelList