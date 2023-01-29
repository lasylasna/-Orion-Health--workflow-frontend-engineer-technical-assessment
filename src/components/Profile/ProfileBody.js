import React, { useEffect, useState } from "react";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import PatientDetails from "./PatientDetails";
import "./Profile.css";

const ProfileBody = ({ doctorData, token }) => {
  const [patients, setPatients] = useState([]);
  const [patientDetail, setPatientDetail] = useState(); 

  useEffect(() => {
    getPatientsData();

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);


  //fetching patients 
  async function getPatientsData() {
    await fetch("/patients", {
      headers: {
        Authorization: token,
        Accept: "application/json",
      },
    })
      .then((request) => request.json())
      .then((data) => {
        for (let i = 0; i < data.patients.length; i++) {
          data.patients[i].className = "not-selected";
        }
        setPatients(data.patients);
      })
      .catch((err) => console.log(err));
  }


  //fetching patient details
  const patientClicked = async (patient) => {
    setPatientDetail(""); 

    //setting up background color for selected patient
    patients.filter((element) => {
      if (element.id === patient.id) {
        patient.className = "selected";
      } else {
        element.className = "not-selected";
      }
      return element;
    });
    await fetch(`/patient-details/${patient.id}`, {
      headers: {
        Authorization: token,
        Accept: "application/json",
      },
    })
      .then((request) => request.json())
      .then((data) => {
        setTimeout(function () {
          let tempObj = { name: "", age: "", sex: "" };
          tempObj = {
            name:
              ((data.title ? (data.title+" ") :"")+
              (data?.preferredName
                ? (data?.preferredName + "(" + data.firstName + ")")
                : data.firstName) +
              " " +
              (data?.middleName ? data?.middleName : "") +
              " " +
              data.familyName +
              " " +
              (data.suffix ? data.suffix : "")),
            age: data.age,
            sex: data.sex,
          };
          
          setPatientDetail(tempObj); 
        }, 1000);
        
      })
      .catch((err) => console.log(err));
  };

  return (
    <div>
      <div className="patients">
        {patients.map((patient) => (
          <li
            key={patient.id}
            onClick={() => patientClicked(patient)}
            className={patient.className}
          >
            {patient.name} ({patient.id})
          </li>
        ))}
      </div>
      <div>
        {(patientDetail) ? (
          <PatientDetails patientDetail={patientDetail} />
        ) : (
          <Skeleton count={5} />
        )}
      </div>
    </div>
  );
};

export default ProfileBody;
