export const selectStyles = {
    option: (provided, state) => ({
      ...provided,
      borderBottom: "1px dotted pink",
      color: state.isSelected ? "blue" : "",
      fontSize: 10,
      backgroundColor: state.isSelected ? "#eee" : "",
      textAlign: "left",
      cursor: "pointer"
    }),
    container: base => ({
      ...base,
      width: "100%",
      height: "25px"
    }),
    newcontainer: base => ({
      ...base,
      width: "100%",
      height: "25px",
      marginTop:"20px"
    }),
    control: (base,state) => ({
      ...base,
      height: 25,
      minHeight: 25,
      fontSize: 10,
      borderRadius: 5,
      width: "100%",
      textAlign: "left",
      cursor: "pointer",
      borderColor : state.selectProps.invalid ? "#ea5455" : "#d9d9d9"
    }),
    placeholder: base => ({
        top: 11,
        fontSize:13,
        marginLeft: 2,
        marginBottom:3,
    }),
    dropdownIndicator: base => ({
      ...base,
      height:13,
      marginBottom:8,
      paddingTop:0
    }),
    indicatorSeparator: base => ({
      ...base,
      height:13,
      marginTop:6
    }),
    valueContainer: base => ({
      ...base,
      padding: 0,
      paddingLeft: 2
    })
  };
  
  export const labelStyles = {
    fontSize: 16,
    paddingTop: 8,
    marginRight: 5,
    width: 25,
    textAlign: "right",
    // color: '#da8d18'
  };