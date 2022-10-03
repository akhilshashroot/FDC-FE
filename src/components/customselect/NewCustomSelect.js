import React from "react";
// import PropTypes from "prop-types";
import Select from "react-select";
import { labelStyles, selectStyles } from "./styles/styles";


const NewCustomSelect = ({
  onChange,
  label,
  name,
  placeholder,
  options,
  value,
  isDisabled,
  invalid
}) => (
  <div className="select-newcontainer">
    <label htmlFor={name} style={labelStyles}>
      {label}
    </label>
    <Select
      name={name}
      placeholder="Select"
      isClearable={false}
      isDisabled = {isDisabled}
      backspaceRemovesValue={false}
      isSearchable={true}
      value={value}
      onChange={value => onChange(value)}
      options={options}
      styles={selectStyles}
      invalid = {invalid}
    />
  </div>
);

// NewCustomSelect.propTypes = {
//   handleChange: PropTypes.func.isRequired,
//   label: PropTypes.string.isRequired,
//   name: PropTypes.string.isRequired,
//   placeholder: PropTypes.string.isRequired,
//   selectOptions: PropTypes.arrayOf(
//     PropTypes.shape({
//       label: PropTypes.string.isRequired,
//       value: PropTypes.string.isRequired
//     })
//   ),
//   value: PropTypes.objectOf({
//     value: PropTypes.string,
//     label: PropTypes.string
//   })
// };
export default NewCustomSelect;