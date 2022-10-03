import React, { Fragment } from "react"
import { Label, Input, FormGroup, Button, CustomInput } from "reactstrap"
import { X } from "react-feather"
import PerfectScrollbar from "react-perfect-scrollbar"
import classnames from "classnames"
import { addLocation, updateLocation } from "../../../redux/actions/data-list"
import { connect } from "react-redux";
import { toast, Zoom } from "react-toastify";
class LocationSidebar extends React.PureComponent {

  state = {
    location: "",
    location_short: "",
    locationInvalid: false,
    locShortInvalid: false,
    locValid: false,
    locShortValid: false,
    sector: "",
    address: ""

  }

  addNew = false

  componentDidMount() {
    if (this.props.data) {
      if (this.props.data.id) {
        this.setState({ id: this.props.data.id })
      }
      if (this.props.data.sector) {
        this.setState({ sector: this.props.data.sector })
      }
      if (this.props.data.location) {
        this.setState({ location: this.props.data.location })
      }
      if (this.props.data.loc_short) {
        this.setState({ location_short: this.props.data.loc_short })
      }
      if (this.props.data.iw_loc_desc) {
        this.setState({ address: this.props.data.iw_loc_desc })
      }
    }
  }

  handleSubmit = obj => {
    if (this.props.data !== null) {
      if (obj.location && obj.location_short) {
        this.setState({ locShortInvalid: true, locationInvalid: false })
        if (obj.location_short && obj.location_short.length < 3) {
          this.props.notifyLocShortWarning("Location short should contain minimum 3 letters")
          return true
        } else {
          let updateData = {};
          updateData.id = obj.id;
          if (this.props.data) {
            if (this.props.data.location !== obj.location) {
              updateData.location = obj.location;
            }
            if (this.props.data.loc_short !== obj.location_short) {
              updateData.loc_short = obj.location_short;
            }
          }


          updateData.sector = obj.sector ? obj.sector : "US"
          updateData.iw_loc_desc = obj.address ? obj.address : ""
          this.props.updateLocation(updateData).then(() => {
            if (this.props.updateStatus) {
              this.props.handleSidebar(false, true)
              this.props.UpdateMessage()
            } else {
              if (this.props.updateError) {
                if (this.props.updateError.message && this.props.updateError.errors) {
                  let errors = this.props.updateError.errors;
                  for (let i in errors) {
                    toast.warning(errors[i][0], { transition: Zoom })
                  }
                }
              } else {
                this.props.ErrorMessage();
              }
            }
          })
        }

      } else {
        if (!obj.location && !obj.location_short) {
          this.setState({ locationInvalid: true, locShortInvalid: true })
          this.props.notifyLocShortWarning("Please fill Location and Loation Short fields.")
          return true
        }
        if (!obj.location) {
          this.setState({ locationInvalid: true, locShortInvalid: false })
          this.props.notifyLocShortWarning("Please fill Location field")
          return true
        }
        if (!obj.location_short) {
          this.setState({ locShortInvalid: true, locationInvalid: false })
          this.props.notifyLocShortWarning("Please fill Location short field")
          return true
        }
      }

    } else {

      if (obj.location && obj.location_short) {

        if (obj.location_short && obj.location_short.length < 3) {
          this.setState({ locShortInvalid: true, locationInvalid: false })
          this.props.notifyLocShortWarning("Location short should contain minimum 3 letters")
          return true
        } else {
          let addLocationData = {}
          addLocationData.location = obj.location
          addLocationData.loc_short = obj.location_short
          addLocationData.sector = obj.sector ? obj.sector : "US"
          addLocationData.iw_loc_desc = obj.address ? obj.address : ""
          this.props.addLocation(addLocationData).then(() => {
            if (this.props.addStatus) {
              this.addNew = true
              this.props.handleSidebar(false, true)
              this.props.AddMessage()
            } else {
              if (this.props.addError) {
                if (this.props.addError.message && this.props.addError.errors) {
                  let errors = this.props.addError.errors;
                  for (let i in errors) {
                    toast.warning(errors[i][0], { transition: Zoom })
                  }
                }
              } else {
                this.props.ErrorMessage();
              }

            }
          })
        }
      } else {
        if (!obj.location && !obj.location_short) {
          this.setState({ locationInvalid: true, locShortInvalid: true })
          this.props.notifyLocShortWarning("Please fill Location and Loation Short fields.")
          return true
        }
        if (!obj.location) {
          this.setState({ locationInvalid: true, locShortInvalid: false })
          this.props.notifyLocShortWarning("Please fill Location field")
          return true
        }
        if (!obj.location_short) {
          this.setState({ locShortInvalid: true, locationInvalid: false })
          this.props.notifyLocShortWarning("Please fill Location short field")
          return true
        }
      }
    }
  }

  render() {
    let { show, handleSidebar, data } = this.props
    let { location, location_short, locationInvalid, locShortInvalid, sector, address } = this.state
    return (
      <Fragment>
        <div
          className={classnames("data-list-sidebar", {
            show: show
          })}>
          <div className="data-list-sidebar-header mt-2 px-2 d-flex justify-content-between">
            <h4>{data !== null ? "UPDATE LOCATION" : "ADD NEW LOCATION"}</h4>
            <X size={20} onClick={() => handleSidebar(false, true)} />
          </div>
          <PerfectScrollbar
            className="data-list-fields px-2 mt-3"
            options={{ wheelPropagation: false }}>
            <FormGroup>
              <Label for="data-location">Sector<span style={{ color: "red" }}>*</span></Label>
              <CustomInput
                type="select"
                name="sector"
                id="sector"
                value={sector || ""}
                onChange={(e) => this.setState({ sector: e.target.value })}
              >
                <option value="US">US</option>
                <option value="EU">EU</option>
                <option value="APAC">APAC</option>
                <option value="CA">CA</option>
                <option value="Africa">Africa</option>
                <option value="Australia">Australia</option>
                <option value="LATAM">LATAM</option>
              </CustomInput>
            </FormGroup>
            <FormGroup>
              <Label for="data-location">Location<span style={{ color: "red" }}>*</span></Label>
              <Input
                type="text"
                value={location}
                placeholder="Location Name"
                onChange={e => this.setState({ location: e.target.value })}
                id="data-location"
                invalid={locationInvalid}
              />
            </FormGroup>
            <FormGroup>
              <Label for="data-location_short">Location Short<span style={{ color: "red" }}>*</span></Label>
              <Input
                type="text"
                id="data-location-short"
                value={location_short}
                placeholder="Location Short Name"
                onChange={e => this.setState({ location_short: e.target.value.toUpperCase() })}
                invalid={locShortInvalid}
              />
            </FormGroup>
            <FormGroup>
              <Label for="address">Address</Label>
              <Input
                type="textarea"
                value={address}
                placeholder="Address"
                onChange={e => this.setState({ address: e.target.value })}
                id="address"
              />
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
      </Fragment>
    )
  }
}

const mapStateToProps = state => {
  return {
    updateStatus: state.dataList.updateLocationSuccess,
    addStatus: state.dataList.locationAddedSuccess,
    addError: state.dataList.locationAddedError,
    updateError: state.dataList.updateLocationError
  }
}

export default connect(mapStateToProps, { addLocation, updateLocation })(LocationSidebar)