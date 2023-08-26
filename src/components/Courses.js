import React from "react";
import ActionsButton from "./ActionsButton";
import Input from "./Input";

const Courses = ({
  handleCoursesList,
  prevStep,
  nextStep,
  handleChange,
  values,
}) => {
  const stepIsValid = values.courses.length !== 0;

  const inputIsNotEmpty = (val) => {
    return val !== "";
  };
  return (
    <>
      <h2>Taining and Courses</h2>
      <form className="row">
        <div className="col-md-6 my-3">
          <Input
            inputIsValid={values.courseNameIsValid}
            maxLength="30"
            value={values.courseName}
            onChange={handleChange("courseName", inputIsNotEmpty)}
            placeholder="Course Name"
          />
        </div>
        <div className="col-md-6 my-3">
          <Input
            inputIsValid={values.associationIsValid}
            maxLength="30"
            value={values.association}
            onChange={handleChange("association", inputIsNotEmpty)}
            placeholder="Association"
          />
        </div>

        <div className="col-md-6 my-3">
          <Input
            inputIsValid={values.startEndCourseIsValid}
            maxLength="20"
            value={values.startEndCourse}
            onChange={handleChange("startEndCourse", inputIsNotEmpty)}
            placeholder="start - end ex-2014 - 2019"
          />
        </div>
        <button
          className="btn btn-success col-md-6 my-3"
          type="button"
          onClick={handleCoursesList}
          disabled={
            !(
              values.courseNameIsValid &&
              values.associationIsValid &&
              values.startEndCourseIsValid
            )
          }
        >
          Add +
        </button>
        <table className="table mt-3 text-center">
          <thead>
            <tr>
              <th>Course Name</th>
              <th>Association</th>
              <th>Start - End</th>
            </tr>
          </thead>
          <tbody>
            {values.courses.map((edu, index) => {
              return (
                <tr key={index}>
                  <td>{edu.courseName}</td>
                  <td>{edu.association}</td>
                  <td>{edu.startEndCourse}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
        <ActionsButton
          Previous={prevStep}
          Continue={nextStep}
          stepIsValid={stepIsValid}
        />
      </form>
    </>
  );
};

export default Courses;
