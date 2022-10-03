import React, { Fragment } from "react"
import Select from 'react-select';
import { Card, CardBody, FormGroup, Row, Col, Label, Button } from "reactstrap"
import Checkbox from "../../../components/@vuexy/checkbox/CheckboxesVuexy"
import { Check, FilePlus, Copy } from "react-feather"
import { CopyToClipboard } from "react-copy-to-clipboard"
import { ToastContainer, toast, Zoom } from "react-toastify"
import "react-toastify/dist/ReactToastify.css"
import "../../../assets/scss/plugins/extensions/toastr.scss"
var generator = require('generate-password');

class PetersmithPasswordGenerator extends React.Component {

    state = {
        lenght: null,
        punctuations: true,
        numbers: true,
        uppercase: true,
        lowercase: true,
        copied: false
    }

    lenghtvalues = [
        // { "label": "8", "value": "8" },
        // { "label": "9", "value": "9" },
        // { "label": "10", "value": "10" },
        // { "label": "11", "value": "11" },
        // { "label": "12", "value": "12" },
        // { "label": "13", "value": "13" },
        // { "label": "14", "value": "14" },
        // { "label": "15", "value": "15" },
        { "label": "16", "value": "16" },
        { "label": "17", "value": "17" },
        { "label": "18", "value": "18" },
        { "label": "19", "value": "19" },
        { "label": "20", "value": "20" },
        { "label": "21", "value": "21" },
        { "label": "22", "value": "22" },
    ]

    componentDidMount() {
        this.setState({
            lenght: { "label": "16", "value": "16" },
            punctuations: true,
            numbers: true,
            uppercase: true,
            lowercase: true,
            password: null
        })

    }

    handleLenghtChange = lenght => {
        this.setState(() => ({
            lenght: lenght
        }))
    }

    handlePunctuationsChange = (e) => {
        let isChecked = e.target.checked;
        this.setState(() => ({
            punctuations: isChecked
        }))
    }

    handleNumbersChange = (e) => {
        let isChecked = e.target.checked;
        this.setState(() => ({
            numbers: isChecked
        }))
    }

    handleUppercaseChange = (e) => {
        let isChecked = e.target.checked;
        this.setState(() => ({
            uppercase: isChecked
        }))
    }

    handleLowercaseChange = (e) => {
        let isChecked = e.target.checked;
        this.setState(() => ({
            lowercase: isChecked
        }))
    }

    Generate = () => {
        var password = generator.generate({
            length: this.state.lenght.value,
            numbers: this.state.numbers,
            symbols: this.state.punctuations,
            uppercase: this.state.uppercase,
            lowercase: this.state.lowercase
        })
        this.setState({
            password: password,
            copied: false
        })

    }


    onCopy = () => {
        this.setState({ copied: true })
        toast.success("Password Copied Successfully", {
          transition: Zoom,  
          position: toast.POSITION.TOP_CENTER,
          autoClose: 2000
        })
    }

    
    render() {
        const { lenght, punctuations, numbers, uppercase, lowercase, password } = this.state
        const cardbody = {
            paddingTop: "5px",
            paddingBottom: "15px"
        }
        const labels = {
            marginTop: "27px"
        }
        const buttonstyle = {
            paddingTop: "11px",
            paddingBottom: "11px",
            marginTop: "18px"
        }
        const passwordstyle = {
            marginTop: "55px",
            fontSize: "xxx-large",
            fontWeight: "bold"
        }
        return (
            <Fragment>
                <Row>
                    <Col sm="12">
                        <Card>
                            <CardBody style={cardbody}>
                                <Row>
                                    <Col lg="2" md="2" sm="2">
                                        <FormGroup className="mb-0">
                                            <Label for="subnets">Length</Label>
                                            <Select
                                                value={lenght}
                                                onChange={this.handleLenghtChange}
                                                options={this.lenghtvalues}
                                                isSearchable={true}
                                            />
                                        </FormGroup>
                                    </Col>
                                    <Col lg="2" md="2" sm="2">
                                        <FormGroup className="mb-0" style={labels}>
                                            <Checkbox
                                                color="primary"
                                                icon={<Check className="vx-icon" size={16} />}
                                                label="Punctuations"
                                                defaultChecked={punctuations}
                                                onChange={e => this.handlePunctuationsChange(e)}
                                            />
                                        </FormGroup>
                                    </Col>
                                    <Col lg="2" md="2" sm="2">
                                        <FormGroup className="mb-0" style={labels}>
                                            <Checkbox
                                                color="primary"
                                                icon={<Check className="vx-icon" size={16} />}
                                                label="Numbers"
                                                defaultChecked={numbers}
                                                onChange={e => this.handleNumbersChange(e)}
                                            />
                                        </FormGroup>
                                    </Col>
                                    <Col lg="2" md="2" sm="2">
                                        <FormGroup className="mb-0" style={labels}>
                                            <Checkbox
                                                color="primary"
                                                icon={<Check className="vx-icon" size={16} />}
                                                label="UpperCase"
                                                defaultChecked={uppercase}
                                                onChange={e => this.handleUppercaseChange(e)}
                                            />
                                        </FormGroup>
                                    </Col>
                                    <Col lg="2" md="2" sm="2">
                                        <FormGroup className="mb-0" style={labels}>
                                            <Checkbox
                                                color="primary"
                                                icon={<Check className="vx-icon" size={16} />}
                                                label="Lowercase"
                                                defaultChecked={lowercase}
                                                disabled={true}
                                                onChange={e => this.handleLowercaseChange(e)}
                                            />
                                        </FormGroup>
                                    </Col>
                                    <Col lg="2" md="2" sm="2">
                                        <Button
                                            className=""
                                            style={buttonstyle}
                                            color="primary"
                                            onClick={() => this.Generate()}
                                            >
                                            <FilePlus size={15} style={{ marginRight: "5px" }} />
                                            <span className="align-middle">Generate</span>
                                        </Button>
                                    </Col>
                                </Row>
                            </CardBody>
                        </Card>
                    </Col>
                </Row>
                {password !== null &&
                    <Row>
                        <Col sm="12">
                            <Card style={{ minHeight: "200px" }}>
                                <CardBody className="text-center">
                                    <p style={passwordstyle}>{password}</p>
                                    <CopyToClipboard
                                        onCopy={this.onCopy}
                                        text={password}
                                    >
                                        <Button style={{marginTop: "20px"}} color="primary">
                                        <Copy size={15} style={{ marginRight: "5px" }} />
                                            Copy!
                                        </Button>
                                    </CopyToClipboard>
                                    <ToastContainer />
                                </CardBody>
                            </Card>
                        </Col>
                    </Row>
                }
            </Fragment>
        )
    }
}

export default PetersmithPasswordGenerator