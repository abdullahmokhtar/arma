import React from "react";
import ActionsButton from "./ActionsButton";
import Select from "./Select";

const PositionDetails = ({
  prevStep,
  nextStep,
  handleChange,
  position,
  positionIsValid,
  hearing,
  hearingIsValid,
}) => {
  console.log("Position Details is render");
  const stepIsValid = positionIsValid && hearingIsValid;

  const positions = [
    "HR Executive",
    "HR Supervisor",
    "HR Section Head",
    "HR Manager",
    "Purchasing Executive",
    "Purchasing Supervisor",
    "Purchasing Section Head",
    "Purchasing Manager",
    "Planning Executive",
    "Planning Supervisor",
    "Planning Section Head",
    "Planning Manager",
    "Accountant",
    "Accountant Supervisor",
    "Accountant Section Head",
    "Accountant Manager",
    "Internal Audit Executive",
    "Internal Audit Supervisor",
    "Internal Audit Section Head",
    "Internal Audit Manager",
    "Organization Executive",
    "Organization Supervisor",
    "Organization Section Head",
    "Organization Manager",
    "Business Assistant",
    "Receptionist",
    "Civil Engineer",
    "Civil Section Head",
    "Civil Manager",
    "Utilities Engineer",
    "Utilities Section Head",
    "Technical Office Engineer",
    "Technical Office Section Head",
    "Technical Office Manager",
    "Technical Audit Engineer",
    "Technical Audit Supervisor",
    "Technical Audit Manager",
    "Electrical Projects Engineer",
    "Electrical Projects Section Head",
    "Mechanical Projects Engineer",
    "Mechanical Projects Section Head",
    "Projects Manager",
    "Electrical Engineer",
    "Electrical Plant Engineer",
    "Electrical Section Head",
    "Mechanical Engineer",
    "Mechanical Plant Engineer",
    "Workshop Engineer",
    "Workshop Section Head",
    "Engineering Manager",
    "Shift Operation Engineer (Filling)",
    "Shift Operation Engineer (Process)",
    "Operation Section Head",
    "Operation Manager",
    "Quality Control Executive",
    "Quality Control Supervisor",
    "Quality Control Section Head",
    "Quality Assurance Executive",
    "Quality Assurance Supervisor",
    "Quality Assurance Section Head",
    "Quality Assurance Manager",
    "R&D Executive",
    "R&D Superisor",
    "R&d Section Head",
    "R&d Manager",
    "Printing Executive",
    "Printing Supervisor",
    "Printing Section Head",
    "Microbiology Executive",
    "Microbiology Supervisor",
    "Microbiology Section Head",
    "Microbiology Manager",
    "Regulatory Affairs Executive",
    "Regulatory Affairs Supervisor",
    "Regulatory Affairs Section Head",
    "HSE Engineer",
    "HSE Supervisor",
    "HSE Section Head",
    "HSE Manager",
    "Security Officer",
    "Security Supervisor",
    "Security Section Head",
    "Security Manager",
  ];

  const hearings = [
    "facebook",
    "linkedin",
    "wuzzuf",
    "bayt",
    "website",
    "refferals",
    "walkin",
    "job-fair",
    "other",
  ];

  const positionValidation = (val) => {
    return positions.includes(val);
  };

  const hearingtValidation = (val) => {
    return hearings.includes(val);
  };

  return (
    <>
      <h2>Position Details</h2>
      <form className="row">
        <div className="col-md-6 my-3">
          <Select
            onChange={handleChange("position", positionValidation)}
            defaultValue={position}
            default="Position Applied For"
            options={positions}
            inputIsValid={positionIsValid}
          />
        </div>
        <div className="col-md-6 my-3">
          <Select
            onChange={handleChange("hearing", hearingtValidation)}
            defaultValue={hearing}
            default="How did you hear about us"
            options={hearings}
            inputIsValid={hearingIsValid}
          />
        </div>
        <ActionsButton
          Previous={prevStep}
          stepIsValid={stepIsValid}
          Continue={nextStep}
        />
      </form>
    </>
  );
};

export default PositionDetails;
