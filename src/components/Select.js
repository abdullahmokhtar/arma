import React from "react";

const Select = (props) => {
  return (
    <>
      <select
        disabled={props.disabled}
        className="form-select "
        onChange={props.onChange}
        defaultValue={props.defaultValue ? props.defaultValue : props.default}
      >
        <option disabled>{props.default}</option>
        {props.options.map((opt, index) => {
          return (
            <option key={index} value={opt}>
              {opt}
            </option>
          );
        })}
      </select>
      {!props.inputIsValid && props.inputIsValid !== null && (
        <p className="text-danger">please select gender</p>
      )}
    </>
  );
};

const customComparator = (prevProps, nextProps) => {
  return (
    nextProps.inputIsValid === prevProps.inputIsValid &&
    nextProps.disabled === prevProps.disabled
  );
};

export default React.memo(Select, customComparator);
