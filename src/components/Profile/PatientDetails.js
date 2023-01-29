import React from "react";

const PatientDetails = ({ patientDetail }) => { 
  return (
    <table className="patient-details-table">
      <thead>
        <tr>
          <th>Name</th>
          <th>Age</th>
          <th>Sex</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>{patientDetail.name}</td>
          <td>{patientDetail.age}</td>
          <td>{patientDetail.sex}</td>
        </tr>
      </tbody>
    </table>
  );
};

export default PatientDetails;

