import React from "react";
import ActionsButton from "./ActionsButton";
import Select from "./Select";

const Skills = ({ values, handleChange, prevStep, nextStep }) => {
  const stepIsValid =
    values.englishLevelIsValid &&
    values.arabicLevelIsValid &&
    values.msOfficeLevelIsValid &&
    values.msOutlookLevelIsValid;

  const LanguageLevel = ["fluent", "intermidate", "fair"];

  const techLevel = ["expert", "intermidate", "beginner"];
  const LanguageValidtionHandler = (val) => {
    return LanguageLevel.includes(val);
  };

  const techSkillValidtionHandler = (val) => {
    return techLevel.includes(val);
  };

  return (
    <>
      <h2>Language And Computer Skills</h2>
      <form className="row">
        <div className="col-md-6 my-3">
          <Select
            onChange={handleChange("englishLevel", LanguageValidtionHandler)}
            defaultValue={values.english}
            default="English Level"
            options={LanguageLevel}
            inputIsValid={values.englishLevelIsValid}
          />
        </div>
        <div className="col-md-6 my-3">
          <Select
            onChange={handleChange("arabicLevel", LanguageValidtionHandler)}
            defaultValue={values.arabic}
            default="Arabic Level"
            options={LanguageLevel}
            inputIsValid={values.arabicLevelIsValid}
          />
        </div>
        <div className="col-md-6 my-3">
          <Select
            onChange={handleChange("msOfficeLevel", techSkillValidtionHandler)}
            defaultValue={values.office}
            default="Microsoft Office Level"
            options={techLevel}
            inputIsValid={values.msOfficeLevelIsValid}
          />
        </div>
        <div className="col-md-6 my-3">
          <Select
            onChange={handleChange("msOutlookLevel", techSkillValidtionHandler)}
            defaultValue={values.outlook}
            default="Microsoft Outlook Level"
            options={techLevel}
            inputIsValid={values.msOutlookLevelIsValid}
          />
        </div>
        <ActionsButton
          Previous={prevStep}
          Continue={nextStep}
          stepIsValid={stepIsValid}
        />
      </form>
    </>
  );
};

export default Skills;
