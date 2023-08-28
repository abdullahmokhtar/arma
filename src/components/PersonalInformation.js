/* eslint-disable no-control-regex */
import React from "react";
import Input from "./Input";
import Select from "./Select";

const PersonalInformation = ({
  nextStep,
  handleChange,
  handleImageChange,
  values,
  acceptEnglishOnly,
  acceptNumbersOnly,
}) => {
  const stepIsValid =
    values.nameIsValid &&
    values.emailIsValid &&
    values.genderIsValid &&
    values.phoneIsValid &&
    values.nationalIdIsValid &&
    values.nationalityIsValid &&
    values.addressIsValid &&
    (values.militaryIsValid || values.gender === "Female") &&
    values.maritalIsValid &&
    values.profileImageIsValid &&
    values.dobIsValid;

  const Continue = () => {
    if (stepIsValid) {
      nextStep();
    }
  };

  const nameValidation = (val) => {
    return val.trim().length >= 3 && val.trim().length < 50;
  };

  const emailValidation = (val) => {
    const pattern =
      /(?:[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:(2(5[0-5]|[0-4][0-9])|1[0-9][0-9]|[1-9]?[0-9]))\.){3}(?:(2(5[0-5]|[0-4][0-9])|1[0-9][0-9]|[1-9]?[0-9])|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\])/;
    return pattern.test(val);
  };

  const genderValidation = (val) => {
    return val === "Male" || val === "Female";
  };

  const phoneValidation = (val) => {
    const pattern = /(01)[0125][0-9]{8}/;
    return pattern.test(val);
  };

  const nationalIdHandler = (val) => {
    const pattern =
      /^[23][0-9]{2}[01][0-9][0-3][0-9][0-38][1-9][0-9]{3}[0-9]{2}$/;
    return pattern.test(val);
  };

  const nationalityHandler = (val) => {
    return val !== "";
  };

  const addressHandler = (val) => {
    return val.trim().length > 5 && val.trim().length <= 100;
  };

  const militaryHandler = (val) => {
    return val !== "";
  };

  const maritalHandler = (val) => {
    return val !== "";
  };

  const profileImageHandler = (val) => {
    const name = val.name.toLowerCase();
    return (
      (name.endsWith(".jpg") ||
        name.endsWith(".png") ||
        name.endsWith(".jpeg")) &&
      val.size <= 3000000
    );
  };

  const dobHandler = (val) => {
    return val > "1963";
  };

  return (
    <>
      <h2 className="ps-3">Personal Information</h2>
      <div className="container">
        <form className="row">
          <div className="col-md-6 my-3">
            <Input
              inputIsValid={values.nameIsValid}
              value={values.name}
              onChange={handleChange("name", nameValidation)}
              placeholder="Full Name"
              onInput={acceptEnglishOnly}
              maxLength="50"
            />
          </div>
          <div className="col-md-6 my-3">
            <Input
              inputIsValid={values.emailIsValid}
              value={values.email}
              onChange={handleChange("email", emailValidation)}
              placeholder="Email"
              type="email"
              maxLength="50"
            />
          </div>
          <div className="col-md-6 my-3">
            <Select
              onChange={handleChange("gender", genderValidation)}
              defaultValue={values.gender}
              default="Gender"
              options={["Male", "Female"]}
              inputIsValid={values.genderIsValid}
            />
          </div>
          <div className="col-md-6 my-3">
            <Input
              inputIsValid={values.phoneIsValid}
              value={values.phone}
              onChange={handleChange("phone", phoneValidation)}
              onInput={acceptNumbersOnly}
              placeholder="Phone Number"
              maxLength="11"
            />
          </div>
          <div className="col-md-6 my-3">
            <Input
              inputIsValid={values.nationalIdIsValid}
              value={values.nationalId}
              onChange={handleChange("nationalId", nationalIdHandler)}
              onInput={acceptNumbersOnly}
              placeholder="National ID"
              maxLength="14"
            />
          </div>
          <div className="col-md-6 my-3">
            <Select
              onChange={handleChange("nationality", nationalityHandler)}
              defaultValue={values.nationality}
              default="Nationality"
              options={["Egyptian", "Indian"]}
              inputIsValid={values.nationalityIsValid}
            />
          </div>
          <div className="col-md-12 my-3">
            <Input
              inputIsValid={values.addressIsValid}
              value={values.address}
              onChange={handleChange("address", addressHandler)}
              placeholder="Address"
              maxLength="100"
            />
          </div>
          <div className="col-md-6 my-3">
            <Select
              onChange={handleChange("military", militaryHandler)}
              defaultValue={values.military}
              default="military status"
              options={["Completed", "Exemption", "PostPone"]}
              disabled={values.genderIsValid && values.gender === "Female"}
              inputIsValid={values.militaryIsValid}
            />
          </div>
          <div className="col-md-6 my-3">
            <Select
              onChange={handleChange("marital", maritalHandler)}
              defaultValue={values.marital}
              default="Marital Status"
              options={["single", "married", "separated", "divorced"]}
              inputIsValid={values.maritalIsValid}
            />
          </div>
          <div className="col-md-6 my-3">
            <label className="form-label">Upload your Photo</label>
            <Input
              inputIsValid={values.profileImageIsValid}
              type="file"
              onChange={handleImageChange("profileImage", profileImageHandler)}
              accept=".jpg,.png,.jpeg"
              errorMessage="photo can not exceed more than 3mb"
            />
          </div>
          <div className="col-md-6 my-3">
            <label className="form-label">Date of Birth</label>
            <Input
              inputIsValid={values.dobIsValid}
              value={values.dob}
              type="date"
              min="1963-01-01"
              onChange={handleChange("dob", dobHandler)}
            />
          </div>
          <div className="col-md-12">
            <button
              type="button"
              onClick={Continue}
              disabled={!stepIsValid}
              className="btn btn-primary  w-100"
            >
              Next
            </button>
          </div>
        </form>
      </div>
    </>
  );
};

export default PersonalInformation;
