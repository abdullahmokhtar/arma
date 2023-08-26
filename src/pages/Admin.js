import React, { useEffect, useState } from "react";
import { utils, writeFile } from "xlsx";
import { UserAuth } from "../context/AuthContext";
import EmployeeCard from "../components/EmployeeCard";
import { db } from "../firebase";
import { onValue, ref } from "firebase/database";

const AdminPage = () => {
  const [data, setData] = useState([]);
  const [searchName, setSearchName] = useState("");
  const { user } = UserAuth();

  useEffect(() => {
    const fetchData = async () => {
      const query = ref(db, "employees");
      return onValue(query, (snapshot) => {
        const data = snapshot.val();

        if (snapshot.exists()) {
          let arr = [];
          for (const key in data) {
            arr.push({
              _id: key,
              id: data[key].nationalId,
              name: data[key].name,
              email: data[key].email,
              gender: data[key].gender,
              phone: data[key].phone,
              address: data[key].address,
              military: data[key].military,
              marital: data[key].marital,
              BirhtDate: data[key].dob,
              nationality: data[key].nationality,
              profileImageUrl: data[key].profileImageUrl,
              position: data[key].position,
              university: data[key].university,
              faculty: data[key].faculty,
            });
          }
          setData(arr);
        }
      });
    };

    fetchData();
  }, [user]);

  const exportHandler = () => {
    var wb = utils.book_new();
    var ws = utils.json_to_sheet(data);

    utils.book_append_sheet(wb, ws, "employee");

    writeFile(wb, "employees.xlsx");
  };
  return (
    <div>
      <input
        placeholder="search"
        type="text"
        className="form-control w-25 my-3"
        onChange={(e) => {
          setSearchName(e.target.value.toLocaleLowerCase());
        }}
      />
      {searchName &&
        data
          .filter((employee) => {
            return employee.name.toLocaleLowerCase().includes(searchName);
          })
          .map((employee, index) => {
            return <EmployeeCard key={index} employeeData={employee} />;
          })}
      {!searchName &&
        data.map((employee, index) => {
          return <EmployeeCard key={index} employeeData={employee} />;
        })}
      <button className="btn btn-primary" onClick={exportHandler}>
        Export
      </button>
    </div>
  );
};

export default AdminPage;
