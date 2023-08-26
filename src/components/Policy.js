import React, { useState } from "react";
import ActionsButton from "./ActionsButton";

const Policy = ({
  step,
  prevStep,
  nextStep,
  submitData,
  handleChange,
  values,
}) => {
  const [haveRelative, setHaveRelative] = useState(false);
  const [haveDisease, setHaveDisease] = useState(false);
  const [agree, setAgree] = useState(false);
  const [loadings, setLoadings] = useState(false);

  const submit = async (event) => {
    setLoadings(true);
    event.preventDefault();
    await submitData();
    setLoadings(false);
    nextStep();
  };

  const inputIsNotEmpty = (val) => {
    return val !== "";
  };
  return (
    <>
      <h2>Policy</h2>
      <form className="row">
        <div className="col-md-12 form-check">
          <input
            className="form-check-input"
            type="checkbox"
            onChange={(e) => {
              setHaveRelative(e.target.checked);
            }}
            id="relatives"
          />
          <label className="form-check-label" htmlFor="relatives">
            Do you have any relatives working in the company
          </label>
        </div>
        {haveRelative && (
          <div className="col-md-6">
            <input
              className="form-control my-2"
              placeholder="Please mention"
              type="text"
              onChange={handleChange("relatives", inputIsNotEmpty)}
            />
          </div>
        )}
        <div className="col-md-12 form-check">
          <input
            className="form-check-input"
            type="checkbox"
            onChange={(e) => {
              setHaveDisease(e.target.checked);
            }}
            id="disese"
          />
          <label className="form-check-label" htmlFor="disese">
            Do you have any medhical disease that effects on performing your job
          </label>
        </div>
        {haveDisease && (
          <div className="col-md-6">
            <input
              className="form-control my-2"
              placeholder="Please mention"
              type="text"
              onChange={handleChange("disease ", inputIsNotEmpty)}
            />
          </div>
        )}
        <div className="col-md-12 form-check">
          <input
            className="form-check-input"
            type="checkbox"
            onChange={(e) => {
              setAgree(e.target.checked);
            }}
            id="agree"
          />
          <label className="form-check-label text-bg-warning" htmlFor="agree">
            By accepting, You agree to our terms and policies
          </label>
        </div>
        <ActionsButton
          Previous={() => {
            if (values.isFresh) {
              prevStep();
              prevStep();
              prevStep();
            } else {
              prevStep();
            }
          }}
          submit="true"
          Continue={submit}
          stepIsValid={agree && !loadings}
        />
        {loadings && <p className="fw-boold text-center">Loading...</p>}
      </form>
    </>
  );
};

export default Policy;
