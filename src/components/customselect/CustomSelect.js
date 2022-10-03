import React from "react";
// import PropTypes from "prop-types";
import Select from "react-select";
import { selectStyles } from "./styles/styles";

const CustomSelect = ({
  onChange,
  label,
  name,
  placeholder,
  options,
  value,
  isDisabled,
  invalid
}) => (
  <div className="select-container">
    {/* <label htmlFor={name} style={labelStyles}>
      {label}
    </label> */}
    <Select
      name={name}
      placeholder="Select"
      isDisabled = {isDisabled}
      isClearable={false}
      backspaceRemovesValue={false}
      isSearchable={true}
      value={value}
      onChange={value => onChange(value)}
      options={options}
      invalid = {invalid}
      styles={selectStyles}
    />
  </div>
);

CustomSelect.propTypes = {
  // handleChange: PropTypes.func.isRequired,
  // label: PropTypes.string.isRequired,
  // name: PropTypes.string.isRequired,
  // placeholder: PropTypes.string.isRequired,
  // selectOptions: PropTypes.arrayOf(
  //   PropTypes.shape({
  //     label: PropTypes.string.isRequired,
  //     value: PropTypes.string.isRequired
  //   })
  // ),
  // value: PropTypes.objectOf({
  //   value: PropTypes.string,
  //   label: PropTypes.string
  // })
};

export default CustomSelect;