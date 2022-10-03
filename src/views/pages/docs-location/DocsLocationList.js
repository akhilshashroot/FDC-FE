import React from "react"
import {  Card, CardBody, } from "reactstrap"
import DataTable from "react-data-table-component"
import { connect } from "react-redux"
import { getAllLocation } from "../../../redux/actions/data-list"
import "../../../assets/scss/pages/data-list.scss"
import Spinner from "../../../components/@vuexy/spinner/Loading-spinner"

const selectedStyle = {
    rows: {
        selectedHighlighStyle: {
            backgroundColor: "rgba(115,103,240,.05)",
            color: "#7367F0 !important",
            boxShadow: "0 0 1px 0 #7367F0 !important",
            "&:hover": {
                transform: "translateY(0px) !important"
            }
        }
    }
}



class DocsLocationList extends React.PureComponent {

    state = {
        data: [],
        totalPages: 0,
        currentPage: 0,
        columns: [
            {
                name: "#",
                selector: "index",
                sortable: true,
                maxWidth: "8%",
                minWidth: "8%",
            },
            {
                name: "Location",
                selector: "location",
                sortable: true,
                minWidth: "22%",
                maxWidth: "22%",
            },
            {
                name: "Location Short",
                selector: "loc_short",
                sortable: true,
                minWidth: "22%",
                maxWidth: "22%",
                cell: row => (<span>{row.loc_short.toUpperCase()}</span>)
            },
            {
                name: "Switches",
                selector: "switch_count",
                sortable: true,
                maxWidth: "18%",
                minWidth: "17%",
            },
            {
                name: "Servers",
                selector: "server_count",
                sortable: true,
                maxWidth: "18%",
                minWidth: "17%",
            },
            {
                name: "Pdu(s)",
                selector: "pdu_count",
                sortable: true,
                maxWidth: "12%",
                minWidth: "12%",
            }
        ],
        sidebar: false,
        currentData: null,
        selected: [],
        addNew: ""
    }

    componentDidMount() {
        if (this.props.dataList && !this.props.dataList.allLocation) {
            this.props.getAllLocation()
        }
    }



    render() {
        let {
            columns,
        } = this.state
        let cardbody = {
            paddingTop: '0px'
        }
        return (
            <div className={`data-list list-view`}>
                {(this.props.dataList && !this.props.dataList.allLocation) ? (
                    <Spinner color="primary" className="reload-spinner" />
                ) : (
                        <Card>
                            <CardBody style={cardbody}>
                                <DataTable
                                    columns={columns}
                                    data={this.props.dataList && this.props.dataList.allLocation}
                                    noHeader={true}
                                    customStyles={selectedStyle}
                                />
                            </CardBody>
                        </Card>
                    )}
            </div>
        )
    }
}

const mapStateToProps = state => {
    return {
        dataList: state.dataList,
    }
}

export default connect(mapStateToProps, { getAllLocation })(DocsLocationList)