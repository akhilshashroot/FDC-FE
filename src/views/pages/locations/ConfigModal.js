import React, { useState, useEffect } from 'react';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter} from 'reactstrap';
import { connect } from 'react-redux';
import { JsonEditor as Editor } from 'jsoneditor-react';
import 'jsoneditor-react/es/editor.min.css';
import Ajv from 'ajv';
import { getLocationConfigs, setLocationConfigs } from '../../../redux/actions/userConfigs/index';
import Spinner from "../../../components/@vuexy/spinner/Loading-spinner";
import { toast, Zoom } from "react-toastify";

const ajv = new Ajv({ allErrors: true, verbose: true });


const ConfigModal = ({ modal, toggleModal, loc, isLocationConfigLoading, getLocationConfigs, setLocationConfigs, locationConfig, updatedLocationConfig, isUpdateLocConfigLoading }) => {

    const [configData, setConfigData] = useState("");
    const [toggleUpdate, settoggleUpdate] = useState(false);
    const [upatedData, setUpdatedData] = useState("");

    useEffect(() => {
        if (loc && loc.loc_short) {
            getLocationConfigs(true, loc.loc_short);
        } else {
            setConfigData({});
        }
    }, [loc]);

    useEffect(() => {
        if (locationConfig) {
            setConfigData(locationConfig)
        }
    }, [locationConfig]);

    const handleChange = (val) => {
        let sendData = JSON.stringify(val);
        settoggleUpdate(true);
        setUpdatedData(sendData)
    }

    const handleConfigUpdate = () => {
        let locShort = loc.loc_short;
        setLocationConfigs(locShort, upatedData).then(() => {
            toggleModal();
            toast.success("Location Configuration Updated Successfully", { transition: Zoom })
        })
    }

    return (
        <>
            <Modal
                isOpen={modal}
                toggle={toggleModal}
                className="modal-lg"
            >
                <ModalHeader
                    className="bg-primary">{`${loc.location} Location Configuration`}</ModalHeader>
                {
                    configData && !isLocationConfigLoading && !isUpdateLocConfigLoading ?
                        <>
                            <ModalBody >

                                <Editor
                                    value={configData}
                                    ajv={ajv}
                                    onChange={handleChange}
                                />

                            </ModalBody>
                            <ModalFooter>
                                <Button className="add-new-btn" color="danger" onClick={toggleModal}>
                                    <span className="align-middle">Close</span>
                                </Button>
                                {
                                    toggleUpdate &&
                                    <Button className="add-new-btn" color="primary" onClick={() => handleConfigUpdate()}>
                                        <span className="align-middle">Update</span>
                                    </Button>
                                }
                            </ModalFooter>
                        </>
                        :
                        <Spinner />
                }
            </Modal>
        </>
    )
}

const mapStateToProps = state => {
    const { isLocationConfigLoading, locationConfig, updatedLocationConfig, isUpdateLocConfigLoading } = state.UserConfig;

    return {
        isLocationConfigLoading,
        locationConfig,
        updatedLocationConfig,
        isUpdateLocConfigLoading
    }
}

export default connect(mapStateToProps, { getLocationConfigs, setLocationConfigs })(ConfigModal)