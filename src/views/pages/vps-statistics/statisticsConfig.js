import React from 'react';
import { Row, Col, CardHeader, Card, CardTitle } from "reactstrap"
import { connect } from "react-redux"
import { getInitialData } from "../../../redux/actions/data-list/"
import CrmVpsStats from './crmVpsStats'
import OverallSummary from './overallSummary'
import LocationSummary from './locationSummary'
import DataStorageUsage from './dataStorageUsage'
import PackageSummary from './packageSummary'
import WindowsLicense from './windowsLicense'
import Spinner from "../../../components/@vuexy/spinner/Loading-spinner";
import { performRequest } from '../../../services/index';

class StatisticsConfig extends React.PureComponent {


    state = {
        loading: false,
        data: ""
    }
    componentDidMount = () => {
        if (!process.env.NODE_ENV || process.env.NODE_ENV !== 'development') {
            const token_value = localStorage.getItem('token') || null;
            const headers = {
                'Accept': 'application/json',
                'Authorization': `Bearer ${token_value}`
            };

            let url = `/api/vps/statistics`;
            this.setState({ loading: true })
            performRequest('get', url, headers)
                .then((response) => {
                    if (response.status === 200) {
                        if (response.data.response_code === 200) {
                            this.setState({ data: response.data.data, loading: false })
                        } else {
                            this.setState({ loading: false, data: "" })
                        }

                    }
                })
                .catch((error) => {
                    this.setState({ loading: false, data: "" })
                })

        } else {
            let newdata =
            {
                "last_updated": "21 May 2020 01:05 AM",
                "overall":
                    [
                        { "title": "Total Virtual Machines", "count": 1997 },
                        { "title": "Active Virtual Machines", "count": 1712 },
                        { "title": "Suspended Virtual Machines", "count": 285 },
                        { "title": "Linux Virtual Machines", "count": 1934 },
                        { "title": "Windows Virtual Machines", "count": 56 }
                    ],
                "location":
                    [
                        { "title": "AMSTERDAM", "count": 53 },
                        { "title": "AMSTERDAM ENT", "count": 140 },
                        { "title": "FRANKFURT ", "count": 5 },
                        { "title": "FRANKFURT ENT", "count": 110 },
                        { "title": "DENVER", "count": 45 },
                        { "title": "DENVER ENT", "count": 117 },
                        { "title": "LOS ANGELES ", "count": 58 },
                        { "title": "LOS ANGELES ENT", "count": 223 },
                        { "title": "MIAMI", "count": 20 },
                        { "title": "MIAMI ENT", "count": 112 },
                        { "title": "PARIS", "count": 11 },
                        { "title": "PARIS ENT", "count": 0 },
                        { "title": "VIENNA", "count": 6 },
                        { "title": "VIENNA ENT", "count": 58 },
                        { "title": "LONDON", "count": 12 },
                        { "title": "LONDON ENT", "count": 181 },
                        { "title": "CHICAGO", "count": 94 },
                        { "title": "SEATTLE", "count": 25 },
                        { "title": "NEW YORK", "count": 181 }
                    ],
                "package":
                    [
                        { "title": "Starter packages", "count": 1606 },
                        { "title": "Enterprise packages", "count": 287 },
                        { "title": "Cold packages", "count": 104 }
                    ],
                "storage":
                    [
                        { "title": "AMSTERDAM", "count": 22.74 },
                        { "title": "AMSTERDAM ENT", "count": 7.83 },
                        { "title": "FRANKFURT ", "count": 4.01 },
                        { "title": "FRANKFURT ENT", "count": 3.63 },
                        { "title": "DENVER", "count": 15.91 },
                        { "title": "DENVER ENT", "count": 4.42 },
                        { "title": "LOS ANGELES ", "count": 30.1 },
                        { "title": "LOS ANGELES ENT", "count": 9.47 },
                        { "title": "MIAMI", "count": 8.47 },
                        { "title": "MIAMI ENT", "count": 4.51 },
                        { "title": "PARIS", "count": 3.83 },
                        { "title": "PARIS ENT", "count": 0 },
                        { "title": "VIENNA", "count": 1.42 },
                        { "title": "VIENNA ENT", "count": 1.44 },
                        { "title": "LONDON", "count": 2.99 },
                        { "title": "LONDON ENT", "count": 5.91 },
                        { "title": "CHICAGO", "count": 36.21 },
                        { "title": "SEATTLE", "count": 4.16 },
                        { "title": "NEW YORK", "count": 8.42 }
                    ],
                "windows_licence":
                    [
                        { "title": "Windows 2008 STD x86", "count": 2 },
                        { "title": "Windows 2008 STD x64", "count": 2 },
                        { "title": "Windows 2008 STD R2 x64", "count": 0 },
                        { "title": "Windows 2012 x64 STD", "count": 6 },
                        { "title": "Windows 2012 x64 STD R2 ", "count": 14 }
                    ],
                "monthly_sale":
                    [
                        { "title": "December 2019", "title_s": "Dec 2019", "count": 1377, "start": 1083, "enterprise": 221, "cloud": 73 },
                        { "title": "January 2020", "title_s": "Jan 2020", "count": 1411, "start": 1108, "enterprise": 227, "cloud": 76 },
                        { "title": "February 2020", "title_s": "Feb 2020", "count": 1459, "start": 1147, "enterprise": 235, "cloud": 77 },
                        { "title": "March 2020", "title_s": "Mar 2020", "count": 1499, "start": 1172, "enterprise": 248, "cloud": 79 },
                        { "title": "April 2020", "title_s": "Apr 2020", "count": 1569, "start": 1225, "enterprise": 261, "cloud": 83 },
                        { "title": "May 2020", "title_s": "May 2020", "count": 1622, "start": 1268, "enterprise": 269, "cloud": 85 },
                        { "title": "Most recent", "title_s": "new", "count": 90, "start": 72, "enterprise": 8, "cloud": 10 }
                    ],
                "churn_rate":
                    [
                        { "title": "2016", "count": "1029", "percent": "18.01" },
                        { "title": "2017", "count": "2602", "percent": "14.59" },
                        { "title": "2018", "count": "2963", "percent": "25.41" },
                        { "title": "2019", "count": "3165", "percent": "24.36" },
                        { "title": "2020", "count": "2163", "percent": "13.27" }
                    ],
                "CRM_data":
                    [
                        { "title": "TOTAL", "count": "17019" },
                        { "title": "ACTIVE", "count": "1117" },
                        { "title": "DEACTIVATED", "count": "12493" },
                        { "title": "CANCELLED", "count": "3409" }
                    ]
            }
            this.setState({ data: newdata })
        }
    }


    render() {
        const cardheaderstyle = {
            backgroundColor: "#c7c4ec",
            paddingTop: "13px",
            paddingBottom: "7px",
        }
        return (
            <React.Fragment>
                {this.state.loading ?
                    <Spinner />
                    :
                    this.state.data &&
                    <>
                        <Row>
                            <Col md="12">
                                <Card style={{ marginBottom: "15px" }}>
                                    <CardHeader style={cardheaderstyle}>
                                        <CardTitle className="mx-auto flex-column">Last Updated : {this.state.data && this.state.data.last_updated}</CardTitle>
                                    </CardHeader>
                                </Card>
                            </Col>
                        </Row>
                        <Row>
                            <Col md="3">
                                <CrmVpsStats data={this.state.data} />
                                <DataStorageUsage data={this.state.data} />
                            </Col>
                            <Col md="6">
                                <OverallSummary data={this.state.data} />
                                <PackageSummary data={this.state.data} />
                            </Col>
                            <Col md="3">
                                <LocationSummary data={this.state.data} />
                                <WindowsLicense data={this.state.data} />
                            </Col>
                        </Row>
                    </>
                }

            </React.Fragment>
        )
    }
}

const mapStateToProps = state => {
    return {
        dataList: state.dataList,
    }
}

export default connect(mapStateToProps, {
    getInitialData,
})(StatisticsConfig)