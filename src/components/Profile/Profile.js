import React, { useEffect, useState } from "react";
import { useLocation } from "react-router";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import ProfileHeader from "./ProfileHeader";
import ProfileBody from "./ProfileBody";
import "./Profile.css";

const Profile = () => {
  const { state } = useLocation();
  const { token } = state;
  const [doctorData, setDoctorData] = useState("");
  const [show, setShow] = useState(true);

  //fetching clinician details
  useEffect(() => {
    fetch("/clinician-details", {
      method: "get",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: token,
      },
    })
      .then((response) => response.json())
      .then((data) => {
        setDoctorData(data);
        setShow(false);
      });
      // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="clinical-portal">
      {show ? (
        <Skeleton count={5} />
      ) : (
        <div>
          <div className="clinical-portal-header">
            <h1>Clinical Portal</h1>
            <ProfileHeader doctorData={doctorData} token={token} />
          </div>
          <div className="clinical-portal-body">
            <ProfileBody doctorData={doctorData} token={token} />
          </div>
        </div>
      )}
    </div>
  );
};

export default Profile;
