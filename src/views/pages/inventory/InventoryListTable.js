import React from "react"
import DataTable from "react-data-table-component"
import classnames from "classnames"
import { Edit, Trash, Server } from "react-feather"
import { connect } from "react-redux"
import { DeleteInventory, DeleteInventoryItem, getInventaryProducts } from "../../../redux/actions/inventory"
import Sidebar from "./InventorySidebar"
import "../../../assets/scss/pages/data-list.scss"
import { toast, ToastContainer, Zoom } from "react-toastify"
import "react-toastify/dist/ReactToastify.css"
import "../../../assets/scss/plugins/extensions/toastr.scss"
import InventoryDeleteModal from './DeleteInventoryModal'
import EditItemSidebar from "./InventoryItemUpdate"
import InventoryItemDeleteModal from "./InventoryItemDelete"
import Tooltip from "@material-ui/core/Tooltip"

const ActionsComponent = props => {
    return (
        <div className="data-list-action">
            <Tooltip title="Edit Inventory Product" placement="top">
                <Edit
                    className="cursor-pointer mr-1"
                    size={15}
                    onClick={() => {
                        return props.currentData(props.row)
                    }}
                />
            </Tooltip>
            <Tooltip title="Edit Inventory Item" placement="top">
                <Server
                    className="cursor-pointer mr-1"
                    size={15}
                    onClick={() => {
                        return props.editItem(props.row)
                    }}
                />
            </Tooltip>
            <Tooltip title="Delete Inventory Product" placement="top">
                <Trash
                    className="cursor-pointer"
                    size={15}
                    onClick={() => {
                        props.deleteRow(props.row)
                    }}
                />
            </Tooltip>
        </div>
    )
}

const notifyInfo = () => toast.info("Inventory Updated Successfully", { transition: Zoom })
const notifyBounce = () => toast.success("Inventory Added Successfully", { transition: Zoom })
const notifyWarning = () => toast.warning("Please fill every field !.", { transition: Zoom })
const notifyDeleted = () => toast.success("Deleted Inventory Product", { transition: Zoom })
const notifyError = () => toast.warning("Something went wrong.Please try again..", { transition: Zoom })
const notifyItemUpdateInfo = () => toast.info("Inventory Item Updated Successfully", { transition: Zoom })
const notifyInventoryItemDeleted = () => toast.success("Inventory item deleted successfully", { transition: Zoom })
const notifyAlreadyExist = () => toast.warning("Inventory product already exist", { transition: Zoom })

class InventoryListTable extends React.PureComponent {

    state = {
        modal: false,
        columns: [
            {

                name: "#",
                selector: "index",
                maxWidth: "8%",
                minWidth: "8%"
            },
            {
                name: "Manufacturer",
                selector: "manufacturer",
                minWidth: "15%",
                maxWidth: "15%"
            },
            {
                name: "Product",
                selector: "brand",
                minWidth: "15%",
                maxWidth: "15%"
            },
            {
                name: "Model",
                selector: "model",
                minWidth: "17%",
                maxWidth: "17%"

            },
            {
                name: "Size",
                selector: "size",
                minWidth: "10%",
                maxWidth: "10%"
            },
            {
                name: "Qty",
                selector: "quantity",
                minWidth: "10%",
                maxWidth: "10%"
            },
            {
                name: "Note",
                selector: "note",
                minWidth: "15%",
                maxWidth: "15%"
            },
            {
                name: "Actions",
                minWidth: "10%",
                maxWidth: "10%",
                cell: row => (
                    <ActionsComponent
                        row={row}
                        currentData={this.handleCurrentData}
                        deleteRow={this.handleDelete}
                        editItem={this.handleEditItem}
                    />
                )
            }
        ],
        sidebar: false,
        currentData: null,
        addNew: "",
        invObj: "",
        updateItemSidebar: false,
        toggleDeleteModal: false,
        toggleDeleteProductModal: false
    }

    handleSidebar = (boolean, addNew = false) => {
        this.setState({ sidebar: boolean })
        if (addNew === true) this.setState({ currentData: null, addNew: true })
    }

    handleEditSidebar = (boolean) => {
        this.setState({ updateItemSidebar: boolean })
    }

    handleDelete = row => {
        this.setState({ invObj: row, toggleDeleteProductModal: !this.state.toggleDeleteProductModal });
    }
    closeProductmodal = () => {
        this.setState({ toggleDeleteProductModal: false })
    }

    handleCurrentData = obj => {
        this.setState({ currentData: obj })
        this.handleSidebar(true)
    }

    handleEditItem = obj => {
        this.setState({ currentData: obj })
        this.handleEditSidebar(true)
    }

    handleDeleteInventoryItem = row => {
        this.setState({ invObj: row, toggleDeleteModal: !this.state.toggleDeleteModal });
    }

    closeModal = () => {
        this.setState({ toggleDeleteModal: false })
    }

    render() {
        let { columns, currentData, sidebar, updateItemSidebar, toggleDeleteProductModal } = this.state
     
        return (

            <div className={`inventory-list list-view`}>
                <DataTable
                    columns={columns}
                    data={this.props.listingData}
                    noHeader
                    responsive={true}
                    fixedHeader={true}
                    fixedHeaderScrollHeight="250px"
                />


                {sidebar &&
                    <Sidebar
                        show={sidebar}
                        data={currentData}
                        handleSidebar={this.handleSidebar}
                        addNew={this.state.addNew}
                        AddMessage={notifyBounce}
                        UpdateMessage={notifyInfo}
                        inCompleteData={notifyWarning}
                        notifyError={notifyError}
                        notifyAlreadyExist={notifyAlreadyExist}
                        selectedOption={this.props.selectedOption}
                        hardware_name={this.props.hardware_name}
                    />
                }
                {updateItemSidebar &&
                    <EditItemSidebar
                        show={updateItemSidebar}
                        data={currentData}
                        handleSidebar={this.handleEditSidebar}
                        selectedOption={this.props.selectedOption}
                        UpdateMessage={notifyItemUpdateInfo}
                        handleDeleteInventoryItem={this.handleDeleteInventoryItem}
                        inCompleteData={notifyWarning}

                    />
                }
                <div
                    className={classnames("data-list-overlay", {
                        show: sidebar
                    })}
                    onClick={() => this.handleSidebar(false, true)}
                />
                {this.state.toggleDeleteModal &&
                    <InventoryItemDeleteModal
                        closeModal={this.closeModal}
                        toggleDeleteModal={this.state.toggleDeleteModal}
                        invObj={this.state.invObj}
                        inventoryList={this.props.inventoryList}
                        DeleteInventoryItem={this.props.DeleteInventoryItem}
                        handleSidebar={this.handleEditSidebar}
                        notifyDeleted={notifyInventoryItemDeleted}
                        selectedOption={this.props.selectedOption}
                        getInventaryProducts={this.props.getInventaryProducts}
                    />
                }
                {toggleDeleteProductModal &&
                    <InventoryDeleteModal
                        toggleDeleteProductModal={toggleDeleteProductModal}
                        closeProductmodal={this.closeProductmodal}
                        invObj={this.state.invObj}
                        notifyDeleted={notifyDeleted}
                        notifyError={notifyError}
                        selectedOption={this.props.selectedOption}
                        inventoryList={this.props.inventoryList}
                        DeleteInventory={this.props.DeleteInventory}
                        getInventaryProducts={this.props.getInventaryProducts}
                    />
                }
                <ToastContainer />
            </div>
        )
    }
}

const mapStateToProps = state => {
    return {
        inventoryList: state.inventoryList
    }
}

export default connect(mapStateToProps, {
    getInventaryProducts,
    DeleteInventory,
    DeleteInventoryItem
})(InventoryListTable)