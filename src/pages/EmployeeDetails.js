import { useEffect, useState, useRef } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useReactToPrint } from "react-to-print";
import "./EmployeeDetails.module.css";
import { db, storage } from "../firebase";
import { onValue, ref, remove } from "firebase/database";
import Modal from "../components/Modal/Modal";
import { deleteObject, ref as sRef } from "firebase/storage";

const EmployeeDetails = () => {
  const { empId } = useParams();
  const [data, setData] = useState({
    education: [],
    workExperince: [],
    courses: [],
  });
  const [showModal, setShowModal] = useState(false);
  const navigate = useNavigate();

  const componentRef = useRef();

  const printHandler = useReactToPrint({
    content: () => componentRef.current,
    documentTitle: data.name,
    pageStyle: "button { display: none !important;}",
  });

  const deleteHandler = () => {
    const startIndex = data.profileImageUrl.indexOf("%2F") + 3;
    const endIndex = data.profileImageUrl.indexOf("?alt");
    const imageName = data.profileImageUrl.substring(startIndex, endIndex);
    deleteObject(sRef(storage, "images/" + imageName))
      .then(() => {
        remove(ref(db, "employees/" + empId))
          .then(() => {
            navigate(-1);
          })
          .catch(() => {
            return <p>something went wrong</p>;
          });
      })
      .catch(() => {
        return <p>something went wrong</p>;
      });
  };

  useEffect(() => {
    const fetchData = async () => {
      const query = ref(db, "employees/" + empId);
      return onValue(query, (snapshot) => {
        const data = snapshot.val();

        if (snapshot.exists()) {
          setData({ workExperince: [], ...data });
        }
      });
    };
    fetchData();
  }, [empId]);
  if (data.education.length === 0) {
    return (
      <h1 className="emp-message">unfortunately this employee not found</h1>
    );
  }
  return (
    <div ref={componentRef}>
      {showModal && (
        <Modal
          onClose={() => {
            setShowModal(false);
          }}
        >
          <h2 className="text-center">Delete</h2>
          <p className="text-center">
            Are you sure you want to delete this employee?
          </p>
          <div className="text-center">
            <button
              className="btn btn-info me-3"
              onClick={() => {
                setShowModal(false);
              }}
            >
              Cancel
            </button>
            <button className="btn btn-danger" onClick={deleteHandler}>
              Delete
            </button>
          </div>
        </Modal>
      )}
      <div className="row bg-white p-3 mt-2">
        <div className="col-md-4">
          <img src={data.profileImageUrl} alt="employee" />
        </div>
        <div className="col-md-8">
          <h3>Personal Information</h3>
          <p>
            <span>Name:</span> {data.name}
          </p>
          <p>
            <span>Email:</span>{" "}
            <a href={`mailto:${data.email}`}>{data.email}</a>
          </p>
          <p>
            <span>phone:</span> {data.phone}
          </p>
          <p>
            <span>NationalId:</span> {data.nationalId}
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
          <hr />
          <h3>Education</h3>
          {data.education.map((edu, index) => {
            return (
              <div key={index}>
                <p>
                  <span>University:</span> {edu.university}
                </p>
                <p>
                  <span>Faculty:</span> {edu.faculty} {edu.startEnd}
                </p>
                <p>
                  <span>Degree:</span> {edu.degree}
                </p>
              </div>
            );
          })}
          <hr />
          <h3>Work Experiance</h3>
          <p>
            <span>Current Company:</span> {data.currCompany}
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
            <span>Salary:</span> {data.grossSalary} Egp
          </p>
          <p>
            <span>Reasons for Leave:</span> {data.reasonsToChangeCompany}
          </p>
          <hr />
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
                  <span>Reasons for Leave: </span>
                  {work.reasonsToChange}
                </p>
              </div>
            );
          })}
          <hr />
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
          <hr />
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
          <hr />
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
          <hr />
          <h3>Policy</h3>
          <p>
            <span>Relatives:</span> {data.relatives ? data.relatives : "No"}
          </p>
          <p>
            <span>disease:</span> {data.disease ? data.disease : "No"}
          </p>
          <div className="text-end">
            <button className="btn btn-primary" onClick={printHandler}>
              Print
            </button>
            <button
              className="btn btn-danger ms-5"
              onClick={() => setShowModal(true)}
            >
              Delete
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EmployeeDetails;
