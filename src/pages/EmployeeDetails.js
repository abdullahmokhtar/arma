import { useEffect, useState, useRef } from "react";
import { useParams } from "react-router-dom";
import { useReactToPrint } from "react-to-print";
import "./EmployeeDetails.module.css"
import { db } from "../firebase";
import { onValue, ref } from "firebase/database";


const EmployeeDetails = () => {
  const { empId } = useParams();
  const [data, setData] = useState({
    education: [],
    workExperince: [],
    courses: [],
  });

  const componentRef = useRef();

  const printHandler = useReactToPrint({
    content: () => componentRef.current,
    documentTitle: data.name,
  });

  useEffect(() => {
    const fetchData = async () => {
      const query = ref(db, "employees/" + empId);
      return onValue(query, (snapshot) => {
        const data = snapshot.val();

        if (snapshot.exists()) {
        setData({ workExperince: [], ...data});
        }
      })
    };
    fetchData();
  }, [empId]);
  return (
    <div ref={componentRef}>
      <div className="row bg-white p-3">
        <div className="col-md-4 ">
          <img src={data.profileImageUrl} alt="employee" />
        </div>
        <div className="col-md-8">
          <h3>Personal Information</h3>
          <p>
            <span>Name:</span> {data.name}
          </p>
          <p>
            <span>Email:</span> {data.email}
          </p>
          <p>
            <span>phone:</span> {data.phone}
          </p>
          <p>
            <span>nationalId:</span> {data.nationalId}
          </p>
          <p>
            <span>Address:</span> {data.address}
          </p>
          <p>
            <span>Military Status:</span> {data.military}
          </p>
          <p>
            <span>Marital Status:</span> {data.marital}
          </p>
          <p>
            <span>Date Of Birth:</span> {data.dob}
          </p>
          <p>
            <span>position Applied For:</span> {data.position}
          </p>
          <h3>Education</h3>
          {data.education.map((edu, index) => {
            return (
              <div key={index}>
                <p>
                  <span>university:</span> {edu.university}
                </p>
                <p>
                  <span>faculty:</span> {edu.faculty} {edu.startEnd}
                </p>
                <p>
                  <span>Degree:</span> {edu.degree}
                </p>
              </div>
            );
          })}
          <h3>Work Experiance</h3>
          <p>
            <span>current Company:</span> {data.currCompany}
          </p>
          <p>
            <span>Industry Filed:</span> {data.currIndustryFiled}
          </p>
          <p>
            <span>Position:</span> {data.currPosition}
          </p>
          <p>
            <span>Duration:</span> {data.currStartEnd}
          </p>
          <p>
            <span>Duties And Respnsiblities:</span> {data.currDuties}
          </p>
          <p>
            <span>Salry:</span> {data.grossSalary} Egp
          </p>
          <p>
            <span>Reasons for Leave:</span> {data.reasonsToChangeCompany}
          </p>
          <h3>Previous Experiance</h3>
          {data.workExperince.map((work, index) => {
            return (
              <div key={index}>
                <p>
                  <span>Comapny:</span> {work.companyName}
                </p>
                <p>
                  <span>industry Filed: </span>
                  {work.industryFiled}
                </p>
                <p>
                  <span>Position:</span> {work.workPosition}
                </p>
                <p>
                  <span>Duration:</span> {work.startEndJob}
                </p>
                <p>
                  <span>Reasons for Leave</span>
                  {work.reasonsToChange}
                </p>
              </div>
            );
          })}
          <h3>Courses</h3>
          {data.courses.map((course, index) => {
            return (
              <div key={index}>
                <p>
                  <span>Course Name:</span> {course.courseName}
                </p>
                <p>
                  <span>Association:</span> {course.association}
                </p>
                <p>
                  <span>Duration:</span> {course.startEndCourse}
                </p>
              </div>
            );
          })}
          <h3>Language And Computer Skills</h3>
          <p>
            <span>Arabic:</span> {data.arabicLevel}
          </p>
          <p>
            <span>English:</span> {data.englishLevel}
          </p>
          <p>
            <span>Microsoft Office:</span> {data.msOfficeLevel}
          </p>
          <p>
            <span>Microsoft OutLook:</span> {data.msOutlookLevel}
          </p>
          <h3>Reference</h3>
          <p>
            <span>Name: </span>
            {data.refPersonName}
          </p>
          <p>
            <span>Compan</span>y: {data.refCompany}
          </p>
          <p>
            <span>Position:</span> {data.refPosition}
          </p>
          <p>
            <span>Phone Number:</span> {data.refPhone}
          </p>
          <h3>Policy</h3>
          <p>
            <span>Relatives:</span> {data.relatives ? data.relatives : "No"}
          </p>
          <p>
            <span>disease:</span> {data.disease ? data.disease : "No"}
          </p>
          <button className="btn btn-primary" onClick={printHandler}>
            Print
          </button>
          {/* <p>university: {data.education[0].university}</p> */}
        </div>
      </div>
    </div>
  );
};

export default EmployeeDetails;
