import React, { Component, Fragment } from "react"
import { Label, Input, FormGroup, Button, Row, Col, Form } from "reactstrap"
import { X } from "react-feather"
import PerfectScrollbar from "react-perfect-scrollbar"
import classnames from "classnames"
import { getInventaryProducts, UpdateInventoryItem } from "../../../redux/actions/inventory/"
import { connect } from "react-redux"

class InventoryItemUpdate extends Component {
    state = {
        loc_id: "",
        note: "",
        qty: "",
    }

    addNew = false

    componentDidMount() {
        if (this.props.data && this.props.data.note) {
            this.setState({ note: this.props.data.note })
        }

        if (this.props.data && this.props.data.quantity) {
            this.setState({ qty: this.props.data.quantity })
        }
    }

    handleSubmit = obj => {
        if (this.props.data !== null) {
            if (this.props.selectedOption && this.props.selectedOption.value && this.state.qty) {
                let inventory_data = {}
                inventory_data.loc_id = this.props.selectedOption && this.props.selectedOption.value
                inventory_data.quantity = this.state.qty
                inventory_data.note = this.state.note
                if (inventory_data) {
                    this.props.UpdateInventoryItem(this.props.data.item_id, inventory_data, inventory_data.loc_id).then(() => {
                        if (this.props.inventoryList && this.props.inventoryList.inventoryItemUpdated) {
                            if (this.props.selectedOption && this.props.selectedOption.value) {
                                this.props.UpdateMessage();
                                this.props.handleSidebar(false);
                            }
                        }
                    })
                }
            } else {
                this.props.inCompleteData()
            }

        }
    }

    handleDeleteItem = (row) => {
        this.props.handleDeleteInventoryItem(row)
    }



    render() {
        let { show, handleSidebar, data } = this.props
        let { qty, note } = this.state
        return (
            <div
                className={classnames("inventory-sidebar", {
                    show: show
                })}>
                <div className="data-list-sidebar-header mt-2 px-2 d-flex justify-content-between">
                    <h4>{data !== null ? "UPDATE ITEM" : "ADD NEW ITEM"}</h4>
                    <X size={20} onClick={() => handleSidebar(false, true)} />
                </div>
                <PerfectScrollbar
                    className="data-list-fields px-2 mt-0"
                    options={{ wheelPropagation: false }}>
                    <Form className="mt-2">
                        <Row>
                            {this.props.data &&
                                <Fragment>
                                    <Col md="6" sm="12">
                                        <FormGroup>
                                            <Label for="data-qty">Quantity <span style={{ color: "red" }}>*</span></Label>
                                            <Input
                                                type="number"
                                                value={qty ? qty : ""}
                                                placeholder="Quantity"
                                                onChange={e => this.setState({ qty: e.target.value })}
                                                id="data-qty"
                                            />
                                        </FormGroup>
                                    </Col>
                                    <Col md="6" sm="12">
                                        <FormGroup>
                                            <Label for="data_note">Note</Label>
                                            <Input
                                                type="text"
                                                value={note ? note : ""}
                                                placeholder="If Any"
                                                onChange={e => this.setState({ note: e.target.value })}
                                                id="data_note"
                                            />
                                        </FormGroup>
                                    </Col>
                                </Fragment>
                            }
                        </Row>
                    </Form>

                </PerfectScrollbar>
                <div className="data-list-sidebar-footer px-2 d-flex justify-content-start align-items-center mt-1">
                    <div className="row">
                        <div className="col-10">
                            <Button color="primary" onClick={() => this.handleSubmit(this.state)}>
                                {data !== null ? "Update" : "Submit"}
                            </Button>
                            <Button className="ml-1" color="danger" onClick={() => this.handleDeleteItem(this.props.data)}>
                                Delete
                            </Button>
                        </div>
                        <div className="col-2">
                            <Button
                                className="ml-1"
                                color="danger"
                                outline
                                onClick={() => handleSidebar(false, true)}>
                                Cancel
                            </Button>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

const mapStateToProps = state => {
    return {
        inventoryList: state.inventoryList
    }
}

export default connect(mapStateToProps, { getInventaryProducts, UpdateInventoryItem })(InventoryItemUpdate)
