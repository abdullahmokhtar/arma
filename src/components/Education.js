import React from "react";
import ActionsButton from "./ActionsButton";
import Input from "./Input";
import Select from "./Select";

const Education = ({
  prevStep,
  nextStep,
  handleChange,
  values,
  handleEducationList,
  removeEducationItem,
}) => {
  const stepIsValid = values.education.length !== 0;

  const inputIsNotEmpty = (val) => {
    return val.trim().length !== 0;
  };

  const degrees = ["bachelor", "master", "diploma", "phd"];

  const validateDegree = (val) => {
    return degrees.includes(val);
  };

  return (
    <>
      <h2>Education</h2>
      <form className="row">
        <div className="col-md-6 my-3">
          <Input
            inputIsValid={values.universityIsValid}
            maxLength="30"
            value={values.university}
            onChange={handleChange("university", inputIsNotEmpty)}
            placeholder="university"
          />
        </div>
        <div className="col-md-6 my-3">
          <Input
            inputIsValid={values.facultyIsValid}
            maxLength="30"
            value={values.faculty}
            onChange={handleChange("faculty", inputIsNotEmpty)}
            placeholder="Faculty"
          />
        </div>
        <div className="col-md-6 my-3">
          <Select
            onChange={handleChange("degree", validateDegree)}
            defaultValue={values.degree}
            default="Education Degree"
            options={degrees}
            inputIsValid={values.degreeIsValid}
          />
        </div>
        <div className="col-md-6 my-3">
          <Input
            inputIsValid={values.startEndUniversityIsValid}
            maxLength="20"
            value={values.startEndUniversity}
            onChange={handleChange("startEndUniversity", inputIsNotEmpty)}
            placeholder="start - end ex-2014 - 2019"
          />
        </div>
        <button
          className="btn btn-success w-50 m-auto my-3"
          type="button"
          disabled={
            !(
              values.universityIsValid &&
              values.facultyIsValid &&
              values.degreeIsValid &&
              values.startEndUniversityIsValid
            )
          }
          onClick={handleEducationList}
        >
          Add +
        </button>
        <table className="table mt-3 text-center">
          <thead>
            <tr>
              <th>university</th>
              <th>Faculty</th>
              <th>Degree</th>
              <th>start - end</th>
              <th>Delete</th>
            </tr>
          </thead>
          <tbody>
            {values.education.map((edu, index) => {
              return (
                <tr key={index}>
                  <td>{edu.university}</td>
                  <td>{edu.faculty}</td>
                  <td>{edu.degree}</td>
                  <td>{edu.startEnd}</td>
                  <td>
                    <button
                      className="btn btn-danger"
                      type="button"
                      onClick={() => {
                        removeEducationItem(index);
                      }}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
        <ActionsButton
          Continue={nextStep}
          Previous={prevStep}
          stepIsValid={stepIsValid}
        />
      </form>
    </>
  );
};

export default Education;
