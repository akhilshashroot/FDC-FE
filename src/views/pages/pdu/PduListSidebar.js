import React, { Component } from "react"
import { Label, Input, FormGroup, Button } from "reactstrap"
import { X } from "react-feather"
import PerfectScrollbar from "react-perfect-scrollbar"
import classnames from "classnames"
import Select from 'react-select';
import { addPDUAction } from "../../../redux/actions/pdu"
import { connect } from "react-redux"
import { getInitialData } from "../../../redux/actions/data-list"

class PduListSidebar extends Component {
  state = {
    rack: "",
    feeds: "1",
    selectedOption: null,
  }

  addNew = false

  handleSubmit = obj => {
    if (this.props.data !== null) {
      if (this.state.selectedOption && this.state.selectedOption.value && this.state.feeds && this.state.rack) {
        var loc_id_values = ""
        var user_location_ids = []
        if (this.state.selectedOption && this.state.selectedOption.length > 0) {
          this.state.selectedOption.forEach((value) => {
            user_location_ids.push(value.value)
          })
          loc_id_values = user_location_ids.toString()
        } else {
          user_location_ids = ""
        }
        let updatePduData = {};
        updatePduData.id = this.props.data.id;
        updatePduData.rack = this.state.rack;
        updatePduData.feeds = this.state.feeds;
        updatePduData.location_id = loc_id_values;
        if (updatePduData) {
        }
      } else {
        this.props.inCompleteData()
      }

    } else {
      if (this.state.selectedOption && this.state.selectedOption.value && this.state.feeds && this.state.rack) {
        var loc_id_value = ""
        loc_id_value = this.state.selectedOption.value.toString()
        let addPduData = {};
        addPduData.rack = this.state.rack;
        addPduData.feeds = this.state.feeds;
        addPduData.loc_id = loc_id_value;
        this.props.addPDUAction(addPduData, this.props.sel_loc_id, 1).then(() => {
          if (this.props.pduList && this.props.pduList.addedPdu) {
            this.props.setPage()
            this.addNew = true;
            this.props.handleSidebar(false, true)
            this.props.AddMessage()
          } else {
            if (this.props.pduList && this.props.pduList.addPduError) {
              this.props.samePduError()
            } else {
              this.props.ErrorMessage()
            }

          }
        })
      } else {
        this.props.inCompleteData()
      }
    }
  }



  handleChange = selectedOption => {
    this.setState({ selectedOption });
  };

  convertLocation = data => {
    var locationData = []
    data.forEach((value) => {
      locationData.push({ "label": value.location, "value": value.id })
    })
    return locationData
  }

  handlefeeds = (e) => {
    this.setState({ feeds: e.target.value })
  }
  feedlist = [
    { "label": "1", "value": "1" }, { "label": "2", "value": "2" }
  ]
  render() {
    let { show, handleSidebar, data } = this.props
    let { rack, selectedOption } = this.state
    return (
      <div
        className={classnames("data-list-sidebar", {
          show: show
        })}>
        <div className="data-list-sidebar-header mt-2 px-2 d-flex justify-content-between">
          <h4>{data !== null ? "UPDATE PDU" : "ADD NEW PDU"}</h4>
          <X size={20} onClick={() => handleSidebar(false, true)} />
        </div>
        <PerfectScrollbar
          className="data-list-fields px-2 mt-3"
          options={{ wheelPropagation: false }}>
          <FormGroup>
            <Label for="tech_location">Locations<span style={{ color: "red" }}>*</span></Label>
            <Select
              value={selectedOption}
              onChange={this.handleChange}
              options={this.props.locationData ? this.convertLocation(this.props.dataList.allData) : []}
              isMulti={false}
              isSearchable={true}
            />
          </FormGroup>
          <FormGroup>
            <Label for="data-rack">Rack<span style={{ color: "red" }}>*</span></Label>
            <Input
              type="text"
              value={rack}
              placeholder="e. g. 02, 08, 10, 105"
              onChange={e => this.setState({ rack: e.target.value })}
              id="data-rack"
            />
          </FormGroup>
          <FormGroup>
            <Label for="data-feeds">Feeds<span style={{ color: "red" }}>*</span></Label>
            <Input type="select" name="feeds" id="data-feeds" value={this.state.feeds} onChange={this.handlefeeds}>
              <option value="1">1</option>
              <option value="2">2</option>
            </Input>
          </FormGroup>
        </PerfectScrollbar>
        <div className="data-list-sidebar-footer px-2 d-flex justify-content-start align-items-center mt-1">
          <Button color="primary" onClick={() => this.handleSubmit(this.state)}>
            {data !== null ? "Update" : "Submit"}
          </Button>
          <Button
            className="ml-1"
            color="danger"
            outline
            onClick={() => handleSidebar(false, true)}>
            Cancel
          </Button>
        </div>
      </div>
    )
  }
}

const mapStateToProps = state => {
  return {
    pduList: state.pduList,
    dataList: state.dataList
  }
}

export default connect(mapStateToProps, {
  addPDUAction, getInitialData
})(PduListSidebar)
