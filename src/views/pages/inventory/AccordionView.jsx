import React from "react"
import { Collapse, Card, CardHeader, CardBody, CardTitle, Badge } from "reactstrap"
import InventoryListTable from "./InventoryListTable"
import { ChevronDown } from "react-feather"
import { connect } from "react-redux"

class AccordionMargin extends React.PureComponent {

  state = {
    collapseID: this.props.inventoryData && this.props.inventoryData.length > 0
      ? this.props.inventoryData[0][0]["hardware_name"]["index"]
      : ""
  }

  toggleCollapse = (collapseID) => {
    this.setState(prevState => ({
      collapseID: prevState.collapseID !== collapseID ? collapseID : ""
    }))

  }

  render() {
    let { inventoryData } = this.props
    const bodystyle = { paddingTop: "0px" }
    const openHeaderStyle = { paddingTop: "5px", paddingBottom: "5px", background: "#dcdbdb" }
    const headerstyle = { paddingTop: "5px", paddingBottom: "5px" }
    const cardspace = { marginBottom: "10px" }

    return (
      <div className="vx-collapse collapse-icon accordion-icon-rotate">
        {inventoryData && inventoryData.length > 0 &&
          inventoryData[0].map((collapseItem, index) => {
            return (
              <Card style={cardspace}
                key={index}
                onClick={() => this.toggleCollapse(collapseItem.hardware_name.index)}
              >
                <CardHeader style={(collapseItem.hardware_name.index === this.state.collapseID) ? openHeaderStyle : headerstyle}>
                  <CardTitle className="lead collapse-title collapsed" onClick={(e) => e.stopPropagation()} >
                    {collapseItem.hardware_name.name.toUpperCase()}
                    {collapseItem.inventory_list.length > 0 ? (
                      <Badge pill className="inv-badge">
                        {collapseItem.inventory_list.length}
                      </Badge>
                    ) : null}
                  </CardTitle>
                  <ChevronDown size={15} className="collapse-icon" />
                </CardHeader>
                <Collapse isOpen={collapseItem.hardware_name.index === this.state.collapseID}>
                  <CardBody style={bodystyle} onClick={(e) => e.stopPropagation()}>
                    {(this.state.collapseID === collapseItem.hardware_name.index) &&
                      <InventoryListTable key={index} hardware_name={collapseItem.hardware_name} listingData={collapseItem.inventory_list} selectedOption={this.props.selectedOption} />
                    }
                  </CardBody>
                </Collapse>
              </Card>
            )
          })
        }
      </div>
    )
  }
}
const mapStateToProps = state => {
  return {
    inventoryData: state.inventoryList.inventoryData,
  }
}
export default connect(mapStateToProps, null)(AccordionMargin)