import React from "react";
import "./Profile.css";

const ProfileHeader = ({ doctorData }) => {
  return (
    <div className="clinician-details">
      <h3>Clinician</h3>
      <p>
        {doctorData?.title} {(doctorData?.preferredName ? doctorData?.preferredName + "(" +
        doctorData.firstName + ")" : doctorData.firstName)} {" "}
        {doctorData?.middleName}
        {doctorData.familyName} {doctorData?.suffix}
      </p>
      <p> {doctorData.role}</p>
    </div>
  );
};

export default ProfileHeader;
