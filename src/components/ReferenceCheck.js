import React from "react";
import ActionsButton from "./ActionsButton";
import Input from "./Input";

const ReferenceCheck = ({
  acceptNumbersOnly,
  prevStep,
  nextStep,
  handleChange,
  values,
}) => {
  const stepIsValid =
    values.refPersonNameIsValid &&
    values.refCompanyIsValid &&
    values.refPositionIsValid &&
    values.refPhoneIsValid;
  const inputIsNotEmpty = (val) => {
    return val !== "";
  };
  return (
    <div>
      <h2>ReferenceCheck</h2>
      <form className="row">
        <div className="col-md-6 my-3">
          <Input
            inputIsValid={values.refPersonNameIsValid}
            maxLength="50"
            placeholder="Reference person Name"
            onChange={handleChange("refPersonName", inputIsNotEmpty)}
            value={values.refPersonName}
          />
        </div>
        <div className="col-md-6 my-3">
          <Input
            inputIsValid={values.refCompanyIsValid}
            placeholder="Company"
            onChange={handleChange("refCompany", inputIsNotEmpty)}
            value={values.refCompany}
          />
        </div>
        <div className="col-md-6 my-3">
          <Input
            inputIsValid={values.refPositionIsValid}
            placeholder="position"
            onChange={handleChange("refPosition", inputIsNotEmpty)}
            value={values.refPosition}
          />
        </div>
        <div className="col-md-6 my-3">
          <Input
            inputIsValid={values.refPhoneIsValid}
            maxLength="11"
            onInput={acceptNumbersOnly}
            placeholder="Reference Phone Number"
            onChange={handleChange("refPhone", inputIsNotEmpty)}
            value={values.refPhone}
          />
        </div>
        <ActionsButton
          Previous={prevStep}
          Continue={nextStep}
          stepIsValid={stepIsValid}
        />
      </form>
    </div>
  );
};

export default ReferenceCheck;
