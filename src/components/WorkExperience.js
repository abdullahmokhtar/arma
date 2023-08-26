import React from "react";
import ActionsButton from "./ActionsButton";
import Input from "./Input";

const WorkExperiance = ({
  prevStep,
  nextStep,
  handleChange,
  handleCheckboxChange,
  values,
}) => {
  const stepIsValid =
    values.isFresh ||
    (values.currCompanyIsValid &&
      values.currIndustryFiledIsValid &&
      values.currPositionIsValid &&
      values.currStartEndIsValid &&
      values.currDutiesIsValid &&
      values.currGrossSalaryIsValid &&
      values.reasonsToChangeCompanyIsValid);

  const inputIsNotEmpty = (val) => {
    return val !== "";
  };

  return (
    <>
      <h2>WorkExperiance</h2>
      <form className="row">
        <div className="col-md-12 mb-3">
          <input
            className="form-check-input me-2"
            onChange={handleCheckboxChange("isFresh")}
            type="checkbox"
            checked={values.isFresh}
            id="fresh"
          />
          <label className="form-check-label" htmlFor="fresh">
            I'am Fresh
          </label>
        </div>
        {!values.isFresh && (
          <>
            <div className="col-md-6 my-3">
              <Input
                inputIsValid={values.currCompanyIsValid}
                maxLength="40"
                value={values.currCompany}
                placeholder="Current Company Name"
                onChange={handleChange("currCompany", inputIsNotEmpty)}
              />
            </div>
            <div className="col-md-6 my-3">
              <Input
                inputIsValid={values.currIndustryFiledIsValid}
                value={values.currIndustryFiled}
                maxLength="30"
                placeholder="Current Industry Filed"
                onChange={handleChange("currIndustryFiled", inputIsNotEmpty)}
              />
            </div>
            <div className="col-md-6 my-3">
              <Input
                inputIsValid={values.currPositionIsValid}
                value={values.currPosition}
                maxLength="50"
                placeholder="Current Position"
                onChange={handleChange("currPosition", inputIsNotEmpty)}
              />
            </div>
            <div className="col-md-6 my-3">
              <Input
                inputIsValid={values.currStartEndIsValid}
                value={values.currStartEnd}
                placeholder="start - end ex-2014 - 2019"
                onChange={handleChange("currStartEnd", inputIsNotEmpty)}
              />
            </div>
            <div className="col-md-12">
              <textarea
                className="form-control"
                type="text"
                placeholder="Duties & Respnsiblities"
                onChange={handleChange("currDuties", inputIsNotEmpty)}
                value={values.currDuties}
              />
            </div>
            <div className="col-md-5 my-3">
              <Input
                inputIsValid={values.currGrossSalaryIsValid}
                type="number"
                placeholder="Gross Salary"
                onChange={handleChange("currGrossSalary", inputIsNotEmpty)}
                value={values.currGrossSalary}
              />
            </div>
            <div className="col-md-7 my-3">
              <Input
                inputIsValid={values.reasonsToChangeCompanyIsValid}
                placeholder="Reasons for wishing to change your company"
                onChange={handleChange(
                  "reasonsToChangeCompany",
                  inputIsNotEmpty
                )}
                value={values.reasonsToChangeCompany}
              />
            </div>
          </>
        )}

        <ActionsButton
          Previous={prevStep}
          Continue={() => {
            if (values.isFresh) {
              nextStep();
              nextStep();
              nextStep();
            } else {
              nextStep();
            }
          }}
          stepIsValid={stepIsValid}
        />
      </form>
    </>
  );
};

export default WorkExperiance;
