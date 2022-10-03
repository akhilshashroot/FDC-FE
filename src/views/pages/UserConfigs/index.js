import React, { useState, useEffect } from 'react';
import { JsonEditor as Editor } from 'jsoneditor-react';
import 'jsoneditor-react/es/editor.min.css';
import Ajv from 'ajv';
import Spinner from "../../../components/@vuexy/spinner/Loading-spinner";
import { getUserConfigs, postUserConfigs } from '../../../redux/actions/userConfigs/index';
import { connect } from 'react-redux';
import { Button } from 'reactstrap';

const ajv = new Ajv({ allErrors: true, verbose: true });

const UserConfigs = ({ getUserConfigs, postUserConfigs, allData, isUserConfigLoading, isConfigUpdateLoading }) => {
    
    const [configJsonData, setConfigJsonData] = useState("");
    const [toggleUpdateBtn, settoggleUpdateBtn] = useState(false);
    const [upatedData, setUpdatedData] = useState("");

    useEffect(() => {
        if (!allData) {
            getUserConfigs(true);
        }
    }, []);

    useEffect(() => {
        if (allData) {
            setConfigJsonData(allData)
        }
    }, [allData])

    const toggleUpdateDiv = (boolVal) => {
        if (toggleUpdateBtn !== boolVal) {
            settoggleUpdateBtn(boolVal);

            if (!boolVal) {
                setConfigJsonData("");
                setUpdatedData("");
                getUserConfigs(true);
            }
        }
    }

    const handleChange = (val) => {
        let sendData = JSON.stringify(val);
        toggleUpdateDiv(true);
        setUpdatedData(sendData)
    }

    const handleConfigUpdate = () => {
        setConfigJsonData("");
        postUserConfigs(true, upatedData);
    }


    return (
        <>
            {
                configJsonData && !isConfigUpdateLoading && !isUserConfigLoading ?
                    <>
                        <Editor
                            value={configJsonData}
                            ajv={ajv}
                            onChange={handleChange}
                        />
                        { toggleUpdateBtn &&
                            <div className="mt-2" style={{ float: "right" }}>
                                <Button.Ripple
                                    color="danger"
                                    className="px-75 btn-block mr-1"
                                    onClick={(e) => toggleUpdateDiv(false)}
                                >
                                    Cancel
                            </Button.Ripple>

                                <Button.Ripple
                                    color="primary"
                                    type="submit"
                                    className="px-75 btn-block"
                                    onClick={() => handleConfigUpdate()}
                                >
                                    Update
                            </Button.Ripple>
                            </div>
                        }
                    </>
                    :
                    <Spinner />
            }

        </>
    )
}

const mapStateToProps = state => {
    const { isUserConfigLoading, allData, isConfigUpdateLoading } = state.UserConfig;

    return {
        isUserConfigLoading,
        allData,
        isConfigUpdateLoading
    }
}

export default connect(mapStateToProps, { getUserConfigs, postUserConfigs })(UserConfigs)