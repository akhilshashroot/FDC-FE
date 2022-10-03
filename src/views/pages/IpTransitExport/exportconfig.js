import React, { Fragment } from 'react';
import { Card, CardBody, CardHeader, CardTitle, Button } from "reactstrap"
import { Download } from "react-feather"
import { Table } from "reactstrap"
import { getIpTransitExportList } from "../../../redux/actions/iptransit-export"
import { connect } from "react-redux"
import Spinner from "../../../components/@vuexy/spinner/Loading-spinner"
import { performRequest } from '../../../services/index';

const actionrow = { width: "8%" }
const datastyle = {
    backgroundColor: "#c7c4ec",
    paddingTop: "13px",
    paddingBottom: "7px",
    fontSize: "10px"
}
const headeraction = {
    float: "right",
    marginRight: "3rem"
}
const rowaction = {
    float: "right"
}

class IpTransistExportConfig extends React.PureComponent {

    state = {
        isLoading: false,
        rowsPerPage: 4,
        pageNumber: 1,
        selected: [],
        sortIndex: [],
        perPageData: 30
    }

    componentDidMount() {
        if (this.props.ExportList && !this.props.ExportList.ipTransitExportList) {
            this.props.getIpTransitExportList().then(() => {
                this.setState({ isLoading: true })
            })
        }
        else {
            this.setState({
                isLoading: true,
                // pageNumber: this.props.IpTransitList && this.props.IpTransitList.ipTransitCancelList && this.props.IpTransitList.ipTransitCancelList.current_page
            })
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


    render() {
        return (
        <>
            {this.state.isLoading === false ? (
                <Spinner color="primary" className="reload-spinner" />
            ) : (
            <Fragment>
                <Card>
                    <CardHeader style={datastyle}>
                        <CardTitle style={{ fontSize: "1.1rem" }}>
                            Ip Transit Export
                                </CardTitle>
                    </CardHeader>
                    <CardBody>
                        <Table striped responsive>
                            <thead>
                                <tr>
                                    <th>#</th>
                                    <th>Period</th>
                                    <th style={headeraction}>Action</th>
                                </tr>
                            </thead>
                            <tbody className="unpadding striped hover">
                                {this.props.ExportList && this.props.ExportList.ipTransitExportList && this.props.ExportList.ipTransitExportList.map((value, index) => (
                                    <tr key={index}>
                                        <td>{index+1}</td>
                                        <td>
                                            {this.formatDate(value.week_start_date)} to {this.formatDate(value.week_end_date)}
                                        </td>
                                        <td style={rowaction}>
                                            <Button color="primary" size='sm' href={value.source_url} target="_blank"  download>
                                                <Download size={15} style={{ marginRight: "5px" }} />
                                                <span className="align-middle">Download</span>
                                            </Button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </Table>
                    </CardBody>
                </Card>
            </Fragment>
            )}
        </>
        )
    }
}

const mapStateToProps = state => {
    return {
        ExportList: state.IpTransitExportList
    }
}

export default connect(mapStateToProps, {
    getIpTransitExportList
})(IpTransistExportConfig)