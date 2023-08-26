import React, { Component } from "react";
import Education from "./Education";
import PersonalInformation from "./PersonalInformation";
import PositionDetails from "./PositionDetails";
import ReferenceCheck from "./ReferenceCheck";
import Courses from "./Courses";
import WorkExperiance from "./WorkExperience";
import Policy from "./Policy";
import { storage } from "../firebase";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import Skills from "./Skills";
import WorkExperienceHistory from "./WorkExperienceHistory";
import emailjs from "@emailjs/browser";
import { v4 as uuidv4 } from "uuid";

export default class Signup extends Component {
  state = {
    step: 1,
    name: "",
    nameIsValid: null,
    email: "",
    emailIsValid: null,
    gender: "",
    genderIsValid: null,
    phone: "",
    phoneIsValid: null,
    nationalId: "",
    nationalIdIsValid: null,
    nationality: "",
    nationalityIsValid: null,
    address: "",
    addressIsValid: null,
    military: "",
    militaryIsValid: null,
    marital: "",
    maritalIsValid: null,
    profileImage: "",
    profileImageIsValid: null,
    dob: "",
    dobIsValid: null,
    position: "",
    positionIsValid: null,
    hearing: "",
    hearingIsValid: null,
    education: [],
    university: "",
    universityIsValid: null,
    faculty: "",
    facultyIsValid: null,
    degree: "",
    degreeIsValid: null,
    startEndUniversity: "",
    startEndUniversityIsValid: null,
    courses: [],
    courseName: "",
    courseNameIsValid: null,
    association: "",
    associationIsValid: null,
    startEndCourse: "",
    startEndCourseIsValid: null,
    englishLevel: "",
    englishLevelIsValid: null,
    arabicLevel: "",
    arabicLevelIsValid: null,
    msOfficeLevel: "",
    msOfficeLevelIsValid: null,
    msOutlookLevel: "",
    msOutlookLevelIsValid: null,
    isFresh: false,
    currCompany: "",
    currCompanyIsValid: null,
    currIndustryFiled: "",
    currIndustryFiledIsValid: null,
    currPosition: "",
    currPositionIsValid: null,
    currStartEnd: "",
    currStartEndIsValid: null,
    currDuties: "",
    currDutiesIsValid: null,
    currGrossSalary: "",
    currGrossSalaryIsValid: null,
    reasonsToChangeCompany: "",
    reasonsToChangeCompanyIsValid: null,
    companyName: "",
    companyNameIsValid: null,
    industryFiled: "",
    industryFiledIsValid: null,
    workPosition: "",
    workPositionIsValid: null,
    startEndJob: "",
    startEndJobIsValid: null,
    grossSalary: "",
    grossSalaryIsValid: null,
    reasonsToChange: "",
    reasonsToChangeIsValid: null,
    workExperince: [],
    refPersonName: "",
    refPersonNameIsValid: null,
    refCompany: "",
    refCompanyIsValid: null,
    refPosition: "",
    refPositionIsValid: null,
    refPhone: "",
    refPhoneIsValid: null,
    relatives: "",
    disease: "",
  };

  submitData = async () => {
    try {
      const imageRef = ref(
        storage,
        "images/" + this.state.profileImage.name.toLowerCase() + uuidv4()
      );
      await uploadBytes(imageRef, this.state.profileImage);

      const url = await getDownloadURL(imageRef);
      const {
        address,
        arabicLevel,
        association,
        companyName,
        courses,
        currCompany,
        currDuties,
        currGrossSalary,
        currIndustryFiled,
        currPosition,
        currStartEnd,
        disease,
        dob,
        education,
        email,
        englishLevel,
        hearing,
        isFresh,
        marital,
        military,
        msOfficeLevel,
        msOutlookLevel,
        name,
        nationalId,
        nationality,
        phone,
        position,
        reasonsToChange,
        reasonsToChangeCompany,
        refCompany,
        refPersonName,
        refPhone,
        refPosition,
        relatives,
        workExperince,
        gender,
      } = this.state;
      const data = {
        address,
        arabicLevel,
        association,
        companyName,
        courses,
        currCompany,
        currDuties,
        currGrossSalary,
        currIndustryFiled,
        currPosition,
        currStartEnd,
        disease,
        dob,
        education,
        email,
        englishLevel,
        hearing,
        isFresh,
        marital,
        military,
        msOfficeLevel,
        msOutlookLevel,
        name,
        nationalId,
        nationality,
        phone,
        position,
        reasonsToChange,
        reasonsToChangeCompany,
        refCompany,
        refPersonName,
        refPhone,
        refPosition,
        relatives,
        workExperince,
        gender,
        profileImageUrl: url,
      };

      const response = await fetch(
        "https://arma-64ebb-default-rtdb.europe-west1.firebasedatabase.app/employees.json",
        {
          method: "POST",
          body: JSON.stringify(data),
        }
      );
      emailjs.send(
        "service_i8cll5r",
        "template_r9o749b",
        {
          from_name: name,
          message: `Name: ${name}
          ID: ${nationalId}
          Phone: ${phone}
          Email: ${email}`,
        },
        "si4_IXbgUSB0dV1ZK"
      );
    } catch (e) {
      console.log("something went wrong");
    }
  };

  prevStep = () => {
    this.setState((prevState) => ({
      step: prevState.step - 1,
    }));
  };

  nextStep = () => {
    this.setState((prevState) => ({
      step: prevState.step + 1,
    }));
  };

  handleChange = (input, validation) => (e) => {
    this.setState({
      [input]: e.target.value,
      [`${input}IsValid`]: validation(e.target.value),
    });
  };

  handleCheckboxChange = (input) => (e) => {
    this.setState({
      [input]: e.target.checked,
    });
  };

  handleEducationList = () => {
    this.setState((prevState) => ({
      education: [
        ...prevState.education,
        {
          university: this.state.university,
          faculty: this.state.faculty,
          degree: this.state.degree,
          startEnd: this.state.startEndUniversity,
        },
      ],
      university: "",
      universityIsValid: null,
      faculty: "",
      facultyIsValid: null,
      degree: "",
      degreeIsValid: null,
      startEndUniversity: "",
      startEndUniversityIsValid: null,
    }));
  };

  removeEducationItem = (index) => {
    if (this.state.education.length === 1) {
      this.setState({
        education: [],
      });
    }
    this.setState((preState) => ({
      education: preState.education.splice(index, 1),
    }));
  };

  handleCoursesList = () => {
    this.setState((prevState) => ({
      courses: [
        ...prevState.courses,
        {
          courseName: this.state.courseName,
          association: this.state.association,
          startEndCourse: this.state.startEndCourse,
        },
      ],
      courseName: "",
      courseNameIsValid: null,
      association: "",
      associationIsValid: null,
      startEndCourse: "",
      startEndCourseIsValid: null,
    }));
  };

  handleWorkExperience = () => {
    this.setState((prevState) => ({
      workExperince: [
        ...prevState.workExperince,
        {
          companyName: this.state.companyName,
          industryFiled: this.state.industryFiled,
          workPosition: this.state.workPosition,
          startEndJob: this.state.startEndJob,
          grossSalary: this.state.grossSalary,
          reasonsToChange: this.state.reasonsToChange,
        },
      ],
    }));
  };

  handleImageChange = (input, validation) => (e) => {
    this.setState({
      [input]: e.target.files[0],
      [`${input}IsValid`]: validation(e.target.files[0]),
    });
  };

  acceptEnglishOnly = (e) => {
    const char = e.nativeEvent.data;
    if (
      !(
        (char >= "a" && char <= "z") ||
        (char >= "A" && char <= "Z") ||
        char === " "
      )
    ) {
      e.target.value = e.target.value.slice(0, -1);
    }
  };

  acceptNumbersOnly = (e) => {
    const char = e.nativeEvent.data;
    if (!(char >= "0" && char <= "9")) {
      e.target.value = e.target.value.slice(0, -1);
    }
  };

  render() {
    const {
      step,
      name,
      nameIsValid,
      email,
      emailIsValid,
      gender,
      genderIsValid,
      phone,
      phoneIsValid,
      nationalId,
      nationalIdIsValid,
      nationality,
      nationalityIsValid,
      address,
      addressIsValid,
      military,
      militaryIsValid,
      marital,
      maritalIsValid,
      profileImage,
      profileImageIsValid,
      dob,
      dobIsValid,
      position,
      positionIsValid,
      hearing,
      hearingIsValid,
      education,
      university,
      universityIsValid,
      faculty,
      facultyIsValid,
      degree,
      degreeIsValid,
      startEndUniversity,
      startEndUniversityIsValid,
      relatives,
      courses,
      courseName,
      courseNameIsValid,
      association,
      associationIsValid,
      startEndCourse,
      startEndCourseIsValid,
      englishLevel,
      englishLevelIsValid,
      arabicLevel,
      arabicLevelIsValid,
      msOfficeLevel,
      msOfficeLevelIsValid,
      msOutlookLevel,
      msOutlookLevelIsValid,
      isFresh,
      currCompany,
      currCompanyIsValid,
      currIndustryFiled,
      currIndustryFiledIsValid,
      currPosition,
      currPositionIsValid,
      currStartEnd,
      currStartEndIsValid,
      currDuties,
      currDutiesIsValid,
      currGrossSalary,
      currGrossSalaryIsValid,
      reasonsToChangeCompany,
      reasonsToChangeCompanyIsValid,
      companyName,
      companyNameIsValid,
      industryFiled,
      industryFiledIsValid,
      workPosition,
      workPositionIsValid,
      startEndJob,
      startEndJobIsValid,
      grossSalary,
      grossSalaryIsValid,
      reasonsToChange,
      reasonsToChangeIsValid,
      workExperince,
      refPersonName,
      refPersonNameIsValid,
      refCompany,
      refCompanyIsValid,
      refPosition,
      refPositionIsValid,
      refPhone,
      refPhoneIsValid,
      disease,
    } = this.state;

    const values = {
      step,
      name,
      nameIsValid,
      email,
      emailIsValid,
      gender,
      genderIsValid,
      phone,
      phoneIsValid,
      nationalId,
      nationalIdIsValid,
      nationality,
      nationalityIsValid,
      address,
      addressIsValid,
      military,
      militaryIsValid,
      marital,
      maritalIsValid,
      profileImage,
      profileImageIsValid,
      dob,
      dobIsValid,
      position,
      positionIsValid,
      hearing,
      hearingIsValid,
      education,
      university,
      universityIsValid,
      faculty,
      facultyIsValid,
      degree,
      degreeIsValid,
      startEndUniversity,
      startEndUniversityIsValid,
      courses,
      courseName,
      courseNameIsValid,
      association,
      associationIsValid,
      startEndCourse,
      startEndCourseIsValid,
      englishLevel,
      englishLevelIsValid,
      arabicLevel,
      arabicLevelIsValid,
      workExperince,
      relatives,
      msOfficeLevel,
      msOfficeLevelIsValid,
      msOutlookLevel,
      msOutlookLevelIsValid,
      isFresh,
      currCompany,
      currCompanyIsValid,
      currIndustryFiled,
      currIndustryFiledIsValid,
      currPosition,
      currPositionIsValid,
      currStartEnd,
      currStartEndIsValid,
      currDuties,
      currDutiesIsValid,
      currGrossSalary,
      currGrossSalaryIsValid,
      reasonsToChangeCompany,
      reasonsToChangeCompanyIsValid,
      companyName,
      companyNameIsValid,
      industryFiled,
      industryFiledIsValid,
      workPosition,
      workPositionIsValid,
      startEndJob,
      startEndJobIsValid,
      grossSalary,
      grossSalaryIsValid,
      reasonsToChange,
      reasonsToChangeIsValid,
      refPersonName,
      refPersonNameIsValid,
      refCompany,
      refCompanyIsValid,
      refPosition,
      refPositionIsValid,
      refPhone,
      refPhoneIsValid,
      disease,
    };

    switch (step) {
      case 1:
        return (
          <PersonalInformation
            nextStep={this.nextStep}
            handleChange={this.handleChange}
            handleImageChange={this.handleImageChange}
            values={values}
            acceptEnglishOnly={this.acceptEnglishOnly}
            acceptNumbersOnly={this.acceptNumbersOnly}
          />
        );
      case 2:
        return (
          <PositionDetails
            prevStep={this.prevStep}
            handleChange={this.handleChange}
            nextStep={this.nextStep}
            position={values.position}
            positionIsValid={values.positionIsValid}
            hearing={values.hearing}
            hearingIsValid={values.hearingIsValid}
            step={step}
          />
        );
      case 3:
        return (
          <Education
            prevStep={this.prevStep}
            handleChange={this.handleChange}
            values={values}
            nextStep={this.nextStep}
            step={step}
            handleEducationList={this.handleEducationList}
            removeEducationItem={this.removeEducationItem}
          />
        );
      case 4:
        return (
          <Courses
            prevStep={this.prevStep}
            handleChange={this.handleChange}
            handleCoursesList={this.handleCoursesList}
            values={values}
            nextStep={this.nextStep}
            step={step}
          />
        );
      case 5:
        return (
          <Skills
            prevStep={this.prevStep}
            handleChange={this.handleChange}
            values={values}
            nextStep={this.nextStep}
            step={step}
          />
        );
      case 6:
        return (
          <WorkExperiance
            prevStep={this.prevStep}
            handleChange={this.handleChange}
            handleCheckboxChange={this.handleCheckboxChange}
            values={values}
            nextStep={this.nextStep}
            step={step}
          />
        );
      case 7:
        return (
          <WorkExperienceHistory
            prevStep={this.prevStep}
            handleChange={this.handleChange}
            values={values}
            nextStep={this.nextStep}
            step={step}
            handleWorkExperience={this.handleWorkExperience}
          />
        );
      case 8:
        return (
          <ReferenceCheck
            prevStep={this.prevStep}
            handleChange={this.handleChange}
            values={values}
            nextStep={this.nextStep}
            acceptNumbersOnly={this.acceptNumbersOnly}
            step={step}
          />
        );
      case 9:
        return (
          <Policy
            prevStep={this.prevStep}
            handleChange={this.handleChange}
            values={values}
            submitData={this.submitData}
            step={step}
            nextStep={this.nextStep}
          />
        );
      default:
        return <h1>Your Data has been Sent.</h1>;
    }
  }
}
