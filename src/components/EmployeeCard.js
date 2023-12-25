import React from "react";

import classes from "./EmployeeCard.module.css";
import { Link } from "react-router-dom";

const EmployeeCard = ({ employeeData }) => {
  // const  deleteHandler = async()=>{
  //   const response = await fetch(
  //     `https://arma-64ebb-default-rtdb.europe-west1.firebasedatabase.app/employees/${data._id}.json`,
  //     { method: "delete",  }
  //   );
  //   if (response.ok){
  //     navigate("/admin")
  //   }
  // }
  return (
    <div className={classes["employee-card"]}>
      <div className="row">
        <div className="col-md-4">
          <div className={classes["emp-img"]}>
            <img src={employeeData.profileImageUrl} alt="emplyee pic" />
          </div>
        </div>
        <div className="col-md-8">
          <div className={classes["emp-info"]}>
            <h3> {employeeData.name}</h3>
            <p>
              <span className="text-bold">Position:</span>
              {employeeData.position}
            </p>
            <p>
              <span className="text-bold">Phone:</span> {employeeData.phone}
            </p>
            <p>
              <span className="text-bold">Address:</span> {employeeData.address}
            </p>
            <Link to={`/admin/${employeeData._id}`} className="btn btn-success">
              Details
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EmployeeCard;
