import React from "react";

const Input = (props) => {
  return (
    <>
      <input
        className={`form-control ${
          props.inputIsValid
            ? "is-valid"
            : props.inputIsValid === null
            ? ""
            : "is-invalid"
        }`}
        type={props.type ? props.type : "text"}
        maxLength={props.maxLength}
        value={props.value}
        onChange={props.onChange}
        onInput={props.onInput}
        placeholder={props.placeholder}
        accept={props.accept}
        min={props.min}
      />
      {!props.inputIsValid && props.inputIsValid !== null && (
        <p className="text-danger my-1 p-0">
          {props.errorMessage
            ? props.errorMessage
            : `Please enter valid ${props.placeholder}`}
        </p>
      )}
    </>
  );
};

const customComparator = (prevProps, nextProps) => {
  return (
    nextProps.inputIsValid === prevProps.inputIsValid &&
    nextProps.value === prevProps.value
  );
};

export default React.memo(Input, customComparator);
