import React, { Fragment } from "react"
import {
    Row, Col, Card, CardBody, Button, Modal, ModalBody, ModalFooter,
    Form, FormGroup, Label, Input, InputGroup, UncontrolledButtonDropdown, DropdownToggle, DropdownItem,
    InputGroupAddon, DropdownMenu
} from "reactstrap"
import DataTable from "react-data-table-component"
import "../../../assets/scss/pages/data-list.scss"
import Spinner from "../../../components/@vuexy/spinner/Loading-spinner"
import { Server, Info, Edit, Trash, XSquare, Settings } from "react-feather"
import Select from 'react-select';

const searchOptions = [
    { label: "Label", value: "label" },
    { label: "IPMI IP", value: "ipmi_ip" },
]


const CustomHeader = props => {
    return (
        <div>
            <Form>
                <Row>
                    <Col sm="3">
                        <FormGroup>
                            <Label for="exampleSelect">Search option</Label>
                            <Select
                                value={props.search_option}
                                onChange={props.handleSearchOption}
                                options={searchOptions}
                                placeholder="Select a field"
                                isSearchable={true}
                            />
                        </FormGroup>
                    </Col>
                    <Col sm="3">
                        <Label for="exampleSelect">Search Value</Label>
                        <FormGroup>
                            <InputGroup>
                                <Input value={props.search_value} onChange={props.handleSearchValue} />
                                <InputGroupAddon addonType="append">
                                    <Button.Ripple color="primary" onClick={props.goSearch}>Go</Button.Ripple>
                                </InputGroupAddon>
                            </InputGroup>
                        </FormGroup>
                    </Col>
                </Row>
            </Form>

        </div>
    )
}

const dropdownstyle = {
    left: "22px"
}

const actionstyle = {
    paddingTop: "0px",
    paddingBottom: "0px",
    paddingLeft: "0px",
    paddingRight: "0px"
}



const ActionsComponent = props => {
    return (
        <div style={dropdownstyle} className="dropdown">
            <UncontrolledButtonDropdown>
                <DropdownToggle
                    color="white"
                    size="sm"
                    className="btn-round dropdown-toggle"
                    style={actionstyle}
                >
                    <Settings
                        size={15}
                        style={{
                            left: 0
                        }}
                    />
                </DropdownToggle>
                <DropdownMenu right>
                    <DropdownItem tag="a" onClick={() => { return props.toggleModal(props.row) }}>
                        <Info size={15} />
                        <span className="align-middle ml-50">Info</span>
                    </DropdownItem>
                    {(props.row.server_id || props.row.id) &&
                        <DropdownItem tag="a" onClick={() => { return props.currentData(props.row) }}>
                            <Server size={15} />
                            <span className="align-middle ml-50">Edit Server</span>
                        </DropdownItem>
                    }
                    {!props.changeColumns &&
                        <DropdownItem tag="a" onClick={() => { return props.portcurrentData(props.row) }}>
                            <Edit size={15} />
                            <span className="align-middle ml-50">Edit Port</span>
                        </DropdownItem>
                    }
                    {(props.row.server_id || props.row.id) &&
                        <DropdownItem tag="a" onClick={() => { props.deleteRow(props.row) }}>
                            <Trash size={15} />
                            <span className="align-middle ml-50">Delete Server</span>
                        </DropdownItem>
                    }
                    {!props.changeColumns &&
                        <DropdownItem tag="a" onClick={() => { return props.deletePort(props.row) }}>
                            <XSquare size={15} />
                            <span className="align-middle ml-50">Delete Port</span>
                        </DropdownItem>
                    }
                </DropdownMenu>
            </UncontrolledButtonDropdown>
        </div>

    )
}
class SearchModal extends React.Component {
    state = {
        modal: false,
        search_option: "",
        search_value: "",
        columns: [

            {
                name: "LABEL",
                selector: "label",
                minWidth: "13%",
                maxWidth: "13%",
                cell: row => (<span>{row.label}</span>)
            },
            {
                name: "PORT",
                selector: "port_no",
                minWidth: "19%",
                maxWidth: "19%",
                cell: row => (<span>{row.port_no}</span>)
            },
            {
                name: "VLAN",
                selector: "vlan",
                minWidth: "5%",
                maxWidth: "5%",
                cell: row => (<span>{row.vlan}</span>)
            },
            {
                name: "INFO",
                selector: "server_info",
                minWidth: "12%",
                maxWidth: "12%",
                cell: row => (<span>{row.server_info && row.server_info}</span>)
            },
            {
                name: "IPMI IP",
                selector: "ipmi_ip",
                minWidth: "8%",
                maxWidth: "8%",
                cell: row => (<a href={`http://${row.ipmi_ip}/`} target="_blank" rel='noopener noreferrer'>{row.ipmi_ip}</a>)
            },
            {
                name: "SERVER",
                selector: "server",
                minWidth: "28%",
                maxWidth: "28%",
                cell: row => (
                    <span>{row.cpu && row.cpu}{row.cpu && row.ram && ', '}{row.ram && `${row.ram} RAM`}{row.ram && row.hdd && ', '}{row.hdd && `${row.hdd}`}</span>
                )
            },
            {
                name: "STATUS",
                selector: "status",
                minWidth: "5%",
                maxWidth: "5%",
                cell: row => (<span>{row.status}</span>)
            },
            {
                name: "SID",
                selector: "service_id",
                minWidth: "5%",
                maxWidth: "5%",
                cell: row => (<span>{row.service_id === "nill" ? "N/A" : <a href={`https://crm.fdcservers.net/admin/clientmgr/client_service_details.php?packid=${row.service_id}`} target="_blank" rel='noopener noreferrer'>{row.service_id}</a>}</span>)
            },
            {
                name: "Actions",
                minWidth: "5%",
                maxWidth: "5%",
                cell: row => (
                    <ActionsComponent
                        row={row}
                        toggleModal={this.toggleModal}
                        currentData={this.handleCurrentData}
                        portcurrentData={this.handlePortCurrentData}
                        deleteRow={this.handleDelete}
                        changeColumns={this.state.changeColumns}
                    />
                )
            }
        ]
    }

    componentDidMount() {

    }


    toggleModal = () => {
        this.setState(prevState => ({
            modal: !prevState.modal
        }), () => this.props.closeSearchModal())
    }

    handleSearchOption = (data) => {
        this.setState({ search_option: data })
    }

    handleSearchValue = (e) => {
        this.setState({ search_value: e.target.value })
    }

    goSearch = () => {

    }




    render() {
        let { columns, search_option, search_value } = this.state
        const cardbodystyle = {
            paddingTop: "0px",
        }
        return (
            <React.Fragment>
                <Modal
                    isOpen={this.props.toggleSearchModal}
                    toggle={this.toggleModal}
                    className="modal-xl"
                >
                    {this.props.serverList && this.props.serverList.isLocationLogLoading ?
                        <Spinner />
                        :
                        <Fragment>
                            <ModalBody>

                                <Row>
                                    <Col sm="12">
                                        <CustomHeader
                                            goSearch={this.goSearch}
                                            search_option={search_option}
                                            search_value={search_value}
                                            handleSearchOption={this.handleSearchOption}
                                            handleSearchValue={this.handleSearchValue}
                                        />
                                        <Card>
                                            <CardBody className="text-center pt-0" style={cardbodystyle}>
                                                <div className={`server-list ${
                                                    this.props.thumbView ? "thumb-view" : "list-view"
                                                    }`}>


                                                    <DataTable
                                                        noHeader
                                                        columns={columns}
                                                        data={this.props.serverList && this.props.serverList.allData && this.props.serverList.allData.data}
                                                    />

                                                </div>
                                            </CardBody>
                                        </Card>
                                    </Col>
                                </Row>

                            </ModalBody>
                            <ModalFooter>
                                <Button className="add-new-btn" color="primary" onClick={this.toggleModal}>
                                    <span className="align-middle">Close</span>
                                </Button>
                            </ModalFooter>
                        </Fragment>
                    }
                </Modal>

            </React.Fragment>
        )
    }
}
export default SearchModal