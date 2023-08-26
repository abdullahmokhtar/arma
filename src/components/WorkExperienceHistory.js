import React from "react";
import ActionsButton from "./ActionsButton";
import Input from "./Input";

const WorkExperienceHistory = ({
  prevStep,
  nextStep,
  handleChange,
  values,
  handleWorkExperience,
}) => {
  const inputIsNotEmpty = (val) => {
    return val !== "";
  };
  return (
    <>
      <h2>Previous Experiance</h2>
      <form className="row">
        <div className="col-md-6 my-3">
          <Input
            inputIsValid={values.companyNameIsValid}
            maxLength="30"
            onChange={handleChange("companyName", inputIsNotEmpty)}
            value={values.companyName}
            placeholder="Company Name"
          />
        </div>
        <div className="col-md-6 my-3">
          <Input
            inputIsValid={values.industryFiledIsValid}
            maxLength="30"
            placeholder="Industry Filed"
            onChange={handleChange("industryFiled", inputIsNotEmpty)}
            value={values.industryFiled}
          />
        </div>
        <div className="col-md-6 my-3">
          <Input
            inputIsValid={values.workPositionIsValid}
            placeholder="Position"
            onChange={handleChange("workPosition", inputIsNotEmpty)}
            value={values.workPosition}
          />
        </div>
        <div className="col-md-6 my-3">
          <Input
            inputIsValid={values.startEndJobIsValid}
            placeholder="start - end ex-2014 - 2019"
            onChange={handleChange("startEndJob", inputIsNotEmpty)}
            value={values.startEndJob}
          />
        </div>
        <div className="col-md-5 my-3">
          <Input
            inputIsValid={values.grossSalaryIsValid}
            type="number"
            placeholder="Gross Salary"
            onChange={handleChange("grossSalary", inputIsNotEmpty)}
            value={values.grossSalary}
          />
        </div>
        <div className="col-md-7 my-3">
          <Input
            inputIsValid={values.reasonsToChangeIsValid}
            placeholder="Reasons for wishing to change your company"
            onChange={handleChange("reasonsToChange", inputIsNotEmpty)}
            value={values.reasonsToChange}
          />
        </div>
        <button
          className="btn btn-success col-md-6 m-auto mt-3"
          type="button"
          onClick={handleWorkExperience}
          disabled={
            !(
              values.companyNameIsValid &&
              values.industryFiledIsValid &&
              values.workPositionIsValid &&
              values.startEndJobIsValid &&
              values.grossSalaryIsValid &&
              values.reasonsToChangeIsValid
            )
          }
        >
          Add +
        </button>
        <table className="table mt-3 text-center">
          <thead>
            <tr>
              <th>Company Name</th>
              <th>Industry Filed</th>
              <th>Position</th>
              <th>Gross Salary</th>
              <th>Start - End</th>
            </tr>
          </thead>
          <tbody>
            {values.workExperince.map((edu, index) => {
              return (
                <tr key={index}>
                  <td>{edu.companyName}</td>
                  <td>{edu.industryFiled}</td>
                  <td>{edu.workPosition}</td>
                  <td>{edu.grossSalary}</td>
                  <td>{edu.reasonsToChange}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
        <ActionsButton
          Previous={prevStep}
          Continue={nextStep}
          stepIsValid="true"
        />
      </form>
    </>
  );
};

export default WorkExperienceHistory;
