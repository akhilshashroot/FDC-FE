import React, { Fragment } from "react"
import {
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
} from "reactstrap"

class SearchHelp extends React.PureComponent {

toggleModal = () => {
  this.props.closeModal();
}
search = (value) => {
  localStorage.setItem('search_ip', JSON.stringify(value));
  this.props.IpvSearch();
}

  render() {
    return(
      <Fragment>
      <Modal
        isOpen={this.props.toggleSearchHelpModal}
        toggle={this.toggleModal}
        // className="modal-lg"
      >
        <ModalHeader toggle={this.toggleModal} className="bg-primary">
          Search Help
        </ModalHeader>
        <ModalBody style={{fontFamily:"Helvetica Neue, Helvetica, Arial, sans-serif"}}>
          <p>You can use the search feature to find information about...</p>
            <ul>
                <li>
                    IPv4 Subnets (e.g., <span className="cursor-pointer" style={{ color: "blue" }} onClick={() => this.search("67.159.0.0/18")}>67.159.0.0/18</span>, 
                    <span className="cursor-pointer" style={{ color: "blue" }} onClick={() => this.search("50.7.0.0/16")}>50.7.0.0/16</span>,
                    <span className="cursor-pointer" style={{ color: "blue" }} onClick={() => this.search("66.90.64.0/24")}>66.90.64.0/24</span>, etc)
                </li>
                <li>IPv4 Addresses (e.g., <span className="cursor-pointer" style={{ color: "blue" }} onClick={() => this.search("50.7.0.33")}>50.7.0.33</span>)</li>
                <li>
                    IPv6 Subnets (e.g., <span className="cursor-pointer" style={{ color: "blue" }} onClick={() => this.search("2001:49f0::/32")}>2001:49f0::/32</span>,
                    <span className="cursor-pointer" style={{ color: "blue" }} onClick={() => this.search("2001:49f0:1::/48")}>
                    2001:49f0:1::/48</span>, etc)
                </li>
                <li>IPv6 Addresses (e.g., <span className="cursor-pointer" style={{ color: "blue" }} onClick={() => this.search("2001:49f0:1::33")}>2001:49f0:1::33</span>)</li>
                <li>
                    MAC Addresses (e.g., <span className="cursor-pointer" style={{ color: "blue" }} onClick={() => this.search("b2:bc:76:8b:d0:f5")}>b2:bc:76:8b:d0:f5</span>,
                    <span className="cursor-pointer" style={{ color: "blue" }} onClick={() => this.search("b2-bc-76-8b-d0-f5")}>b2-bc-76-8b-d0-f5</span>, etc)
                </li>
            </ul>
            Searches containing an incorrect subnet prefix length will be corrected automatically.  For example, a search for 2001:49f0:1::
            <b>/64</b> would return results matching 2001:49f0:1:: <b>/48</b> .
        </ModalBody>
        <ModalFooter>
          <Button color="primary" onClick={this.toggleModal}>
            Close
          </Button>{" "}
        </ModalFooter>
      </Modal>
      </Fragment>
    )
  }
}
export default SearchHelp