import React, { useEffect, useState } from "react";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import PatientDetails from "./PatientDetails";
import "./Profile.css";

const ProfileBody = ({ doctorData, token }) => {
  const [patients, setPatients] = useState([]);
  const [patientDetail, setPatientDetail] = useState();
  const [loading, setLoading] = useState(true);
  const [showLoaderOnClick, setShowLoaderOnClick] = useState(false);

  useEffect(() => {
    getPatientsData();

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  //fetching patients
  async function getPatientsData() {
    setLoading(true);
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
        setLoading(false);
      })
      .catch((err) => console.log(err));
  }

  //fetching patient details
  const patientClicked = async (patient) => {
    setPatientDetail("");
    setShowLoaderOnClick(true);
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
              (data.title ? data.title + " " : "") +
              (data?.preferredName
                ? data?.preferredName + "(" + data.firstName + ")"
                : data.firstName) +
              " " +
              (data?.middleName ? data?.middleName : "") +
              " " +
              data.familyName +
              " " +
              (data.suffix ? data.suffix : ""),
            age: data.age,
            sex: data.sex,
          };

          setPatientDetail(tempObj);
          setShowLoaderOnClick(false);
        }, 1000);
      })
      .catch((err) => console.log(err));
  };

  return (
    <div>
      {patients.length > 0 ? (
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
      ) : (
        <Skeleton count={1} />
      )}
      {!showLoaderOnClick ? (
        <div>
          {patientDetail && (
            <PatientDetails
              patientDetail={patientDetail}
              showLoaderOnClick={showLoaderOnClick}
            />
          )}
        </div>
      ) : (
        <Skeleton count={2} />
      )}
    </div>
  );
};

export default ProfileBody;
