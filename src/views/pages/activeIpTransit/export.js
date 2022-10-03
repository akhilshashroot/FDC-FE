import React from "react"
import ReactDOM from "react-dom"
import {
    Button,
    Table,
    Modal,
    ModalHeader,
    ModalBody,
    ModalFooter,
    Input,
    FormGroup,
    CustomInput
} from "reactstrap"
import XLSX from "xlsx"
import * as FileSaver from "file-saver"
import jsPDF from "jspdf";
import "jspdf-autotable";

class Export extends React.Component {
    state = {
        data: [],
        filteredData: [],
        value: "",
        modal: false,
        fileName: "",
        fileFormat: "xlsx",
        hide: false
    }

    toggleModal = () => {
        this.props.close()
    }

    handleExport = () => {
        this.toggleModal()
        let table = ReactDOM.findDOMNode(this.tableRef)
        let bookType = this.state.fileFormat.length ? this.state.fileFormat : "xlsx"
        if (bookType === 'pdf') {
            this.exportPDF()
        }
        else {
            let wb = XLSX.utils.table_to_book(table, { sheet: "Sheet JS" })
            let wbout = XLSX.write(wb, { bookType, bookSST: true, type: "binary" })

            const s2ab = s => {
                var buf = new ArrayBuffer(s.length)
                var view = new Uint8Array(buf)
                for (var i = 0; i < s.length; i++) view[i] = s.charCodeAt(i) & 0xff
                return buf
            }
            let file =
                this.state.fileFormat.length && this.state.fileFormat.length
                    ? `${this.state.fileName}.${this.state.fileFormat}`
                    : this.state.fileName.length
                        ? `${this.state.fileName}.xlsx`
                        : this.state.fileFormat.length
                            ? `excel-sheet.${this.state.fileFormat}`
                            : "excel-sheet.xlsx"

            return FileSaver.saveAs(
                new Blob([s2ab(wbout)], { type: "application/octet-stream" }),
                file
            )
        }

    }

    exportPDF = () => {
        const unit = "pt";
        const size = "A4"; // Use A1, A2, A3 or A4
        const orientation = "landscape"; // portrait or landscape

        const marginLeft = 40;
        const doc = new jsPDF(orientation, unit, size);

        doc.setFontSize(15);

        const title = "Canceled IP Transit List";
        const headers = [["ID", "Provider", "Client Id", "Service Id", "Circuit Id", "Circuit Type", "Circuit Country",
            "Circuit City", "Port Capacity", "Bandwidth Commit", "Activation Date", "Expiration Date",
            "Metered Charge", "Status", "Notes"]];

        const data = this.props.data.map(elt => [elt.id, elt.provider, elt.client_id, elt.service_id, elt.circuit_id,
        elt.circuit_type, elt.circuit_country, elt.circuit_city, elt.port_capacity, elt.bandwidth_commit,
        elt.activation_date, elt.expiration_date, elt.metered_charge, elt.status, elt.notes]);

        let content = {
            startY: 50,
            head: headers,
            body: data
        };

        doc.text(title, marginLeft, 40);
        doc.autoTable(content);
        doc.save(`${this.state.fileName}.pdf`)
    }

    render() {
        let array = this.props.data
        let renderTableData = array.map(col => {
            return (
                <tr key={col.id}>
                    <td>{col.id}</td>
                    <td>{col.provider}</td>
                    <td>{col.client_id}</td>
                    <td>{col.service_id}</td>
                    <td>{col.circuit_id}</td>
                    <td>{col.circuit_type}</td>
                    <td>{col.circuit_country}</td>
                    <td>{col.circuit_city}</td>
                    <td>{col.port_capacity}</td>
                    <td>{col.bandwidth_commit}</td>
                    <td>{col.activation_date}</td>
                    <td>{col.expiration_date}</td>
                    <td>{col.metered_charge}</td>
                    <td>{col.status}</td>
                    <td>{col.notes}</td>
                </tr>
            )
        })
        return (
            <React.Fragment>
                <Table style={{ opacity: "0" }}
                    innerRef={el => (this.tableRef = el)}
                    className="table-hover-animation mt-2"
                    responsive>
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>Provider</th>
                            <th>Client Id</th>
                            <th>Service Id</th>
                            <th>Circuit Id</th>
                            <th>Circuit Type</th>
                            <th>Circuit Country</th>
                            <th>Circuit City</th>
                            <th>Port Capacity</th>
                            <th>Bandwidth Commit</th>
                            <th>Activation Date</th>
                            <th>Expiration Date</th>
                            <th>Metered Charge</th>
                            <th>Status</th>
                            <th>Notes</th>
                        </tr>
                    </thead>
                    <tbody>{renderTableData}</tbody>
                </Table>
                <Modal
                    isOpen={this.props.modal}
                    toggle={this.toggleModal}
                    className="modal-dialog-centered">
                    <ModalHeader toggle={this.toggleModal} className="bg-primary">Export</ModalHeader>
                    <ModalBody>
                        <FormGroup>
                            <Input
                                type="text"
                                value={this.state.fileName}
                                onChange={e => this.setState({ fileName: e.target.value })}
                                placeholder="Enter File Name"
                            />
                        </FormGroup>
                        <FormGroup>
                            <CustomInput
                                type="select"
                                id="selectFileFormat"
                                name="customSelect"
                                value={this.state.fileFormat}
                                onChange={e => this.setState({ fileFormat: e.target.value })}>
                                <option>xlsx</option>
                                <option>csv</option>
                                <option>txt</option>
                                <option>pdf</option>
                            </CustomInput>
                        </FormGroup>
                    </ModalBody>
                    <ModalFooter>
                        <Button color="primary" onClick={this.handleExport}>
                            Export
            </Button>
                        <Button color="flat-danger" onClick={this.toggleModal}>
                            Cancel
            </Button>
                    </ModalFooter>
                </Modal>
            </React.Fragment>
        )
    }
}

export default Export
